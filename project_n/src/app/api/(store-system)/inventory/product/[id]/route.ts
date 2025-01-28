import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()

export async function GET(NextRequest: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        const productId = Number(params.id);
        const data = await prisma.inventory.findFirst({ where: { productID: productId } })
        return NextResponse.json(data)
    } catch (error: any) {
        console.error(error.message)
        return new NextResponse(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}