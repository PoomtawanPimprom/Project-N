import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()

//create
export async function POST(request: NextRequest) {
    try {

        const { userId, items,transportId} = await request.json();

        const createOrderDetail = await prisma.orderDetail.create({
            data: {
                userId,
                total: items.reduce((total: number, item: { price: number, quantity: number }) => total + Number(item.price) * Number(item.quantity), 0),
                orderStatusId: 1,
                transportId:transportId
            }
        });
        const orderItems = items.map((item:any) => ({
            orderDetailId: createOrderDetail.id,
            productId: Number(item.id),
            quantity: Number(item.quantity),
        }));
        await prisma.orderItem.createMany({
            data:orderItems
        })
        return NextResponse.json({ message: "done" }, { status: 200 });
    } catch (error: any) {
        console.error(error.message)
        return new NextResponse(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}
