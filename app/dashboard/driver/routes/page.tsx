"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Route, Truck, Calendar, Eye } from "lucide-react"

// Mock active routes data
const mockActiveRoutes = [
  {
    id: 1,
    name: "Lusaka to Harare",
    status: "In Progress",
    startDate: "2024-01-25",
    estimatedArrival: "2024-01-26",
    distance: "485 km",
    borderCrossings: ["Chirundu Border"],
    currentLocation: "En route to Chirundu",
    progress: 65,
  },
  {
    id: 2,
    name: "Ndola to Lubumbashi",
    status: "Planned",
    startDate: "2024-01-28",
    estimatedArrival: "2024-01-29",
    distance: "320 km",
    borderCrossings: ["Kasumbalesa Border"],
    currentLocation: "Not started",
    progress: 0,
  },
]

// Mock route history
const routeHistory = [
  {
    id: 1,
    name: "Lusaka to Dar es Salaam",
    completedDate: "2024-01-20",
    distance: "1,240 km",
    duration: "20 hours",
    borderCrossings: ["Nakonde Border"],
    status: "Completed",
  },
  {
    id: 2,
    name: "Kitwe to Johannesburg",
    completedDate: "2024-01-15",
    distance: "1,850 km",
    duration: "28 hours",
    borderCrossings: ["Chirundu Border", "Beitbridge Border"],
    status: "Completed",
  },
]

export default function Routes() {
  const [activeTab, setActiveTab] = useState("active")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Planned":
        return "bg-yellow-100 text-yellow-800"
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Routes</h1>
          <p className="text-gray-600">Track your current and past border crossing routes</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700" asChild>
          <a href="/dashboard/driver/plan-route">
            <Route className="h-4 w-4 mr-2" />
            Plan New Route
          </a>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Routes</CardTitle>
            <Navigation className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {mockActiveRoutes.filter((r) => r.status === "In Progress").length}
            </div>
            <p className="text-xs text-muted-foreground">Currently traveling</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Planned Routes</CardTitle>
            <Calendar className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {mockActiveRoutes.filter((r) => r.status === "Planned").length}
            </div>
            <p className="text-xs text-muted-foreground">Upcoming trips</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Routes</CardTitle>
            <MapPin className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{routeHistory.length}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Distance</CardTitle>
            <Truck className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">3,575 km</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        <Button
          variant={activeTab === "active" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("active")}
          className={activeTab === "active" ? "bg-white shadow-sm" : ""}
        >
          Active Routes
        </Button>
        <Button
          variant={activeTab === "history" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("history")}
          className={activeTab === "history" ? "bg-white shadow-sm" : ""}
        >
          Route History
        </Button>
      </div>

      {/* Active Routes */}
      {activeTab === "active" && (
        <div className="space-y-4">
          {mockActiveRoutes.map((route) => (
            <Card key={route.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Navigation className="h-5 w-5 text-blue-600" />
                      {route.name}
                    </CardTitle>
                    <CardDescription>
                      {route.distance} • {route.borderCrossings.join(", ")}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(route.status)}>{route.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <h4 className="font-medium text-sm text-gray-700 mb-1">Start Date</h4>
                    <p className="text-sm text-gray-600">{new Date(route.startDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-gray-700 mb-1">Estimated Arrival</h4>
                    <p className="text-sm text-gray-600">{new Date(route.estimatedArrival).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-gray-700 mb-1">Current Location</h4>
                    <p className="text-sm text-gray-600">{route.currentLocation}</p>
                  </div>
                </div>

                {route.status === "In Progress" && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{route.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${route.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <MapPin className="h-4 w-4 mr-1" />
                    Track Route
                  </Button>
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                  {route.status === "Planned" && (
                    <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 bg-transparent">
                      Cancel Route
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Route History */}
      {activeTab === "history" && (
        <div className="space-y-4">
          {routeHistory.map((route) => (
            <Card key={route.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-green-600" />
                      {route.name}
                    </CardTitle>
                    <CardDescription>
                      {route.distance} • {route.duration} • {route.borderCrossings.join(", ")}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(route.status)}>{route.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <h4 className="font-medium text-sm text-gray-700 mb-1">Completed Date</h4>
                    <p className="text-sm text-gray-600">{new Date(route.completedDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-gray-700 mb-1">Total Duration</h4>
                    <p className="text-sm text-gray-600">{route.duration}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-gray-700 mb-1">Border Crossings</h4>
                    <p className="text-sm text-gray-600">{route.borderCrossings.length}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    <Route className="h-4 w-4 mr-1" />
                    Use as Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State for History */}
      {activeTab === "history" && routeHistory.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No completed routes</h3>
            <p className="text-gray-500 mb-4">Your completed routes will appear here</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
