"use client"

import { useState } from "react"
import Link from "next/link"
import { AlertTriangle, Shield, Eye, Clock, CheckCircle, XCircle, Flag, Bell } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const alerts = [
  {
    id: "ALT-001",
    type: "security",
    priority: "high",
    title: "Suspicious Vehicle Activity",
    description: "Vehicle ABC-123 flagged for unusual crossing patterns",
    driverName: "John Martinez",
    eCardId: "EC-2024-001",
    truckPlate: "ABC-123",
    timestamp: "2024-01-15 14:45",
    status: "active",
    assignedTo: "Agent Sarah Johnson",
    notes: "Driver has crossed border 5 times in the last 2 hours. Requires investigation."
  },
  {
    id: "ALT-002",
    type: "document",
    priority: "medium",
    title: "Expired License Detected",
    description: "Driver license expired 3 days ago",
    driverName: "Maria Rodriguez",
    eCardId: "EC-2024-002",
    truckPlate: "XYZ-789",
    timestamp: "2024-01-15 13:20",
    status: "resolved",
    assignedTo: "Agent Sarah Johnson",
    notes: "Driver provided updated license. Issue resolved."
  },
  {
    id: "ALT-003",
    type: "cargo",
    priority: "high",
    title: "Cargo Weight Discrepancy",
    description: "Declared weight differs significantly from actual weight",
    driverName: "Carlos Silva",
    eCardId: "EC-2024-003",
    truckPlate: "DEF-456",
    timestamp: "2024-01-15 12:15",
    status: "investigating",
    assignedTo: "Agent Sarah Johnson",
    notes: "Secondary inspection ordered. Awaiting cargo manifest verification."
  },
  {
    id: "ALT-004",
    type: "system",
    priority: "low",
    title: "E-Card Scanner Malfunction",
    description: "Scanner #3 experiencing intermittent connectivity issues",
    driverName: "N/A",
    eCardId: "N/A",
    truckPlate: "N/A",
    timestamp: "2024-01-15 11:30",
    status: "active",
    assignedTo: "IT Support",
    notes: "Technical team notified. Using backup scanner."
  }
]

export default function AlertsPage() {
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedAlert, setSelectedAlert] = useState<typeof alerts[0] | null>(null)
  const [newAlertOpen, setNewAlertOpen] = useState(false)

  const filteredAlerts = alerts.filter(alert => {
    const matchesPriority = priorityFilter === "all" || alert.priority === priorityFilter
    const matchesStatus = statusFilter === "all" || alert.status === statusFilter
    return matchesPriority && matchesStatus
  })

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">High</Badge>
      case "medium":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Medium</Badge>
      case "low":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Low</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Active</Badge>
      case "investigating":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Investigating</Badge>
      case "resolved":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Resolved</Badge>
      case "dismissed":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Dismissed</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "security":
        return <Shield className="h-4 w-4 text-red-500" />
      case "document":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />
      case "cargo":
        return <Flag className="h-4 w-4 text-purple-500" />
      case "system":
        return <Bell className="h-4 w-4 text-blue-500" />
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Security Alerts</h1>
          <p className="text-gray-600">Monitor and manage security incidents and system alerts</p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/agent">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
          <Dialog open={newAlertOpen} onOpenChange={setNewAlertOpen}>
            <DialogTrigger asChild>
              <Button className="bg-red-600 hover:bg-red-700">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Create Alert
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Security Alert</DialogTitle>
                <DialogDescription>
                  Report a new security incident or system issue
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="alertType">Alert Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select alert type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="security">Security Incident</SelectItem>
                      <SelectItem value="document">Document Issue</SelectItem>
                      <SelectItem value="cargo">Cargo Discrepancy</SelectItem>
                      <SelectItem value="system">System Issue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="priority">Priority Level</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="title">Alert Title</Label>
                  <Input id="title" placeholder="Brief description of the alert" />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Detailed description of the incident or issue" />
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setNewAlertOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-red-600 hover:bg-red-700">
                    Create Alert
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{alerts.length}</div>
            <p className="text-xs text-muted-foreground">Active monitoring</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <Badge className="bg-red-100 text-red-800 hover:bg-red-100 text-xs">High</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {alerts.filter(a => a.priority === "high").length}
            </div>
            <p className="text-xs text-muted-foreground">Require immediate attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <Badge className="bg-red-100 text-red-800 hover:bg-red-100 text-xs">Active</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {alerts.filter(a => a.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground">Unresolved alerts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {alerts.filter(a => a.status === "resolved").length}
            </div>
            <p className="text-xs text-muted-foreground">Successfully handled</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filter Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="low">Low Priority</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="investigating">Investigating</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="dismissed">Dismissed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Alerts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Security Alerts</CardTitle>
          <CardDescription>
            {filteredAlerts.length} of {alerts.length} alerts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Alert</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Driver/Vehicle</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAlerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{alert.title}</p>
                      <p className="text-sm text-gray-500">{alert.id}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(alert.type)}
                      <span className="capitalize">{alert.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getPriorityBadge(alert.priority)}</TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{alert.driverName}</p>
                      <p className="text-sm text-gray-500">{alert.truckPlate}</p>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(alert.status)}</TableCell>
                  <TableCell>{alert.timestamp}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedAlert(alert)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Alert Details - {alert.id}</DialogTitle>
                          <DialogDescription>
                            Complete alert information and investigation notes
                          </DialogDescription>
                        </DialogHeader>
                        {selectedAlert && (
                          <div className="space-y-4">
                            <div className="flex items-center gap-4">
                              {getTypeIcon(selectedAlert.type)}
                              <div>
                                <h3 className="text-lg font-semibold">{selectedAlert.title}</h3>
                                <p className="text-gray-500">{selectedAlert.description}</p>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium text-gray-500">Priority</label>
                                <div className="mt-1">{getPriorityBadge(selectedAlert.priority)}</div>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-500">Status</label>
                                <div className="mt-1">{getStatusBadge(selectedAlert.status)}</div>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-500">Driver Name</label>
                                <p className="text-sm">{selectedAlert.driverName}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-500">E-Card ID</label>
                                <p className="text-sm">{selectedAlert.eCardId}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-500">Truck Plate</label>
                                <p className="text-sm">{selectedAlert.truckPlate}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-500">Assigned To</label>
                                <p className="text-sm">{selectedAlert.assignedTo}</p>
                              </div>
                            </div>
                            
                            <div>
                              <label className="text-sm font-medium text-gray-500">Investigation Notes</label>
                              <p className="text-sm mt-1 p-3 bg-gray-50 rounded-lg">{selectedAlert.notes}</p>
                            </div>
                            
                            <div className="flex justify-end gap-2">
                              <Button variant="outline">Add Note</Button>
                              <Button variant="outline">Assign</Button>
                              <Button className="bg-green-600 hover:bg-green-700">Resolve</Button>
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
