"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Truck, Eye, EyeOff, Loader2, User, Shield, UserCheck } from "lucide-react"
import { toast } from "sonner"

const demoAccounts = [
  { role: "admin", email: "admin@etruck.com", password: "admin123", icon: Shield, color: "bg-red-600" },
  { role: "agent", email: "agent@etruck.com", password: "agent123", icon: UserCheck, color: "bg-blue-600" },
  { role: "driver", email: "driver@etruck.com", password: "driver123", icon: User, color: "bg-green-600" },
]

export default function LoginForm() {
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
        setError("Invalid email or password")
        toast.error("Login failed", {
          description: "Please check your credentials and try again.",
        })
      } else {
        toast.success("Login successful", {
          description: "Welcome to E-Truck Transport System!",
        })
        router.push(callbackUrl)
      }
    } catch (error) {
      setError("An error occurred during login")
      toast.error("Login error", {
        description: "Something went wrong. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = (account: (typeof demoAccounts)[0]) => {
    setEmail(account.email)
    setPassword(account.password)
    toast.info(`Demo account selected`, {
      description: `Logging in as ${account.role}`,
    })
  }

  return (
    <Card className="shadow-xl border-0">
      <CardHeader className="text-center space-y-4">
        <div className="flex items-center justify-center">
          <div className="bg-blue-600 p-3 rounded-lg">
            <Truck className="h-8 w-8 text-white" />
          </div>
        </div>
        <div>
          <CardTitle className="text-2xl font-bold text-gray-900">Welcome Back</CardTitle>
          <CardDescription className="text-gray-600">Sign in to your E-Truck Transport System account</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
              className="h-11"
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
                className="h-11 pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </Button>
            </div>
          </div>

          <Button type="submit" className="w-full h-11" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <div className="space-y-3">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-3">Try demo accounts:</p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {demoAccounts.map((account) => {
              const IconComponent = account.icon
              return (
                <Button
                  key={account.role}
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin(account)}
                  disabled={isLoading}
                  className="flex flex-col items-center gap-1 h-auto py-3 text-xs"
                >
                  <div className={`p-1.5 rounded ${account.color}`}>
                    <IconComponent className="h-3 w-3 text-white" />
                  </div>
                  <span className="capitalize">{account.role}</span>
                </Button>
              )
            })}
          </div>
        </div>

        <div className="text-center text-sm text-gray-600">
          <p>
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
