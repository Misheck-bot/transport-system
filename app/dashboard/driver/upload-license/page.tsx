"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function UploadLicense() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isUploading, setIsUploading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const [licenseData, setLicenseData] = useState({
    licenseNumber: "",
    licenseClass: "",
    issueDate: "",
    expiryDate: "",
    issuingAuthority: "",
    frontImage: null as File | null,
    backImage: null as File | null,
  })

  const handleInputChange = (field: string, value: any) => {
    setLicenseData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (field: string, file: File | null) => {
    setLicenseData((prev) => ({ ...prev, [field]: file }))
  }

  const handleSubmit = async () => {
    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setIsSuccess(true)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3))
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1))

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mt-1" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">License Uploaded Successfully!</h2>
            <p className="text-gray-600 mb-4">Your driving license has been uploaded and is under review.</p>
            <p className="text-sm text-gray-500 mb-6">You will be notified once the verification is complete.</p>
            <Button onClick={() => (window.location.href = "/dashboard/driver/documents")}>View Documents</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Driving License</h1>
        <p className="text-gray-600">Upload your driving license for verification</p>
      </div>

      {/* Progress Bar */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Step {currentStep} of 3</span>
            <span className="text-sm text-gray-500">{Math.round((currentStep / 3) * 100)}% Complete</span>
          </div>
          <Progress value={(currentStep / 3) * 100} className="w-full" />
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>License Details</span>
            <span>Upload Images</span>
            <span>Review & Submit</span>
          </div>
        </CardContent>
      </Card>

      {/* Step 1: License Details */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              License Information
            </CardTitle>
            <CardDescription>Enter your driving license details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="licenseNumber">License Number *</Label>
              <Input
                id="licenseNumber"
                placeholder="e.g., DL123456789"
                value={licenseData.licenseNumber}
                onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="licenseClass">License Class *</Label>
              <Select
                value={licenseData.licenseClass}
                onValueChange={(value) => handleInputChange("licenseClass", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select license class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Class A">Class A - Motorcycle</SelectItem>
                  <SelectItem value="Class B">Class B - Light Vehicle (up to 3,500kg)</SelectItem>
                  <SelectItem value="Class C">Class C - Heavy Vehicle (over 3,500kg)</SelectItem>
                  <SelectItem value="Class D">Class D - Public Service Vehicle</SelectItem>
                  <SelectItem value="Class E">Class E - Articulated Vehicle</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="issueDate">Issue Date *</Label>
                <Input
                  id="issueDate"
                  type="date"
                  value={licenseData.issueDate}
                  onChange={(e) => handleInputChange("issueDate", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="expiryDate">Expiry Date *</Label>
                <Input
                  id="expiryDate"
                  type="date"
                  value={licenseData.expiryDate}
                  onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="issuingAuthority">Issuing Authority</Label>
              <Select
                value={licenseData.issuingAuthority}
                onValueChange={(value) => handleInputChange("issuingAuthority", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select issuing authority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="RTSA">Road Transport and Safety Agency (RTSA)</SelectItem>
                  <SelectItem value="Other">Other Authority</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Upload Images */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload License Images
            </CardTitle>
            <CardDescription>Upload clear photos of both sides of your license</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Front Image Upload */}
            <div>
              <Label className="text-base font-medium">Front Side of License *</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mt-2">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <Label htmlFor="frontImage" className="cursor-pointer">
                  <span className="text-lg font-medium text-blue-600 hover:text-blue-500">
                    {licenseData.frontImage ? licenseData.frontImage.name : "Click to upload front side"}
                  </span>
                  <Input
                    id="frontImage"
                    type="file"
                    className="hidden"
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload("frontImage", e.target.files?.[0] || null)}
                  />
                </Label>
                <p className="text-sm text-gray-500 mt-2">JPG, PNG up to 10MB</p>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg text-left">
                  <h4 className="font-medium text-blue-900 mb-2">Tips for a good photo:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Ensure all text is clearly readable</li>
                    <li>• Use good lighting, avoid shadows</li>
                    <li>• Keep the license flat and straight</li>
                    <li>• Avoid glare and reflections</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Back Image Upload */}
            <div>
              <Label className="text-base font-medium">Back Side of License *</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mt-2">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <Label htmlFor="backImage" className="cursor-pointer">
                  <span className="text-lg font-medium text-blue-600 hover:text-blue-500">
                    {licenseData.backImage ? licenseData.backImage.name : "Click to upload back side"}
                  </span>
                  <Input
                    id="backImage"
                    type="file"
                    className="hidden"
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload("backImage", e.target.files?.[0] || null)}
                  />
                </Label>
                <p className="text-sm text-gray-500 mt-2">JPG, PNG up to 10MB</p>
              </div>
            </div>

            {/* Requirements Notice */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-900">Important Requirements</h4>
                  <ul className="text-sm text-yellow-800 mt-2 space-y-1">
                    <li>• License must be valid and not expired</li>
                    <li>• Images must be clear and all text readable</li>
                    <li>• Both front and back sides are required</li>
                    <li>• Processing may take 1-3 business days</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Review and Submit */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Review and Submit</CardTitle>
            <CardDescription>Please review your information before submitting</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">License Details</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-medium">License Number:</span> {licenseData.licenseNumber}
                  </p>
                  <p>
                    <span className="font-medium">Class:</span> {licenseData.licenseClass}
                  </p>
                  <p>
                    <span className="font-medium">Issue Date:</span> {licenseData.issueDate}
                  </p>
                  <p>
                    <span className="font-medium">Expiry Date:</span> {licenseData.expiryDate}
                  </p>
                  <p>
                    <span className="font-medium">Issuing Authority:</span> {licenseData.issuingAuthority}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Uploaded Files</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-medium">Front Image:</span> {licenseData.frontImage?.name || "Not uploaded"}
                  </p>
                  <p>
                    <span className="font-medium">Back Image:</span> {licenseData.backImage?.name || "Not uploaded"}
                  </p>
                </div>
              </div>
            </div>

            {isUploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="w-full" />
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 1 || isUploading}>
          Previous
        </Button>

        {currentStep < 3 ? (
          <Button onClick={nextStep}>Next</Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={!licenseData.frontImage || !licenseData.backImage || isUploading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isUploading ? "Uploading..." : "Submit License"}
          </Button>
        )}
      </div>
    </div>
  )
}
