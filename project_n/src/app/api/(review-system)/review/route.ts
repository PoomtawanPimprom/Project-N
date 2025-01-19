import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()

// createReview
export async function POST(request: NextRequest) {
    try {
        const { comment,images, userId, productId  } = await request.json();
        
        if(!comment || !images || !userId || !productId) {
            return NextResponse.json({"message": "not complete"}, {status:400})
        }
        
        const result = await prisma.review.create({
            data: {
                comment,
                images,
                userId,
                productId,
            }
        });
        return NextResponse.json(result, { status: 200 })
    } catch (error: any) {
        return new NextResponse(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}