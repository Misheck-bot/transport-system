"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Clock, DollarSign, AlertTriangle, Route, Truck } from "lucide-react"

// Mock border crossings data
const borderCrossings = [
  { id: 1, name: "Chirundu Border", country: "Zimbabwe", estimatedTime: "2-4 hours", fees: "K150" },
  { id: 2, name: "Livingstone Border", country: "Zimbabwe", estimatedTime: "1-3 hours", fees: "K120" },
  { id: 3, name: "Nakonde Border", country: "Tanzania", estimatedTime: "3-5 hours", fees: "K200" },
  { id: 4, name: "Kasumbalesa Border", country: "DRC", estimatedTime: "4-6 hours", fees: "K250" },
  { id: 5, name: "Mwami Border", country: "Malawi", estimatedTime: "2-3 hours", fees: "K100" },
]

// Mock route suggestions
const routeSuggestions = [
  {
    id: 1,
    name: "Lusaka to Harare via Chirundu",
    distance: "485 km",
    estimatedTime: "8-10 hours",
    borderCrossings: ["Chirundu Border"],
    totalFees: "K150",
    fuelCost: "K800",
    roadCondition: "Good",
  },
  {
    id: 2,
    name: "Lusaka to Dar es Salaam via Nakonde",
    distance: "1,240 km",
    estimatedTime: "18-22 hours",
    borderCrossings: ["Nakonde Border"],
    totalFees: "K200",
    fuelCost: "K2,100",
    roadCondition: "Fair",
  },
]

export default function PlanRoute() {
  const [routeData, setRouteData] = useState({
    origin: "",
    destination: "",
    truckType: "",
    cargoType: "",
    departureDate: "",
    departureTime: "",
  })

  const [showResults, setShowResults] = useState(false)
  const [isCalculating, setIsCalculating] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setRouteData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePlanRoute = async () => {
    setIsCalculating(true)

    // Simulate route calculation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsCalculating(false)
    setShowResults(true)
  }

  const getRoadConditionColor = (condition: string) => {
    switch (condition) {
      case "Good":
        return "bg-green-100 text-green-800"
      case "Fair":
        return "bg-yellow-100 text-yellow-800"
      case "Poor":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Plan Route</h1>
        <p className="text-gray-600">Plan your cross-border journey with optimal routes and cost estimates</p>
      </div>

      {/* Route Planning Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Route className="h-5 w-5" />
            Route Planning
          </CardTitle>
          <CardDescription>Enter your journey details to get the best route suggestions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="origin">Origin (Starting Point)</Label>
              <Select value={routeData.origin} onValueChange={(value) => handleInputChange("origin", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select origin city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Lusaka">Lusaka, Zambia</SelectItem>
                  <SelectItem value="Ndola">Ndola, Zambia</SelectItem>
                  <SelectItem value="Kitwe">Kitwe, Zambia</SelectItem>
                  <SelectItem value="Livingstone">Livingstone, Zambia</SelectItem>
                  <SelectItem value="Chipata">Chipata, Zambia</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="destination">Destination</Label>
              <Select value={routeData.destination} onValueChange={(value) => handleInputChange("destination", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select destination city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Harare">Harare, Zimbabwe</SelectItem>
                  <SelectItem value="Dar es Salaam">Dar es Salaam, Tanzania</SelectItem>
                  <SelectItem value="Lubumbashi">Lubumbashi, DRC</SelectItem>
                  <SelectItem value="Lilongwe">Lilongwe, Malawi</SelectItem>
                  <SelectItem value="Johannesburg">Johannesburg, South Africa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="truckType">Truck Type</Label>
              <Select value={routeData.truckType} onValueChange={(value) => handleInputChange("truckType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select truck type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Light Truck">Light Truck (up to 3.5t)</SelectItem>
                  <SelectItem value="Medium Truck">Medium Truck (3.5t - 12t)</SelectItem>
                  <SelectItem value="Heavy Truck">Heavy Truck (12t - 32t)</SelectItem>
                  <SelectItem value="Articulated">Articulated Truck (32t+)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="cargoType">Cargo Type</Label>
              <Select value={routeData.cargoType} onValueChange={(value) => handleInputChange("cargoType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select cargo type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="General Cargo">General Cargo</SelectItem>
                  <SelectItem value="Refrigerated">Refrigerated Goods</SelectItem>
                  <SelectItem value="Hazardous">Hazardous Materials</SelectItem>
                  <SelectItem value="Livestock">Livestock</SelectItem>
                  <SelectItem value="Bulk">Bulk Materials</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="departureDate">Departure Date</Label>
              <Input
                id="departureDate"
                type="date"
                value={routeData.departureDate}
                onChange={(e) => handleInputChange("departureDate", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="departureTime">Departure Time</Label>
              <Input
                id="departureTime"
                type="time"
                value={routeData.departureTime}
                onChange={(e) => handleInputChange("departureTime", e.target.value)}
              />
            </div>
          </div>

          <Button
            onClick={handlePlanRoute}
            disabled={!routeData.origin || !routeData.destination || isCalculating}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {isCalculating ? "Calculating Routes..." : "Plan Route"}
          </Button>
        </CardContent>
      </Card>

      {/* Border Crossings Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Available Border Crossings
          </CardTitle>
          <CardDescription>Current information about border crossings and estimated processing times</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {borderCrossings.map((border) => (
              <div key={border.id} className="p-4 border rounded-lg">
                <h4 className="font-semibold text-gray-900">{border.name}</h4>
                <p className="text-sm text-gray-600 mb-2">To {border.country}</p>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3 text-gray-500" />
                    <span>Processing: {border.estimatedTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-3 w-3 text-gray-500" />
                    <span>Fees: {border.fees}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Route Results */}
      {showResults && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Navigation className="h-5 w-5" />
              Recommended Routes
            </CardTitle>
            <CardDescription>Based on your preferences, here are the best route options</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {routeSuggestions.map((route) => (
                <div key={route.id} className="border rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{route.name}</h3>
                      <p className="text-sm text-gray-600">
                        Distance: {route.distance} • Time: {route.estimatedTime}
                      </p>
                    </div>
                    <Badge className={getRoadConditionColor(route.roadCondition)}>{route.roadCondition} Road</Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      <div>
                        <p className="text-xs text-gray-500">Border Crossings</p>
                        <p className="text-sm font-medium">{route.borderCrossings.join(", ")}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <div>
                        <p className="text-xs text-gray-500">Border Fees</p>
                        <p className="text-sm font-medium">{route.totalFees}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-orange-600" />
                      <div>
                        <p className="text-xs text-gray-500">Fuel Cost</p>
                        <p className="text-sm font-medium">{route.fuelCost}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-purple-600" />
                      <div>
                        <p className="text-xs text-gray-500">Total Cost</p>
                        <p className="text-sm font-medium">
                          K
                          {Number.parseInt(route.totalFees.replace("K", "")) +
                            Number.parseInt(route.fuelCost.replace("K", ""))}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Select This Route
                    </Button>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                    <Button size="sm" variant="outline">
                      Save Route
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Important Notes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            Important Notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• Border crossing times may vary depending on traffic and customs procedures</p>
            <p>• Ensure all required documents are ready before departure</p>
            <p>• Check current road conditions and weather forecasts</p>
            <p>• Fuel costs are estimates based on current prices and may fluctuate</p>
            <p>• Some routes may require special permits for certain cargo types</p>
            <p>• Consider rest stops and driver fatigue regulations</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
