import { Prisma, PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()

export async function GET(request: NextRequest, props: { params: Promise<{ id: string}>}) {
    const params = await props.params;
    const userId = Number(params.id);
    if (isNaN(userId)) {
        return new NextResponse("Invalid user ID", { status: 400 });
      }
      try {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
          return new NextResponse("User not found", { status: 404 });
        }
        return NextResponse.json(user, { status: 200 });
      } catch (error: any) {
        console.error("Error fetching user:", error);
        return new NextResponse(
          error instanceof Error ? error.message : "Internal server error",
          { status: 500 }
        );
      }
}

export async function PUT(request: NextRequest, props: { params: Promise<{ id: string}>}) {
    const params = await props.params;
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
            resetToken,
            resetTokenExp,
            genderId,
            roleId,
            userStatusId,
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
                resetToken,
                resetTokenExp,
                genderId,
                roleId,
                userStatusId,
            }
        });
        return NextResponse.json(updatePost);
    } catch (e: any) {
        return new NextResponse(e instanceof Error ? e.message : String(e), { status: 500 })
    }
}

export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string}>}) {
    const params = await props.params;
    try {
        const userID = Number(params.id);
        await prisma.user.delete({ where: { id: userID } });
        return new NextResponse("User delete successfully", { status: 201 });
    } catch (e: any) {
        return new NextResponse(e instanceof Error ? e.message : String(e), { status: 500 })
    }
}