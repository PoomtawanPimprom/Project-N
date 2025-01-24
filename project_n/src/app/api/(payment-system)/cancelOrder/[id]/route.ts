import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()

export async function PUT(request: NextRequest,{ params } : { params: { id: string}}) {
    const orderDetailId  = Number(params.id);
    try {
        await prisma.orderDetail.update({
            where:{id: orderDetailId},
            data:{
                orderStatusId:3
            }
        })
        return NextResponse.json({ message: "ยกเลิกรายการสำเร็จ" }, { status: 200 });
    } catch (error: any) {
        console.error(error.message)
        return new NextResponse(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}
