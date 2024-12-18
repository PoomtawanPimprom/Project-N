import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
    try {
        const data = await prisma.category.findMany();
        return NextResponse.json(data)
    } catch (error) {
        return new NextResponse(error instanceof Error ? error.message : String(error), { status: 500 })

    }
}