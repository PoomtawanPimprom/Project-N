import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()

export async function PUT(request: NextRequest, props: { params: Promise<{ id: string}>}) {
    const params = await props.params;
    const orderDetailId  = Number(params.id);
    try {
        // update order detail to status cancel
         const orderDetail = await prisma.orderDetail.update({
            where:{id: orderDetailId },
            data:{
                orderStatusId:3
            }
        })
        // update order items to status cancel
         await prisma.orderItem.updateMany({
            where:{orderDetailId:orderDetailId},
            data:{orderItemStatusId:4}
         })
        //check if this order detail has use discount.it will be remove discountId
         if(orderDetail.discountId !== null){      
             await prisma.orderDetail.update({
                where:{ id: orderDetailId},
                data:{ discountId: null}
             })
         }
        return NextResponse.json({ message: "ยกเลิกรายการสำเร็จ" }, { status: 200 });
    } catch (error: any) {
        console.error(error.message)
        return new NextResponse(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}
