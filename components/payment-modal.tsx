"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CreditCard, Smartphone, CheckCircle, Loader2 } from "lucide-react"

interface PaymentModalProps {
  amount: string
  description: string
  onSuccess?: () => void
}

export function PaymentModal({ amount, description, onSuccess }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState("mobile")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  })

  const handlePayment = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setIsProcessing(false)
    setIsSuccess(true)

    // Call success callback after 2 seconds
    setTimeout(() => {
      onSuccess?.()
      setIsSuccess(false)
    }, 2000)
  }

  if (isSuccess) {
    return (
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col items-center justify-center py-8">
          <div className="bg-green-100 p-4 rounded-full mb-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Payment Successful!</h3>
          <p className="text-gray-600 text-center">Your payment of {amount} has been processed successfully.</p>
        </div>
      </DialogContent>
    )
  }

  return (
    <DialogContent className="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>Complete Payment</DialogTitle>
        <DialogDescription>
          {description} - Amount: {amount}
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        {/* Payment Method Selection */}
        <div>
          <Label className="text-base font-medium">Select Payment Method</Label>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mt-2">
            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
              <RadioGroupItem value="mobile" id="mobile" />
              <Label htmlFor="mobile" className="flex items-center gap-2 cursor-pointer">
                <Smartphone className="h-4 w-4" />
                Mobile Money (MTN, Airtel, Zamtel)
              </Label>
            </div>
            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                <CreditCard className="h-4 w-4" />
                Visa/Mastercard
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Mobile Money Form */}
        {paymentMethod === "mobile" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Mobile Money Payment</CardTitle>
              <CardDescription>Enter your mobile number to receive a payment prompt</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="phone">Mobile Number</Label>
                <Input
                  id="phone"
                  placeholder="+260 97X XXX XXX"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" size="sm" className="text-yellow-600 border-yellow-600 bg-transparent">
                  MTN
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 border-red-600 bg-transparent">
                  Airtel
                </Button>
                <Button variant="outline" size="sm" className="text-blue-600 border-blue-600 bg-transparent">
                  Zamtel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Card Payment Form */}
        {paymentMethod === "card" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Card Payment</CardTitle>
              <CardDescription>Enter your card details securely</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="cardName">Cardholder Name</Label>
                <Input
                  id="cardName"
                  placeholder="John Doe"
                  value={cardDetails.name}
                  onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={cardDetails.number}
                  onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    value={cardDetails.expiry}
                    onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Payment Button */}
        <Button
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing Payment...
            </>
          ) : (
            `Pay ${amount}`
          )}
        </Button>
      </div>
    </DialogContent>
  )
}
