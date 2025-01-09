import { Prisma, PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()

export async function GET() {
    const posts = await prisma.user.findMany();
    return NextResponse.json(posts)
}

export async function POST(request: NextRequest) {
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

        await prisma.user.create({
            data: {
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
        return new NextResponse("User created successfully", { status: 201 });
    } catch (e: any) {
        console.error(e);
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            switch (e.code) {
                case 'P2002':
                    return new NextResponse("Duplicate field value violates unique constraint", { status: 404});
                default:
                    return new NextResponse(`Database error: ${e.message}`, { status: 500});
            }
        } else if (e instanceof Prisma.PrismaClientUnknownRequestError) {
            return new NextResponse("Unknown database error occurred", { status: 500 });
        } else if (e instanceof Prisma.PrismaClientValidationError) {
            return new NextResponse(`Validation error: ${e.message}`, { status: 422 });
        } else if (e instanceof SyntaxError) {
            return new NextResponse("Invalid JSON payload", { status: 400 });
        } else if (e instanceof TypeError) {
            return new NextResponse("Missing or invalid fields", { status: 422 });
        } else {
            return new NextResponse("Internal server error", { status: 500 });
        }
    }
}

