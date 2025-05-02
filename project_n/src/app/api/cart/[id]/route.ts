import { Prisma, PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()

export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        const userId = Number(params.id);
        const posts = await prisma.cartItem.findMany({
            where: { userId: userId },
            include: { 
                product: { include: { Inventory: true } }
            }
        });
        return NextResponse.json(posts)
    } catch (error) {
        console.error("Error fetching cart:", error);
        throw new Error("Failed to fetch cart");
    }
}

export async function PUT(request: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        const {
            userId,
            productId,
            color,
            size,
            quantity,
        } = await request.json();
        const cartId = Number(params.id)
        const updatePost = await prisma.cartItem.update({
            where: { id: cartId }, data: {
                userId,
                productId,
                color,
                size,
                quantity,
            }
        });
        return NextResponse.json(updatePost);
    } catch (e: any) {
        return new NextResponse(e instanceof Error ? e.message : String(e), { status: 500 })
    }
}

export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        const cartId = Number(params.id);
        await prisma.cartItem.delete({ where: { id: cartId } });
        return new NextResponse("Cart delete successfully", { status: 201 });
    } catch (e: any) {
        console.log(e);
        return new NextResponse(e instanceof Error ? e.message : String(e), { status: 500 })
    }
}