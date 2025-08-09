"use client"

import { useState } from "react"
import Link from "next/link"
import { FileText, Download, Calendar, BarChart3, TrendingUp, Users, CheckCircle, AlertTriangle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { Badge } from "@/components/ui/badge"

const reportTypes = [
  {
    id: "daily-summary",
    name: "Daily Summary Report",
    description: "Complete overview of daily border crossing activities",
    icon: FileText,
    lastGenerated: "2024-01-15 15:30"
  },
  {
    id: "driver-activity",
    name: "Driver Activity Report",
    description: "Detailed driver crossing history and verification status",
    icon: Users,
    lastGenerated: "2024-01-15 12:00"
  },
  {
    id: "security-incidents",
    name: "Security Incidents Report",
    description: "Summary of flagged cases and security alerts",
    icon: AlertTriangle,
    lastGenerated: "2024-01-15 09:15"
  },
  {
    id: "performance-metrics",
    name: "Performance Metrics",
    description: "Agent performance and processing time analytics",
    icon: BarChart3,
    lastGenerated: "2024-01-14 18:45"
  }
]

const recentReports = [
  {
    id: "RPT-001",
    name: "Daily Summary - January 15, 2024",
    type: "Daily Summary",
    generatedBy: "Agent Sarah Johnson",
    timestamp: "2024-01-15 15:30",
    status: "completed",
    size: "2.4 MB"
  },
  {
    id: "RPT-002",
    name: "Driver Activity - Week 2",
    type: "Driver Activity",
    generatedBy: "Agent Sarah Johnson",
    timestamp: "2024-01-15 12:00",
    status: "completed",
    size: "1.8 MB"
  },
  {
    id: "RPT-003",
    name: "Security Incidents - January 2024",
    type: "Security Incidents",
    generatedBy: "Agent Sarah Johnson",
    timestamp: "2024-01-15 09:15",
    status: "processing",
    size: "0.9 MB"
  }
]

export default function ReportsPage() {
  const [selectedReportType, setSelectedReportType] = useState("")
  const [dateRange, setDateRange] = useState<any>(null)

  const handleGenerateReport = (reportType: string) => {
    console.log(`Generating ${reportType} report...`)
    // Here you would implement the actual report generation logic
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
      case "processing":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Processing</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Failed</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600">Generate and manage border crossing reports</p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/agent">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <FileText className="mr-2 h-4 w-4" />
            Quick Report
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reports Generated</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Crossings</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">1,247</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">1,189</div>
            <p className="text-xs text-muted-foreground">95.3% approval rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Flagged Cases</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">58</div>
            <p className="text-xs text-muted-foreground">4.7% of total</p>
          </CardContent>
        </Card>
      </div>

      {/* Report Generator */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Generate New Report</CardTitle>
          <CardDescription>Create custom reports for specific time periods and data types</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="text-sm font-medium mb-2 block">Report Type</label>
              <Select value={selectedReportType} onValueChange={setSelectedReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Date Range</label>
              <DatePickerWithRange date={dateRange} setDate={setDateRange} />
            </div>
            <div className="flex items-end">
              <Button 
                className="w-full bg-purple-600 hover:bg-purple-700"
                disabled={!selectedReportType}
                onClick={() => handleGenerateReport(selectedReportType)}
              >
                <FileText className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Templates */}
      <div className="grid gap-4 md:grid-cols-2 mb-6">
        {reportTypes.map((reportType) => {
          const IconComponent = reportType.icon
          return (
            <Card key={reportType.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IconComponent className="h-5 w-5 text-purple-600" />
                  {reportType.name}
                </CardTitle>
                <CardDescription>{reportType.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Last generated:</p>
                    <p className="text-sm font-medium">{reportType.lastGenerated}</p>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleGenerateReport(reportType.id)}
                  >
                    Generate
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>Your recently generated reports and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <FileText className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{report.name}</h4>
                    <p className="text-sm text-gray-500">
                      Generated by {report.generatedBy} • {report.timestamp} • {report.size}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(report.status)}
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
