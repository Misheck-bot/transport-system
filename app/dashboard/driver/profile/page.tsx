"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { User, Edit, Save, X, Camera, Shield, MapPin, Phone } from "lucide-react"

// Mock user data - this would come from your registration data
const mockUserData = {
  // Personal Information
  firstName: "John",
  lastName: "Mwanza",
  email: "john.mwanza@email.com",
  phone: "+260 97 123 4567",
  dateOfBirth: "1985-06-15",
  nationality: "Zambian",
  nrc: "123456/78/9",

  // Address Information
  address: "Plot 123, Independence Avenue",
  city: "Lusaka",
  province: "Lusaka Province",
  postalCode: "10101",

  // Professional Information
  licenseNumber: "DL123456789",
  licenseClass: "Class C",
  licenseExpiry: "2026-06-15",
  yearsExperience: "8",
  emergencyContact: "Jane Mwanza",
  emergencyPhone: "+260 97 987 6543",

  // Account Status
  accountStatus: "Active",
  verificationStatus: "Verified",
  joinDate: "2024-01-15",
  lastLogin: "2024-01-25",
}

export default function Profile() {
  const [userData, setUserData] = useState(mockUserData)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setUserData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    setIsSaving(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSaving(false)
    setIsEditing(false)
  }

  const handleCancel = () => {
    // Reset to original data
    setUserData(mockUserData)
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600">Manage your personal information and account settings</p>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} className="bg-blue-600 hover:bg-blue-700">
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={isSaving} className="bg-green-600 hover:bg-green-700">
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
            <Button onClick={handleCancel} variant="outline">
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        )}
      </div>

      {/* Profile Overview */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="h-12 w-12 text-gray-500" />
              </div>
              {isEditing && (
                <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0">
                  <Camera className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">
                {userData.firstName} {userData.lastName}
              </h2>
              <p className="text-gray-600">{userData.email}</p>
              <div className="flex items-center gap-4 mt-2">
                <Badge className="bg-green-100 text-green-800">
                  <Shield className="h-3 w-3 mr-1" />
                  {userData.verificationStatus}
                </Badge>
                <Badge className="bg-blue-100 text-blue-800">{userData.accountStatus}</Badge>
              </div>
            </div>
            <div className="text-right text-sm text-gray-500">
              <p>Member since: {new Date(userData.joinDate).toLocaleDateString()}</p>
              <p>Last login: {new Date(userData.lastLogin).toLocaleDateString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
            <CardDescription>Your basic personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={userData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={userData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={userData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={userData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={userData.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="nationality">Nationality</Label>
                <Input
                  id="nationality"
                  value={userData.nationality}
                  onChange={(e) => handleInputChange("nationality", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="nrc">National Registration Card (NRC)</Label>
              <Input
                id="nrc"
                value={userData.nrc}
                onChange={(e) => handleInputChange("nrc", e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </CardContent>
        </Card>

        {/* Address Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Address Information
            </CardTitle>
            <CardDescription>Your residential address details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="address">Street Address</Label>
              <Input
                id="address"
                value={userData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={userData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="province">Province</Label>
                <Select
                  value={userData.province}
                  onValueChange={(value) => handleInputChange("province", value)}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Central Province">Central Province</SelectItem>
                    <SelectItem value="Copperbelt Province">Copperbelt Province</SelectItem>
                    <SelectItem value="Eastern Province">Eastern Province</SelectItem>
                    <SelectItem value="Luapula Province">Luapula Province</SelectItem>
                    <SelectItem value="Lusaka Province">Lusaka Province</SelectItem>
                    <SelectItem value="Muchinga Province">Muchinga Province</SelectItem>
                    <SelectItem value="Northern Province">Northern Province</SelectItem>
                    <SelectItem value="North-Western Province">North-Western Province</SelectItem>
                    <SelectItem value="Southern Province">Southern Province</SelectItem>
                    <SelectItem value="Western Province">Western Province</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input
                id="postalCode"
                value={userData.postalCode}
                onChange={(e) => handleInputChange("postalCode", e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </CardContent>
        </Card>

        {/* Professional Information */}
        <Card>
          <CardHeader>
            <CardTitle>Professional Information</CardTitle>
            <CardDescription>Your driving license and professional details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="licenseNumber">License Number</Label>
              <Input
                id="licenseNumber"
                value={userData.licenseNumber}
                onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="licenseClass">License Class</Label>
                <Select
                  value={userData.licenseClass}
                  onValueChange={(value) => handleInputChange("licenseClass", value)}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Class A">Class A (Motorcycle)</SelectItem>
                    <SelectItem value="Class B">Class B (Light Vehicle)</SelectItem>
                    <SelectItem value="Class C">Class C (Heavy Vehicle)</SelectItem>
                    <SelectItem value="Class D">Class D (Public Service)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="licenseExpiry">License Expiry</Label>
                <Input
                  id="licenseExpiry"
                  type="date"
                  value={userData.licenseExpiry}
                  onChange={(e) => handleInputChange("licenseExpiry", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="yearsExperience">Years of Experience</Label>
              <Input
                id="yearsExperience"
                value={userData.yearsExperience}
                onChange={(e) => handleInputChange("yearsExperience", e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Emergency Contact
            </CardTitle>
            <CardDescription>Emergency contact information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="emergencyContact">Contact Name</Label>
              <Input
                id="emergencyContact"
                value={userData.emergencyContact}
                onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="emergencyPhone">Contact Phone</Label>
              <Input
                id="emergencyPhone"
                value={userData.emergencyPhone}
                onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
