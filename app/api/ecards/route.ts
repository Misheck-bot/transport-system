import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { getDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const db = await getDatabase()
    const filter: any = {}

    // Drivers can only see their own E-Cards
    if (session.user.role === "driver") {
      filter.driverId = new ObjectId(session.user.id)
    }

    const ecards = await db
      .collection("ecards")
      .aggregate([
        { $match: filter },
        {
          $lookup: {
            from: "users",
            localField: "driverId",
            foreignField: "_id",
            as: "driver",
            pipeline: [{ $project: { firstName: 1, lastName: 1, email: 1, phone: 1 } }],
          },
        },
        { $unwind: "$driver" },
        { $sort: { createdAt: -1 } },
      ])
      .toArray()

    return NextResponse.json(ecards)
  } catch (error) {
    console.error("Error fetching E-Cards:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { paymentId } = body

    if (!paymentId) {
      return NextResponse.json({ error: "Payment ID is required" }, { status: 400 })
    }

    const db = await getDatabase()

    // Verify payment exists and is completed
    const payment = await db.collection("payments").findOne({
      _id: new ObjectId(paymentId),
      userId: new ObjectId(session.user.id),
      type: "E-Card Application",
      status: "completed",
    })

    if (!payment) {
      return NextResponse.json({ error: "Valid payment not found" }, { status: 400 })
    }

    // Check if E-Card already exists for this payment
    const existingEcard = await db.collection("ecards").findOne({
      paymentId: new ObjectId(paymentId),
    })

    if (existingEcard) {
      return NextResponse.json({ error: "E-Card already issued for this payment" }, { status: 400 })
    }

    const ecardData = {
      driverId: new ObjectId(session.user.id),
      paymentId: new ObjectId(paymentId),
      cardNumber: `EC-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      status: session.user.role === "admin" ? "active" : "pending_approval",
      issueDate: new Date(),
      expiryDate: new Date(Date.now() + 2 * 365 * 24 * 60 * 60 * 1000), // 2 years
      lastScanDate: null,
      lastBorderPost: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("ecards").insertOne(ecardData)

    return NextResponse.json(
      {
        message: "E-Card application submitted successfully",
        ecardId: result.insertedId,
        cardNumber: ecardData.cardNumber,
        status: ecardData.status,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating E-Card:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
