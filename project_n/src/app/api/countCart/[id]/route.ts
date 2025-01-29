import { Prisma, PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()

export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const userId = Number(params.id);
    if (isNaN(userId)) {
        return new NextResponse("Invalid user ID", { status: 400 });
    }
    try {
        const cartItems = await prisma.cartItem.findMany({
            where: { userId }, // ใช้ userId แทน id
            select: { quantity: true }, // ดึงเฉพาะ quantity
        });
        if (cartItems.length === 0) {
            return new NextResponse("User not found or no cart items", { status: 404 });
        }

        // รวมค่า quantity ทั้งหมด
        const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

        return NextResponse.json(totalQuantity , { status: 200 });
    } catch (error: any) {
        console.error("Error fetching user:", error);
        return new NextResponse(
            error instanceof Error ? error.message : "Internal server error",
            { status: 500 }
        );
    }
}
