import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()

// getProductsByStoreId
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const searchparams = request.nextUrl.searchParams
        const search = searchparams.get("search") || ""
        const category = searchparams.get("category") || ""
        const sortDate = searchparams.get("sortDate") || "desc"

        const storeId = Number(params.id);

        //where condition
        const whereClause = {
            storeID: storeId,
            AND: [
                search
                    ? {
                        OR: [
                            { product: { name: { contains: search, mode: 'insensitive' } } },
                        ],
                    }
                    : {},
                category
                    ? { product: { category: { id: Number(category) } } }
                    : {},
            ],
        };

        //query
        const data = await prisma.product.findMany({
            where: { storeID: storeId },
            orderBy: {
                createdAt: sortDate === 'asc' ? 'asc' : 'desc'
            }
        })
        
        return NextResponse.json(data)
    } catch (error: any) {
        console.error(error.message)
        return new NextResponse(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}
