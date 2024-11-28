import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


//getAllFavoriteByUserID
export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const userId = Number(params.id)
        if (userId === null || "") {
            return Response.json("invalid user", { status: 404 })
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
        return Response.json(data);
    } catch (error: any) {
        console.error(error.message)
        return new Response(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}

//deleteByFavoriteID
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const favoriteID = Number(params.id)
    try {
        const data = await prisma.favorite.delete({ where: { id: favoriteID } })
        return Response.json("delete success ", { status: 200 })
    } catch (error: any) {
        console.error(error.message)
        if (error.code === "P2025") {
            return new Response("favoriteID not found", { status: 400 });
        }

        return new Response(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}