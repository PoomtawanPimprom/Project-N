import prisma from '@/lib/prisma/db';
import { Prisma, PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from "bcrypt";
import { generateKey } from '@/lib/utils';
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
    const url = 'https://firebasestorage.googleapis.com/v0/b/project-n-eff9b.firebasestorage.app/o/user-profile.png?alt=media&token=30d9c36c-1638-42d5-82e7-fbd9e6f3e438'
    const { username, email, password } = await req.json();

    if (!username && !email && !password) {
        return NextResponse.json({ success: false, message: 'โปรดกรอกข้อมูลให้ครบถ้วน' }, { status: 400 });
    }
    try {
        const hashpassword = bcrypt.hashSync(password, 10);

        await prisma.user.create({
            data: {
                name: username,
                username,
                email,
                password: hashpassword,
                profile: url,
            }
        })

        // ตั้งค่า email transporter
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            },

        });

        // ส่งอีเมลต้อนรับ
        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'ยินดีต้อนรับสู่ SHOPKUB 🎉',
            html: `
      <h2>ยินดีต้อนรับสู่ SHOPKUB 🎉</h2>
      <p>ขอบคุณที่สมัครสมาชิก! คุณสามารถเริ่มต้นช้อปปิ้งและเพลิดเพลินไปกับข้อเสนอสุดพิเศษของเราได้แล้ว</p>
      <p>📦 สินค้าหลากหลาย รอคุณอยู่!<br>
      🔥 โปรโมชั่นสุดพิเศษ เฉพาะสมาชิกใหม่!<br>
      🎁 รับคูปองส่วนลดแรกเข้า เมื่อสั่งซื้อครั้งแรก</p>
      <p>ไปที่เว็บไซต์ของเราเพื่อเริ่มต้น:</p>
      <a href="${process.env.NEXT_PUBLIC_APP_URL}" 
         style="display: inline-block; padding: 10px 20px; color: #fff; background-color: #ff5733; text-decoration: none; border-radius: 5px;">
        ไปที่หน้าแรก
      </a>
      <p>ขอให้สนุกกับการช้อปปิ้ง! 🛍️</p>
      <p>ทีมงาน SHOPKUB</p>`});

        return NextResponse.json({ success: true, message: 'สมัครสมาชิกสำเร็จ' }, { status: 200 });
    } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return NextResponse.json({ success: false, message: 'Username หรือ email ถูกใช้แล้ว' }, { status: 400 });
            }
        }
        console.log(error.message)
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

