import { PrismaClient } from '@prisma/client'
import { NextRequest } from 'next/server';

const prisma = new PrismaClient()

// getAllReport
export async function GET(request: NextRequest) {
    try {
        const data = await prisma.report.findMany();
        return Response.json(data)
    } catch (error: any) {
        console.log(error.message)
        return new Response(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}

// createReport
export async function POST(request: NextRequest) {
    try {
        const { comment, image, userId, productId } = await request.json();
        const data = await prisma.report.create({
            data: {
                comment,
                image,
                userId,
                productId
            }
        });
        return Response.json(data, { status: 200 })
    } catch (error: any) {
        console.log(error.message)
        return new Response(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}