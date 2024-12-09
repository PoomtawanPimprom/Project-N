import { PrismaClient } from '@prisma/client'
import { NextRequest } from 'next/server';

const prisma = new PrismaClient()

//getReportById
export async function GET(request: NextRequest, { params }: { params: { id: number } }) {
    try {
        const reportId = Number(params.id)
        const data = await prisma.report.findUnique({
            where: { id: reportId },
            include: {
                product:{ select: { id: true, name: true } },
                user:{ select: { id: true, name: true } },
                reportCategory:true,
            }
        })
        return Response.json(data)
    } catch (error: any) {
        console.log(error.message)
        return new Response(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: number } }) {
    try {
        const reportId = Number(params.id)
        const { comment, image, userId, productId } = await request.json();
        const data = await prisma.report.update({
            where: { id: reportId },
            data: {
                comment,
                userId,
                productId
            }
        })
        return Response.json(data)
    } catch (error: any) {
        console.log(error.message)
        return new Response(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: number } }) {
    try {
        const reportId = Number(params.id)
        const data = await prisma.report.delete({ where: { id: reportId } })
        return Response.json(data)
    } catch (error: any) {
        console.log(error.message)
        return new Response(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}