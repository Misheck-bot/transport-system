import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// Mock route data - in production, this would come from a routing service
const routeData = {
  "Lusaka-Harare": {
    distance: "485 km",
    estimatedTime: "8-10 hours",
    borderCrossings: ["Chirundu Border"],
    totalFees: "K150",
    fuelCost: "K800",
    roadCondition: "Good",
    waypoints: [
      { name: "Lusaka", coordinates: [-15.3875, 28.3228] },
      { name: "Kafue", coordinates: [-15.7694, 28.1814] },
      { name: "Chirundu Border", coordinates: [-16.0333, 28.85] },
      { name: "Harare", coordinates: [-17.8292, 31.0522] },
    ],
  },
  "Lusaka-Dar es Salaam": {
    distance: "1,240 km",
    estimatedTime: "18-22 hours",
    borderCrossings: ["Nakonde Border"],
    totalFees: "K200",
    fuelCost: "K2,100",
    roadCondition: "Fair",
    waypoints: [
      { name: "Lusaka", coordinates: [-15.3875, 28.3228] },
      { name: "Kapiri Mposhi", coordinates: [-13.9667, 28.6667] },
      { name: "Nakonde Border", coordinates: [-9.3419, 32.7547] },
      { name: "Dar es Salaam", coordinates: [-6.7924, 39.2083] },
    ],
  },
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "driver") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { origin, destination, truckType, cargoType, departureDate } = body

    if (!origin || !destination) {
      return NextResponse.json({ error: "Origin and destination are required" }, { status: 400 })
    }

    // Simulate route calculation
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const routeKey = `${origin}-${destination}`
    const route = routeData[routeKey as keyof typeof routeData]

    if (!route) {
      return NextResponse.json({ error: "Route not found" }, { status: 404 })
    }

    // Adjust costs based on truck type
    let fuelMultiplier = 1
    let feeMultiplier = 1

    switch (truckType) {
      case "Light Truck":
        fuelMultiplier = 0.7
        feeMultiplier = 0.8
        break
      case "Medium Truck":
        fuelMultiplier = 1
        feeMultiplier = 1
        break
      case "Heavy Truck":
        fuelMultiplier = 1.5
        feeMultiplier = 1.3
        break
      case "Articulated":
        fuelMultiplier = 2
        feeMultiplier = 1.5
        break
    }

    const adjustedRoute = {
      ...route,
      fuelCost: `K${Math.round(Number.parseFloat(route.fuelCost.replace("K", "")) * fuelMultiplier)}`,
      totalFees: `K${Math.round(Number.parseFloat(route.totalFees.replace("K", "")) * feeMultiplier)}`,
      truckType,
      cargoType,
      departureDate,
    }

    return NextResponse.json({
      route: adjustedRoute,
      alternatives: [], // Could include alternative routes
    })
  } catch (error) {
    console.error("Error calculating route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
