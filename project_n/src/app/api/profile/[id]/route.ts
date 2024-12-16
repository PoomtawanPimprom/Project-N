import { Prisma, PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()

export async function GET(request: NextRequest, { params } : { params: { id: string}}) {
    const userId = Number(params.id);
    const posts = await prisma.user.findUnique({ where: { id: userId } });
    return Response.json(posts)
}

export async function PUT(request: NextRequest, { params } : { params: { id: string}}){
    try {
        const { 
            name,
            username,
            password,
            email,
            mobile,
            birthdate,
            profile,
            saler,
            genderId,
            roleId,
            userStatusId,
            userAddressId
        } = await request.json();
        const userId = Number(params.id)
        const updatePost = await prisma.user.update({
            where: { id: userId }, data: { 
                name,
                username,
                password,
                email,
                mobile,
                birthdate: new Date(birthdate),
                profile,
                saler,
                genderId,
                roleId,
                userStatusId,
                userAddressId
            }
        });
        return NextResponse.json(updatePost);
    } catch (e: any) {
        return new NextResponse(e instanceof Error ? e.message : String(e), { status: 500 })
    }
}

export async function DELETE(request: NextRequest, { params } : { params: { id: string}}){
    try {
        const userID = Number(params.id);
        // await prisma.user.deleteMany({
        //     where: { userId: userID },
        // });
        await prisma.user.delete({ where: { id: userID } });
        return new NextResponse("User delete successfully", { status: 201 });
    } catch (e: any) {
        return new NextResponse(e instanceof Error ? e.message : String(e), { status: 500 })
    }
}