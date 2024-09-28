import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request) {
    try {
        const data = await prisma.category.findMany();
        return Response.json(data)
    } catch (error) {
        return new Response(error instanceof Error ? error.message : String(error), { status: 500 })

    }
}