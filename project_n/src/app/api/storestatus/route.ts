import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request) {
    try {
        const data = await prisma.storeStatus.findMany();
        return Response.json(data)
    } catch (error) {
        return new Response(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}
export async function POST(request: Request) {
    try {
        const { name } = await request.json();
        const newStatus = await prisma.storeStatus.create({
            data: {
                name,
            }
        });
        return Response.json(newStatus)
    } catch (error) {
        return new Response(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}