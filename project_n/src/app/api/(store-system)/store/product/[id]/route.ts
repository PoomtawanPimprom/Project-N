import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()

// getProductsByStoreId
export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        const searchparams = request.nextUrl.searchParams;
        const search = searchparams.get("search") || "";
        const sortDate = searchparams.get("sortDate") || "desc";

        const storeId = Number(params.id);

        // where condition
        const whereClause: any = {
            storeID: storeId,
            deletedAt: null, 
        };

        // ถ้ามีการค้นหา ให้เพิ่มเงื่อนไข
        if (search) {
            whereClause.name = { contains: search }; 
        }

        // query
        const data = await prisma.product.findMany({
            where: whereClause,
            orderBy: {
                createdAt: sortDate === 'asc' ? 'asc' : 'desc',
            },
        });

        return NextResponse.json(data);
    } catch (error: any) {
        console.error(error.message);
        return new NextResponse(error instanceof Error ? error.message : String(error), { status: 500 });
    }
}
