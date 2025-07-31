import type React from "react"
import Link from "next/link"
import { Bell, Home, Package, Truck, CreditCard, FileText, User, Settings, LogOut } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

const navItems = [
  { href: "#", icon: Home, label: "Dashboard", badge: 0 },
  { href: "#", icon: Package, label: "My Shipments", badge: 0 },
  { href: "#", icon: Truck, label: "My Trucks", badge: 0 },
  { href: "#", icon: CreditCard, label: "Payments", badge: 2 },
  { href: "#", icon: FileText, label: "Documents", badge: 0 },
]

export default function DashboardLayoutV2({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-secondary/60 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-16 items-center border-b px-4 lg:h-[68px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Truck className="h-6 w-6 text-primary" />
              <span className="text-lg">E-Truck System</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:text-primary hover:bg-primary/10 ${
                    item.label === "Dashboard" ? "bg-primary/10 text-primary" : ""
                  }`}
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
                <Button size="sm" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Pay Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-16 items-center gap-4 border-b bg-background px-4 lg:h-[68px] lg:px-6 sticky top-0 z-30">
          <Link href="#" className="md:hidden">
            <Truck className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </Link>
          <div className="w-full flex-1">{/* Can add a search form here */}</div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Image
                  src="/placeholder.svg?width=40&height=40"
                  width={40}
                  height={40}
                  alt="Avatar"
                  className="rounded-full"
                />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>John Doe</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
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
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-8 bg-background">{children}</main>
      </div>
      <div className={`${inter.className} bg-gray-900 flex justify-center items-center min-h-screen py-8 md:hidden`}>
        <div className="w-full max-w-[430px] mx-auto bg-white rounded-[44px] shadow-2xl overflow-hidden border-[12px] border-black box-content">
          <div className="h-[844px] w-full flex flex-col relative">
            {/* Notch */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 h-8 w-40 bg-black rounded-b-2xl z-50" />
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
