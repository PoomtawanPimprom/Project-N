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
          subDistrict,
          postalCode,
          mobile,
          userId,
          addressStatusId,
        } = await request.json();
    
        // ตรวจสอบว่ามี addressStatusId = 1 ในฐานข้อมูลหรือไม่
        if (addressStatusId === 1) {
          await prisma.userAddress.updateMany({
            where: {
              addressStatusId: 1,
              userId: userId, // เฉพาะข้อมูลของ userId นี้
            },
            data: {
              addressStatusId: 3, // เปลี่ยนเป็น 3
            },
          });
        }
    
        // เพิ่มข้อมูลใหม่
        const newAddress = await prisma.userAddress.create({
          data: {
            fullName,
            houseNo,
            moo,
            province,
            district,
            subDistrict,
            postalCode,
            mobile,
            userId,
            addressStatusId,
          },
        });
    
        return NextResponse.json(newAddress);
    } catch (e: any) {
        console.error(e);
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            switch (e.code) {
                case 'P2002':
                    console.log(e)
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