"use client"

import { useState, useEffect } from "react"
import { Settings, Shield, Bell, Mail, Globe, Lock, Key, Server } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

interface SystemConfig {
  siteName: string
  siteDescription: string
  adminEmail: string
  maintenanceMode: boolean
  registrationEnabled: boolean
  emailNotifications: boolean
  smsNotifications: boolean
  maxFileSize: string
  sessionTimeout: string
  passwordPolicy: {
    minLength: number
    requireUppercase: boolean
    requireNumbers: boolean
    requireSymbols: boolean
  }
  paymentSettings: {
    ecardFee: number
    currency: string
    paymentMethods: string[]
  }
}

export default function SystemConfiguration() {
  const [config, setConfig] = useState<SystemConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchSystemConfig()
  }, [])

  const fetchSystemConfig = async () => {
    try {
      setLoading(true)
      // Mock data - replace with real API endpoint
      setConfig({
        siteName: "E-Truck Transport System",
        siteDescription: "Digital platform for cross-border truck transport management",
        adminEmail: "admin@etruck.com",
        maintenanceMode: false,
        registrationEnabled: true,
        emailNotifications: true,
        smsNotifications: false,
        maxFileSize: "10MB",
        sessionTimeout: "24h",
        passwordPolicy: {
          minLength: 8,
          requireUppercase: true,
          requireNumbers: true,
          requireSymbols: false
        },
        paymentSettings: {
          ecardFee: 500,
          currency: "ZMW",
          paymentMethods: ["mobile_money", "bank_transfer"]
        }
      })
    } catch (error) {
      console.error("Error fetching system config:", error)
      toast.error("Failed to load system configuration")
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!config) return
    
    try {
      setSaving(true)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success("System configuration updated successfully")
    } catch (error) {
      console.error("Error saving config:", error)
      toast.error("Failed to save configuration")
    } finally {
      setSaving(false)
    }
  }

  const updateConfig = (path: string, value: any) => {
    if (!config) return
    
    const keys = path.split('.')
    const newConfig = { ...config }
    let current: any = newConfig
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]]
    }
    
    current[keys[keys.length - 1]] = value
    setConfig(newConfig)
  }

  if (loading) {
    return <div className="text-center py-8">Loading system configuration...</div>
  }

  if (!config) {
    return <div className="text-center py-8">Failed to load system configuration</div>
  }

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Configuration</h1>
          <p className="text-gray-600">Manage system settings and preferences</p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {/* System Status */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            System Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Maintenance Mode</span>
              <Badge className={config.maintenanceMode ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}>
                {config.maintenanceMode ? "Enabled" : "Disabled"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Registration</span>
              <Badge className={config.registrationEnabled ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                {config.registrationEnabled ? "Open" : "Closed"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Email Notifications</span>
              <Badge className={config.emailNotifications ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                {config.emailNotifications ? "Active" : "Inactive"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">SMS Notifications</span>
              <Badge className={config.smsNotifications ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                {config.smsNotifications ? "Active" : "Inactive"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              General Settings
            </CardTitle>
            <CardDescription>Basic system configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Site Name</Label>
              <Input
                id="siteName"
                value={config.siteName}
                onChange={(e) => updateConfig('siteName', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="siteDescription">Site Description</Label>
              <Textarea
                id="siteDescription"
                value={config.siteDescription}
                onChange={(e) => updateConfig('siteDescription', e.target.value)}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="adminEmail">Admin Email</Label>
              <Input
                id="adminEmail"
                type="email"
                value={config.adminEmail}
                onChange={(e) => updateConfig('adminEmail', e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
              <Switch
                id="maintenanceMode"
                checked={config.maintenanceMode}
                onCheckedChange={(checked) => updateConfig('maintenanceMode', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="registrationEnabled">User Registration</Label>
              <Switch
                id="registrationEnabled"
                checked={config.registrationEnabled}
                onCheckedChange={(checked) => updateConfig('registrationEnabled', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Settings
            </CardTitle>
            <CardDescription>Password and session configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Session Timeout</Label>
              <Select value={config.sessionTimeout} onValueChange={(value) => updateConfig('sessionTimeout', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">1 Hour</SelectItem>
                  <SelectItem value="8h">8 Hours</SelectItem>
                  <SelectItem value="24h">24 Hours</SelectItem>
                  <SelectItem value="7d">7 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxFileSize">Max File Upload Size</Label>
              <Select value={config.maxFileSize} onValueChange={(value) => updateConfig('maxFileSize', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5MB">5 MB</SelectItem>
                  <SelectItem value="10MB">10 MB</SelectItem>
                  <SelectItem value="25MB">25 MB</SelectItem>
                  <SelectItem value="50MB">50 MB</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Password Policy</Label>
              <div className="space-y-2 pl-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Minimum Length: {config.passwordPolicy.minLength}</span>
                  <Input
                    type="number"
                    value={config.passwordPolicy.minLength}
                    onChange={(e) => updateConfig('passwordPolicy.minLength', parseInt(e.target.value))}
                    className="w-20"
                    min="6"
                    max="20"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Require Uppercase</span>
                  <Switch
                    checked={config.passwordPolicy.requireUppercase}
                    onCheckedChange={(checked) => updateConfig('passwordPolicy.requireUppercase', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Require Numbers</span>
                  <Switch
                    checked={config.passwordPolicy.requireNumbers}
                    onCheckedChange={(checked) => updateConfig('passwordPolicy.requireNumbers', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Require Symbols</span>
                  <Switch
                    checked={config.passwordPolicy.requireSymbols}
                    onCheckedChange={(checked) => updateConfig('passwordPolicy.requireSymbols', checked)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Settings
            </CardTitle>
            <CardDescription>Configure system notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Send notifications via email</p>
              </div>
              <Switch
                checked={config.emailNotifications}
                onCheckedChange={(checked) => updateConfig('emailNotifications', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>SMS Notifications</Label>
                <p className="text-sm text-muted-foreground">Send notifications via SMS</p>
              </div>
              <Switch
                checked={config.smsNotifications}
                onCheckedChange={(checked) => updateConfig('smsNotifications', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Payment Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Payment Settings
            </CardTitle>
            <CardDescription>Configure payment options</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ecardFee">E-Card Fee</Label>
              <div className="flex gap-2">
                <Input
                  id="ecardFee"
                  type="number"
                  value={config.paymentSettings.ecardFee}
                  onChange={(e) => updateConfig('paymentSettings.ecardFee', parseInt(e.target.value))}
                  className="flex-1"
                />
                <Select value={config.paymentSettings.currency} onValueChange={(value) => updateConfig('paymentSettings.currency', value)}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ZMW">ZMW</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Payment Methods</Label>
              <div className="space-y-2">
                {["mobile_money", "bank_transfer", "credit_card"].map((method) => (
                  <div key={method} className="flex items-center justify-between">
                    <span className="text-sm capitalize">{method.replace('_', ' ')}</span>
                    <Switch
                      checked={config.paymentSettings.paymentMethods.includes(method)}
                      onCheckedChange={(checked) => {
                        const methods = checked
                          ? [...config.paymentSettings.paymentMethods, method]
                          : config.paymentSettings.paymentMethods.filter(m => m !== method)
                        updateConfig('paymentSettings.paymentMethods', methods)
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
