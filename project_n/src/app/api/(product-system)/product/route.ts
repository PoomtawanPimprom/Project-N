import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
    try {
        const data = await prisma.product.findMany();
        return NextResponse.json(data)
    } catch (error) {
        return new NextResponse(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const { name, description, price, storeID, categoryID, image, inventory } = await request.json();
        const createProductData = await prisma.product.create({
            data: {
                name: name,
                description: description,
                price: Number(price),
                storeID: storeID,
                categoryID: categoryID,
                image: image
            }
        });
        const createInventoryData = await Promise.all(
            inventory.map((item: { quantity: number; size: string; color: string }) => {
                return prisma.inventory.create({
                    data: {
                        quantity: item.quantity,
                        size: item.size,
                        color: item.color,
                        productID: createProductData.id
                    }
                });
            })
        );

        return NextResponse.json("create success ");
    } catch (error: any) {
        console.error(error.message)
        return new NextResponse(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}
