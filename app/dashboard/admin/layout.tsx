import type React from "react"
import Link from "next/link"
import { Bell, Shield, User, Settings, LogOut, FileText, Home, Users, BarChart3, Database, Cog } from "lucide-react"
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

const navItems = [
  { href: "/dashboard/admin", icon: Home, label: "Dashboard", badge: 0 },
  { href: "/dashboard/admin/users", icon: Users, label: "User Management", badge: 5 },
  { href: "/dashboard/admin/analytics", icon: BarChart3, label: "Analytics", badge: 0 },
  { href: "/dashboard/admin/database", icon: Database, label: "Database", badge: 0 },
  { href: "/dashboard/admin/system", icon: Cog, label: "System Config", badge: 2 },
]

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid min-h-screen w-full grid-cols-[240px_1fr] md:grid-cols-1 lg:grid-cols-1">
      {/* Sidebar - Visible on Mobile, Hidden on Desktop */}
      <div className="border-r bg-secondary/60 md:hidden">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-16 items-center border-b px-4 lg:h-[68px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-2 rounded-xl">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-lg bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Admin Portal
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
                    <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500 text-white">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-auto p-4">
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-800 mb-2">System Status</h3>
              <p className="text-sm text-purple-700 mb-3">
                All systems operational. Monitor performance and manage configurations.
              </p>
              <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                System Health
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        {/* Header */}
        <header className="flex h-16 items-center gap-4 border-b bg-white px-4 lg:h-[68px] lg:px-6 sticky top-0 z-30 shadow-sm">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-2 rounded-xl">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-lg bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Admin Portal
            </span>
          </Link>
          <div className="w-full flex-1">
            <h1 className="text-lg font-semibold text-gray-900">System Administration</h1>
          </div>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <FileText className="h-4 w-4" />
            Export Report
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
              <DropdownMenuLabel>Admin Robert Phiri</DropdownMenuLabel>
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
  )
}
