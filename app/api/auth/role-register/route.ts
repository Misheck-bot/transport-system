import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { getDatabase } from "@/lib/mongodb"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, role, ...roleData } = body

    if (!email || !password || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Validate password strength
    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters long" }, { status: 400 })
    }

    // Validate role
    const validRoles = ["driver", "agent", "admin"]
    if (!validRoles.includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 })
    }

    const db = await getDatabase()

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({
      email: email.toLowerCase(),
    })

    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user object based on role
    const userData: any = {
      email: email.toLowerCase(),
      password: hashedPassword,
      name: `${roleData.firstName} ${roleData.lastName}`,
      role,
      phone: roleData.phone || null,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      isVerified: false,
    }

    // Add role-specific fields
    if (role === "driver") {
      userData.driverInfo = {
        firstName: roleData.firstName,
        lastName: roleData.lastName,
        dateOfBirth: roleData.dateOfBirth,
        nationality: roleData.nationality,
        address: roleData.address,
        city: roleData.city,
        country: roleData.country,
        licenseNumber: roleData.licenseNumber,
        licenseType: roleData.licenseType,
        licenseIssueDate: roleData.licenseIssueDate,
        licenseExpiryDate: roleData.licenseExpiryDate,
        issuingAuthority: roleData.issuingAuthority,
        companyName: roleData.companyName || null,
        companyRegistration: roleData.companyRegistration || null,
        companyAddress: roleData.companyAddress || null,
        companyPhone: roleData.companyPhone || null,
        emergencyName: roleData.emergencyName,
        emergencyPhone: roleData.emergencyPhone,
        emergencyRelation: roleData.emergencyRelation,
        trucksRegistered: 0,
        totalTrips: 0,
        rating: 5.0,
      }
    } else if (role === "agent") {
      userData.agentInfo = {
        firstName: roleData.firstName,
        lastName: roleData.lastName,
        badgeNumber: roleData.badgeNumber,
        station: roleData.station,
        department: roleData.department,
        yearsOfService: roleData.yearsOfService,
        certifications: roleData.certifications || [],
        scansCompleted: 0,
        alertsIssued: 0,
      }
    } else if (role === "admin") {
      userData.adminInfo = {
        firstName: roleData.firstName,
        lastName: roleData.lastName,
        department: roleData.department,
        position: roleData.position,
        accessLevel: roleData.accessLevel || "standard",
        employeeId: roleData.employeeId,
        lastLogin: null,
      }
    }

    // Insert user into database
    const result = await db.collection("users").insertOne(userData)

    // Return success response (without password)
    const { password: _, ...userResponse } = userData
    userResponse._id = result.insertedId

    return NextResponse.json(
      {
        message: "User registered successfully",
        user: userResponse,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
