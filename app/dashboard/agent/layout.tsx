"use client"

import type React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Bell, Shield, User, Settings, LogOut, Search, ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
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

const pageNames: { [key: string]: string } = {
  "/dashboard/agent": "Dashboard",
  "/dashboard/agent/inspections": "Inspections",
  "/dashboard/agent/drivers": "Driver Records",
  "/dashboard/agent/reports": "Reports",
  "/dashboard/agent/alerts": "Security Alerts",
}

export default function AgentDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const currentPageName = pageNames[pathname] || "Agent Portal"
  const isMainDashboard = pathname === "/dashboard/agent"

  const handleBack = () => {
    if (isMainDashboard) {
      router.push("/")
    } else {
      router.push("/dashboard/agent")
    }
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="flex h-16 items-center gap-4 border-b bg-white px-4 lg:h-[68px] lg:px-6 sticky top-0 z-30 shadow-sm">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleBack}
            className="rounded-full hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Go back</span>
          </Button>

          {/* Logo and Title */}
          <Link href="/dashboard/agent" className="flex items-center gap-2 font-semibold">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-2 rounded-xl">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-lg bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Agent Portal
            </span>
          </Link>

          {/* Page Title */}
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-gray-900">{currentPageName}</h1>
          </div>

          {/* Quick Actions */}
          <Link href="/dashboard/agent/drivers">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Search className="h-4 w-4" />
              Search Driver
            </Button>
          </Link>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="rounded-full relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            <span className="sr-only">Toggle notifications</span>
          </Button>

          {/* User Menu */}
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
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-8">
          {children}
        </main>
      </div>
    </Suspense>
  )
}
