import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()


//update want checked
export async function PUT(request:NextRequest) {
    const {paymentId} = await request.json();
    try {
        await prisma.payment.update({
            where:{ id: paymentId},
            data:{
                paymentStatusId:2
            }
        })
        return NextResponse.json({ message: "done" }, { status: 200 });
    } catch (error:any) {   
        console.log(error.message)
        return new NextResponse(error instanceof Error ? error.message : String(error), { status: 500 })
    }   
}