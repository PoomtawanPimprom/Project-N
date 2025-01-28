import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()

//deleteFollowByid
export async function DELETE(request: NextRequest, props: { params: Promise<{ userId: string }> }) {
    const params = await props.params;
    try {
        const followId = Number(params.userId)
        //get follow data by followId
        const followData = await prisma.follow.findUnique({ where: { id: followId } })

        //case : not found 
        if (!followData) {
            return NextResponse.json({ message: "ไม่พบรายการติดตาม" }, { status: 404 });
        }

        //find store data by followId
        const storeData = await prisma.store.findUnique({ where: { id: followData.storeId } })
        if (!storeData) {
            return NextResponse.json({ message: "ไม่พบร้านค้า" }, { status: 404 });
        }

        //delete in follow table
        const data = await prisma.follow.delete({ where: { id: followId } })

        //update store follow count
        await prisma.store.update({
            where: { id: storeData.id },
            data: { follow: storeData.follow - 1 }
        })

        //case : completed
        return NextResponse.json({ message: "เลิกติดตาม" }, { status: 200 });
    } catch (error: any) {
        console.error(error.message)
        return new NextResponse(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}


//getAllFollowByUserID
export async function GET(request: NextRequest, props: { params: Promise<{ userId: string }> }) {
    const params = await props.params;
    try {
        const userId = Number(params.userId)
        const data = await prisma.follow.findMany({
            where: {
                userId
            }
        })
        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {

        console.error(error.message)
        return new NextResponse(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}