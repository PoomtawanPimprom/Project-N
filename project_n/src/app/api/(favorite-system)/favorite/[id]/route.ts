import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()


//getAllFavoriteByUserID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const userId = Number(params.id)
        if (userId === null || "") {
            return NextResponse.json("invalid user", { status: 404 })
        }
        const data = await prisma.favorite.findMany({
            where: { userId: userId },
            include: { 
                product: { 
                    select: { 
                        name: true,
                        image: true,
                        price: true,
                        store:{
                            select:{
                                name: true,
                            }
                        }
                    },
                    
                } 
            }
        })
        return NextResponse.json(data);
    } catch (error: any) {
        console.error(error.message)
        return new NextResponse(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}

//deleteByFavoriteID
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const favoriteID = Number(params.id)
    try {
        const data = await prisma.favorite.delete({ where: { id: favoriteID } })
        return NextResponse.json({message:"ลบสำสิ้น"}, { status: 200 })
    } catch (error: any) {
        console.error(error.message)
        if (error.code === "P2025") {
            return new NextResponse("favoriteID not found", { status: 400 });
        }

        return new NextResponse(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}