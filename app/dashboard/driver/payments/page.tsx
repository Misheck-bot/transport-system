"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { PaymentModal } from "@/components/payment-modal"
import { CreditCard, Clock, CheckCircle, AlertCircle, Plus, Calendar } from "lucide-react"

// Mock payment data
const mockPayments = [
  {
    id: 1,
    type: "E-Card Application",
    amount: "K500",
    status: "Completed",
    date: "2024-01-15",
    dueDate: null,
    description: "Digital border crossing card application fee",
  },
  {
    id: 2,
    type: "Vehicle Insurance",
    amount: "K2,500",
    status: "Pending",
    date: "2024-01-20",
    dueDate: "2024-02-15",
    description: "Annual comprehensive vehicle insurance - ABC 123Z",
  },
  {
    id: 3,
    type: "Road Tax",
    amount: "K800",
    status: "Overdue",
    date: "2023-12-01",
    dueDate: "2024-01-01",
    description: "Annual road tax payment - ABC 123Z",
  },
  {
    id: 4,
    type: "License Renewal",
    amount: "K300",
    status: "Pending",
    date: "2024-01-10",
    dueDate: "2024-02-28",
    description: "Driving license renewal fee",
  },
]

export default function Payments() {
  const [payments] = useState(mockPayments)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState<any>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Overdue":
        return "bg-red-100 text-red-800"
      case "Failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "Pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "Overdue":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      case "Failed":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const handlePayNow = (payment: any) => {
    setSelectedPayment(payment)
    setShowPaymentModal(true)
  }

  const totalPending = payments
    .filter((p) => p.status === "Pending" || p.status === "Overdue")
    .reduce((sum, p) => sum + Number.parseInt(p.amount.replace("K", "").replace(",", "")), 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
          <p className="text-gray-600">Manage your payments and fees</p>
        </div>
        <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Make Payment
            </Button>
          </DialogTrigger>
          <PaymentModal
            amount={selectedPayment?.amount || "Select Amount"}
            description={selectedPayment?.description || "Choose payment type: Insurance, Road Tax, or License Renewal"}
            onSuccess={() => setShowPaymentModal(false)}
          />
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Payments</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{payments.length}</div>
            <p className="text-xs text-muted-foreground">All time payments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">K{totalPending.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Outstanding payments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {payments.filter((p) => p.status === "Completed").length}
            </div>
            <p className="text-xs text-muted-foreground">Successful payments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {payments.filter((p) => p.status === "Overdue").length}
            </div>
            <p className="text-xs text-muted-foreground">Overdue payments</p>
          </CardContent>
        </Card>
      </div>

      {/* Payment Types Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Payment Options</CardTitle>
          <CardDescription>Make payments for common services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 bg-transparent"
              onClick={() => handlePayNow({ amount: "K2,500", description: "Vehicle Insurance Payment" })}
            >
              <CreditCard className="h-6 w-6 text-blue-600" />
              <span>Insurance</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 bg-transparent"
              onClick={() => handlePayNow({ amount: "K800", description: "Road Tax Payment" })}
            >
              <Calendar className="h-6 w-6 text-green-600" />
              <span>Road Tax</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 bg-transparent"
              onClick={() => handlePayNow({ amount: "K300", description: "License Renewal Fee" })}
            >
              <CheckCircle className="h-6 w-6 text-purple-600" />
              <span>License Renewal</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 bg-transparent"
              onClick={() => handlePayNow({ amount: "K500", description: "E-Card Application Fee" })}
            >
              <CreditCard className="h-6 w-6 text-orange-600" />
              <span>E-Card</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payments History */}
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>Your recent payment transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  {getStatusIcon(payment.status)}
                  <div>
                    <h4 className="font-medium text-gray-900">{payment.type}</h4>
                    <p className="text-sm text-gray-600">{payment.description}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-gray-500">Date: {new Date(payment.date).toLocaleDateString()}</span>
                      {payment.dueDate && (
                        <span className="text-xs text-gray-500">
                          Due: {new Date(payment.dueDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{payment.amount}</p>
                    <Badge className={getStatusColor(payment.status)}>{payment.status}</Badge>
                  </div>
                  {(payment.status === "Pending" || payment.status === "Overdue") && (
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={() => handlePayNow(payment)}>
                      Pay Now
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
