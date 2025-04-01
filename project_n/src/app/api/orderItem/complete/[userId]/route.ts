import { Prisma, PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()

export async function GET(request: NextRequest, props: { params: Promise<{ userId: string }> }) {
    const params = await props.params;
    try {
        const userId = Number(params.userId);
        //get all order datail status complete and order items status complete

        const allOrderDetail = await prisma.orderDetail.findMany({
            where: { userId: userId, orderStatusId: 2 },
            include: {
                OrderItem: {
                    where: { orderItemStatusId: 3 },
                    include: { product: true }
                },
                payment: true,
                transport:true
            },
            orderBy:{ id: "desc"}
        });


        const filterAllOrderDetail = allOrderDetail.filter((item)=> item.OrderItem.length>0)

        return NextResponse.json(filterAllOrderDetail, { status: 200 })
    } catch (error) {
        console.error("Error fetching user address:", error);
        throw new Error("Failed to fetch user address");
    }
}