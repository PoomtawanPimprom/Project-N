import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()


// getAllReportCategoies
export async function GET(request: NextRequest) {
    try {
        const data = await prisma.reportCategory.findMany();
        return NextResponse.json(data)
    } catch (error: any) {
        console.log(error.message)
        return new NextResponse(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}