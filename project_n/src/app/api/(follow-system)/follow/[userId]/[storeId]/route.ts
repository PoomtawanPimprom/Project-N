import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()

//checkFollowed
export async function GET(request: NextRequest, { params }: { params: { userId: string, storeId: string } }) {
    try {
        const userId = Number(params.userId)
        const storeId = Number(params.storeId)
        //check store data
        const storeData = await prisma.store.findUnique({ where: { id: storeId } })
        if (!storeData) {
            return NextResponse.json({ message: "ไม่พบร้านค้า" }, { status: 404 });
        }

        const data = await prisma.follow.findFirst({ where: { userId: userId, storeId: storeId } })

        //caae : not found 
        if (!data) return NextResponse.json({ follow: false }, { status: 200 });
        
        //case : found
        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        console.error(error.message)
        return new NextResponse(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}

