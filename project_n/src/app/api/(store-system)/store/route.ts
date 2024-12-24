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
            return NextResponse.json({ message: 'ชื่อร้านค้าถูกใช้งานแล้ว' }, { status: 400 })
        }

        const newStore = await prisma.store.create({
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
        return NextResponse.json(newStore)
    } catch (error: any) {
        console.error(error.message || error);

        console.error("Unexpected error:", error);
        return NextResponse.json({
            message: error instanceof Error ? error.message : "Unexpected error occurred."
        }, { status: 500 });
    }
}


