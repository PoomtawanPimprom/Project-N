import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()

//create
export async function POST(request: NextRequest) {
    try {
        const { userId, productId } = await request.json();
        const createFavoriteData = await prisma.favorite.create({
            data: {
                userId,
                productId
            }
        });
        return NextResponse.json(createFavoriteData);
    } catch (error: any) {
        console.error(error.message)
        return new NextResponse(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}


