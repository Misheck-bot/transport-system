"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Filter, Eye, CheckCircle, Clock, AlertTriangle, FileText, Calendar } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const inspections = [
  {
    id: "INS-001",
    driverName: "John Martinez",
    eCardId: "EC-2024-001",
    truckPlate: "ABC-123",
    status: "completed",
    timestamp: "2024-01-15 14:30",
    borderPost: "Tijuana-San Diego",
    notes: "All documents verified, cargo inspected"
  },
  {
    id: "INS-002",
    driverName: "Maria Rodriguez",
    eCardId: "EC-2024-002",
    truckPlate: "XYZ-789",
    status: "pending",
    timestamp: "2024-01-15 14:25",
    borderPost: "Tijuana-San Diego",
    notes: "Awaiting cargo manifest verification"
  },
  {
    id: "INS-003",
    driverName: "Carlos Silva",
    eCardId: "EC-2024-003",
    truckPlate: "DEF-456",
    status: "flagged",
    timestamp: "2024-01-15 14:20",
    borderPost: "Tijuana-San Diego",
    notes: "Discrepancy in cargo weight, requires secondary inspection"
  },
  {
    id: "INS-004",
    driverName: "Ana Gutierrez",
    eCardId: "EC-2024-004",
    truckPlate: "GHI-789",
    status: "completed",
    timestamp: "2024-01-15 14:15",
    borderPost: "Tijuana-San Diego",
    notes: "Standard inspection completed successfully"
  },
  {
    id: "INS-005",
    driverName: "Roberto Fernandez",
    eCardId: "EC-2024-005",
    truckPlate: "JKL-012",
    status: "pending",
    timestamp: "2024-01-15 14:10",
    borderPost: "Tijuana-San Diego",
    notes: "Driver license verification in progress"
  }
]

export default function InspectionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedInspection, setSelectedInspection] = useState<typeof inspections[0] | null>(null)

  const filteredInspections = inspections.filter(inspection => {
    const matchesSearch = inspection.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inspection.eCardId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inspection.truckPlate.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || inspection.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-orange-500" />
      case "flagged":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
      case "pending":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Pending</Badge>
      case "flagged":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Flagged</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inspections</h1>
          <p className="text-gray-600">Manage and review border crossing inspections</p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/agent">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
          <Button className="bg-green-600 hover:bg-green-700">
            <FileText className="mr-2 h-4 w-4" />
            New Inspection
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inspections</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inspections.length}</div>
            <p className="text-xs text-muted-foreground">Today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {inspections.filter(i => i.status === "completed").length}
            </div>
            <p className="text-xs text-muted-foreground">Approved crossings</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {inspections.filter(i => i.status === "pending").length}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Flagged</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {inspections.filter(i => i.status === "flagged").length}
            </div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filter Inspections</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by driver name, E-Card ID, or truck plate..."
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
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="flagged">Flagged</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Inspections Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Inspections</CardTitle>
          <CardDescription>
            {filteredInspections.length} of {inspections.length} inspections
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Inspection ID</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>E-Card ID</TableHead>
                <TableHead>Truck Plate</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInspections.map((inspection) => (
                <TableRow key={inspection.id}>
                  <TableCell className="font-medium">{inspection.id}</TableCell>
                  <TableCell>{inspection.driverName}</TableCell>
                  <TableCell>{inspection.eCardId}</TableCell>
                  <TableCell>{inspection.truckPlate}</TableCell>
                  <TableCell>{getStatusBadge(inspection.status)}</TableCell>
                  <TableCell>{inspection.timestamp}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedInspection(inspection)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Inspection Details - {inspection.id}</DialogTitle>
                          <DialogDescription>
                            Complete inspection information and notes
                          </DialogDescription>
                        </DialogHeader>
                        {selectedInspection && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium text-gray-500">Driver Name</label>
                                <p className="text-sm">{selectedInspection.driverName}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-500">E-Card ID</label>
                                <p className="text-sm">{selectedInspection.eCardId}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-500">Truck Plate</label>
                                <p className="text-sm">{selectedInspection.truckPlate}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-500">Border Post</label>
                                <p className="text-sm">{selectedInspection.borderPost}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-500">Status</label>
                                <div className="mt-1">{getStatusBadge(selectedInspection.status)}</div>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-500">Timestamp</label>
                                <p className="text-sm">{selectedInspection.timestamp}</p>
                              </div>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-500">Inspection Notes</label>
                              <p className="text-sm mt-1 p-3 bg-gray-50 rounded-lg">{selectedInspection.notes}</p>
                            </div>
                            <div className="flex justify-end gap-2">
                              <Button variant="outline">Edit</Button>
                              <Button className="bg-green-600 hover:bg-green-700">Update Status</Button>
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
