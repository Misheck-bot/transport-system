"use client"

import { useState, useEffect } from "react"
import { User, Mail, Phone, Shield, Save, Edit, Badge, Calendar, MapPin } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge as UIBadge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { Separator } from "@/components/ui/separator"

interface AgentProfile {
  firstName: string
  lastName: string
  email: string
  phone: string
  badgeNumber: string
  department: string
  position: string
  borderPost: string
  hireDate: string
  lastLogin: string
  status: string
}

export default function AgentProfile() {
  const { toast } = useToast()
  const [profile, setProfile] = useState<AgentProfile>({
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@border.gov',
    phone: '+1 (555) 123-4567',
    badgeNumber: 'BA-2024-001',
    department: 'Border Security',
    position: 'Senior Border Agent',
    borderPost: 'Port of Entry - Main Gate',
    hireDate: '2020-03-15',
    lastLogin: new Date().toISOString(),
    status: 'active'
  })
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    try {
      setIsSaving(true)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setIsEditing(false)
      toast({
        title: "Success",
        description: "Profile updated successfully"
      })
    } catch (error) {
      console.error('Error updating profile:', error)
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    // Reset to original data
    setProfile({
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@border.gov',
      phone: '+1 (555) 123-4567',
      badgeNumber: 'BA-2024-001',
      department: 'Border Security',
      position: 'Senior Border Agent',
      borderPost: 'Port of Entry - Main Gate',
      hireDate: '2020-03-15',
      lastLogin: new Date().toISOString(),
      status: 'active'
    })
    setIsEditing(false)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback className="text-2xl bg-green-100 text-green-700">
                {profile.firstName?.[0]}{profile.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
          </div>
          <CardTitle className="text-2xl">
            {profile.firstName} {profile.lastName}
          </CardTitle>
          <CardDescription className="flex items-center justify-center gap-4 flex-wrap">
            <UIBadge className="bg-green-100 text-green-800">
              <Shield className="h-3 w-3 mr-1" />
              {profile.position}
            </UIBadge>
            <UIBadge variant="outline">
              <Badge className="h-3 w-3 mr-1" />
              {profile.badgeNumber}
            </UIBadge>
            <UIBadge variant="secondary">
              <MapPin className="h-3 w-3 mr-1" />
              {profile.borderPost}
            </UIBadge>
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Manage your personal details and contact information
                </CardDescription>
              </div>
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)} className="gap-2">
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={handleCancel}
                    disabled={isSaving}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSave} 
                    disabled={isSaving}
                    className="gap-2"
                  >
                    <Save className="h-4 w-4" />
                    {isSaving ? 'Saving...' : 'Save'}
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="firstName"
                    value={profile.firstName}
                    onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="lastName"
                    value={profile.lastName}
                    onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  disabled
                  className="pl-10 bg-gray-50"
                />
              </div>
              <p className="text-xs text-gray-500">Email cannot be changed</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  disabled={!isEditing}
                  className="pl-10"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Professional Information */}
        <Card>
          <CardHeader>
            <CardTitle>Professional Information</CardTitle>
            <CardDescription>
              Your role and department details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-600">Badge Number</Label>
              <div className="flex items-center gap-2">
                <Badge className="h-4 w-4 text-gray-400" />
                <p className="text-sm font-mono">{profile.badgeNumber}</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-600">Department</Label>
              <p className="text-sm">{profile.department}</p>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-600">Position</Label>
              <p className="text-sm">{profile.position}</p>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-600">Border Post</Label>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <p className="text-sm">{profile.borderPost}</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-600">Hire Date</Label>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <p className="text-sm">
                  {new Date(profile.hireDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-600">Last Login</Label>
              <p className="text-sm">
                {new Date(profile.lastLogin).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-600">Status</Label>
              <UIBadge className="bg-green-100 text-green-800 capitalize">
                {profile.status}
              </UIBadge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
          <CardDescription>
            Your recent activity and performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">247</div>
              <p className="text-sm text-gray-600">Total Scans</p>
              <p className="text-xs text-gray-500">This month</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">98.5%</div>
              <p className="text-sm text-gray-600">Accuracy Rate</p>
              <p className="text-xs text-gray-500">Last 30 days</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">12</div>
              <p className="text-sm text-gray-600">Flagged Cases</p>
              <p className="text-xs text-gray-500">This month</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">4.8</div>
              <p className="text-sm text-gray-600">Rating</p>
              <p className="text-xs text-gray-500">Supervisor review</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
