import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

const mockDrivers = [
  {
    id: "1",
    name: "John Smith",
    licenseNumber: "DL123456789",
    phone: "+1-555-0123",
    email: "john.smith@email.com",
    status: "active",
    lastCrossing: "2024-01-15T10:30:00Z",
    violations: 0,
    truckId: "TRK001",
    route: "US-Canada Border",
    experience: "5 years",
    rating: 4.8,
    totalTrips: 156,
    documents: {
      license: { status: "valid", expiry: "2025-12-31" },
      medical: { status: "valid", expiry: "2024-06-30" },
      insurance: { status: "valid", expiry: "2024-12-31" },
    },
  },
  {
    id: "2",
    name: "Maria Garcia",
    licenseNumber: "DL987654321",
    phone: "+1-555-0124",
    email: "maria.garcia@email.com",
    status: "active",
    lastCrossing: "2024-01-14T15:45:00Z",
    violations: 1,
    truckId: "TRK002",
    route: "US-Mexico Border",
    experience: "8 years",
    rating: 4.9,
    totalTrips: 203,
    documents: {
      license: { status: "valid", expiry: "2025-08-15" },
      medical: { status: "expiring", expiry: "2024-02-28" },
      insurance: { status: "valid", expiry: "2024-11-30" },
    },
  },
  {
    id: "3",
    name: "David Johnson",
    licenseNumber: "DL456789123",
    phone: "+1-555-0125",
    email: "david.johnson@email.com",
    status: "suspended",
    lastCrossing: "2024-01-10T08:20:00Z",
    violations: 3,
    truckId: "TRK003",
    route: "Interstate 95",
    experience: "3 years",
    rating: 3.2,
    totalTrips: 89,
    documents: {
      license: { status: "expired", expiry: "2023-12-31" },
      medical: { status: "valid", expiry: "2024-09-30" },
      insurance: { status: "valid", expiry: "2024-10-31" },
    },
  },
  {
    id: "4",
    name: "Sarah Wilson",
    licenseNumber: "DL789123456",
    phone: "+1-555-0126",
    email: "sarah.wilson@email.com",
    status: "active",
    lastCrossing: "2024-01-12T12:15:00Z",
    violations: 0,
    truckId: "TRK004",
    route: "US-Canada Border",
    experience: "7 years",
    rating: 4.7,
    totalTrips: 178,
    documents: {
      license: { status: "valid", expiry: "2025-03-20" },
      medical: { status: "valid", expiry: "2024-08-15" },
      insurance: { status: "valid", expiry: "2024-09-30" },
    },
  },
]

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "agent") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")
    const status = searchParams.get("status")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    let filteredDrivers = mockDrivers

    if (search) {
      const searchLower = search.toLowerCase()
      filteredDrivers = filteredDrivers.filter(
        (driver) =>
          driver.name.toLowerCase().includes(searchLower) ||
          driver.licenseNumber.toLowerCase().includes(searchLower) ||
          driver.email.toLowerCase().includes(searchLower) ||
          driver.phone.includes(search),
      )
    }

    if (status && status !== "all") {
      filteredDrivers = filteredDrivers.filter((driver) => driver.status === status)
    }

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedDrivers = filteredDrivers.slice(startIndex, endIndex)

    return NextResponse.json({
      drivers: paginatedDrivers,
      total: filteredDrivers.length,
      page,
      totalPages: Math.ceil(filteredDrivers.length / limit),
      hasMore: endIndex < filteredDrivers.length,
    })
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
    const { action, driverId, data } = body

    switch (action) {
      case "suspend":
        const suspendReason = data?.reason || "Violation of regulations"
        return NextResponse.json({
          success: true,
          message: `Driver ${driverId} has been suspended. Reason: ${suspendReason}`,
          driver: {
            id: driverId,
            status: "suspended",
            suspendedAt: new Date().toISOString(),
            suspendReason,
          },
        })

      case "activate":
        return NextResponse.json({
          success: true,
          message: `Driver ${driverId} has been activated`,
          driver: {
            id: driverId,
            status: "active",
            activatedAt: new Date().toISOString(),
          },
        })

      case "update":
        return NextResponse.json({
          success: true,
          message: `Driver ${driverId} information has been updated`,
          driver: {
            id: driverId,
            ...data,
            updatedAt: new Date().toISOString(),
          },
        })

      case "flag":
        const flagReason = data?.reason || "Requires manual review"
        return NextResponse.json({
          success: true,
          message: `Driver ${driverId} has been flagged for review`,
          driver: {
            id: driverId,
            flagged: true,
            flaggedAt: new Date().toISOString(),
            flagReason,
          },
        })

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }
  } catch (error) {
    console.error("Error processing driver action:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
