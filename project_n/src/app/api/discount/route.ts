import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET() {
    const posts = await prisma.discount.findMany();
    return NextResponse.json(posts)
}

export async function POST(request: NextRequest) {
    try {
        const {
            name,
            code,
            discountAmount,
            isActive,
        } = await request.json();

        await prisma.discount.create({
            data: {
                name,
                code,
                discountAmount,
                isActive,
            }
        })
        return new NextResponse("Discount created successfully", { status: 201 });
    } catch (e: any) {
        console.log(e.message)
        return new NextResponse(e instanceof Error ? e.message : String(e), { status: 500 })
    }
}