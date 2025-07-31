import { Scan, Users, CheckCircle, AlertTriangle, Clock, Shield, FileCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AgentDashboard() {
  return (
    <>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Border Agent Dashboard</h1>
        <p className="text-gray-600">Scan E-Cards, verify drivers, and manage border crossings efficiently.</p>
      </div>

      {/* Stats Cards - Empty State */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Today's Scans</CardTitle>
            <Scan className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-400">0</div>
            <p className="text-xs text-gray-500">No scans today</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending Verifications</CardTitle>
            <Clock className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-400">0</div>
            <p className="text-xs text-gray-500">No pending items</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Approved Crossings</CardTitle>
            <CheckCircle className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-400">0</div>
            <p className="text-xs text-gray-500">No approvals today</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Flagged Cases</CardTitle>
            <AlertTriangle className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-400">0</div>
            <p className="text-xs text-gray-500">No flagged cases</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {/* E-Card Scanner */}
        <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Scan className="h-5 w-5" />
              E-Card Scanner
            </CardTitle>
            <CardDescription className="text-green-100">
              Scan driver E-Cards to verify credentials and truck information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-white/20 rounded-lg p-6 text-center mb-4">
              <Scan className="h-12 w-12 mx-auto mb-2" />
              <p className="text-sm">Ready to scan</p>
            </div>
            <Button className="w-full bg-white text-green-600 hover:bg-green-50">Start Scanning</Button>
          </CardContent>
        </Card>

        {/* Recent Scans - Empty State */}
        <Card className="lg:col-span-2 bg-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-900">Recent E-Card Scans</CardTitle>
            <CardDescription>Driver verifications and border crossings will appear here.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Scan className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No scans yet</h3>
              <p className="text-gray-500 mb-4">Start scanning E-Cards to see verification history here.</p>
              <Button className="bg-green-500 hover:bg-green-600">
                <Scan className="mr-2 h-4 w-4" />
                Start Scanning
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Verifications - Empty State */}
      <Card className="bg-white border-0 shadow-lg mb-8">
        <CardHeader>
          <CardTitle className="text-gray-900">Pending Driver Verifications</CardTitle>
          <CardDescription>Drivers awaiting document verification will appear here.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No pending verifications</h3>
            <p className="text-gray-500">Driver verification requests will appear here when submitted.</p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-lg">
                <Scan className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Scan E-Card</h3>
                <p className="text-sm text-blue-100">Verify driver</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-lg">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Driver Search</h3>
                <p className="text-sm text-green-100">Find records</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-lg">
                <FileCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Generate Report</h3>
                <p className="text-sm text-purple-100">Daily summary</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-lg">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Security Alert</h3>
                <p className="text-sm text-orange-100">Flag incident</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
