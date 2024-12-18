import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
    try {
        const data = await prisma.storeStatus.findMany();
        return NextResponse.json(data)
    } catch (error) {
        return new NextResponse(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}
export async function POST(request: NextRequest) {
    try {
        const { name } = await request.json();
        const newStatus = await prisma.storeStatus.create({
            data: {
                name,
            }
        });
        return NextResponse.json(newStatus)
    } catch (error) {
        return new NextResponse(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}