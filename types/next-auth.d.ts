declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      firstName: string
      lastName: string
      role: "driver" | "agent" | "admin"
      phone: string
      isVerified: boolean
    }
  }

  interface User {
    id: string
    email: string
    firstName: string
    lastName: string
    role: "driver" | "agent" | "admin"
    phone: string
    isVerified: boolean
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string
    firstName: string
    lastName: string
    phone: string
    isVerified: boolean
  }
}
