import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { getDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "agent") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const db = await getDatabase()
    const scans = await db
      .collection("ecard_scans")
      .aggregate([
        { $match: { agentId: new ObjectId(session.user.id) } },
        {
          $lookup: {
            from: "users",
            localField: "driverId",
            foreignField: "_id",
            as: "driver",
            pipeline: [{ $project: { firstName: 1, lastName: 1, email: 1, phone: 1, licenseNumber: 1 } }],
          },
        },
        { $unwind: "$driver" },
        {
          $lookup: {
            from: "trucks",
            localField: "truckId",
            foreignField: "_id",
            as: "truck",
            pipeline: [{ $project: { make: 1, model: 1, plateNumber: 1, year: 1 } }],
          },
        },
        { $unwind: { path: "$truck", preserveNullAndEmptyArrays: true } },
        { $sort: { createdAt: -1 } },
        { $limit: 50 },
      ])
      .toArray()

    return NextResponse.json(scans)
  } catch (error) {
    console.error("Error fetching scans:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "agent") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { ecardId, driverId, truckId, borderPost, scanType, notes } = body

    if (!ecardId || !driverId || !borderPost || !scanType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const db = await getDatabase()

    // Verify E-Card exists and is valid
    const ecard = await db.collection("ecards").findOne({
      _id: new ObjectId(ecardId),
      driverId: new ObjectId(driverId),
      status: "active",
    })

    if (!ecard) {
      return NextResponse.json({ error: "Invalid or inactive E-Card" }, { status: 400 })
    }

    const scanData = {
      agentId: new ObjectId(session.user.id),
      driverId: new ObjectId(driverId),
      truckId: truckId ? new ObjectId(truckId) : null,
      ecardId: new ObjectId(ecardId),
      borderPost,
      scanType, // 'entry' or 'exit'
      status: "approved", // Could be 'pending', 'approved', 'rejected'
      notes,
      scanTime: new Date(),
      createdAt: new Date(),
    }

    const result = await db.collection("ecard_scans").insertOne(scanData)

    // Update E-Card last scan info
    await db.collection("ecards").updateOne(
      { _id: new ObjectId(ecardId) },
      {
        $set: {
          lastScanDate: new Date(),
          lastBorderPost: borderPost,
          updatedAt: new Date(),
        },
      },
    )

    return NextResponse.json(
      {
        message: "E-Card scan recorded successfully",
        scanId: result.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error recording scan:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
