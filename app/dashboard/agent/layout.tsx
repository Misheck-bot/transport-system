import type React from "react"
import Link from "next/link"
import {
  Bell,
  Shield,
  User,
  Settings,
  LogOut,
  Search,
  Home,
  FileCheck,
  Users,
  BarChart3,
  AlertTriangle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { Suspense } from "react"

const navItems = [
  { href: "/dashboard/agent", icon: Home, label: "Dashboard", badge: 0 },
  { href: "/dashboard/agent/inspections", icon: FileCheck, label: "Inspections", badge: 3 },
  { href: "/dashboard/agent/drivers", icon: Users, label: "Driver Records", badge: 0 },
  { href: "/dashboard/agent/reports", icon: BarChart3, label: "Reports", badge: 0 },
  { href: "/dashboard/agent/alerts", icon: AlertTriangle, label: "Security Alerts", badge: 1 },
]

export default function AgentDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="grid min-h-screen w-full grid-cols-[240px_1fr] md:grid-cols-1 lg:grid-cols-1">
        {/* Sidebar - Visible on Mobile, Hidden on Desktop */}
        <div className="border-r bg-secondary/60 md:hidden">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-16 items-center border-b px-4 lg:h-[68px] lg:px-6">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-2 rounded-xl">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <span className="text-lg bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Agent Portal
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
                      <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500 text-white">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="mt-auto p-4">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">Border Security</h3>
                <p className="text-sm text-green-700 mb-3">
                  Monitor cross-border activities and ensure compliance with regulations.
                </p>
                <Button size="sm" className="w-full bg-green-600 hover:bg-green-700 text-white">
                  View Guidelines
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          {/* Header */}
          <header className="flex h-16 items-center gap-4 border-b bg-white px-4 lg:h-[68px] lg:px-6 sticky top-0 z-30 shadow-sm">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-2 rounded-xl">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-lg bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Agent Portal
              </span>
            </Link>
            <div className="w-full flex-1">
              <h1 className="text-lg font-semibold text-gray-900">Border Agent Dashboard</h1>
            </div>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Search className="h-4 w-4" />
              Search Driver
            </Button>
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
                <DropdownMenuLabel>Agent Sarah Johnson</DropdownMenuLabel>
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

          {/* Main Content */}
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-8 bg-gray-50">{children}</main>
        </div>
      </div>
    </Suspense>
  )
}
