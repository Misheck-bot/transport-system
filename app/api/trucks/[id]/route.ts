import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { getDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const db = await getDatabase()
    const truck = await db.collection("trucks").findOne({
      _id: new ObjectId(params.id),
    })

    if (!truck) {
      return NextResponse.json({ error: "Truck not found" }, { status: 404 })
    }

    // Check if user owns the truck or is an agent/admin
    if (session.user.role === "driver" && truck.driverId.toString() !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    return NextResponse.json(truck)
  } catch (error) {
    console.error("Error fetching truck:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "driver") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const db = await getDatabase()

    const truck = await db.collection("trucks").findOne({
      _id: new ObjectId(params.id),
      driverId: new ObjectId(session.user.id),
    })

    if (!truck) {
      return NextResponse.json({ error: "Truck not found" }, { status: 404 })
    }

    const updateData = {
      ...body,
      updatedAt: new Date(),
    }

    await db.collection("trucks").updateOne({ _id: new ObjectId(params.id) }, { $set: updateData })

    return NextResponse.json({ message: "Truck updated successfully" })
  } catch (error) {
    console.error("Error updating truck:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "driver") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const db = await getDatabase()

    const result = await db.collection("trucks").deleteOne({
      _id: new ObjectId(params.id),
      driverId: new ObjectId(session.user.id),
    })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Truck not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Truck deleted successfully" })
  } catch (error) {
    console.error("Error deleting truck:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
