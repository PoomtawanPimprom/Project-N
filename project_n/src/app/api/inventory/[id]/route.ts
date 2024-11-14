import { PrismaClient } from '@prisma/client'
import { request } from 'http';
import { NextRequest } from 'next/server';

const prisma = new PrismaClient()

// getInventoriesByProductId
export async function GET(Request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const searchparams = Request.nextUrl.searchParams
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
        return Response.json(data)
    } catch (error: any) {
        console.error(error.message)
        return new Response(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}

// updateInventoryByInventoryId
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const { quantity, size, color } = await request.json();
        const inventoryId = Number(params.id);
        const data = await prisma.inventory.update({
            where: { id: inventoryId },
            data: {
                quantity: quantity,
                size: size,
                color: color
            }
        });
        return Response.json(data)
    } catch (error: any) {
        console.error(error.message)
        return new Response(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}

//  deleteInvenByInvenId
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const inventoryId = Number(params.id);
    try {
        await prisma.inventory.delete({ where: { id: inventoryId } })
        return Response.json("delete success");
    } catch (error: any) {
        console.error(error.message)
        return new Response(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}