"use client"

import type React from "react"
import Link from "next/link"
import { Bell, User, Settings, LogOut, Plus, Truck, Home, CreditCard, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { PaymentModal } from "@/components/payment-modal"
import { useState } from "react"

const navItems = [
  { href: "/dashboard/driver", icon: Home, label: "Dashboard", badge: 0 },
  { href: "/dashboard/driver/trucks", icon: Truck, label: "My Trucks", badge: 0 },
  { href: "/dashboard/driver/payments", icon: CreditCard, label: "Payments", badge: 2 },
  { href: "/dashboard/driver/documents", icon: FileText, label: "Documents", badge: 0 },
]

export default function DriverDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  return (
    <div className="grid min-h-screen w-full grid-cols-[240px_1fr] md:grid-cols-1 lg:grid-cols-1">
      {/* Sidebar - Visible on Mobile, Hidden on Desktop */}
      <div className="border-r bg-secondary/60 md:hidden">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-16 items-center border-b px-4 lg:h-[68px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl">
                <Truck className="h-6 w-6 text-white" />
              </div>
              <span className="text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Driver Portal
              </span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:text-primary hover:bg-primary/10"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                  {item.badge > 0 && (
                    <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Card className="bg-primary/10 border-primary/20">
              <CardHeader className="p-4">
                <CardTitle>Get Your E-Card</CardTitle>
                <CardDescription>
                  Unlock seamless border crossing. Pay K500 to get your digital E-Card today.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      Pay Now
                    </Button>
                  </DialogTrigger>
                  <PaymentModal
                    amount="K500"
                    description="E-Card Application Fee"
                    onSuccess={() => setShowPaymentModal(false)}
                  />
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        {/* Header */}
        <header className="flex h-16 items-center gap-4 border-b bg-white px-4 lg:h-[68px] lg:px-6 sticky top-0 z-30 shadow-sm">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl">
              <Truck className="h-6 w-6 text-white" />
            </div>
            <span className="text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Driver Portal
            </span>
          </Link>
          <div className="w-full flex-1">
            <h1 className="text-lg font-semibold text-gray-900">Driver Dashboard</h1>
          </div>
          <Link href="/dashboard/driver/register-truck">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Plus className="h-4 w-4" />
              Register Truck
            </Button>
          </Link>

          {/* Notifications */}
          <Sheet open={showNotifications} onOpenChange={setShowNotifications}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs bg-red-500">
                  3
                </Badge>
                <span className="sr-only">Toggle notifications</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Notifications</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm font-medium text-blue-900">License Renewal Due</p>
                    <p className="text-xs text-blue-700">Your driving license expires in 30 days</p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <p className="text-sm font-medium text-orange-900">Insurance Payment</p>
                    <p className="text-xs text-orange-700">Vehicle insurance payment is due</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm font-medium text-green-900">E-Card Approved</p>
                    <p className="text-xs text-green-700">Your E-Card application has been approved</p>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-gray-500" />
                </div>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Your Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/driver/profile">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Main Content */}
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-8 bg-gray-50">{children}</main>
      </div>
    </div>
  )
}
