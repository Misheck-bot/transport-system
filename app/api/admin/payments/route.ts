import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { getDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    const db = await getDatabase()

    const filter: any = {}
    if (status) {
      filter.status = status
    }

    const payments = await db
      .collection("payments")
      .aggregate([
        { $match: filter },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
            pipeline: [{ $project: { firstName: 1, lastName: 1, email: 1, phone: 1 } }],
          },
        },
        { $unwind: "$user" },
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit },
      ])
      .toArray()

    const total = await db.collection("payments").countDocuments(filter)

    return NextResponse.json({
      payments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching payments:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { paymentId, status, notes } = body

    if (!paymentId || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const db = await getDatabase()

    const result = await db.collection("payments").updateOne(
      { _id: new ObjectId(paymentId) },
      {
        $set: {
          status,
          adminNotes: notes,
          processedBy: new ObjectId(session.user.id),
          processedAt: new Date(),
          updatedAt: new Date(),
        },
      },
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Payment status updated successfully" })
  } catch (error) {
    console.error("Error updating payment:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
