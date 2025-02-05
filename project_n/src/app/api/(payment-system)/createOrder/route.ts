import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()

//create
export async function POST(request: NextRequest) {
    try {
        const { userId, items} = await request.json();
        if (!userId || !Array.isArray(items) || items.length === 0) {
            return NextResponse.json({ message: "โปรดเลือกสินค้าที่ต้องการชำระ" }, { status: 400 });
        }
        //check user have status 1( continues )
        const checkOrder = await prisma.orderDetail.findMany({
            where:{ userId: userId,orderStatusId:1}
        })
        if(checkOrder.length >=1){
            return NextResponse.json({ message: "โปรดชำระรายการก่อนหน้านี้"},{status:400})
        }

        // 1. คำนวณราคาสินค้าทั้งหมด
        let total = 0;
        for (let item of items) {
            const product = await prisma.product.findUnique({
                where: { id: Number(item.productId) },
            });
            if (product) {
                total += product.price * Number(item.quantity);
            }
        }

        // 2. สร้างข้อมูล order detail
        const createOrderDetail = await prisma.orderDetail.create({
            data: {
                userId,
                orderStatusId: 1,
                transportId: 1,
                discountId: null,
                total: total,  // เพิ่ม total ที่คำนวณไว้
            }
        });

        // 3. create order items 
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


        return NextResponse.json({ message: "crate order success" }, { status: 200 });
    } catch (error:any) {
        console.log(error.message)
        return NextResponse.json({ error: error instanceof Error ? error.message : String(error) }, { status: 500 });
    }
}
