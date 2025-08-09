"use client"

import { useState, useEffect } from "react"
import { Database, Server, HardDrive, Activity, RefreshCw, Download, Upload, Trash2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { toast } from "sonner"

interface DatabaseStats {
  collections: Array<{
    name: string
    documents: number
    size: string
    indexes: number
  }>
  totalSize: string
  totalDocuments: number
  connectionStatus: "connected" | "disconnected"
  lastBackup: string
  serverInfo: {
    version: string
    uptime: string
    memory: string
  }
}

export default function DatabaseManagement() {
  const [dbStats, setDbStats] = useState<DatabaseStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchDatabaseStats()
  }, [])

  const fetchDatabaseStats = async () => {
    try {
      setLoading(true)
      // Mock data - replace with real API endpoint
      setDbStats({
        collections: [
          { name: "users", documents: 156, size: "2.4 MB", indexes: 3 },
          { name: "payments", documents: 89, size: "1.8 MB", indexes: 2 },
          { name: "trucks", documents: 124, size: "3.2 MB", indexes: 4 },
          { name: "documents", documents: 267, size: "45.6 MB", indexes: 2 },
          { name: "routes", documents: 78, size: "1.2 MB", indexes: 3 },
          { name: "ecards", documents: 67, size: "890 KB", indexes: 2 },
          { name: "sessions", documents: 234, size: "456 KB", indexes: 1 }
        ],
        totalSize: "54.5 MB",
        totalDocuments: 1015,
        connectionStatus: "connected",
        lastBackup: new Date(Date.now() - 86400000).toISOString(),
        serverInfo: {
          version: "MongoDB 7.0.4",
          uptime: "15 days, 8 hours",
          memory: "2.1 GB"
        }
      })
    } catch (error) {
      console.error("Error fetching database stats:", error)
      toast.error("Failed to load database statistics")
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchDatabaseStats()
    setRefreshing(false)
    toast.success("Database statistics refreshed")
  }

  const handleBackup = async () => {
    toast.info("Starting database backup...")
    // Simulate backup process
    setTimeout(() => {
      toast.success("Database backup completed successfully")
    }, 3000)
  }

  const handleOptimize = async () => {
    toast.info("Optimizing database...")
    // Simulate optimization process
    setTimeout(() => {
      toast.success("Database optimization completed")
    }, 2000)
  }

  if (loading) {
    return <div className="text-center py-8">Loading database information...</div>
  }

  if (!dbStats) {
    return <div className="text-center py-8">Failed to load database information</div>
  }

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Database Management</h1>
          <p className="text-gray-600">Monitor and manage database operations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={handleBackup}>
            <Download className="h-4 w-4 mr-2" />
            Backup
          </Button>
        </div>
      </div>

      {/* Database Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Connection Status</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Badge className={dbStats.connectionStatus === "connected" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                {dbStats.connectionStatus}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {dbStats.serverInfo.version}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dbStats.totalDocuments.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Across {dbStats.collections.length} collections
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Database Size</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dbStats.totalSize}</div>
            <p className="text-xs text-muted-foreground">
              Memory usage: {dbStats.serverInfo.memory}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Server Uptime</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{dbStats.serverInfo.uptime}</div>
            <p className="text-xs text-muted-foreground">
              Last backup: {new Date(dbStats.lastBackup).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Collections Table */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Database Collections</CardTitle>
          <CardDescription>Overview of all collections and their statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Collection</TableHead>
                <TableHead>Documents</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Indexes</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dbStats.collections.map((collection) => (
                <TableRow key={collection.name}>
                  <TableCell className="font-medium">{collection.name}</TableCell>
                  <TableCell>{collection.documents.toLocaleString()}</TableCell>
                  <TableCell>{collection.size}</TableCell>
                  <TableCell>{collection.indexes}</TableCell>
                  <TableCell>
                    <Progress 
                      value={(collection.documents / dbStats.totalDocuments) * 100} 
                      className="w-20"
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      <Button variant="ghost" size="sm">
                        <Upload className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Database Operations */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Backup & Restore</CardTitle>
            <CardDescription>Manage database backups</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleBackup} className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Create Backup
            </Button>
            <Button variant="outline" className="w-full">
              <Upload className="h-4 w-4 mr-2" />
              Restore from Backup
            </Button>
            <p className="text-xs text-muted-foreground">
              Last backup: {new Date(dbStats.lastBackup).toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Maintenance</CardTitle>
            <CardDescription>Database optimization tools</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleOptimize} className="w-full">
              <Activity className="h-4 w-4 mr-2" />
              Optimize Database
            </Button>
            <Button variant="outline" className="w-full">
              <RefreshCw className="h-4 w-4 mr-2" />
              Rebuild Indexes
            </Button>
            <p className="text-xs text-muted-foreground">
              Regular maintenance improves performance
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monitoring</CardTitle>
            <CardDescription>Real-time database metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>CPU Usage</span>
                <span>23%</span>
              </div>
              <Progress value={23} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Memory Usage</span>
                <span>67%</span>
              </div>
              <Progress value={67} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Disk I/O</span>
                <span>12%</span>
              </div>
              <Progress value={12} />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
