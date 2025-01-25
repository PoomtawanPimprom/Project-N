import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()

//create
export async function POST(request: NextRequest) {
    try {

        const { userId, items} = await request.json();
        //check user have status 1( continues )
        const checkOrder = await prisma.orderDetail.findMany({
            where:{ userId: userId,orderStatusId:1}
        })
        if(checkOrder.length >=1){
            return NextResponse.json({ message: "โปรดชำระรายการก่อนหน้านี้"},{status:400})
        }

        
        const createOrderDetail = await prisma.orderDetail.create({
            data: {
                userId,
                total: items.reduce((total: number, item: { price: number, quantity: number }) => total + Number(item.price) * Number(item.quantity), 0),
                orderStatusId: 1,
                transportId:1
            }
        });
        const orderItems = items.map((item:any) => ({
            orderDetailId: createOrderDetail.id,
            productId: Number(item.productId),
            storeId:Number(item.storeId),
            quantity: Number(item.quantity),
            color: item.color ? item.color: "",
            size:item.size ? item.size: "",
            orderItemStatusId: 1
        }));
        await prisma.orderItem.createMany({
            data:orderItems
        })
        return NextResponse.json({ message: "done" }, { status: 200 });
    } catch (error) {
        console.log(error)
        return new NextResponse(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}
