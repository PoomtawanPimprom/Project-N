import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import nodemailer from 'nodemailer'
import { generateResetToken } from '@/lib/auth'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'ไม่พบอีเมลที่ใช้งานอีเมลนี้' },
        { status: 404 }
      )
    }

    const { token, expires } = await generateResetToken()

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken: token,
        resetTokenExp: expires
      }
    })

    // ตั้งค่า email transporter
    // const transporter = nodemailer.createTransport({
    //   service:"Gmail",
    //   auth: {
    //     user: process.env.EMAIL_USER,
    //     pass: process.env.EMAIL_PASSWORD
    //   }
    // })

    // // ส่งอีเมลรีเซ็ตรหัสผ่าน
    // await transporter.sendMail({
    //   from: process.env.EMAIL_FROM,
    //   to: email,
    //   subject: 'รีเซ็ตรหัสผ่าน',
    //   html: `
    //     <p>คลิกที่ลิงก์ด้านล่างเพื่อรีเซ็ตรหัสผ่านของคุณ:</p>
    //     <a href="${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}">
    //       รีเซ็ตรหัสผ่าน
    //     </a>
    //     <p>ลิงก์นี้จะหมดอายุใน 1 ชั่วโมง</p>
    //   `
    // })

    return NextResponse.json({ message: 'Reset password email sent' })
  } catch (error) {
    console.error('Password reset error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}