import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Mock notifications data
    const notifications = [
      {
        id: "1",
        type: "payment",
        title: "New Payment Request",
        message: "Driver John Doe has submitted a payment request for E-Card renewal",
        timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        read: false,
        priority: "high"
      },
      {
        id: "2",
        type: "system",
        title: "System Maintenance",
        message: "Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM",
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        read: false,
        priority: "medium"
      },
      {
        id: "3",
        type: "user",
        title: "New User Registration",
        message: "5 new drivers have registered in the last hour",
        timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
        read: true,
        priority: "low"
      },
      {
        id: "4",
        type: "alert",
        title: "Security Alert",
        message: "Multiple failed login attempts detected from IP 192.168.1.100",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        read: false,
        priority: "high"
      }
    ]

    return NextResponse.json({ notifications })
  } catch (error) {
    console.error("Error fetching notifications:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { notificationId, read } = await request.json()

    // In a real app, you would update the notification in the database
    console.log(`Marking notification ${notificationId} as ${read ? 'read' : 'unread'}`)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating notification:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
