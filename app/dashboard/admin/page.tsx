"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Users, CreditCard, BarChart3, Database, Settings, TrendingUp, AlertTriangle, CheckCircle, Clock, DollarSign, Shield, Activity, FileText, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface DashboardStats {
  totalUsers: number
  totalRevenue: number
  activeDrivers: number
  pendingInspections: number
  systemHealth: string
  monthlyGrowth: number
  recentActivity: Array<{
    id: string
    type: string
    message: string
    timestamp: string
    user?: string
  }>
}

export default function AdminDashboard() {
  const { data: session } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalRevenue: 0,
    activeDrivers: 0,
    pendingInspections: 0,
    systemHealth: "good",
    monthlyGrowth: 0,
    recentActivity: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/admin/dashboard-stats")
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error("Error fetching dashboard stats:", error)
    } finally {
      setLoading(false)
    }
  }

  const adminCards = [
    {
      title: "User Management",
      description: "Manage system users, roles, and permissions",
      icon: Users,
      href: "/dashboard/admin/users",
      color: "bg-blue-500",
      stat: `${stats.totalUsers} users`,
    },
    {
      title: "Payment Management",
      description: "Monitor transactions and payment processing",
      icon: CreditCard,
      href: "/dashboard/admin/payments",
      color: "bg-green-500",
      stat: `$${stats.totalRevenue.toLocaleString()} revenue`,
    },
    {
      title: "Analytics & Reports",
      description: "View system analytics and performance metrics",
      icon: BarChart3,
      href: "/dashboard/admin/analytics",
      color: "bg-purple-500",
      stat: "Real-time insights",
    },
    {
      title: "Database Management",
      description: "Manage database operations and backups",
      icon: Database,
      href: "/dashboard/admin/database",
      color: "bg-orange-500",
      stat: "System healthy",
    },
    {
      title: "System Configuration",
      description: "Configure system settings and preferences",
      icon: Settings,
      href: "/dashboard/admin/system",
      color: "bg-gray-600",
      stat: "All operational",
    },
  ]

  const getHealthBadge = (health: string) => {
    switch (health) {
      case "excellent":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Excellent</Badge>
      case "good":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Good</Badge>
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Warning</Badge>
      case "critical":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Critical</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Unknown</Badge>
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "user":
        return <Users className="h-4 w-4 text-blue-500" />
      case "payment":
        return <CreditCard className="h-4 w-4 text-green-500" />
      case "system":
        return <Settings className="h-4 w-4 text-gray-500" />
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {session?.user?.name || 'Administrator'}!
            </h1>
            <p className="text-purple-100 text-lg">
              Here's what's happening with your E-Truck Transport System today.
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{new Date().toLocaleDateString()}</div>
            <div className="text-purple-200">{new Date().toLocaleDateString('en-US', { weekday: 'long' })}</div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Users</CardTitle>
            <Users className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{stats.totalUsers}</div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <p className="text-sm text-green-600 font-medium">
                +{stats.monthlyGrowth}% from last month
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
            <DollarSign className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              ${stats.totalRevenue.toLocaleString()}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Monthly recurring revenue
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Drivers</CardTitle>
            <Shield className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{stats.activeDrivers}</div>
            <p className="text-sm text-gray-600 mt-2">
              Currently online
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">System Health</CardTitle>
            <CheckCircle className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-2">
              {getHealthBadge(stats.systemHealth)}
            </div>
            <Progress value={stats.systemHealth === 'excellent' ? 100 : stats.systemHealth === 'good' ? 85 : 60} className="h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Admin Functions */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Administration Panel</h2>
          <Button variant="outline" className="gap-2">
            <FileText className="h-4 w-4" />
            Export Report
          </Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {adminCards.map((card) => {
            const Icon = card.icon
            return (
              <Card 
                key={card.href}
                className="cursor-pointer hover:shadow-xl transition-all duration-200 border-0 shadow-lg group"
                onClick={() => router.push(card.href)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl ${card.color} text-white group-hover:scale-110 transition-transform`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-semibold">{card.title}</CardTitle>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 mb-3">
                    {card.description}
                  </CardDescription>
                  <div className="text-sm font-medium text-gray-900">
                    {card.stat}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Clock className="h-5 w-5 text-gray-600" />
                Recent Activity
              </CardTitle>
              <CardDescription className="mt-1">
                Latest system events and user activities
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {stats.recentActivity.length === 0 ? (
            <div className="text-center py-8">
              <Activity className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No recent activity to display</p>
            </div>
          ) : (
            <div className="space-y-4">
              {stats.recentActivity.slice(0, 5).map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex-shrink-0 mt-1">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                    {activity.user && (
                      <p className="text-xs text-gray-600 mt-1">by {activity.user}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
