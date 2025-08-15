import { Truck, Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex flex-col items-center space-y-6">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-3 rounded-lg">
            <Truck className="h-8 w-8 text-white" />
          </div>
          <span className="text-3xl font-bold text-gray-900">E-Truck</span>
        </div>
        <div className="flex items-center space-x-3">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          <span className="text-lg text-gray-600">Loading E-Truck Transport System...</span>
        </div>
        <div className="w-64 bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: "60%" }}></div>
        </div>
      </div>
    </div>
  )
}
