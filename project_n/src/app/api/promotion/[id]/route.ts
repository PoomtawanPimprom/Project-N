import { Prisma, PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()


export async function GET(request: NextRequest, props: { params: Promise<{ id: string}>}) {
    const params = await props.params;
    const userId = Number(params.id);
    const posts = await prisma.discount.findUnique({ where: { id: userId } });
    return NextResponse.json(posts)
}

export async function PUT(request: NextRequest, props: { params: Promise<{ id: string}>}) {
    const params = await props.params;
    try {
        const {
            name,
            description,
            discountPercentage,
            discountAmount,
            minimumPrice,
            isActive,
        } = await request.json();
        const promoId = Number(params.id)
        const updatePost = await prisma.discount.update({
            where: { id: promoId }, data: { 
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

export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string}>}) {
    const params = await props.params;
    try {
        const promoID = Number(params.id);
        await prisma.discount.delete({ where: { id: promoID } });
        return new NextResponse("Promotion delete successfully", { status: 201 });
    } catch (e: any) {
        return new NextResponse(e instanceof Error ? e.message : String(e), { status: 500 })
    }
}