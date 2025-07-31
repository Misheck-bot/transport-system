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
import { Shield, User, FileText, MapPin, ArrowLeft, ArrowRight, LogIn } from "lucide-react"

export default function AgentRegistration() {
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

    // Professional Information
    employeeId: "",
    department: "",
    position: "",
    yearsOfExperience: "",
    previousBorderExperience: "",

    // Border Station Information
    assignedBorderPost: "",
    workingHours: "",
    shiftPattern: "",
    supervisorName: "",
    supervisorContact: "",

    // Qualifications & Certifications
    education: "",
    certifications: "",
    languages: "",

    // Security Clearance
    securityClearanceLevel: "",
    backgroundCheckDate: "",

    // Emergency Contact
    emergencyName: "",
    emergencyPhone: "",
    emergencyRelation: "",

    // Terms
    agreeTerms: false,
    agreeDataProcessing: false,
    agreeSecurityProtocols: false,
  })

  const handleLoginInputChange = (field: string, value: string) => {
    setLoginData((prev) => ({ ...prev, [field]: value }))
  }

  const handleLogin = () => {
    console.log("Border Agent Login Data:", loginData)
    window.location.href = "/dashboard/agent"
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
    console.log("Border Agent Registration Data:", formData)
    window.location.href = "/dashboard/agent"
  }

  // Login Form Component
  if (isLogin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 p-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8 pt-8">
            <Link
              href="/register-role"
              className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to role selection
            </Link>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-2 rounded-xl">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Agent Login
              </span>
            </div>
          </div>

          <Card className="shadow-xl border-0">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <LogIn className="h-5 w-5" />
                Welcome Back, Agent
              </CardTitle>
              <CardDescription>Sign in to access your border agent dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="loginEmail">Official Email Address</Label>
                <Input
                  id="loginEmail"
                  type="email"
                  value={loginData.email}
                  onChange={(e) => handleLoginInputChange("email", e.target.value)}
                  placeholder="agent@bordercontrol.gov"
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
                <Link href="/forgot-password" className="text-green-600 hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
              >
                Sign In to Dashboard
              </Button>

              <div className="text-center pt-4 border-t">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <button onClick={() => setIsLogin(false)} className="text-green-600 hover:underline font-medium">
                    Register as Border Agent
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
              <div className="bg-green-100 p-2 rounded-full">
                <User className="h-5 w-5 text-green-600" />
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
                  placeholder="Sarah"
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  placeholder="Johnson"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Official Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="sarah.johnson@bordercontrol.gov"
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
              <div className="bg-blue-100 p-2 rounded-full">
                <Shield className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">Professional Information</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="employeeId">Employee ID *</Label>
                <Input
                  id="employeeId"
                  value={formData.employeeId}
                  onChange={(e) => handleInputChange("employeeId", e.target.value)}
                  placeholder="EMP-2024-001"
                  required
                />
              </div>
              <div>
                <Label htmlFor="department">Department *</Label>
                <Select onValueChange={(value) => handleInputChange("department", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="border-control">Border Control</SelectItem>
                    <SelectItem value="customs">Customs</SelectItem>
                    <SelectItem value="immigration">Immigration</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                    <SelectItem value="transport">Transport Authority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="position">Position/Rank *</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => handleInputChange("position", e.target.value)}
                placeholder="Border Control Officer"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="yearsOfExperience">Years of Experience *</Label>
                <Select onValueChange={(value) => handleInputChange("yearsOfExperience", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-1">0-1 years</SelectItem>
                    <SelectItem value="2-5">2-5 years</SelectItem>
                    <SelectItem value="6-10">6-10 years</SelectItem>
                    <SelectItem value="11-15">11-15 years</SelectItem>
                    <SelectItem value="15+">15+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="previousBorderExperience">Previous Border Experience</Label>
                <Select onValueChange={(value) => handleInputChange("previousBorderExperience", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No previous experience</SelectItem>
                    <SelectItem value="local">Local border posts</SelectItem>
                    <SelectItem value="regional">Regional border experience</SelectItem>
                    <SelectItem value="international">International border experience</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="education">Highest Education Level *</Label>
              <Select onValueChange={(value) => handleInputChange("education", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select education level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high-school">High School</SelectItem>
                  <SelectItem value="diploma">Diploma</SelectItem>
                  <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                  <SelectItem value="master">Master's Degree</SelectItem>
                  <SelectItem value="phd">PhD</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="certifications">Professional Certifications</Label>
              <Textarea
                id="certifications"
                value={formData.certifications}
                onChange={(e) => handleInputChange("certifications", e.target.value)}
                placeholder="List any relevant certifications (e.g., Border Security, Customs, etc.)"
              />
            </div>

            <div>
              <Label htmlFor="languages">Languages Spoken *</Label>
              <Input
                id="languages"
                value={formData.languages}
                onChange={(e) => handleInputChange("languages", e.target.value)}
                placeholder="English, Bemba, Nyanja, etc."
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
                <MapPin className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold">Work Assignment & Security</h3>
            </div>

            <div>
              <Label htmlFor="assignedBorderPost">Assigned Border Post *</Label>
              <Select onValueChange={(value) => handleInputChange("assignedBorderPost", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select border post" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="chirundu">Chirundu Bridge (Zambia-Zimbabwe)</SelectItem>
                  <SelectItem value="kazungula">Kazungula (Zambia-Botswana)</SelectItem>
                  <SelectItem value="nakonde">Nakonde (Zambia-Tanzania)</SelectItem>
                  <SelectItem value="mwami">Mwami (Zambia-Malawi)</SelectItem>
                  <SelectItem value="chavuma">Chavuma (Zambia-Angola)</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="workingHours">Working Hours *</Label>
                <Select onValueChange={(value) => handleInputChange("workingHours", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select working hours" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day-shift">Day Shift (6AM - 6PM)</SelectItem>
                    <SelectItem value="night-shift">Night Shift (6PM - 6AM)</SelectItem>
                    <SelectItem value="rotating">Rotating Shifts</SelectItem>
                    <SelectItem value="flexible">Flexible Hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="shiftPattern">Shift Pattern</Label>
                <Select onValueChange={(value) => handleInputChange("shiftPattern", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select pattern" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5-days">5 days on, 2 days off</SelectItem>
                    <SelectItem value="4-days">4 days on, 3 days off</SelectItem>
                    <SelectItem value="rotating">Rotating schedule</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="supervisorName">Direct Supervisor Name *</Label>
                <Input
                  id="supervisorName"
                  value={formData.supervisorName}
                  onChange={(e) => handleInputChange("supervisorName", e.target.value)}
                  placeholder="Chief Inspector John Smith"
                  required
                />
              </div>
              <div>
                <Label htmlFor="supervisorContact">Supervisor Contact *</Label>
                <Input
                  id="supervisorContact"
                  value={formData.supervisorContact}
                  onChange={(e) => handleInputChange("supervisorContact", e.target.value)}
                  placeholder="+260 211 XXX XXX"
                  required
                />
              </div>
            </div>

            <div className="border-t pt-4 mt-6">
              <h4 className="font-semibold mb-4">Security Clearance</h4>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="securityClearanceLevel">Security Clearance Level *</Label>
                  <Select onValueChange={(value) => handleInputChange("securityClearanceLevel", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select clearance level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic</SelectItem>
                      <SelectItem value="confidential">Confidential</SelectItem>
                      <SelectItem value="secret">Secret</SelectItem>
                      <SelectItem value="top-secret">Top Secret</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="backgroundCheckDate">Background Check Date *</Label>
                  <Input
                    id="backgroundCheckDate"
                    type="date"
                    value={formData.backgroundCheckDate}
                    onChange={(e) => handleInputChange("backgroundCheckDate", e.target.value)}
                    required
                  />
                </div>
              </div>
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
                  <strong>Employee ID:</strong> {formData.employeeId}
                </p>
                <p>
                  <strong>Department:</strong> {formData.department}
                </p>
                <p>
                  <strong>Position:</strong> {formData.position}
                </p>
                <p>
                  <strong>Border Post:</strong> {formData.assignedBorderPost}
                </p>
                <p>
                  <strong>Security Clearance:</strong> {formData.securityClearanceLevel}
                </p>
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
                  I consent to the processing of my personal and professional data for border control operations and
                  system administration purposes.
                </Label>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="agreeSecurityProtocols"
                  checked={formData.agreeSecurityProtocols}
                  onCheckedChange={(checked) => handleInputChange("agreeSecurityProtocols", checked as boolean)}
                />
                <Label htmlFor="agreeSecurityProtocols" className="text-sm leading-relaxed">
                  I acknowledge and agree to follow all security protocols, confidentiality requirements, and
                  professional conduct standards as outlined in the Border Agent Handbook.
                </Label>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Access Granted</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• E-Card scanning and verification system</li>
                <li>• Driver database and search functionality</li>
                <li>• Border crossing management tools</li>
                <li>• Incident reporting and security alerts</li>
                <li>• Daily activity reports and analytics</li>
              </ul>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <Link
            href="/register-role"
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to role selection
          </Link>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-2 rounded-xl">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Border Agent Registration
            </span>
          </div>

          {/* Login/Register Toggle */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <Button
              variant={!isLogin ? "default" : "outline"}
              onClick={() => setIsLogin(false)}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
            >
              New Registration
            </Button>
            <Button
              variant={isLogin ? "default" : "outline"}
              onClick={() => setIsLogin(true)}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
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
                      step >= stepNumber ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {stepNumber}
                  </div>
                  {stepNumber < 4 && (
                    <div className={`w-8 h-1 mx-1 ${step > stepNumber ? "bg-green-500" : "bg-gray-200"}`} />
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
              {step === 1 && "Your personal information"}
              {step === 2 && "Professional background and qualifications"}
              {step === 3 && "Work assignment and security clearance"}
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
                  className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!formData.agreeTerms || !formData.agreeDataProcessing || !formData.agreeSecurityProtocols}
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
