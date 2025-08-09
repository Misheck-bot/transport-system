import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Truck, Shield, Users, Clock, CheckCircle, ArrowRight, Globe, Zap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl">
                <Truck className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                E-Truck Transport System
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="outline" className="bg-transparent">
                  Login
                </Button>
              </Link>
              <Link href="/register/driver">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            🚀 Now Live in Southern Africa
          </Badge>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Streamline Cross-Border Transport
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            The comprehensive digital platform for truck drivers, border agents, and transport administrators. Simplify
            documentation, accelerate border crossings, and manage your fleet efficiently.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register/driver">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                Register as Driver
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="bg-transparent">
                Login to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Everything You Need</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform provides comprehensive tools for all stakeholders in the cross-border transport ecosystem.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Driver Features */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="bg-blue-100 p-3 rounded-full w-fit">
                  <Truck className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>For Drivers</CardTitle>
                <CardDescription>Complete digital solution for professional truck drivers</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Digital E-Card Application</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Truck Registration & Management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Route Planning & Tracking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Document Upload & Storage</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Payment Processing</span>
                  </li>
                </ul>
                <Link href="/register/driver" className="block mt-4">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Register as Driver</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Agent Features */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="bg-green-100 p-3 rounded-full w-fit">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>For Border Agents</CardTitle>
                <CardDescription>Efficient tools for border control and inspection</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">E-Card Scanner & Verification</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Real-time Document Validation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Inspection Reports</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Alert System</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Analytics Dashboard</span>
                  </li>
                </ul>
                <Link href="/register/agent" className="block mt-4">
                  <Button className="w-full bg-green-600 hover:bg-green-700">Register as Agent</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Admin Features */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="bg-purple-100 p-3 rounded-full w-fit">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>For Administrators</CardTitle>
                <CardDescription>Comprehensive system management and oversight</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">User Management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">System Analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Payment Oversight</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Compliance Monitoring</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Report Generation</span>
                  </li>
                </ul>
                <Link href="/register/admin" className="block mt-4">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">Register as Admin</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose E-Truck?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the future of cross-border transport with our innovative digital platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-fit mx-auto mb-4">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Faster Processing</h3>
              <p className="text-sm text-gray-600">
                Reduce border crossing times by up to 70% with digital documentation
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-fit mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Enhanced Security</h3>
              <p className="text-sm text-gray-600">Advanced verification and fraud prevention systems</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 p-4 rounded-full w-fit mx-auto mb-4">
                <Globe className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Regional Coverage</h3>
              <p className="text-sm text-gray-600">Seamless operations across Southern African borders</p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 p-4 rounded-full w-fit mx-auto mb-4">
                <Zap className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">Real-time Updates</h3>
              <p className="text-sm text-gray-600">Live tracking and instant notifications for all stakeholders</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of drivers, agents, and administrators already using E-Truck
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register/driver">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                Start Your Registration
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                Login to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl">
                  <Truck className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold">E-Truck</span>
              </div>
              <p className="text-gray-400 text-sm">
                Revolutionizing cross-border transport across Southern Africa with digital innovation.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">For Drivers</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/register/driver" className="hover:text-white">
                    Register
                  </Link>
                </li>
                <li>
                  <Link href="/features/drivers" className="hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-white">
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">For Agents</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/register/agent" className="hover:text-white">
                    Register
                  </Link>
                </li>
                <li>
                  <Link href="/features/agents" className="hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/training" className="hover:text-white">
                    Training
                  </Link>
                </li>
                <li>
                  <Link href="/documentation" className="hover:text-white">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 E-Truck Transport System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
