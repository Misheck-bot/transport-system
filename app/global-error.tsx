"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RefreshCw, AlertTriangle } from "lucide-react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-100 p-4">
          <Card className="w-full max-w-md text-center shadow-xl">
            <CardHeader className="space-y-4">
              <div className="flex items-center justify-center">
                <div className="bg-red-600 p-3 rounded-lg">
                  <AlertTriangle className="h-8 w-8 text-white" />
                </div>
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900">Application Error</CardTitle>
                <CardDescription>A critical error occurred in the E-Truck Transport System</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">We're sorry, but something went wrong. Please try refreshing the page.</p>

              <Button onClick={reset} className="w-full">
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>

              <div className="text-xs text-gray-500 mt-4">
                <p>Error ID: {error.digest}</p>
                <p>If this problem persists, please contact technical support.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </body>
    </html>
  )
}
