"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Truck, ShieldCheck, Clock, Globe, Star, Play } from "lucide-react"
import { useState, useEffect } from "react"

const features = [
  {
    icon: Clock,
    title: "Reduce Border Delays",
    description: "Cut crossing times from hours to minutes with instant digital verification and smart routing.",
  },
  {
    icon: ShieldCheck,
    title: "Enhanced Security",
    description: "Blockchain-secured credentials and real-time cargo tracking eliminate fraud and corruption.",
  },
  {
    icon: Globe,
    title: "Pan-African Network",
    description: "Seamlessly connect drivers, companies, and authorities across all African borders.",
  },
]

const stats = [
  { number: "50K+", label: "Active Drivers" },
  { number: "15", label: "Countries Connected" },
  { number: "2M+", label: "Successful Crossings" },
  { number: "95%", label: "Time Reduction" },
]

const testimonials = [
  {
    name: "James Mwangi",
    role: "Fleet Manager, TransAfrica Logistics",
    content: "E-Truck has revolutionized our operations. What used to take 6 hours at borders now takes 15 minutes.",
    avatar: "/placeholder.svg?width=60&height=60",
    rating: 5,
  },
  {
    name: "Sarah Okafor",
    role: "Independent Driver",
    content:
      "The E-Card system is a game-changer. No more paperwork, no more delays. Just smooth sailing across borders.",
    avatar: "/placeholder.svg?width=60&height=60",
    rating: 5,
  },
]

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <header className="px-4 lg:px-6 h-20 flex items-center bg-black/20 backdrop-blur-xl fixed top-0 w-full z-50 border-b border-white/10">
        <Link href="#" className="flex items-center justify-center group" prefetch={false}>
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl group-hover:scale-110 transition-transform">
            <Truck className="h-6 w-6 text-white" />
          </div>
          <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            E-TRUCK
          </span>
        </Link>
        <nav className="ml-auto flex gap-6">
          <Button variant="ghost" className="text-white hover:text-blue-300 hover:bg-white/10" asChild>
            <Link href="/login" prefetch={false}>
              Sign In
            </Link>
          </Button>
          <Button
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all"
            asChild
          >
            <Link href="/signup" prefetch={false}>
              Get Started
            </Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          <div className="relative container px-4 md:px-6 text-center text-white z-10 pt-20">
            <div
              className={`space-y-8 max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 text-sm">
                <Star className="h-4 w-4 text-yellow-400" />
                <span>Trusted by 50,000+ drivers across Africa</span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                  The Future of
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  African Logistics
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                Revolutionize cross-border transport with instant digital verification, real-time tracking, and seamless
                payments. Join the logistics revolution.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all transform hover:scale-105"
                  asChild
                >
                  <Link href="/signup" prefetch={false}>
                    Start Your Journey
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg backdrop-blur-sm bg-transparent"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-1/3 left-10 animate-bounce delay-300">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4">
              <Truck className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="absolute bottom-1/3 right-10 animate-bounce delay-700">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4">
              <ShieldCheck className="h-8 w-8 text-green-400" />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-black/20 backdrop-blur-sm border-y border-white/10">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-blue-200 text-sm md:text-base">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-gradient-to-b from-transparent to-black/20">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                Why Choose E-Truck
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Built for the Modern African Economy</h2>
              <p className="text-xl text-blue-200 max-w-3xl mx-auto">
                Our platform combines cutting-edge technology with deep understanding of African logistics challenges.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
                >
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-blue-200 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-black/20 backdrop-blur-sm">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Trusted by Industry Leaders</h2>
              <p className="text-xl text-blue-200">See what our users are saying about their E-Truck experience.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-blue-100 text-lg mb-6 leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full border-2 border-white/20"
                    />
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-blue-300 text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
          <div className="container px-4 md:px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Transform Your Logistics?</h2>
              <p className="text-xl text-blue-100 mb-8">
                Join thousands of drivers and companies already using E-Truck to streamline their operations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
                  asChild
                >
                  <Link href="/signup" prefetch={false}>
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg backdrop-blur-sm bg-transparent"
                >
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-sm border-t border-white/10 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl">
                <Truck className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                E-TRUCK
              </span>
            </div>
            <div className="text-blue-200 text-center">
              <p>&copy; {new Date().getFullYear()} E-Truck Transport System. Revolutionizing African logistics.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
