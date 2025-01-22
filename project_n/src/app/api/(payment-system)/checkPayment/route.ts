import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()

//create
export async function GET(request: NextRequest) {
    const { orderId } = await request.json();
    try {
        const payment = await prisma.payment.findFirst({
            where: { orderId: Number(orderId) },
            select: { paymentStatus: true },
          });
        return NextResponse.json({ message: "done" }, { status: 200 });
    } catch (error: any) {
        console.error(error.message)
        return new NextResponse(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}
export async function PUT(request:NextRequest) {
    const {paymentId} = await request.json();
    try {
        await prisma.payment.update({
            where:{ id: paymentId},
            data:{
                paymentStatusId:2
            }
        })
    } catch (error:any) {   
        console.log(error.message)
    }   
}