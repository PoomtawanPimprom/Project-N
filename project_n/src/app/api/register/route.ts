import prisma from '@/lib/prisma/db';
import { Prisma, PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
    const { username, email, password } = await req.json();
    if (!username && !email && !password) {
        return NextResponse.json({ success: false, message: 'All fields are required' },{ status: 400 });
    }
    const checkEmail = await prisma.user.findUnique({
        where:{email:email}
    })
    const checkUsername = await prisma.user.findUnique({
        where:{username:username}
    })

    try {
        const hashpassword = bcrypt.hashSync(password, 10);

        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashpassword
            }
        })
        return NextResponse.json({ success: true, message: 'User created successfully' },{status:200});
    } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return NextResponse.json({ success: false, message: 'Username หรือ email ถูกใช้แล้ว' },{status:400});
            }
        }
        return NextResponse.json({ success: false, message: error.message },{status:500});
    }
}

