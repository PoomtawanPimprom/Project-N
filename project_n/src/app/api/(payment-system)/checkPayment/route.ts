import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()


//update want checked
export async function PUT(request: NextRequest) {
    const { paymentId, orderDetailId,userId } = await request.json();
    try {
        await prisma.$transaction(async (prisma) => {
            const userAddress = await prisma.userAddress.findFirst({
                where:{ userId:userId, addressStatusId:2}
            })

            //update payment status
            await prisma.payment.update({
                where: { id: paymentId},
                data: {
                    paymentStatusId: 2
                }
            })
            //update orderdetail
            const orderDetail = await prisma.orderDetail.update({
                where: { id: orderDetailId },
                data: { paymentId: paymentId ,orderStatusId: 2 }
            })

            //update orderItems
            await prisma.orderItem.updateMany({
                where:{ orderDetailId:orderDetailId},
                data:{ orderItemStatusId:2,userAddressId:userAddress?.id}
            })

            //delete inventory  
            //1.get all order item 
            const allOrderItems = await prisma.orderItem.findMany({
                where: { orderDetailId: orderDetail.id }
            })

            //2.delete inventory 
            await Promise.all(allOrderItems.map(async (orderItem) => {
                await prisma.inventory.update({
                    where: {
                        productID_size_color: {
                            color: orderItem.color ? orderItem.color : "",
                            productID: orderItem.productId,
                            size: orderItem.size ? orderItem.size : ""
                        }
                    },
                    data: { quantity: { decrement: orderItem.quantity }, }
                })
            }))

            //3.delete at cart
            await prisma.cartItem.deleteMany({
                where:{ userId: userId,productId: {in : allOrderItems.map((item)=> item.productId)} }
            })
        });
        return NextResponse.json({ message: "done" }, { status: 200 });
    } catch (error: any) {
        console.log(error.message)
        return new NextResponse(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}