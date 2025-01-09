import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const { 
            fullName,
            houseNo,
            moo,
            province,
            district,
            subDistrict ,
            postalCode,
            mobile,
            userId,
        } = await request.json();
        await prisma.userAddress.create({
            data: {
                fullName,
                houseNo,
                moo,
                province,
                district,
                subDistrict ,
                postalCode,
                mobile,
                userId,
            }
        });
        return new NextResponse("Address created successfully", { status: 201 });   
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