import { Prisma, PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()

export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        const userId = Number(params.id);
        //get all order datail status complete
        const allOrderDetail = await prisma.orderDetail.findMany({
            where: { userId: userId, orderStatusId: 2 },
            select: { id: true }
        });

        const orderDetailIds = allOrderDetail.map(order => order.id);
        //get all order item status complete
        const allOrderItemsToReive = await prisma.orderItem.findMany({
            where: { orderDetailId: { in: orderDetailIds }, orderItemStatusId: 3 },
            include: { product: true },
            orderBy:{ orderDetailId: "desc"}
        })


        return NextResponse.json(allOrderItemsToReive, { status: 200 })
    } catch (error) {
        console.error("Error fetching user address:", error);
        throw new Error("Failed to fetch user address");
    }
}

export async function PUT(request: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        const orderItemId = Number(params.id);
        //get all order datail status complete
        await prisma.orderItem.update({
            where: { id: orderItemId },
            data: { orderItemStatusId: 4 }
        })

        return NextResponse.json({ message: 'update successfully' }, { status: 200 })
    } catch (error) {
        console.error("Error fetching user address:", error);
        throw new Error("Failed to fetch user address");
    }
}