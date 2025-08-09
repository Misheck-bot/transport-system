"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Truck, FileText, Route, CreditCard, CheckCircle, DollarSign } from "lucide-react"
import { PaymentModal } from "@/components/payment-modal"

interface DashboardStats {
  totalTrucks: number
  activeRoutes: number
  completedTrips: number
  pendingPayments: number
  documentsUploaded: number
  eCardStatus: string
}

export default function DriverDashboard() {
  const { data: session } = useSession()
  const [stats, setStats] = useState<DashboardStats>({
    totalTrucks: 0,
    activeRoutes: 0,
    completedTrips: 0,
    pendingPayments: 0,
    documentsUploaded: 0,
    eCardStatus: "pending",
  })
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading dashboard data
    const loadDashboardData = async () => {
      try {
        // In a real app, this would be API calls
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setStats({
          totalTrucks: 2,
          activeRoutes: 1,
          completedTrips: 45,
          pendingPayments: 2,
          documentsUploaded: 8,
          eCardStatus: "approved",
        })
      } catch (error) {
        console.error("Error loading dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  const quickActions = [
    {
      title: "My Trucks",
      description: "View and manage your registered vehicles",
      icon: Truck,
      href: "/dashboard/driver/trucks",
      color: "bg-blue-500",
      count: stats.totalTrucks,
    },
    {
      title: "Upload Documents",
      description: "Upload required documents and licenses",
      icon: FileText,
      href: "/dashboard/driver/documents",
      color: "bg-green-500",
      count: stats.documentsUploaded,
    },
    {
      title: "Plan Route",
      description: "Plan your next cross-border journey",
      icon: Route,
      href: "/dashboard/driver/plan-route",
      color: "bg-purple-500",
      count: stats.activeRoutes,
    },
    {
      title: "Make Payment",
      description: "Pay fees and manage billing",
      icon: CreditCard,
      href: "#",
      color: "bg-orange-500",
      count: stats.pendingPayments,
      onClick: () => setIsPaymentModalOpen(true),
    },
  ]

  const recentActivities = [
    {
      id: 1,
      type: "route",
      title: "Route to Toronto completed",
      description: "Successfully delivered cargo to Toronto, ON",
      time: "2 hours ago",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      id: 2,
      type: "payment",
      title: "Border crossing fee paid",
      description: "$45.00 payment processed",
      time: "1 day ago",
      icon: DollarSign,
      color: "text-blue-600",
    },
    {
      id: 3,
      type: "document",
      title: "License renewed",
      description: "Commercial driver's license updated",
      time: "3 days ago",
      icon: FileText,
      color: "text-purple-600",
    },
    {
      id: 4,
      type: "truck",
      title: "Vehicle inspection passed",
      description: "Truck TRK001 passed safety inspection",
      time: "1 week ago",
      icon: Truck,
      color: "text-green-600",
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {session?.user?.name || "Driver"}! 👋</h1>
        <p className="text-blue-100">Here's what's happening with your trucking operations today.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Trucks</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTrucks}</div>
            <p className="text-xs text-muted-foreground">+1 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Routes</CardTitle>
            <Route className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeRoutes}</div>
            <p className="text-xs text-muted-foreground">Currently in progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Trips</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedTrips}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingPayments}</div>
            <p className="text-xs text-muted-foreground">$125.00 total</p>
          </CardContent>
        </Card>
      </div>

      {/* E-Card Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            E-Card Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Your E-Card application status</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={stats.eCardStatus === "approved" ? "default" : "secondary"}>
                  {stats.eCardStatus === "approved" ? "Approved" : "Pending"}
                </Badge>
                {stats.eCardStatus === "approved" && <CheckCircle className="h-4 w-4 text-green-600" />}
              </div>
            </div>
            {stats.eCardStatus !== "approved" && (
              <Button onClick={() => setIsPaymentModalOpen(true)}>Apply for E-Card</Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              {action.onClick ? (
                <div onClick={action.onClick}>
                  <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">{action.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{action.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{action.count}</Badge>
                    <Button size="sm">Open</Button>
                  </div>
                </div>
              ) : (
                <Link href={action.href}>
                  <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">{action.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{action.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{action.count}</Badge>
                    <Button size="sm">View</Button>
                  </div>
                </Link>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Getting Started Section */}
      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>Complete these steps to get the most out of your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Truck className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Register Your First Truck</p>
                <p className="text-sm text-muted-foreground">Add your vehicle information to start hauling</p>
              </div>
            </div>
            <Link href="/dashboard/driver/register-truck">
              <Button size="sm">Register Truck</Button>
            </Link>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-full">
                <FileText className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium">Upload Required Documents</p>
                <p className="text-sm text-muted-foreground">Upload your license and insurance documents</p>
              </div>
            </div>
            <Link href="/dashboard/driver/documents">
              <Button size="sm" variant="outline">
                Upload Documents
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-full">
                <CreditCard className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="font-medium">Apply for E-Card</p>
                <p className="text-sm text-muted-foreground">Get your electronic border crossing card</p>
              </div>
            </div>
            <Button size="sm" variant="outline" onClick={() => setIsPaymentModalOpen(true)}>
              Apply Now
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest actions and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50">
                <div className={`p-2 rounded-full bg-muted ${activity.color}`}>
                  <activity.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Modal */}
      {isPaymentModalOpen && (
        <PaymentModal
          amount="75"
          description="E-Card Application Fee"
          onSuccess={() => {
            setIsPaymentModalOpen(false)
            // Handle successful payment
          }}
        />
      )}
    </div>
  )
}
