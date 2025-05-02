import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function PUT(request: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        const { passwordCurrent, passwordNew } = await request.json(); // รับ passwordCurrent และ passwordNew จาก request body
        const userId = Number(params.id);

        // ตรวจสอบว่ามี user อยู่ในฐานข้อมูลหรือไม่
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return new NextResponse('User not found', { status: 404 });
        }

        // ตรวจสอบ passwordCurrent ว่าตรงกับ hash ในฐานข้อมูลหรือไม่
        const isPasswordCorrect = bcrypt.compareSync(passwordCurrent, user.password!);

        if (!isPasswordCorrect) {
            return NextResponse.json({ error: 'รหัสผ่านปัจจุบันไม่ถูกต้อง' }, { status: 400 });
        }        

        // ถ้า passwordCurrent ถูกต้อง ทำการ hash passwordNew
        const hashedPassword = bcrypt.hashSync(passwordNew, 10);

        // อัปเดต password ในฐานข้อมูล
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { password: hashedPassword },
        });

        return NextResponse.json({ message: 'Password updated successfully', user: updatedUser });
    } catch (e: any) {
        return new NextResponse(e instanceof Error ? e.message : String(e), { status: 500 });
    }
}
