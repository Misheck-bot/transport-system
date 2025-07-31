import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { getDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "driver") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const db = await getDatabase()
    const trucks = await db
      .collection("trucks")
      .find({
        driverId: new ObjectId(session.user.id),
      })
      .toArray()

    return NextResponse.json(trucks)
  } catch (error) {
    console.error("Error fetching trucks:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "driver") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const {
      make,
      model,
      year,
      color,
      plateNumber,
      chassisNumber,
      engineNumber,
      engineCapacity,
      fuelType,
      transmission,
      maxWeight,
      dimensions,
      registrationNumber,
      registrationExpiry,
      insuranceProvider,
      insuranceNumber,
      insuranceExpiry,
      specialFeatures,
      cargoType,
    } = body

    // Validate required fields
    if (!make || !model || !year || !plateNumber || !chassisNumber) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const db = await getDatabase()

    // Check if truck with same plate number exists
    const existingTruck = await db.collection("trucks").findOne({
      plateNumber: plateNumber.toUpperCase(),
    })

    if (existingTruck) {
      return NextResponse.json({ error: "Truck with this plate number already exists" }, { status: 400 })
    }

    const truckData = {
      driverId: new ObjectId(session.user.id),
      make,
      model,
      year: Number.parseInt(year),
      color,
      plateNumber: plateNumber.toUpperCase(),
      chassisNumber,
      engineNumber,
      engineCapacity,
      fuelType,
      transmission,
      maxWeight,
      dimensions,
      registrationNumber,
      registrationExpiry: registrationExpiry ? new Date(registrationExpiry) : null,
      insuranceProvider,
      insuranceNumber,
      insuranceExpiry: insuranceExpiry ? new Date(insuranceExpiry) : null,
      specialFeatures,
      cargoType,
      status: "pending_verification",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("trucks").insertOne(truckData)

    return NextResponse.json(
      {
        message: "Truck registered successfully",
        truckId: result.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error registering truck:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
