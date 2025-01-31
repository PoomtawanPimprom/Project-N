import { Prisma, PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()

export async function GET(request: NextRequest, props: { params: Promise<{ userId: string }> }) {
    const params = await props.params;
    try {
        const userId = Number(params.userId);
        //get all order datail status complete
        const allOrderDetail = await prisma.orderDetail.findMany({
            where: { userId: userId, orderStatusId: 1 },
            select: { id: true }
        });

        const orderDetailIds = allOrderDetail.map(order => order.id);
        //get all order item status complete
        const allOrderItemsToPay = await prisma.orderItem.findMany({
            where: { orderDetailId: { in: orderDetailIds }, orderItemStatusId: 1 },
            include:{ product: true}
        })


        return NextResponse.json(allOrderItemsToPay, { status: 200 })
    } catch (error) {
        console.error("Error fetching user address:", error);
        throw new Error("Failed to fetch user address");
    }
}