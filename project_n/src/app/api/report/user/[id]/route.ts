import { PrismaClient } from '@prisma/client'
import { NextRequest } from 'next/server';

const prisma = new PrismaClient()

//getAllReportByUserId
export async function GET(request: NextRequest, { params }: { params: { id: number } }) {
    try {
        const userId =  Number(params.id)
        const data = await prisma.report.findMany({
            where: { userId: userId},
            include: {
                product: true,
                user:true,
                reportCategory:true,
                reportStatus:true,
            },
            orderBy:{ createdAt:'desc'}
        })
        return Response.json(data)
    } catch (error: any) {
        console.log(error.message)
        return new Response(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}
