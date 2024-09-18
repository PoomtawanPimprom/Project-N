import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const productID = Number(params.id)
    try {
        const productData = await prisma.product.findUnique({ where: { id: productID } })
        return Response.json(productData)
    } catch (error) {
        return new Response(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const productID = Number(params.id)
    try {
        const { name, price, description } = await request.json();
        const data = await prisma.product.update({
            where: { id: productID },
            data: {
                name: name,
                price: price,
                description: description
            }
        });
        return Response.json(data)
    } catch (error) {
        return new Response(error instanceof Error ? error.message : String(error), { status: 500 })
    }

}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const productID = Number(params.id)
    try {
        const deleteData = await prisma.product.delete({ where: { id: productID } })
        return Response.json("deleted successfully")
    } catch (error) {
        return new Response(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}