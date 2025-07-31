"use client"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { User, Truck, FileText, ArrowLeft, ArrowRight, LogIn } from "lucide-react"

export default function DriverRegistration() {
  const [isLogin, setIsLogin] = useState(false)
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    nationality: "",
    address: "",
    city: "",
    country: "",

    // License Information
    licenseNumber: "",
    licenseType: "",
    licenseIssueDate: "",
    licenseExpiryDate: "",
    issuingAuthority: "",

    // Company Information (if applicable)
    companyName: "",
    companyRegistration: "",
    companyAddress: "",
    companyPhone: "",

    // Emergency Contact
    emergencyName: "",
    emergencyPhone: "",
    emergencyRelation: "",

    // Terms
    agreeTerms: false,
    agreeDataProcessing: false,
  })

  const handleLoginInputChange = (field: string, value: string) => {
    setLoginData((prev) => ({ ...prev, [field]: value }))
  }

  const handleLogin = () => {
    // Here you would validate credentials against your backend
    console.log("Driver Login Data:", loginData)
    // Simulate successful login
    window.location.href = "/dashboard/driver"
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
  }

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = () => {
    // Here you would submit the form data to your backend
    console.log("Driver Registration Data:", formData)
    // Redirect to driver dashboard
    window.location.href = "/dashboard/driver"
  }

  // Login Form Component
  if (isLogin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8 pt-8">
            <Link
              href="/register-role"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to role selection
            </Link>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl">
                <Truck className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Driver Login
              </span>
            </div>
          </div>

          <Card className="shadow-xl border-0">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <LogIn className="h-5 w-5" />
                Welcome Back
              </CardTitle>
              <CardDescription>Sign in to access your driver dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="loginEmail">Email Address</Label>
                <Input
                  id="loginEmail"
                  type="email"
                  value={loginData.email}
                  onChange={(e) => handleLoginInputChange("email", e.target.value)}
                  placeholder="john.doe@example.com"
                  required
                />
              </div>

              <div>
                <Label htmlFor="loginPassword">Password</Label>
                <Input
                  id="loginPassword"
                  type="password"
                  value={loginData.password}
                  onChange={(e) => handleLoginInputChange("password", e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <Link href="/forgot-password" className="text-blue-600 hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                Sign In to Dashboard
              </Button>

              <div className="text-center pt-4 border-t">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <button onClick={() => setIsLogin(false)} className="text-blue-600 hover:underline font-medium">
                    Register as Driver
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-blue-100 p-2 rounded-full">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">Personal Information</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="john.doe@example.com"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+260 97X XXX XXX"
                  required
                />
              </div>
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="nationality">Nationality *</Label>
              <Select onValueChange={(value) => handleInputChange("nationality", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your nationality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="zambian">Zambian</SelectItem>
                  <SelectItem value="zimbabwean">Zimbabwean</SelectItem>
                  <SelectItem value="botswanan">Botswanan</SelectItem>
                  <SelectItem value="tanzanian">Tanzanian</SelectItem>
                  <SelectItem value="malawian">Malawian</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="address">Physical Address *</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Enter your full address"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  placeholder="Lusaka"
                  required
                />
              </div>
              <div>
                <Label htmlFor="country">Country *</Label>
                <Select onValueChange={(value) => handleInputChange("country", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zambia">Zambia</SelectItem>
                    <SelectItem value="zimbabwe">Zimbabwe</SelectItem>
                    <SelectItem value="botswana">Botswana</SelectItem>
                    <SelectItem value="tanzania">Tanzania</SelectItem>
                    <SelectItem value="malawi">Malawi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-green-100 p-2 rounded-full">
                <FileText className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold">License Information</h3>
            </div>

            <div>
              <Label htmlFor="licenseNumber">Driving License Number *</Label>
              <Input
                id="licenseNumber"
                value={formData.licenseNumber}
                onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
                placeholder="ZM-DL-123456"
                required
              />
            </div>

            <div>
              <Label htmlFor="licenseType">License Type *</Label>
              <Select onValueChange={(value) => handleInputChange("licenseType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select license type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="class-a">Class A - Heavy Trucks</SelectItem>
                  <SelectItem value="class-b">Class B - Large Trucks</SelectItem>
                  <SelectItem value="class-c">Class C - Regular Vehicles</SelectItem>
                  <SelectItem value="cdl">Commercial Driver's License (CDL)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="licenseIssueDate">Issue Date *</Label>
                <Input
                  id="licenseIssueDate"
                  type="date"
                  value={formData.licenseIssueDate}
                  onChange={(e) => handleInputChange("licenseIssueDate", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="licenseExpiryDate">Expiry Date *</Label>
                <Input
                  id="licenseExpiryDate"
                  type="date"
                  value={formData.licenseExpiryDate}
                  onChange={(e) => handleInputChange("licenseExpiryDate", e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="issuingAuthority">Issuing Authority *</Label>
              <Input
                id="issuingAuthority"
                value={formData.issuingAuthority}
                onChange={(e) => handleInputChange("issuingAuthority", e.target.value)}
                placeholder="Road Transport and Safety Agency (RTSA)"
                required
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-purple-100 p-2 rounded-full">
                <Truck className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold">Company Information (Optional)</h3>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              If you're registering as a company or work for a transport company, please fill in these details.
            </p>

            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => handleInputChange("companyName", e.target.value)}
                placeholder="ABC Transport Ltd"
              />
            </div>

            <div>
              <Label htmlFor="companyRegistration">Company Registration Number</Label>
              <Input
                id="companyRegistration"
                value={formData.companyRegistration}
                onChange={(e) => handleInputChange("companyRegistration", e.target.value)}
                placeholder="REG-123456"
              />
            </div>

            <div>
              <Label htmlFor="companyAddress">Company Address</Label>
              <Textarea
                id="companyAddress"
                value={formData.companyAddress}
                onChange={(e) => handleInputChange("companyAddress", e.target.value)}
                placeholder="Company physical address"
              />
            </div>

            <div>
              <Label htmlFor="companyPhone">Company Phone</Label>
              <Input
                id="companyPhone"
                value={formData.companyPhone}
                onChange={(e) => handleInputChange("companyPhone", e.target.value)}
                placeholder="+260 211 XXX XXX"
              />
            </div>

            <div className="border-t pt-4 mt-6">
              <h4 className="font-semibold mb-4">Emergency Contact</h4>

              <div>
                <Label htmlFor="emergencyName">Emergency Contact Name *</Label>
                <Input
                  id="emergencyName"
                  value={formData.emergencyName}
                  onChange={(e) => handleInputChange("emergencyName", e.target.value)}
                  placeholder="Jane Doe"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <Label htmlFor="emergencyPhone">Emergency Contact Phone *</Label>
                  <Input
                    id="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                    placeholder="+260 97X XXX XXX"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="emergencyRelation">Relationship *</Label>
                  <Select onValueChange={(value) => handleInputChange("emergencyRelation", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spouse">Spouse</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="sibling">Sibling</SelectItem>
                      <SelectItem value="child">Child</SelectItem>
                      <SelectItem value="friend">Friend</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-orange-100 p-2 rounded-full">
                <FileText className="h-5 w-5 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold">Review & Terms</h3>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Registration Summary</h4>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Name:</strong> {formData.firstName} {formData.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {formData.email}
                </p>
                <p>
                  <strong>Phone:</strong> {formData.phone}
                </p>
                <p>
                  <strong>License:</strong> {formData.licenseNumber} ({formData.licenseType})
                </p>
                {formData.companyName && (
                  <p>
                    <strong>Company:</strong> {formData.companyName}
                  </p>
                )}
                <p>
                  <strong>Emergency Contact:</strong> {formData.emergencyName} ({formData.emergencyPhone})
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="agreeTerms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked) => handleInputChange("agreeTerms", checked as boolean)}
                />
                <Label htmlFor="agreeTerms" className="text-sm leading-relaxed">
                  I agree to the{" "}
                  <Link href="/terms" className="text-blue-600 hover:underline">
                    Terms and Conditions
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="agreeDataProcessing"
                  checked={formData.agreeDataProcessing}
                  onCheckedChange={(checked) => handleInputChange("agreeDataProcessing", checked as boolean)}
                />
                <Label htmlFor="agreeDataProcessing" className="text-sm leading-relaxed">
                  I consent to the processing of my personal data for the purpose of truck registration, border crossing
                  management, and related services as outlined in the Privacy Policy.
                </Label>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Next Steps</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Complete your registration to access your driver dashboard</li>
                <li>• Register your first truck with vehicle details and documents</li>
                <li>• Upload your driving license and other required documents</li>
                <li>• Apply for your E-Card (K500) for seamless border crossings</li>
              </ul>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <Link href="/register-role" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to role selection
          </Link>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl">
              <Truck className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Driver Registration
            </span>
          </div>

          {/* Login/Register Toggle */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <Button
              variant={!isLogin ? "default" : "outline"}
              onClick={() => setIsLogin(false)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              New Registration
            </Button>
            <Button
              variant={isLogin ? "default" : "outline"}
              onClick={() => setIsLogin(true)}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
            >
              Already Registered? Login
            </Button>
          </div>

          {/* Progress Indicator - Only show for registration */}
          {!isLogin && (
            <div className="flex items-center justify-center gap-2 mb-6">
              {[1, 2, 3, 4].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step >= stepNumber ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {stepNumber}
                  </div>
                  {stepNumber < 4 && (
                    <div className={`w-8 h-1 mx-1 ${step > stepNumber ? "bg-blue-500" : "bg-gray-200"}`} />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Form Card */}
        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle>Step {step} of 4</CardTitle>
            <CardDescription>
              {step === 1 && "Tell us about yourself"}
              {step === 2 && "Your driving license details"}
              {step === 3 && "Company and emergency contact information"}
              {step === 4 && "Review your information and accept terms"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderStep()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={step === 1}
                className="flex items-center gap-2 bg-transparent"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>

              {step < 4 ? (
                <Button
                  onClick={handleNext}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!formData.agreeTerms || !formData.agreeDataProcessing}
                  className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                >
                  Complete Registration
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
