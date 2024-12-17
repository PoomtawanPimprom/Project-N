import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = Number(params.id);
        const data = await prisma.store.findUnique({
            where: { id },
            include:{user:true}
        })
        return NextResponse.json(data)
    }
    catch (error) {
        return new NextResponse(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = Number(params.id);
        const { name,description, imageLogoURL, imageLogoFileName, imageBackgroundURL, imageBgFileName  } = await request.json();
        const data = await prisma.store.update({
            where: { id: id },
            data: {
                name,
                description,

                imageLogoURL,
                imageLogoFileName,
                imageBackgroundURL,
                imageBgFileName,
            }
        })
        return NextResponse.json(data)
    }
    catch (error:any) {
        console.log(error.message)
        return new NextResponse(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const storeId = Number(params.id)
    try {
        const data = await prisma.store.delete({
            where: { id: storeId }
        })
        return NextResponse.json("deleted successfully", { status: 200 })
    } catch (error) {
        return new NextResponse(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}