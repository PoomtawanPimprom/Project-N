import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

//create
export async function POST(request: Request) {
    try {
        const { userId, productId } = await request.json();
        const createFavoriteData = await prisma.favorite.create({
            data: {
                userId,
                productId
            }
        });
        return Response.json(createFavoriteData);
    } catch (error: any) {
        console.error(error.message)
        return new Response(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}


