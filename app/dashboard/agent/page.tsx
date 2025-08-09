"use client"

import { useState } from "react"
import Link from "next/link"
import { Scan, Users, CheckCircle, AlertTriangle, Clock, Shield, FileCheck } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AgentDashboard() {
  const [isECardScannerOpen, setIsECardScannerOpen] = useState(false)
  const [isDriverSearchOpen, setIsDriverSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleECardScan = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle E-Card scanning logic here
    setIsECardScannerOpen(false)
  }

  const handleDriverSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle driver search logic here
    setIsDriverSearchOpen(false)
  }

  return (
    <>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back, Agent Johnson</h1>
        <p className="text-gray-600">Scan E-Cards, verify drivers, and manage border crossings efficiently.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Today's Scans</CardTitle>
            <Scan className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">24</div>
            <p className="text-xs text-gray-500">+12% from yesterday</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending Verifications</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">3</div>
            <p className="text-xs text-gray-500">Awaiting review</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Approved Crossings</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">18</div>
            <p className="text-xs text-gray-500">+5% from yesterday</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Security Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">1</div>
            <p className="text-xs text-gray-500">Requires attention</p>
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
            <Dialog open={isECardScannerOpen} onOpenChange={setIsECardScannerOpen}>
              <DialogTrigger asChild>
                <Button className="w-full bg-white text-green-600 hover:bg-green-50">Start Scanning</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>E-Card Scanner</DialogTitle>
                  <DialogDescription>
                    Enter the E-Card ID to verify driver credentials and vehicle information.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleECardScan} className="space-y-4">
                  <div>
                    <Label htmlFor="ecardId">E-Card ID</Label>
                    <Input 
                      id="ecardId" 
                      placeholder="Enter E-Card ID or scan QR code"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="borderPost">Border Post</Label>
                    <Input 
                      id="borderPost" 
                      placeholder="Current border post location"
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setIsECardScannerOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-green-600 hover:bg-green-700">
                      Verify E-Card
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Recent Scans */}
        <Card className="lg:col-span-2 bg-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center justify-between">
              Recent E-Card Scans
              <Link href="/dashboard/agent/inspections">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </CardTitle>
            <CardDescription>Latest driver verifications and border crossings.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Sample recent scans */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">John Martinez</p>
                    <p className="text-sm text-gray-500">E-Card: EC-2024-001</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">Approved</p>
                  <p className="text-xs text-gray-500">2 min ago</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-100 p-2 rounded-full">
                    <Clock className="h-4 w-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-medium">Maria Rodriguez</p>
                    <p className="text-sm text-gray-500">E-Card: EC-2024-002</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-orange-600">Pending</p>
                  <p className="text-xs text-gray-500">5 min ago</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Carlos Silva</p>
                    <p className="text-sm text-gray-500">E-Card: EC-2024-003</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">Approved</p>
                  <p className="text-xs text-gray-500">8 min ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Verifications */}
      <Card className="bg-white border-0 shadow-lg mb-8">
        <CardHeader>
          <CardTitle className="text-gray-900 flex items-center justify-between">
            Pending Driver Verifications
            <Link href="/dashboard/agent/drivers">
              <Button variant="outline" size="sm">View All Drivers</Button>
            </Link>
          </CardTitle>
          <CardDescription>Drivers awaiting document verification.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-2 rounded-full">
                  <Users className="h-4 w-4 text-orange-600" />
                </div>
                <div>
                  <p className="font-medium">Ana Gutierrez</p>
                  <p className="text-sm text-gray-500">License verification required</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">Review</Button>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">Approve</Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-2 rounded-full">
                  <Users className="h-4 w-4 text-orange-600" />
                </div>
                <div>
                  <p className="font-medium">Roberto Fernandez</p>
                  <p className="text-sm text-gray-500">Insurance documents pending</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">Review</Button>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">Approve</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Dialog open={isECardScannerOpen} onOpenChange={setIsECardScannerOpen}>
          <DialogTrigger asChild>
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
          </DialogTrigger>
        </Dialog>

        <Dialog open={isDriverSearchOpen} onOpenChange={setIsDriverSearchOpen}>
          <DialogTrigger asChild>
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
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Driver Search</DialogTitle>
              <DialogDescription>
                Search for driver records by name, license number, or email.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleDriverSearch} className="space-y-4">
              <div>
                <Label htmlFor="searchQuery">Search Query</Label>
                <Input 
                  id="searchQuery" 
                  placeholder="Enter driver name, license number, or email"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDriverSearchOpen(false)}>
                  Cancel
                </Button>
                <Link href={`/dashboard/agent/drivers?search=${encodeURIComponent(searchQuery)}`}>
                  <Button type="button" className="bg-green-600 hover:bg-green-700" onClick={() => setIsDriverSearchOpen(false)}>
                    Search Drivers
                  </Button>
                </Link>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        <Link href="/dashboard/agent/reports">
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
        </Link>

        <Link href="/dashboard/agent/alerts">
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
        </Link>
      </div>
    </>
  )
}
