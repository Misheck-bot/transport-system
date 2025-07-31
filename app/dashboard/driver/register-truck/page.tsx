"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, Truck, FileText, CheckCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function RegisterTruck() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const [truckData, setTruckData] = useState({
    // Basic Information
    make: "",
    model: "",
    year: "",
    color: "",
    plateNumber: "",
    chassisNumber: "",
    engineNumber: "",

    // Technical Specifications
    engineCapacity: "",
    fuelType: "",
    transmission: "",
    maxWeight: "",
    dimensions: "",

    // Registration & Insurance
    registrationNumber: "",
    registrationExpiry: "",
    insuranceProvider: "",
    insuranceNumber: "",
    insuranceExpiry: "",

    // Documents
    registrationCert: null,
    insuranceCert: null,
    roadworthyCert: null,

    // Additional Info
    specialFeatures: "",
    cargoType: "",

    // Agreements
    termsAccepted: false,
    dataProcessing: false,
  })

  const handleInputChange = (field: string, value: any) => {
    setTruckData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (field: string, file: File | null) => {
    setTruckData((prev) => ({ ...prev, [field]: file }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setIsSubmitting(false)
    setIsSuccess(true)

    // Redirect after success
    setTimeout(() => {
      window.location.href = "/dashboard/driver/trucks"
    }, 2000)
  }

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4))
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1))

  const progress = (currentStep / 4) * 100

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mt-1" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Truck Registered Successfully!</h2>
            <p className="text-gray-600 mb-4">Your truck has been registered and is pending verification.</p>
            <p className="text-sm text-gray-500">Redirecting to your trucks...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Register New Truck</h1>
        <p className="text-gray-600">Add your truck details and required documents</p>
      </div>

      {/* Progress Bar */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Step {currentStep} of 4</span>
            <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="w-full" />
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>Basic Info</span>
            <span>Specifications</span>
            <span>Documents</span>
            <span>Review</span>
          </div>
        </CardContent>
      </Card>

      {/* Step 1: Basic Information */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Basic Truck Information
            </CardTitle>
            <CardDescription>Enter your truck's basic details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="make">Make *</Label>
                <Input
                  id="make"
                  placeholder="e.g., Volvo, Scania, MAN"
                  value={truckData.make}
                  onChange={(e) => handleInputChange("make", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="model">Model *</Label>
                <Input
                  id="model"
                  placeholder="e.g., FH16, R450"
                  value={truckData.model}
                  onChange={(e) => handleInputChange("model", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="year">Year *</Label>
                <Input
                  id="year"
                  type="number"
                  placeholder="2020"
                  value={truckData.year}
                  onChange={(e) => handleInputChange("year", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="color">Color</Label>
                <Input
                  id="color"
                  placeholder="White, Blue, Red"
                  value={truckData.color}
                  onChange={(e) => handleInputChange("color", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="plateNumber">License Plate Number *</Label>
                <Input
                  id="plateNumber"
                  placeholder="ABC 123Z"
                  value={truckData.plateNumber}
                  onChange={(e) => handleInputChange("plateNumber", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="chassisNumber">Chassis Number *</Label>
                <Input
                  id="chassisNumber"
                  placeholder="17-digit chassis number"
                  value={truckData.chassisNumber}
                  onChange={(e) => handleInputChange("chassisNumber", e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="engineNumber">Engine Number *</Label>
              <Input
                id="engineNumber"
                placeholder="Engine identification number"
                value={truckData.engineNumber}
                onChange={(e) => handleInputChange("engineNumber", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Technical Specifications */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Technical Specifications</CardTitle>
            <CardDescription>Provide technical details about your truck</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="engineCapacity">Engine Capacity (L)</Label>
                <Input
                  id="engineCapacity"
                  placeholder="e.g., 12.8"
                  value={truckData.engineCapacity}
                  onChange={(e) => handleInputChange("engineCapacity", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="fuelType">Fuel Type</Label>
                <Select value={truckData.fuelType} onValueChange={(value) => handleInputChange("fuelType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select fuel type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="diesel">Diesel</SelectItem>
                    <SelectItem value="petrol">Petrol</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="electric">Electric</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="transmission">Transmission</Label>
                <Select
                  value={truckData.transmission}
                  onValueChange={(value) => handleInputChange("transmission", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select transmission" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manual">Manual</SelectItem>
                    <SelectItem value="automatic">Automatic</SelectItem>
                    <SelectItem value="semi-automatic">Semi-Automatic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="maxWeight">Maximum Weight (kg)</Label>
                <Input
                  id="maxWeight"
                  placeholder="e.g., 40000"
                  value={truckData.maxWeight}
                  onChange={(e) => handleInputChange("maxWeight", e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="dimensions">Dimensions (L x W x H in meters)</Label>
              <Input
                id="dimensions"
                placeholder="e.g., 16.5 x 2.5 x 4.0"
                value={truckData.dimensions}
                onChange={(e) => handleInputChange("dimensions", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="cargoType">Primary Cargo Type</Label>
              <Select value={truckData.cargoType} onValueChange={(value) => handleInputChange("cargoType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select cargo type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Cargo</SelectItem>
                  <SelectItem value="refrigerated">Refrigerated Goods</SelectItem>
                  <SelectItem value="hazardous">Hazardous Materials</SelectItem>
                  <SelectItem value="livestock">Livestock</SelectItem>
                  <SelectItem value="containers">Containers</SelectItem>
                  <SelectItem value="bulk">Bulk Materials</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="specialFeatures">Special Features</Label>
              <Textarea
                id="specialFeatures"
                placeholder="GPS tracking, refrigeration unit, hydraulic lift, etc."
                value={truckData.specialFeatures}
                onChange={(e) => handleInputChange("specialFeatures", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Documents Upload */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Required Documents
            </CardTitle>
            <CardDescription>Upload all required truck documents</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="registrationNumber">Registration Number</Label>
                <Input
                  id="registrationNumber"
                  placeholder="Vehicle registration number"
                  value={truckData.registrationNumber}
                  onChange={(e) => handleInputChange("registrationNumber", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="registrationExpiry">Registration Expiry</Label>
                <Input
                  id="registrationExpiry"
                  type="date"
                  value={truckData.registrationExpiry}
                  onChange={(e) => handleInputChange("registrationExpiry", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                <Input
                  id="insuranceProvider"
                  placeholder="Insurance company name"
                  value={truckData.insuranceProvider}
                  onChange={(e) => handleInputChange("insuranceProvider", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="insuranceExpiry">Insurance Expiry</Label>
                <Input
                  id="insuranceExpiry"
                  type="date"
                  value={truckData.insuranceExpiry}
                  onChange={(e) => handleInputChange("insuranceExpiry", e.target.value)}
                />
              </div>
            </div>

            {/* File Uploads */}
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <div className="text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <Label htmlFor="registrationCert" className="cursor-pointer">
                    <span className="text-sm font-medium text-blue-600 hover:text-blue-500">
                      Upload Registration Certificate
                    </span>
                    <Input
                      id="registrationCert"
                      type="file"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload("registrationCert", e.target.files?.[0] || null)}
                    />
                  </Label>
                  <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG up to 10MB</p>
                </div>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <div className="text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <Label htmlFor="insuranceCert" className="cursor-pointer">
                    <span className="text-sm font-medium text-blue-600 hover:text-blue-500">
                      Upload Insurance Certificate
                    </span>
                    <Input
                      id="insuranceCert"
                      type="file"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload("insuranceCert", e.target.files?.[0] || null)}
                    />
                  </Label>
                  <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG up to 10MB</p>
                </div>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <div className="text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <Label htmlFor="roadworthyCert" className="cursor-pointer">
                    <span className="text-sm font-medium text-blue-600 hover:text-blue-500">
                      Upload Roadworthy Certificate
                    </span>
                    <Input
                      id="roadworthyCert"
                      type="file"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload("roadworthyCert", e.target.files?.[0] || null)}
                    />
                  </Label>
                  <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG up to 10MB</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Review and Submit */}
      {currentStep === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Review and Submit</CardTitle>
            <CardDescription>Please review your information before submitting</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Basic Information</h3>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="font-medium">Make:</span> {truckData.make}
                  </p>
                  <p>
                    <span className="font-medium">Model:</span> {truckData.model}
                  </p>
                  <p>
                    <span className="font-medium">Year:</span> {truckData.year}
                  </p>
                  <p>
                    <span className="font-medium">Plate Number:</span> {truckData.plateNumber}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Technical Specs</h3>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="font-medium">Engine:</span> {truckData.engineCapacity}L
                  </p>
                  <p>
                    <span className="font-medium">Fuel:</span> {truckData.fuelType}
                  </p>
                  <p>
                    <span className="font-medium">Max Weight:</span> {truckData.maxWeight}kg
                  </p>
                  <p>
                    <span className="font-medium">Cargo Type:</span> {truckData.cargoType}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={truckData.termsAccepted}
                  onCheckedChange={(checked) => handleInputChange("termsAccepted", checked)}
                />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the <span className="text-blue-600 underline">Terms and Conditions</span> for truck
                  registration
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="dataProcessing"
                  checked={truckData.dataProcessing}
                  onCheckedChange={(checked) => handleInputChange("dataProcessing", checked)}
                />
                <Label htmlFor="dataProcessing" className="text-sm">
                  I consent to the processing of my truck data for border crossing and regulatory purposes
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
          Previous
        </Button>

        {currentStep < 4 ? (
          <Button onClick={nextStep}>Next</Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={!truckData.termsAccepted || !truckData.dataProcessing || isSubmitting}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isSubmitting ? "Registering..." : "Register Truck"}
          </Button>
        )}
      </div>
    </div>
  )
}
