import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        const data = await prisma.transport.findMany()
        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        console.error(error.message)
        return new NextResponse(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    const { providerName, transportPrice } = await req.json();
    try {
        await prisma.transport.create({
            data: { providerName, transportPrice: Number(transportPrice) }
        })
        return NextResponse.json({ message: "create transport successfully" }, { status: 200 });
    } catch (error: any) {
        console.error(error.message)
        return new NextResponse(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}