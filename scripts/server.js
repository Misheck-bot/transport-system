const { MongoClient } = require("mongodb")
require("dotenv").config({ path: ".env.local" })

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://transport-system:Strong123456@transport.cxxswcp.mongodb.net/e-system"

async function testDatabaseConnection() {
  const client = new MongoClient(MONGODB_URI)

  try {
    console.log("🔄 Attempting to connect to MongoDB...")
    console.log("📍 Connection URI:", MONGODB_URI.replace(/\/\/.*@/, "//***:***@")) // Hide credentials

    // Connect to MongoDB
    await client.connect()
    console.log("✅ Successfully connected to MongoDB!")

    // Get database instance
    const db = client.db("etruck_system")
    console.log("📊 Connected to database: etruck_system")

    // Test database operations
    console.log("\n🧪 Testing database operations...")

    // List existing collections
    const collections = await db.listCollections().toArray()
    console.log(
      "📁 Existing collections:",
      collections.map((c) => c.name),
    )

    // Test ping
    await db.admin().ping()
    console.log("🏓 Database ping successful!")

    // Create a test collection and document
    const testCollection = db.collection("connection_test")
    const testDoc = {
      message: "Database connection test",
      timestamp: new Date(),
      status: "success",
    }

    const result = await testCollection.insertOne(testDoc)
    console.log("📝 Test document inserted with ID:", result.insertedId)

    // Read the test document back
    const retrievedDoc = await testCollection.findOne({ _id: result.insertedId })
    console.log("📖 Test document retrieved:", retrievedDoc)

    // Clean up test document
    await testCollection.deleteOne({ _id: result.insertedId })
    console.log("🗑️  Test document cleaned up")

    // Check if users collection exists and count documents
    const usersCount = await db.collection("users").countDocuments()
    console.log("👥 Users in database:", usersCount)

    if (usersCount === 0) {
      console.log("\n💡 Database is empty. Run the seed script to populate with initial data:")
      console.log("   npm run seed")
    } else {
      console.log("\n📊 Database statistics:")
      const trucksCount = await db.collection("trucks").countDocuments()
      const documentsCount = await db.collection("documents").countDocuments()
      const paymentsCount = await db.collection("payments").countDocuments()

      console.log(`   - Users: ${usersCount}`)
      console.log(`   - Trucks: ${trucksCount}`)
      console.log(`   - Documents: ${documentsCount}`)
      console.log(`   - Payments: ${paymentsCount}`)
    }

    console.log("\n🎉 Database connection test completed successfully!")
  } catch (error) {
    console.error("❌ Database connection failed:")
    console.error("Error details:", error.message)

    if (error.code === "ENOTFOUND") {
      console.error("🔍 DNS resolution failed. Check your MongoDB URI.")
    } else if (error.code === "ECONNREFUSED") {
      console.error("🚫 Connection refused. Make sure MongoDB is running.")
    } else if (error.name === "MongoAuthenticationError") {
      console.error("🔐 Authentication failed. Check your username and password.")
    } else if (error.name === "MongoNetworkError") {
      console.error("🌐 Network error. Check your internet connection and firewall settings.")
    }

    console.error("\n💡 Troubleshooting tips:")
    console.error("1. Make sure MongoDB is running (if using local installation)")
    console.error("2. Check your .env.local file has the correct MONGODB_URI")
    console.error("3. Verify your MongoDB Atlas cluster is running (if using cloud)")
    console.error("4. Check your network connection and firewall settings")
    console.error("5. Ensure your IP address is whitelisted in MongoDB Atlas")

    process.exit(1)
  } finally {
    // Close the connection
    await client.close()
    console.log("🔌 Database connection closed")
  }
}

// Handle process termination gracefully
process.on("SIGINT", () => {
  console.log("\n⏹️  Process interrupted. Closing database connection...")
  process.exit(0)
})

process.on("SIGTERM", () => {
  console.log("\n⏹️  Process terminated. Closing database connection...")
  process.exit(0)
})

// Run the connection test
if (require.main === module) {
  testDatabaseConnection()
}

module.exports = { testDatabaseConnection }
