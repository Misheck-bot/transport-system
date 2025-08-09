"use client"

import { useState, useEffect } from "react"
import { BarChart3, TrendingUp, Users, CreditCard, Truck, Shield, DollarSign, Activity } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface AnalyticsData {
  totalUsers: number
  totalPayments: number
  totalRevenue: number
  activeDrivers: number
  borderAgents: number
  admins: number
  recentActivity: Array<{
    id: string
    type: string
    description: string
    timestamp: string
    user: string
  }>
  paymentStats: {
    pending: number
    approved: number
    rejected: number
  }
  userGrowth: Array<{
    month: string
    users: number
  }>
}

export default function Analytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("30d")

  useEffect(() => {
    fetchAnalytics()
  }, [timeRange])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      // Simulate API call - replace with real endpoint
      const response = await fetch(`/api/admin/analytics?range=${timeRange}`)
      if (response.ok) {
        const data = await response.json()
        setAnalytics(data)
      } else {
        // Mock data for now
        setAnalytics({
          totalUsers: 156,
          totalPayments: 89,
          totalRevenue: 44500,
          activeDrivers: 124,
          borderAgents: 8,
          admins: 3,
          recentActivity: [
            {
              id: "1",
              type: "payment",
              description: "Payment approved for John Banda",
              timestamp: new Date().toISOString(),
              user: "Admin"
            },
            {
              id: "2", 
              type: "registration",
              description: "New driver registered: Mary Phiri",
              timestamp: new Date(Date.now() - 3600000).toISOString(),
              user: "System"
            },
            {
              id: "3",
              type: "ecard",
              description: "E-Card issued to Peter Mwanza",
              timestamp: new Date(Date.now() - 7200000).toISOString(),
              user: "Admin"
            }
          ],
          paymentStats: {
            pending: 12,
            approved: 67,
            rejected: 10
          },
          userGrowth: [
            { month: "Jan", users: 45 },
            { month: "Feb", users: 67 },
            { month: "Mar", users: 89 },
            { month: "Apr", users: 124 },
            { month: "May", users: 156 }
          ]
        })
      }
    } catch (error) {
      console.error("Error fetching analytics:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading analytics...</div>
  }

  if (!analytics) {
    return <div className="text-center py-8">Failed to load analytics</div>
  }

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">System performance and usage statistics</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="1y">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Payments</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalPayments}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">K{analytics.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+15%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Drivers</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.activeDrivers}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Details */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {/* User Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>User Distribution</CardTitle>
            <CardDescription>Breakdown by user roles</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Truck className="h-4 w-4" />
                  Drivers
                </span>
                <span>{analytics.activeDrivers}</span>
              </div>
              <Progress value={(analytics.activeDrivers / analytics.totalUsers) * 100} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Border Agents
                </span>
                <span>{analytics.borderAgents}</span>
              </div>
              <Progress value={(analytics.borderAgents / analytics.totalUsers) * 100} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Admins
                </span>
                <span>{analytics.admins}</span>
              </div>
              <Progress value={(analytics.admins / analytics.totalUsers) * 100} />
            </div>
          </CardContent>
        </Card>

        {/* Payment Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Status</CardTitle>
            <CardDescription>Payment processing overview</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Approved</span>
                <Badge className="bg-green-100 text-green-800">
                  {analytics.paymentStats.approved}
                </Badge>
              </div>
              <Progress value={(analytics.paymentStats.approved / analytics.totalPayments) * 100} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Pending</span>
                <Badge className="bg-yellow-100 text-yellow-800">
                  {analytics.paymentStats.pending}
                </Badge>
              </div>
              <Progress value={(analytics.paymentStats.pending / analytics.totalPayments) * 100} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Rejected</span>
                <Badge className="bg-red-100 text-red-800">
                  {analytics.paymentStats.rejected}
                </Badge>
              </div>
              <Progress value={(analytics.paymentStats.rejected / analytics.totalPayments) * 100} />
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Activity className="h-3 w-3 text-blue-600" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(activity.timestamp).toLocaleString()} • {activity.user}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Growth Chart */}
      <Card>
        <CardHeader>
          <CardTitle>User Growth Trend</CardTitle>
          <CardDescription>Monthly user registration growth</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.userGrowth.map((month) => (
              <div key={month.month} className="flex items-center gap-4">
                <div className="w-12 text-sm font-medium">{month.month}</div>
                <div className="flex-1">
                  <Progress value={(month.users / analytics.totalUsers) * 100} />
                </div>
                <div className="w-12 text-sm text-right">{month.users}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
