import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
    try {
        const { name, userId, description, imageLogoURL, imageLogoFileName, imageBackgroundURL, imageBgFileName } = await request.json();

        const checkStoreExit = await prisma.store.findFirst({
            where: { name: name }
        })
        if (checkStoreExit) {
            return NextResponse.json({
                success: false,
                message: 'ชื่อร้านค้าถูกใช้งานแล้ว'
            }, { status: 400 })
        }

        await prisma.store.create({
            data: {
                name,
                description,
                userId,

                imageLogoURL,
                imageLogoFileName,
                imageBackgroundURL,
                imageBgFileName,
            }
        });
        await prisma.user.update({
            where: { id: userId },
            data: { saler: true }
        })

        return NextResponse.json({ message: "สร้างร้านค้าเสร็จสิ้น" }, { status: 200 })
    } catch (error: any) {
        console.error(error);

        console.error("Unexpected error:", error);
        return NextResponse.json({
            message: error instanceof Error ? error.message : "Unexpected error occurred."
        }, { status: 500 });
    }
}


