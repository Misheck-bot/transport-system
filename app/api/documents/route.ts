import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { getDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const db = await getDatabase()
    const documents = await db
      .collection("documents")
      .find({
        userId: new ObjectId(session.user.id),
      })
      .toArray()

    return NextResponse.json(documents)
  } catch (error) {
    console.error("Error fetching documents:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File
    const documentType = formData.get("type") as string
    const documentName = formData.get("name") as string
    const expiryDate = formData.get("expiryDate") as string

    if (!file || !documentType || !documentName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Here you would typically upload the file to cloud storage (AWS S3, Cloudinary, etc.)
    // For now, we'll simulate file storage
    const fileUrl = `https://storage.example.com/documents/${Date.now()}-${file.name}`

    const db = await getDatabase()
    const documentData = {
      userId: new ObjectId(session.user.id),
      name: documentName,
      type: documentType,
      fileName: file.name,
      fileSize: file.size,
      fileUrl,
      expiryDate: expiryDate ? new Date(expiryDate) : null,
      status: "pending",
      uploadDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("documents").insertOne(documentData)

    return NextResponse.json(
      {
        message: "Document uploaded successfully",
        documentId: result.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error uploading document:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
