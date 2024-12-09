import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export async function POST(request: Request) {
    try {
        const { name, userId, description, imageLogoURL, imageLogoFileName, imageBackgroundURL, imageBgFileName } = await request.json();
        const newStore = await prisma.store.create({
            data: {
                name,
                description,
                userId,

                imageLogoURL,
                imageLogoFileName,
                imageBackgroundURL,
                imageBgFileName,
            }
        });
        return Response.json(newStore)
    } catch (error:any) {
        console.error(error.message)
        return new Response(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}


