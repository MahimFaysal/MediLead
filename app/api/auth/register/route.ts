
// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  // your registration logic
  return NextResponse.json({ message: "ok" })
}
const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const { email, password, firstName, lastName } = await req.json()
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: "All fields required" },
        { status: 400 }
      )
    }
    const exists = await prisma.user.findUnique({ where: { email } })
    if (exists) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      )
    }
    const passwordHash = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: { email, passwordHash, firstName, lastName }
    })
    return NextResponse.json({
      success: true,
      message: "Account created!",
      userId: user.id
    })
  } catch (e) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}
