"use client"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Shield, Building, ArrowRight, Truck, CheckCircle, Clock } from "lucide-react"
import { useState } from "react"

const roles = [
  {
    icon: User,
    title: "Driver / Company",
    description: "Register trucks, manage border crossings, pay taxes, renew licenses, and get your E-Card.",
    features: ["Truck Registration", "License Renewal", "Tax Payments", "E-Card Application", "Border Crossings"],
    href: "/register/driver",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: Shield,
    title: "Border Agent",
    description: "Verify driver credentials, scan E-Cards, and manage border crossings efficiently.",
    features: [
      "E-Card Scanning",
      "Document Verification",
      "Border Management",
      "Driver Validation",
      "Truck Inspection",
    ],
    href: "/register/agent",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
  },
  {
    icon: Building,
    title: "System Admin",
    description: "Process payments, issue E-Cards, manage system settings, and oversee operations.",
    features: ["Payment Processing", "E-Card Issuance", "User Management", "System Settings", "Analytics"],
    href: "/register/admin",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
  },
]

export default function RegisterRolePage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl">
              <Truck className="h-8 w-8 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              E-TRUCK
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Choose Your Role</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select your role to access personalized features for truck transportation and border crossing management.
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {roles.map((role) => (
            <Card
              key={role.title}
              className={`relative overflow-hidden border-2 transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer ${
                selectedRole === role.title ? "border-blue-500 shadow-xl" : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setSelectedRole(role.title)}
            >
              <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${role.color}`} />
              <CardHeader className="text-center pb-4">
                <div className={`mx-auto p-4 rounded-2xl ${role.bgColor} mb-4`}>
                  <role.icon className={`h-12 w-12 bg-gradient-to-r ${role.color} bg-clip-text text-transparent`} />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">{role.title}</CardTitle>
                <CardDescription className="text-gray-600 text-base">{role.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  {role.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button
                  className={`w-full bg-gradient-to-r ${role.color} hover:opacity-90 text-white shadow-lg`}
                  asChild
                >
                  <Link href={role.href}>
                    Register as {role.title.split(" / ")[0]}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <div className="text-center">
            <Clock className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Complete Registration Process</h3>
            <p className="text-gray-600 mb-6">
              Fill out detailed registration forms to verify your identity and get access to your personalized
              dashboard.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h4 className="font-semibold text-gray-900">Choose Role</h4>
                <p className="text-sm text-gray-600">Select your role type</p>
              </div>
              <div>
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <h4 className="font-semibold text-gray-900">Complete Registration</h4>
                <p className="text-sm text-gray-600">Fill in detailed information</p>
              </div>
              <div>
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">3</span>
                </div>
                <h4 className="font-semibold text-gray-900">Access Dashboard</h4>
                <p className="text-sm text-gray-600">Start using the system</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
