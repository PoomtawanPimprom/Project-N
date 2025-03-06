import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()

// getInventoriesByProductId
export async function GET(NextRequest: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        const searchparams = NextRequest.nextUrl.searchParams
        const search = searchparams.get("search") || ""
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
export async function PUT(request: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        const { quantity, size, color, productId } = await request.json();
        const inventoryId = Number(params.id);
        const productID = Number(productId);

        let existingInventory = null;
        let data;

        if (inventoryId) {
            existingInventory = await prisma.inventory.findUnique({
                where: { id: inventoryId },
            });
        }

        if (existingInventory) {
            // ✅ หากมีอยู่ใน DB → Update
            data = await prisma.inventory.update({
                where: { id: inventoryId },
                data: { quantity:Number(quantity), size, color },
            });
        } else {
            // 🔍 เช็คว่ามี productID + size + color ซ้ำหรือไม่
            const duplicateInventory = await prisma.inventory.findUnique({
                where: {
                    productID_size_color: {
                        productID,
                        size,
                        color,
                    },
                },
            });

            if (duplicateInventory) {
                // ✅ ถ้ามีอยู่แล้ว แค่ Update quantity
                data = await prisma.inventory.update({
                    where: { id: duplicateInventory.id },
                    data: { quantity:Number(quantity) },
                });
            } else {
                // ✅ ถ้าไม่มี → Create ใหม่
                data = await prisma.inventory.create({
                    data: {
                        quantity:Number(quantity),
                        size,
                        color,
                        productID,
                    },
                });
            }
        }

        console.log("data", data);
        return NextResponse.json({ message: "Update success" });
    } catch (error: any) {
        console.error(error.message);
        return new NextResponse(error instanceof Error ? error.message : String(error), { status: 500 });
    }
}



//  deleteInvenByInvenId
export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const inventoryId = Number(params.id);
    try {
        await prisma.inventory.delete({ where: { id: inventoryId } })
        return NextResponse.json("delete success");
    } catch (error: any) {
        console.error(error.message)
        return new NextResponse(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}