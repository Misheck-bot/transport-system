"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileText, Upload, Eye, Download, Trash2, CheckCircle, AlertCircle, Clock } from "lucide-react"

// Mock documents data
const mockDocuments = [
  {
    id: 1,
    name: "Driving License",
    type: "license",
    status: "Approved",
    uploadDate: "2024-01-15",
    expiryDate: "2026-01-15",
    fileSize: "2.3 MB",
    fileName: "driving_license.pdf",
  },
  {
    id: 2,
    name: "Vehicle Registration - ABC 123Z",
    type: "registration",
    status: "Pending",
    uploadDate: "2024-01-20",
    expiryDate: "2024-12-15",
    fileSize: "1.8 MB",
    fileName: "vehicle_reg_abc123z.pdf",
  },
  {
    id: 3,
    name: "Insurance Certificate - ABC 123Z",
    type: "insurance",
    status: "Expired",
    uploadDate: "2023-11-10",
    expiryDate: "2024-01-10",
    fileSize: "1.2 MB",
    fileName: "insurance_cert_abc123z.pdf",
  },
  {
    id: 4,
    name: "E-Card Application",
    type: "ecard",
    status: "Approved",
    uploadDate: "2024-01-18",
    expiryDate: "2026-01-18",
    fileSize: "0.8 MB",
    fileName: "ecard_application.pdf",
  },
]

export default function Documents() {
  const [documents] = useState(mockDocuments)
  const [uploadingFile, setUploadingFile] = useState<string | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Expired":
        return "bg-red-100 text-red-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "Pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "Expired":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      case "Rejected":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return <FileText className="h-4 w-4 text-gray-600" />
    }
  }

  const handleFileUpload = async (type: string, file: File) => {
    setUploadingFile(type)

    // Simulate file upload
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setUploadingFile(null)
    // Here you would typically update the documents list
  }

  const isExpiringSoon = (date: string) => {
    const expiryDate = new Date(date)
    const today = new Date()
    const diffTime = expiryDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 30 && diffDays > 0
  }

  const isExpired = (date: string) => {
    const expiryDate = new Date(date)
    const today = new Date()
    return expiryDate < today
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
        <p className="text-gray-600">Manage your driving and vehicle documents</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{documents.length}</div>
            <p className="text-xs text-muted-foreground">Uploaded documents</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {documents.filter((d) => d.status === "Approved").length}
            </div>
            <p className="text-xs text-muted-foreground">Verified documents</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {documents.filter((d) => d.status === "Pending").length}
            </div>
            <p className="text-xs text-muted-foreground">Under review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {documents.filter((d) => isExpiringSoon(d.expiryDate)).length}
            </div>
            <p className="text-xs text-muted-foreground">Need renewal</p>
          </CardContent>
        </Card>
      </div>

      {/* Upload New Documents */}
      <Card>
        <CardHeader>
          <CardTitle>Upload New Documents</CardTitle>
          <CardDescription>Add or update your documents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Driving License Upload */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <Label htmlFor="license-upload" className="cursor-pointer">
                <span className="text-sm font-medium text-blue-600 hover:text-blue-500">
                  {uploadingFile === "license" ? "Uploading..." : "Upload License"}
                </span>
                <Input
                  id="license-upload"
                  type="file"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleFileUpload("license", file)
                  }}
                  disabled={uploadingFile === "license"}
                />
              </Label>
              <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG up to 10MB</p>
            </div>

            {/* Vehicle Registration Upload */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <Label htmlFor="registration-upload" className="cursor-pointer">
                <span className="text-sm font-medium text-blue-600 hover:text-blue-500">
                  {uploadingFile === "registration" ? "Uploading..." : "Vehicle Registration"}
                </span>
                <Input
                  id="registration-upload"
                  type="file"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleFileUpload("registration", file)
                  }}
                  disabled={uploadingFile === "registration"}
                />
              </Label>
              <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG up to 10MB</p>
            </div>

            {/* Insurance Certificate Upload */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <Label htmlFor="insurance-upload" className="cursor-pointer">
                <span className="text-sm font-medium text-blue-600 hover:text-blue-500">
                  {uploadingFile === "insurance" ? "Uploading..." : "Insurance Certificate"}
                </span>
                <Input
                  id="insurance-upload"
                  type="file"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleFileUpload("insurance", file)
                  }}
                  disabled={uploadingFile === "insurance"}
                />
              </Label>
              <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG up to 10MB</p>
            </div>

            {/* Other Documents Upload */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <Label htmlFor="other-upload" className="cursor-pointer">
                <span className="text-sm font-medium text-blue-600 hover:text-blue-500">
                  {uploadingFile === "other" ? "Uploading..." : "Other Documents"}
                </span>
                <Input
                  id="other-upload"
                  type="file"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleFileUpload("other", file)
                  }}
                  disabled={uploadingFile === "other"}
                />
              </Label>
              <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG up to 10MB</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Documents</CardTitle>
          <CardDescription>Manage your uploaded documents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {documents.map((document) => (
              <div key={document.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  {getStatusIcon(document.status)}
                  <div>
                    <h4 className="font-medium text-gray-900">{document.name}</h4>
                    <p className="text-sm text-gray-600">
                      Uploaded: {new Date(document.uploadDate).toLocaleDateString()} • Size: {document.fileSize}
                    </p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-gray-500">
                        Expires: {new Date(document.expiryDate).toLocaleDateString()}
                      </span>
                      {isExpired(document.expiryDate) && (
                        <Badge className="bg-red-100 text-red-800 text-xs">Expired</Badge>
                      )}
                      {isExpiringSoon(document.expiryDate) && !isExpired(document.expiryDate) && (
                        <Badge className="bg-yellow-100 text-yellow-800 text-xs">Expiring Soon</Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge className={getStatusColor(document.status)}>{document.status}</Badge>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
