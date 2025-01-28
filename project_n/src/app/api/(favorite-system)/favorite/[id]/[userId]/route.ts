import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

//getRavoriteByProductIdandUserId
export async function GET(
    request: NextRequest,
    props: { params: Promise<{ id: string, userId: string }> }
) {
    const params = await props.params;
    const productId = Number(params.id)
    const userId = Number(params.userId)
    try {
        const data = await prisma.favorite.findMany({ where: { userId: userId, productId: productId } })
        return NextResponse.json(data, { status: 200})
    } catch (error: any) {
        console.error(error.message)
        return new NextResponse(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}