import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = Number(params.id);
        const data = await prisma.store.findUnique({
            where: { id },
            include:{user:true}
        })
        return Response.json(data)
    }
    catch (error) {
        return new Response(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = Number(params.id);
        const { name,description, imageLogo, imageBackgroud } = await request.json();
        const data = await prisma.store.update({
            where: { id: id },
            data: {
                name,
                description,
                imageLogo,
                imageBackgroud
            }
        })
        return Response.json(data)
    }
    catch (error) {
        return new Response(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const storeId = Number(params.id)
    try {
        const data = await prisma.store.delete({
            where: { id: storeId }
        })
        return Response.json("deleted successfully", { status: 200 })
    } catch (error) {
        return new Response(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}