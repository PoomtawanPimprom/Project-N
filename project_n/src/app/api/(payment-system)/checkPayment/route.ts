import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()


//update want checked
export async function PUT(request: NextRequest) {
    const { paymentId, orderDetailId,userId } = await request.json();
    try {
        //get user address default data 
        const userAddress = await prisma.userAddress.findFirst({
            where:{ userId:userId, addressStatusId:2}
        })

        //update payment status to completed
        await prisma.payment.update({
            where: { id: paymentId},
            data: {
                paymentStatusId: 2
            }
        })
        //add payment id and update status to completed
        const orderDetail = await prisma.orderDetail.update({
            where: { id: orderDetailId },
            data: { paymentId: paymentId ,orderStatusId: 2 }
        })

        //update orderItems status to shipping
        await prisma.orderItem.updateMany({
            where:{ orderDetailId:orderDetailId},
            data:{ orderItemStatusId:2,userAddressId:userAddress?.id}
        })

        //delete inventory  

        //1.get all order item 
        const allOrderItems = await prisma.orderItem.findMany({
            where: { orderDetailId: orderDetail.id }
        })

        //2.delete inventory and update saled products
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
            await prisma.product.update({
                where:{ id :orderItem.productId},
                data:{ sales : {increment:orderItem.quantity}}
            })
        }))

        //3.delete at cart
        await prisma.cartItem.deleteMany({
            where:{ userId: userId,productId: {in : allOrderItems.map((item)=> item.productId)} }
        })
        // await prisma.$transaction(async (prisma) => {


        // });
        return NextResponse.json({ message: "check payment complete" }, { status: 200 });
    } catch (error: any) {
        console.log(error.message)
        return new NextResponse(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}