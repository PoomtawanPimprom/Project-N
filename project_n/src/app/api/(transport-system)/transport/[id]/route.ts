import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(req:NextRequest, props:{params: Promise<{id:number}>}) {
    const params = await props.params;
    const id = Number(params.id)
    try{
        await prisma.transport.delete({
            where:{id}
        })
     return NextResponse.json({message: "delete transport successfuly"}, { status: 200 });
    } catch (error: any) {
        console.error(error.message)
        return new NextResponse(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}
