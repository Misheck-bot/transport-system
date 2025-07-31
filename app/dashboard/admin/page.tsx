import { CreditCard, Users, Shield, TrendingUp, CheckCircle, DollarSign } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function AdminDashboard() {
  return (
    <>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">System Administration</h1>
        <p className="text-gray-600">Manage payments, issue E-Cards, and oversee system operations.</p>
      </div>

      {/* Stats Cards - Empty State */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending Payments</CardTitle>
            <CreditCard className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-400">0</div>
            <p className="text-xs text-gray-500">No pending payments</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">E-Cards to Issue</CardTitle>
            <Shield className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-400">0</div>
            <p className="text-xs text-gray-500">No applications</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Users</CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-400">0</div>
            <p className="text-xs text-gray-500">No users registered</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-400">K0</div>
            <p className="text-xs text-gray-500">No revenue yet</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {/* Pending Payment Approvals - Empty State */}
        <Card className="lg:col-span-2 bg-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-900">Pending Payment Approvals</CardTitle>
            <CardDescription>Driver payment requests will appear here for approval.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <CreditCard className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No pending payments</h3>
              <p className="text-gray-500">Payment requests from drivers will appear here for processing.</p>
            </div>
          </CardContent>
        </Card>

        {/* System Overview */}
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-900">System Overview</CardTitle>
            <CardDescription>Current system status and metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Server Uptime</span>
                <span className="text-green-600">99.9%</span>
              </div>
              <Progress value={99.9} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Database Health</span>
                <span className="text-green-600">Excellent</span>
              </div>
              <Progress value={95} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>API Response Time</span>
                <span className="text-blue-600">120ms</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            <div className="pt-4 border-t">
              <div className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircle className="h-4 w-4" />
                <span>All systems operational</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* E-Card Issuance Queue - Empty State */}
      <Card className="bg-white border-0 shadow-lg mb-8">
        <CardHeader>
          <CardTitle className="text-gray-900">E-Card Issuance Queue</CardTitle>
          <CardDescription>
            Drivers who have paid K500 and are awaiting E-Card issuance will appear here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Shield className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No E-Card applications</h3>
            <p className="text-gray-500">Paid E-Card applications will appear here for processing.</p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-lg">
                <CreditCard className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Process Payments</h3>
                <p className="text-sm text-blue-100">Review & approve</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-lg">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Issue E-Cards</h3>
                <p className="text-sm text-green-100">Digital credentials</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-lg">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">User Management</h3>
                <p className="text-sm text-purple-100">Manage accounts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Analytics</h3>
                <p className="text-sm text-orange-100">View reports</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
