import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const { token, newPassword } = await request.json()

    const user = await prisma.user.findUnique({
      where: { resetToken: token }
    })

    if (!user || !user.resetTokenExp || user.resetTokenExp < new Date()) {
      return NextResponse.json(
        { error: 'ตรวจไม่พบ token หรือ token หมดอายุ' },
        { status: 400 }
      )
    }

    const hashedPassword = await hash(newPassword, 10)

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExp: null
      }
    })

    return NextResponse.json({ message: 'Password updated successfully' })
  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
