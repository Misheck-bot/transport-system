"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Filter, Eye, User, Phone, Mail, Calendar, Truck, FileText } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const drivers = [
  {
    id: "DRV-001",
    name: "John Martinez",
    email: "john.martinez@email.com",
    phone: "+1-555-0123",
    licenseNumber: "CDL-123456",
    eCardId: "EC-2024-001",
    status: "active",
    joinDate: "2024-01-10",
    truckPlate: "ABC-123",
    lastCrossing: "2024-01-15 14:30",
    totalCrossings: 45
  },
  {
    id: "DRV-002",
    name: "Maria Rodriguez",
    email: "maria.rodriguez@email.com",
    phone: "+1-555-0124",
    licenseNumber: "CDL-123457",
    eCardId: "EC-2024-002",
    status: "pending",
    joinDate: "2024-01-12",
    truckPlate: "XYZ-789",
    lastCrossing: "2024-01-15 14:25",
    totalCrossings: 12
  },
  {
    id: "DRV-003",
    name: "Carlos Silva",
    email: "carlos.silva@email.com",
    phone: "+1-555-0125",
    licenseNumber: "CDL-123458",
    eCardId: "EC-2024-003",
    status: "active",
    joinDate: "2024-01-08",
    truckPlate: "DEF-456",
    lastCrossing: "2024-01-15 14:20",
    totalCrossings: 78
  },
  {
    id: "DRV-004",
    name: "Ana Gutierrez",
    email: "ana.gutierrez@email.com",
    phone: "+1-555-0126",
    licenseNumber: "CDL-123459",
    eCardId: "EC-2024-004",
    status: "suspended",
    joinDate: "2024-01-05",
    truckPlate: "GHI-789",
    lastCrossing: "2024-01-14 16:45",
    totalCrossings: 23
  },
  {
    id: "DRV-005",
    name: "Roberto Fernandez",
    email: "roberto.fernandez@email.com",
    phone: "+1-555-0127",
    licenseNumber: "CDL-123460",
    eCardId: "EC-2024-005",
    status: "pending",
    joinDate: "2024-01-14",
    truckPlate: "JKL-012",
    lastCrossing: "2024-01-15 14:10",
    totalCrossings: 3
  }
]

export default function DriversPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedDriver, setSelectedDriver] = useState<typeof drivers[0] | null>(null)

  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         driver.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         driver.eCardId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || driver.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
      case "pending":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Pending</Badge>
      case "suspended":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Suspended</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Driver Records</h1>
          <p className="text-gray-600">Manage and verify driver information and credentials</p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/agent">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <User className="mr-2 h-4 w-4" />
            Add Driver
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Drivers</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{drivers.length}</div>
            <p className="text-xs text-muted-foreground">Registered drivers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-xs">Active</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {drivers.filter(d => d.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground">Verified drivers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100 text-xs">Pending</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {drivers.filter(d => d.status === "pending").length}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting verification</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suspended</CardTitle>
            <Badge className="bg-red-100 text-red-800 hover:bg-red-100 text-xs">Suspended</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {drivers.filter(d => d.status === "suspended").length}
            </div>
            <p className="text-xs text-muted-foreground">Suspended accounts</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search Drivers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by name, email, license number, or E-Card ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Drivers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Driver Database</CardTitle>
          <CardDescription>
            {filteredDrivers.length} of {drivers.length} drivers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Driver</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>License</TableHead>
                <TableHead>E-Card ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Crossing</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDrivers.map((driver) => (
                <TableRow key={driver.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                        <AvatarFallback>{driver.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{driver.name}</p>
                        <p className="text-sm text-gray-500">{driver.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{driver.email}</p>
                      <p className="text-sm text-gray-500">{driver.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>{driver.licenseNumber}</TableCell>
                  <TableCell>{driver.eCardId}</TableCell>
                  <TableCell>{getStatusBadge(driver.status)}</TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{driver.lastCrossing}</p>
                      <p className="text-sm text-gray-500">{driver.totalCrossings} total crossings</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedDriver(driver)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Driver Profile - {driver.name}</DialogTitle>
                          <DialogDescription>
                            Complete driver information and verification status
                          </DialogDescription>
                        </DialogHeader>
                        {selectedDriver && (
                          <div className="space-y-6">
                            <div className="flex items-center gap-4">
                              <Avatar className="h-16 w-16">
                                <AvatarImage src={`/placeholder.svg?height=64&width=64`} />
                                <AvatarFallback className="text-lg">
                                  {selectedDriver.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="text-lg font-semibold">{selectedDriver.name}</h3>
                                <p className="text-gray-500">{selectedDriver.id}</p>
                                {getStatusBadge(selectedDriver.status)}
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium text-gray-500">Email</label>
                                <p className="text-sm">{selectedDriver.email}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-500">Phone</label>
                                <p className="text-sm">{selectedDriver.phone}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-500">License Number</label>
                                <p className="text-sm">{selectedDriver.licenseNumber}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-500">E-Card ID</label>
                                <p className="text-sm">{selectedDriver.eCardId}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-500">Join Date</label>
                                <p className="text-sm">{selectedDriver.joinDate}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-500">Truck Plate</label>
                                <p className="text-sm">{selectedDriver.truckPlate}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-500">Last Crossing</label>
                                <p className="text-sm">{selectedDriver.lastCrossing}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-500">Total Crossings</label>
                                <p className="text-sm">{selectedDriver.totalCrossings}</p>
                              </div>
                            </div>
                            
                            <div className="flex justify-end gap-2">
                              <Button variant="outline">Edit Profile</Button>
                              <Button variant="outline">View History</Button>
                              <Button className="bg-green-600 hover:bg-green-700">Verify Driver</Button>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}
