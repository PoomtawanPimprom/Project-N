import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()


export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const productID = Number(params.id)
    try {
        const productData = await prisma.product.findUnique({ where: { id: productID }, include: { store:true} })
        return NextResponse.json(productData)
    } catch (error) {
        return new NextResponse(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const productID = Number(params.id)
    try {
        const { name, price, description ,categoryId,image } = await request.json();
        const data = await prisma.product.update({
            where: { id: productID },
            data: {
                name: name,
                price: price,
                description: description,
                image:image,
                categoryID:categoryId,
            }
        });
        return NextResponse.json(data)
    } catch (error) {
        return new NextResponse(error instanceof Error ? error.message : String(error), { status: 500 })
    }

}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const productID = Number(params.id)
    try {
        const deleteData = await prisma.product.delete({ where: { id: productID } })
        return NextResponse.json("deleted successfully")
    } catch (error) {
        return new NextResponse(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}