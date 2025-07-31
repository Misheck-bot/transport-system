"use client"
import { CreditCard, Truck, FileText, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { PaymentModal } from "@/components/payment-modal"
import { useState } from "react"
import Link from "next/link"

export default function DriverDashboard() {
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showECardPayment, setShowECardPayment] = useState(false)

  return (
    <>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Your Driver Portal</h1>
        <p className="text-gray-600">Manage your trucks, documents, and border crossings all in one place.</p>
      </div>

      {/* Quick Stats - Empty State */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">License Status</CardTitle>
            <FileText className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-400">--</div>
            <p className="text-xs text-gray-500">Upload your license</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">E-Card Status</CardTitle>
            <CreditCard className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-400">--</div>
            <p className="text-xs text-gray-500">Apply for E-Card</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Border Crossings</CardTitle>
            <MapPin className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-400">0</div>
            <p className="text-xs text-gray-500">No crossings yet</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">My Trucks</CardTitle>
            <Truck className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-400">0</div>
            <p className="text-xs text-gray-500">Register your first truck</p>
          </CardContent>
        </Card>
      </div>

      {/* Empty States */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {/* Border Crossings - Empty State */}
        <Card className="lg:col-span-2 bg-white border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle className="text-gray-900">Border Crossings</CardTitle>
              <CardDescription>Your border crossing history will appear here.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No border crossings yet</h3>
              <p className="text-gray-500 mb-4">Once you start crossing borders, your history will appear here.</p>
            </div>
          </CardContent>
        </Card>

        {/* Getting Started */}
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-900">Getting Started</CardTitle>
            <CardDescription>Complete these steps to get started</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="bg-blue-100 rounded-full w-6 h-6 flex items-center justify-center mt-0.5">
                <span className="text-blue-600 font-bold text-sm">1</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-900">Register Your First Truck</p>
                <p className="text-xs text-blue-700">Add your vehicle details and documents</p>
                <Link href="/dashboard/driver/register-truck">
                  <Button size="sm" className="mt-2 bg-blue-500 hover:bg-blue-600 text-white">
                    Register Truck
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
              <div className="bg-orange-100 rounded-full w-6 h-6 flex items-center justify-center mt-0.5">
                <span className="text-orange-600 font-bold text-sm">2</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-orange-900">Upload Your License</p>
                <p className="text-xs text-orange-700">Upload your driving license documents</p>
                <Link href="/dashboard/driver/upload-license">
                  <Button size="sm" className="mt-2 bg-orange-500 hover:bg-orange-600 text-white">
                    Upload License
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="bg-green-100 rounded-full w-6 h-6 flex items-center justify-center mt-0.5">
                <span className="text-green-600 font-bold text-sm">3</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-green-900">Apply for E-Card</p>
                <p className="text-xs text-green-700">Get your digital border crossing card</p>
                <Dialog open={showECardPayment} onOpenChange={setShowECardPayment}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="mt-2 bg-green-500 hover:bg-green-600 text-white">
                      Apply Now
                    </Button>
                  </DialogTrigger>
                  <PaymentModal
                    amount="K500"
                    description="E-Card Application Fee"
                    onSuccess={() => setShowECardPayment(false)}
                  />
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/dashboard/driver/register-truck">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-lg">
                  <Truck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Register Truck</h3>
                  <p className="text-sm text-blue-100">Add a new vehicle</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/driver/documents">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-lg">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Upload Documents</h3>
                  <p className="text-sm text-green-100">Add your documents</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/driver/plan-route">
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-lg">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Plan Route</h3>
                  <p className="text-sm text-purple-100">Border crossing route</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
          <DialogTrigger asChild>
            <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <CreditCard className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Make Payment</h3>
                    <p className="text-sm text-orange-100">Pay fees & taxes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </DialogTrigger>
          <PaymentModal
            amount="Select Amount"
            description="Choose payment type: Insurance, Road Tax, or License Renewal"
            onSuccess={() => setShowPaymentModal(false)}
          />
        </Dialog>
      </div>
    </>
  )
}
