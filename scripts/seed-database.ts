import { MongoClient } from "mongodb"
import bcrypt from "bcryptjs"

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/etruck_system"

async function seedDatabase() {
  const client = new MongoClient(MONGODB_URI)

  try {
    await client.connect()
    const db = client.db("etruck_system")

    console.log("🌱 Seeding database...")

    // Create indexes
    await db.collection("users").createIndex({ email: 1 }, { unique: true })
    await db.collection("trucks").createIndex({ plateNumber: 1 }, { unique: true })
    await db.collection("trucks").createIndex({ driverId: 1 })
    await db.collection("documents").createIndex({ userId: 1 })
    await db.collection("payments").createIndex({ userId: 1 })
    await db.collection("ecards").createIndex({ driverId: 1 })
    await db.collection("ecards").createIndex({ cardNumber: 1 }, { unique: true })
    await db.collection("ecard_scans").createIndex({ agentId: 1 })
    await db.collection("ecard_scans").createIndex({ driverId: 1 })

    // Seed admin user
    const adminPassword = await bcrypt.hash("admin123", 12)
    await db.collection("users").insertOne({
      firstName: "System",
      lastName: "Administrator",
      email: "admin@etruck.com",
      phone: "+260 211 000 000",
      password: adminPassword,
      role: "admin",
      dateOfBirth: new Date("1980-01-01"),
      nationality: "Zambian",
      address: "Government Complex, Lusaka",
      city: "Lusaka",
      country: "Zambia",
      employeeId: "ADM-001",
      department: "IT Systems",
      position: "System Administrator",
      accessLevel: "super-admin",
      systemModules: ["Payment Processing", "E-Card Issuance", "User Management", "System Settings"],
      securityClearanceLevel: "top-secret",
      emergencyContact: {
        name: "Emergency Contact",
        phone: "+260 211 000 001",
        relation: "colleague",
      },
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    // Seed border agent
    const agentPassword = await bcrypt.hash("agent123", 12)
    await db.collection("users").insertOne({
      firstName: "Sarah",
      lastName: "Mwanza",
      email: "agent@etruck.com",
      phone: "+260 97 000 000",
      password: agentPassword,
      role: "agent",
      dateOfBirth: new Date("1985-03-15"),
      nationality: "Zambian",
      address: "Chirundu Border Post",
      city: "Chirundu",
      country: "Zambia",
      employeeId: "AGT-001",
      department: "Border Control",
      position: "Border Control Officer",
      assignedBorderPost: "Chirundu Bridge (Zambia-Zimbabwe)",
      securityClearanceLevel: "confidential",
      emergencyContact: {
        name: "John Mwanza",
        phone: "+260 97 000 001",
        relation: "spouse",
      },
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    // Seed driver user
    const driverPassword = await bcrypt.hash("driver123", 12)
    await db.collection("users").insertOne({
      firstName: "John",
      lastName: "Phiri",
      email: "driver@etruck.com",
      phone: "+260 97 123 4567",
      password: driverPassword,
      role: "driver",
      dateOfBirth: new Date("1985-06-15"),
      nationality: "Zambian",
      address: "Plot 123, Independence Avenue",
      city: "Lusaka",
      country: "Zambia",
      licenseNumber: "DL123456789",
      licenseType: "Class C",
      licenseIssueDate: new Date("2020-06-15"),
      licenseExpiryDate: new Date("2026-06-15"),
      issuingAuthority: "RTSA",
      emergencyContact: {
        name: "Jane Phiri",
        phone: "+260 97 987 6543",
        relation: "spouse",
      },
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    console.log("✅ Database seeded successfully!")
    console.log("👤 Admin: admin@etruck.com / admin123")
    console.log("🛂 Agent: agent@etruck.com / agent123")
    console.log("🚛 Driver: driver@etruck.com / driver123")
  } catch (error) {
    console.error("❌ Error seeding database:", error)
  } finally {
    await client.close()
  }
}

seedDatabase()
