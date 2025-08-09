import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Mock dashboard statistics
    const stats = {
      totalUsers: 1247,
      totalDrivers: 892,
      totalAgents: 45,
      totalAdmins: 8,
      activeECards: 756,
      pendingPayments: 23,
      totalRevenue: 125000,
      monthlyGrowth: 12.5,
      recentActivity: [
        {
          id: "1",
          type: "registration",
          description: "New driver registered: John Mwanza",
          timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString()
        },
        {
          id: "2",
          type: "payment",
          description: "Payment processed: K500 E-Card fee",
          timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString()
        },
        {
          id: "3",
          type: "system",
          description: "Database backup completed successfully",
          timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString()
        },
        {
          id: "4",
          type: "alert",
          description: "Border agent Sarah Johnson logged in",
          timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString()
        }
      ],
      systemHealth: {
        status: "healthy",
        uptime: "99.9%",
        responseTime: "245ms",
        activeConnections: 156
      }
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
