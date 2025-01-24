import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()

// getInventoriesByProductId
export async function GET(NextRequest: NextRequest, { params }: { params: { id: string } }) {
    const userId = Number(params.id)
    try {
        const res = await prisma.store.findFirst({
            where:{ userId:userId, }
        })
        if(res === null){
            return NextResponse.json({status: false},{status:200})
        }
        return NextResponse.json({status: true,store:res},{status:200})
    } catch (error:any) {
        console.error(error.message || error);
        return NextResponse.json({
            message: error instanceof Error ? error.message : "Unexpected error occurred."
        }, { status: 500 });
    }
    

}