import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()

export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const reviewId = Number(params.id)
    try {
        const result = await prisma.review.delete({
            where: { id: reviewId }
        });
        return NextResponse.json(result, { status: 200 })
    } catch (error: any) {
        return new NextResponse(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}