import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()

export async function PUT(request: NextRequest, props: { params: Promise<{ id: string}>}) {
    const params = await props.params;
    const orderDetailId  = Number(params.id);
    try {
         await prisma.orderDetail.update({
            where:{id: orderDetailId},
            data:{
                orderStatusId:3
            }
        })
         await prisma.orderItem.updateMany({
            where:{orderDetailId:orderDetailId},
            data:{orderItemStatusId:5}
         })
        return NextResponse.json({ message: "ยกเลิกรายการสำเร็จ" }, { status: 200 });
    } catch (error: any) {
        console.error(error.message)
        return new NextResponse(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}
