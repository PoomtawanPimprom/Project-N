import { PrismaClient } from '@prisma/client'
import { NextRequest } from 'next/server';

const prisma = new PrismaClient()


// getAllReportCategoies
export async function GET(request: NextRequest) {
    try {
        const data = await prisma.reportCategory.findMany();
        return Response.json(data)
    } catch (error: any) {
        console.log(error.message)
        return new Response(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}