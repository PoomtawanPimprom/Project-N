import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

//getRavoriteByProductIdandUserId
export async function GET(request: Request, { params }: { params: { id: string, userId: string } }) {
    const productId = Number(params.id)
    const userId = Number(params.userId)
    try {
        const data = await prisma.favorite.findMany({ where: { userId: userId, productId: productId } })
        return Response.json(data, { status: 200})
    } catch (error: any) {
        console.error(error.message)
        return new Response(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}