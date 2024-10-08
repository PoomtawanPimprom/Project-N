import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// getProductsByStoreId
export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const storeId = Number(params.id);
        const data = await prisma.product.findMany({ where: { storeID: storeId } })
        return Response.json(data)
    } catch (error: any) {
        console.error(error.message)
        return new Response(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}
