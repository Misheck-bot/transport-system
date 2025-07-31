import { Bell, ArrowRight, Clock, Home, Wallet, User, TruckIcon, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { icon: Home, label: "Home", active: true },
  { icon: TruckIcon, label: "My Trucks", active: false },
  { icon: Wallet, label: "Payments", active: false },
  { icon: User, label: "Profile", active: false },
]

export default function MobileDashboard() {
  return (
    <>
      <main className="flex-1 overflow-y-auto bg-[#F4F4F8] text-gray-900 px-5 pt-6 pb-4 space-y-5">
        {/* Header */}
        <header className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-gray-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Hello,</p>
              <h1 className="font-bold text-lg text-gray-800">Welcome</h1>
            </div>
          </div>
          <div className="relative">
            <Bell className="h-6 w-6 text-gray-600" />
          </div>
        </header>

        {/* Hero Card */}
        <div className="relative rounded-2xl overflow-hidden h-36 flex items-end p-4 text-white shadow-lg bg-gradient-to-r from-blue-500 to-purple-600">
          <div className="z-20">
            <h2 className="text-xl font-bold">Get Started with E-Truck</h2>
            <p className="text-sm opacity-90">Register your truck and apply for E-Card</p>
          </div>
        </div>

        {/* Getting Started */}
        <div className="bg-[#007AFF] text-white p-5 rounded-2xl shadow-lg shadow-blue-500/20">
          <h3 className="text-lg font-bold">Complete Your Setup</h3>
          <p className="text-sm opacity-90 mb-4">Follow these steps to get started</p>
          <button className="w-full bg-white text-[#007AFF] font-semibold p-4 rounded-xl flex justify-between items-center text-left">
            <div className="flex items-center gap-3">
              <Plus className="h-5 w-5" />
              <span className="text-gray-800">Register Your First Truck</span>
            </div>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-[#7B61FF] text-white p-4 rounded-2xl flex justify-between items-center shadow-lg shadow-purple-500/20">
            <div className="flex items-center gap-2">
              <Clock className="h-6 w-6" />
              <span className="font-semibold">Upload License</span>
            </div>
            <ArrowRight className="h-5 w-5" />
          </button>
          <button className="bg-[#E0EFFF] text-[#007AFF] p-4 rounded-2xl flex justify-between items-center shadow-md shadow-blue-500/10">
            <span className="font-semibold">Apply E-Card</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        {/* Empty State for Trucks */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800">My Trucks</h3>
          <div className="bg-white border border-gray-200/80 rounded-2xl p-8 text-center shadow-sm">
            <TruckIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h4 className="font-semibold text-gray-900 mb-2">No trucks registered</h4>
            <p className="text-sm text-gray-500 mb-4">Register your first truck to get started</p>
            <Button className="bg-[#007AFF] hover:bg-[#0056CC] text-white">
              <Plus className="mr-2 h-4 w-4" />
              Register Truck
            </Button>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="border-t bg-white/80 backdrop-blur-lg">
        <div className="flex justify-around items-center h-20">
          {navItems.map((item) => (
            <div
              key={item.label}
              className={`flex flex-col items-center justify-center gap-1 w-16 h-16 transition-all duration-200 ${
                item.active ? "text-[#D4A017]" : "text-gray-400"
              }`}
            >
              <div
                className={`flex items-center justify-center h-8 w-8 rounded-full transition-all duration-200 ${
                  item.active ? "bg-[#FEF6E0]" : "bg-transparent"
                }`}
              >
                <item.icon className="h-6 w-6" />
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </nav>
    </>
  )
}
