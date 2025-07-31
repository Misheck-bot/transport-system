import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import "./globals.css"
import { cn } from "@/lib/utils"
import { Providers } from "./providers"

export const metadata: Metadata = {
  title: "E-Truck Transport System",
  description: "The Future of African Logistics.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <body className={cn("min-h-screen bg-background font-sans antialiased", GeistSans.className)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
