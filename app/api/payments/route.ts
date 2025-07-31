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
    const payments = await db
      .collection("payments")
      .find({
        userId: new ObjectId(session.user.id),
      })
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json(payments)
  } catch (error) {
    console.error("Error fetching payments:", error)
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
    const { type, amount, description, paymentMethod, phoneNumber, cardDetails } = body

    // Validate required fields
    if (!type || !amount || !paymentMethod) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const db = await getDatabase()

    // Create payment record
    const paymentData = {
      userId: new ObjectId(session.user.id),
      type,
      amount: Number.parseFloat(amount.replace("K", "").replace(",", "")),
      description,
      paymentMethod,
      phoneNumber: paymentMethod === "mobile" ? phoneNumber : null,
      cardDetails:
        paymentMethod === "card"
          ? {
              last4: cardDetails?.number?.slice(-4),
              brand: "visa", // This would be determined by the payment processor
            }
          : null,
      status: "pending",
      transactionId: `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("payments").insertOne(paymentData)

    // Simulate payment processing
    setTimeout(async () => {
      try {
        const success = Math.random() > 0.1 // 90% success rate
        await db.collection("payments").updateOne(
          { _id: result.insertedId },
          {
            $set: {
              status: success ? "completed" : "failed",
              processedAt: new Date(),
              updatedAt: new Date(),
            },
          },
        )
      } catch (error) {
        console.error("Error updating payment status:", error)
      }
    }, 3000)

    return NextResponse.json(
      {
        message: "Payment initiated successfully",
        paymentId: result.insertedId,
        transactionId: paymentData.transactionId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error processing payment:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
