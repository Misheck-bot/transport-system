import { type NextRequest, NextResponse } from "next/server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// Mock driver data - replace with actual database queries
const mockDrivers = [
  {
    _id: "67890abcdef123456789012",
    firstName: "John",
    lastName: "Martinez",
    email: "john.martinez@email.com",
    phone: "+1-555-0123",
    licenseNumber: "CDL-123456",
    licenseExpiry: "2025-12-31",
    status: "active",
    createdAt: "2024-01-10T00:00:00.000Z",
    trucks: [
      {
        _id: "truck123",
        make: "Freightliner",
        model: "Cascadia",
        plateNumber: "ABC-123",
        year: 2022,
      },
    ],
    ecards: [
      {
        _id: "ecard123",
        cardNumber: "EC-2024-001",
        status: "active",
        expiryDate: "2025-12-31",
      },
    ],
    documents: [
      {
        type: "license",
        status: "verified",
        uploadedAt: "2024-01-10T00:00:00.000Z",
      },
      {
        type: "insurance",
        status: "pending",
        uploadedAt: "2024-01-12T00:00:00.000Z",
      },
    ],
  },
  {
    _id: "67890abcdef123456789013",
    firstName: "Maria",
    lastName: "Rodriguez",
    email: "maria.rodriguez@email.com",
    phone: "+1-555-0124",
    licenseNumber: "CDL-123457",
    licenseExpiry: "2025-11-30",
    status: "pending",
    createdAt: "2024-01-12T00:00:00.000Z",
    trucks: [
      {
        _id: "truck124",
        make: "Peterbilt",
        model: "579",
        plateNumber: "XYZ-789",
        year: 2021,
      },
    ],
    ecards: [
      {
        _id: "ecard124",
        cardNumber: "EC-2024-002",
        status: "pending",
        expiryDate: "2025-11-30",
      },
    ],
    documents: [
      {
        type: "license",
        status: "verified",
        uploadedAt: "2024-01-12T00:00:00.000Z",
      },
    ],
  },
  {
    _id: "67890abcdef123456789014",
    firstName: "Carlos",
    lastName: "Silva",
    email: "carlos.silva@email.com",
    phone: "+1-555-0125",
    licenseNumber: "CDL-123458",
    licenseExpiry: "2026-01-15",
    status: "active",
    createdAt: "2024-01-08T00:00:00.000Z",
    trucks: [
      {
        _id: "truck125",
        make: "Kenworth",
        model: "T680",
        plateNumber: "DEF-456",
        year: 2023,
      },
    ],
    ecards: [
      {
        _id: "ecard125",
        cardNumber: "EC-2024-003",
        status: "active",
        expiryDate: "2026-01-15",
      },
    ],
    documents: [
      {
        type: "license",
        status: "verified",
        uploadedAt: "2024-01-08T00:00:00.000Z",
      },
      {
        type: "insurance",
        status: "verified",
        uploadedAt: "2024-01-08T00:00:00.000Z",
      },
      {
        type: "registration",
        status: "verified",
        uploadedAt: "2024-01-08T00:00:00.000Z",
      },
    ],
  },
  {
    _id: "67890abcdef123456789015",
    firstName: "Ana",
    lastName: "Gutierrez",
    email: "ana.gutierrez@email.com",
    phone: "+1-555-0126",
    licenseNumber: "CDL-123459",
    licenseExpiry: "2025-10-20",
    status: "suspended",
    createdAt: "2024-01-05T00:00:00.000Z",
    trucks: [
      {
        _id: "truck126",
        make: "Volvo",
        model: "VNL",
        plateNumber: "GHI-789",
        year: 2020,
      },
    ],
    ecards: [
      {
        _id: "ecard126",
        cardNumber: "EC-2024-004",
        status: "suspended",
        expiryDate: "2025-10-20",
      },
    ],
    documents: [
      {
        type: "license",
        status: "expired",
        uploadedAt: "2024-01-05T00:00:00.000Z",
      },
    ],
  },
]

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "agent") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // In a real app, you would fetch from your database
    // const drivers = await db.collection('drivers').find({}).toArray()

    return NextResponse.json(mockDrivers)
  } catch (error) {
    console.error("Error fetching drivers:", error)
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

    // In a real app, you would create a new driver in your database
    // const newDriver = await db.collection('drivers').insertOne(body)

    const newDriver = {
      _id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString(),
      status: "pending",
    }

    return NextResponse.json(newDriver, { status: 201 })
  } catch (error) {
    console.error("Error creating driver:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
