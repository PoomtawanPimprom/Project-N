import { PrismaClient } from '@prisma/client'
import { request } from 'http';
import { NextRequest } from 'next/server';

const prisma = new PrismaClient()

export async function GET(Request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const productId = Number(params.id);
        const data = await prisma.inventory.findFirst({ where: { productID: productId } })
        return Response.json(data)
    } catch (error: any) {
        console.error(error.message)
        return new Response(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}