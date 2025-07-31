import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { getDatabase } from "@/lib/mongodb"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      role,
      dateOfBirth,
      nationality,
      address,
      city,
      country,
      // Driver specific fields
      licenseNumber,
      licenseType,
      licenseIssueDate,
      licenseExpiryDate,
      issuingAuthority,
      companyName,
      emergencyName,
      emergencyPhone,
      emergencyRelation,
      // Agent specific fields
      employeeId,
      department,
      position,
      assignedBorderPost,
      securityClearanceLevel,
      // Admin specific fields
      accessLevel,
      systemModules,
    } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !password || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const db = await getDatabase()

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({
      email: email.toLowerCase(),
    })

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user document
    const userData = {
      firstName,
      lastName,
      email: email.toLowerCase(),
      phone,
      password: hashedPassword,
      role,
      dateOfBirth,
      nationality,
      address,
      city,
      country,
      isVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Add role-specific fields
    if (role === "driver") {
      Object.assign(userData, {
        licenseNumber,
        licenseType,
        licenseIssueDate,
        licenseExpiryDate,
        issuingAuthority,
        companyName,
        emergencyContact: {
          name: emergencyName,
          phone: emergencyPhone,
          relation: emergencyRelation,
        },
      })
    } else if (role === "agent") {
      Object.assign(userData, {
        employeeId,
        department,
        position,
        assignedBorderPost,
        securityClearanceLevel,
        emergencyContact: {
          name: emergencyName,
          phone: emergencyPhone,
          relation: emergencyRelation,
        },
      })
    } else if (role === "admin") {
      Object.assign(userData, {
        employeeId,
        department,
        position,
        accessLevel,
        systemModules: systemModules || [],
        securityClearanceLevel,
        emergencyContact: {
          name: emergencyName,
          phone: emergencyPhone,
          relation: emergencyRelation,
        },
      })
    }

    // Insert user
    const result = await db.collection("users").insertOne(userData)

    return NextResponse.json(
      {
        message: "User registered successfully",
        userId: result.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
