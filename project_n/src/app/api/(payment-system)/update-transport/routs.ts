import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()

export async function PUT(request:NextRequest){
    const {orderId,orderStatusId} = await request.json();
    try {
        await prisma.orderDetail.update({
            where:{id: orderId},
            data:{orderStatusId:orderStatusId}
        })
        return NextResponse.json({ message: "update order status done!" }, { status: 200 });
    } catch (error: any) {
        console.error(error.message)
        return new NextResponse(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}