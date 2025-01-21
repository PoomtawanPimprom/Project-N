import { Prisma, PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()


export async function GET(request: NextRequest, { params } : { params: { id: string}}) {
    const userId = Number(params.id);
    const posts = await prisma.discount.findUnique({ where: { id: userId } });
    return NextResponse.json(posts)
}

export async function PUT(request: NextRequest, { params } : { params: { id: string}}){
    try {
        const {
            name,
            description,
            discountPercentage,
            discountAmount,
            minimumPrice,
            isActive,
        } = await request.json();
        const id = Number(params.id)
        const updatePost = await prisma.discount.update({
            where: { id: id }, data: { 
                name,
                description,
                discountPercentage,
                discountAmount,
                minimumPrice,
                isActive,
            }
        });
        return NextResponse.json(updatePost);
    } catch (e: any) {
        return new NextResponse(e instanceof Error ? e.message : String(e), { status: 500 })
    }
}

export async function DELETE(request: NextRequest, { params } : { params: { id: string}}){
    try {
        const userID = Number(params.id);
        await prisma.user.delete({ where: { id: userID } });
        return new NextResponse("Promotion delete successfully", { status: 201 });
    } catch (e: any) {
        return new NextResponse(e instanceof Error ? e.message : String(e), { status: 500 })
    }
}