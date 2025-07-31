"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Truck, Plus, Eye, Edit, Trash2, Calendar, Shield, FileText } from "lucide-react"
import Link from "next/link"

// Mock data - replace with real data from your backend
const mockTrucks = [
  {
    id: 1,
    make: "Volvo",
    model: "FH16",
    year: 2020,
    plateNumber: "ABC 123Z",
    status: "Active",
    registrationExpiry: "2024-12-15",
    insuranceExpiry: "2024-10-30",
    lastInspection: "2024-01-15",
    color: "White",
    cargoType: "General Cargo",
  },
  {
    id: 2,
    make: "Scania",
    model: "R450",
    year: 2019,
    plateNumber: "XYZ 789A",
    status: "Maintenance",
    registrationExpiry: "2024-08-20",
    insuranceExpiry: "2024-11-15",
    lastInspection: "2023-12-10",
    color: "Blue",
    cargoType: "Refrigerated Goods",
  },
]

export default function MyTrucks() {
  const [trucks] = useState(mockTrucks)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Maintenance":
        return "bg-yellow-100 text-yellow-800"
      case "Inactive":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const isExpiringSoon = (date: string) => {
    const expiryDate = new Date(date)
    const today = new Date()
    const diffTime = expiryDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 30 && diffDays > 0
  }

  const isExpired = (date: string) => {
    const expiryDate = new Date(date)
    const today = new Date()
    return expiryDate < today
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Trucks</h1>
          <p className="text-gray-600">Manage your registered vehicles</p>
        </div>
        <Link href="/dashboard/driver/register-truck">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Register New Truck
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Trucks</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trucks.length}</div>
            <p className="text-xs text-muted-foreground">Registered vehicles</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <Shield className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {trucks.filter((t) => t.status === "Active").length}
            </div>
            <p className="text-xs text-muted-foreground">Ready for operation</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
            <Calendar className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {trucks.filter((t) => isExpiringSoon(t.registrationExpiry) || isExpiringSoon(t.insuranceExpiry)).length}
            </div>
            <p className="text-xs text-muted-foreground">Documents expiring</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
            <FileText className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {trucks.filter((t) => t.status === "Maintenance").length}
            </div>
            <p className="text-xs text-muted-foreground">Under maintenance</p>
          </CardContent>
        </Card>
      </div>

      {/* Trucks List */}
      {trucks.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Truck className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No trucks registered</h3>
            <p className="text-gray-500 mb-4">Get started by registering your first truck</p>
            <Link href="/dashboard/driver/register-truck">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Register Your First Truck
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {trucks.map((truck) => (
            <Card key={truck.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="h-5 w-5 text-blue-600" />
                      {truck.make} {truck.model} ({truck.year})
                    </CardTitle>
                    <CardDescription>
                      Plate: {truck.plateNumber} • {truck.color} • {truck.cargoType}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(truck.status)}>{truck.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <h4 className="font-medium text-sm text-gray-700 mb-1">Registration</h4>
                    <p className="text-sm text-gray-600">
                      Expires: {new Date(truck.registrationExpiry).toLocaleDateString()}
                    </p>
                    {isExpired(truck.registrationExpiry) && (
                      <Badge className="bg-red-100 text-red-800 text-xs mt-1">Expired</Badge>
                    )}
                    {isExpiringSoon(truck.registrationExpiry) && !isExpired(truck.registrationExpiry) && (
                      <Badge className="bg-yellow-100 text-yellow-800 text-xs mt-1">Expiring Soon</Badge>
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-gray-700 mb-1">Insurance</h4>
                    <p className="text-sm text-gray-600">
                      Expires: {new Date(truck.insuranceExpiry).toLocaleDateString()}
                    </p>
                    {isExpired(truck.insuranceExpiry) && (
                      <Badge className="bg-red-100 text-red-800 text-xs mt-1">Expired</Badge>
                    )}
                    {isExpiringSoon(truck.insuranceExpiry) && !isExpired(truck.insuranceExpiry) && (
                      <Badge className="bg-yellow-100 text-yellow-800 text-xs mt-1">Expiring Soon</Badge>
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-gray-700 mb-1">Last Inspection</h4>
                    <p className="text-sm text-gray-600">{new Date(truck.lastInspection).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
