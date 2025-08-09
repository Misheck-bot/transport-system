"use client"

import { useState, useEffect } from "react"
import { useSession, signOut } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"
import { ArrowLeft, Bell, User, Settings, LogOut, Shield } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const [notificationCount, setNotificationCount] = useState(0)
  const [isLoadingNotifications, setIsLoadingNotifications] = useState(false)

  const isMainDashboard = pathname === "/dashboard/admin"

  useEffect(() => {
    fetchNotificationCount()
    // Set up polling for notifications every 30 seconds
    const interval = setInterval(fetchNotificationCount, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchNotificationCount = async () => {
    try {
      setIsLoadingNotifications(true)
      const response = await fetch("/api/admin/notifications")
      if (response.ok) {
        const data = await response.json()
        setNotificationCount(data.unreadCount || 0)
      }
    } catch (error) {
      console.error("Error fetching notifications:", error)
    } finally {
      setIsLoadingNotifications(false)
    }
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/login" })
  }

  const handleBackClick = () => {
    router.push("/dashboard/admin")
  }

  const handleNotificationClick = () => {
    // For now, just refresh the count
    fetchNotificationCount()
  }

  const getPageTitle = () => {
    const pathSegments = pathname.split("/")
    const lastSegment = pathSegments[pathSegments.length - 1]
    
    switch (lastSegment) {
      case "users": return "User Management"
      case "payments": return "Payment Management"
      case "analytics": return "Analytics & Reports"
      case "database": return "Database Management"
      case "system": return "System Configuration"
      case "profile": return "Admin Profile"
      default: return "Admin Dashboard"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Full Width */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {!isMainDashboard && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBackClick}
                  className="gap-2 hover:bg-gray-100"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
              )}
              
              <Link href="/dashboard/admin" className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-2 rounded-xl">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    {getPageTitle()}
                  </h1>
                  <p className="text-sm text-gray-600">
                    E-Truck Transport System
                  </p>
                </div>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              {/* Notifications */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative hover:bg-gray-100"
                onClick={handleNotificationClick}
                disabled={isLoadingNotifications}
              >
                <Bell className={`h-5 w-5 ${isLoadingNotifications ? 'animate-pulse' : ''}`} />
                {notificationCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-red-500 text-white flex items-center justify-center">
                    {notificationCount > 99 ? '99+' : notificationCount}
                  </Badge>
                )}
                <span className="sr-only">Notifications</span>
              </Button>

              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-gray-100">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder-user.jpg" alt="Profile" />
                      <AvatarFallback className="bg-purple-100 text-purple-700">
                        {session?.user?.name?.charAt(0) || 'A'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {session?.user?.name || 'Administrator'}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {session?.user?.email}
                      </p>
                      <Badge variant="secondary" className="w-fit mt-1">
                        <Shield className="h-3 w-3 mr-1" />
                        Admin
                      </Badge>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push("/dashboard/admin/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/dashboard/admin/system")}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>System Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Full Width */}
      <main className="p-6 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  )
}
