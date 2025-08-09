import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== "agent") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { db } = await connectToDatabase()
    
    // Get security alerts with populated driver and truck data
    const alerts = await db.collection("security_alerts").aggregate([
      {
        $lookup: {
          from: "users",
          localField: "driverId",
          foreignField: "_id",
          as: "driver"
        }
      },
      {
        $lookup: {
          from: "trucks",
          localField: "truckId",
          foreignField: "_id",
          as: "truck"
        }
      },
      {
        $unwind: { path: "$driver", preserveNullAndEmptyArrays: true }
      },
      {
        $unwind: { path: "$truck", preserveNullAndEmptyArrays: true }
      },
      {
        $sort: { createdAt: -1 }
      }
    ]).toArray()

    return NextResponse.json(alerts)
  } catch (error) {
    console.error("Error fetching alerts:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== "agent") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const { db } = await connectToDatabase()

    const alert = {
      type: formData.get("type"),
      severity: formData.get("severity"),
      title: formData.get("title"),
      description: formData.get("description"),
      borderPost: formData.get("borderPost"),
      driverId: formData.get("driverId") || null,
      truckId: formData.get("truckId") || null,
      status: "active",
      agentId: session.user.id,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const result = await db.collection("security_alerts").insertOne(alert)
    
    return NextResponse.json({ id: result.insertedId, ...alert })
  } catch (error) {
    console.error("Error creating alert:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
