import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export async function POST(request: Request) {
    try {
        const { name } = await request.json();
        const newStore = await prisma.store.create({
            data: {
                name,
            }
        });
        return Response.json(newStore)
    } catch (error) {
        return new Response(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}


