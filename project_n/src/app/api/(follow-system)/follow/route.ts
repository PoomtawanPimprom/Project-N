import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()

//create
export async function POST(request: NextRequest) {
    try {
        const { userId, storeId } = await request.json();
        const createFollow = await prisma.follow.create({
            data: {
                userId,
                storeId
            }
        });
        return NextResponse.json({message:"ติดตามเรียบร้อย"},{status:200});
    } catch (error: any) {
        console.error(error.message)
        return new NextResponse(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}

