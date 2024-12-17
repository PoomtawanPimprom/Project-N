import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()

// getInventoriesByProductId
export async function GET(NextRequest: NextRequest, { params }: { params: { id: string } }) {
    try {
        const searchparams = NextRequest.nextUrl.searchParams
        const search = searchparams.get("search") || ""
        const category = searchparams.get("category") || ""
        const sortDate = searchparams.get("sortDate") || "desc"

        const productId = Number(params.id);

        ///make condition 
        const whereClause = {
            productID: productId,
            AND: [
                search
                    ? {
                        OR: [
                            {
                                product: {
                                    name: {
                                        contains: search,
                                    }
                                }
                            },
                        ],
                    }
                    : {},
                category
                    ? { product: { category: { id: Number(category) } } }
                    : {},
            ],
        };

        //query
        const data = await prisma.inventory.findMany({
            where: whereClause,
            include: { product: true },
            orderBy: {
                createdAt: sortDate === 'asc' ? 'asc' : 'desc', // จัดเรียงตามวันที่
            },
        });
        return NextResponse.json(data)
    } catch (error: any) {
        console.error(error.message)
        return new NextResponse(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}

// updateInventoryByInventoryId
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { quantity, size, color, productId } = await request.json();
        const inventoryId = Number(params.id);
        const productID = Number(productId);

        const existingInventory = await prisma.inventory.findUnique({
            where: { id: inventoryId },
        });

        let data;

        if (existingInventory) {
            // หากมีใน db ให้ทำการ update
            data = await prisma.inventory.update({
                where: { id: inventoryId },
                data: {
                    quantity: quantity,
                    size: size,
                    color: color,
                },
            });
        } else {
            // หากไม่มีใน db ให้ทำการ create
            data = await prisma.inventory.create({
                data: {
                    quantity: quantity,
                    size: size,
                    color: color,
                    productID:productID
                }
            });
        }
        return NextResponse.json({message:" update success"})
    } catch (error: any) {
        console.error(error.message)
        return new NextResponse(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}

//  deleteInvenByInvenId
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const inventoryId = Number(params.id);
    try {
        await prisma.inventory.delete({ where: { id: inventoryId } })
        return NextResponse.json("delete success");
    } catch (error: any) {
        console.error(error.message)
        return new NextResponse(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}