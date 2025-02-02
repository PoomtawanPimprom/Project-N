import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET() {
    const posts = await prisma.discount.findMany({
        where:{ isActive: true}
    });
    return NextResponse.json(posts)
}
