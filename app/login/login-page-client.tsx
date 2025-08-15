"use client"

import type React from "react"
import { Suspense, useState } from "react"
import { signIn, getSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Loader2 } from "lucide-react"

function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Invalid email or password. Please check your credentials and try again.")
      } else if (result?.ok) {
        // Get the session to determine the user's role
        const session = await getSession()
        if (session?.user?.role) {
          // Redirect based on user role
          switch (session.user.role) {
            case "admin":
              router.push("/dashboard/admin")
              break
            case "agent":
              router.push("/dashboard/agent")
              break
            case "driver":
              router.push("/dashboard/driver")
              break
            default:
              router.push("/dashboard")
          }
        } else {
          router.push(callbackUrl)
        }
      }
    } catch (error) {
      console.error("Login error:", error)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const fillDemoCredentials = (role: "admin" | "agent" | "driver") => {
    const credentials = {
      admin: { email: "admin@etruck.com", password: "admin123" },
      agent: { email: "agent@etruck.com", password: "agent123" },
      driver: { email: "driver@etruck.com", password: "driver123" },
    }

    setEmail(credentials[role].email)
    setPassword(credentials[role].password)
    setError("")
  }

  return (
    <div className="bg-white rounded-lg shadow-xl p-8 space-y-6 animate-pulse">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto"></div>
        <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              className="w-full pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
            >
              {showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
            </Button>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => fillDemoCredentials("admin")}
          disabled={isLoading}
          className="justify-start"
        >
          <div className="text-left">
            <div className="font-medium">Admin Demo</div>
            <div className="text-xs text-gray-500">admin@etruck.com</div>
          </div>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => fillDemoCredentials("agent")}
          disabled={isLoading}
          className="justify-start"
        >
          <div className="text-left">
            <div className="font-medium">Agent Demo</div>
            <div className="text-xs text-gray-500">agent@etruck.com</div>
          </div>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => fillDemoCredentials("driver")}
          disabled={isLoading}
          className="justify-start"
        >
          <div className="text-left">
            <div className="font-medium">Driver Demo</div>
            <div className="text-xs text-gray-500">driver@etruck.com</div>
          </div>
        </Button>
      </div>
    </div>
  )
}

function LoginPageSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-xl p-8 space-y-6 animate-pulse">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto"></div>
        <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
      </div>

      <div className="space-y-4">
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="h-8 bg-gray-200 rounded"></div>
        <div className="h-8 bg-gray-200 rounded"></div>
        <div className="h-8 bg-gray-200 rounded"></div>
      </div>
    </div>
  )
}

function LoginPageContent() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <Suspense fallback={<LoginPageSkeleton />}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}

export default LoginPageContent
