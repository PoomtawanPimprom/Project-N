import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const { 
            userId, 
            productId, 
            color, 
            size, 
            quantity 
        } = await request.json();

        // check in cart by productId, color, size
        const existingCartItem = await prisma.cartItem.findFirst({
            where: {
                userId,
                productId,
                color,
                size,
            },
        });

        if (existingCartItem) {
            // ถ้าพบสินค้า ให้ทำการอัปเดต quantity
            const updatedCartItem = await prisma.cartItem.update({
                where: {
                    id: existingCartItem.id, // ใช้ id ของรายการที่พบ
                },
                data: {
                    quantity: existingCartItem.quantity + quantity, // quantity++
                },
            });

            return new NextResponse(
                JSON.stringify({
                    message: "Cart updated successfully",
                    data: updatedCartItem,
                }),
                { status: 200 }
            );
        } else {
            // ถ้าไม่พบสินค้า ให้สร้าง cart item ใหม่
            const newCartItem = await prisma.cartItem.create({
                data: {
                    userId,
                    productId,
                    color,
                    size,
                    quantity,
                },
            });

            return new NextResponse(
                JSON.stringify({
                    message: "Cart created successfully",
                    data: newCartItem,
                }),
                { status: 201 }
            );
        }
    } catch (e: any) {
        console.error(e);
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            switch (e.code) {
                case "P2002":
                    return new NextResponse(
                        "Duplicate field value violates unique constraint",
                        { status: 404 }
                    );
                default:
                    return new NextResponse(`Database error: ${e.message}`, {
                        status: 500,
                    });
            }
        } else if (e instanceof Prisma.PrismaClientUnknownRequestError) {
            return new NextResponse("Unknown database error occurred", {
                status: 500,
            });
        } else if (e instanceof Prisma.PrismaClientValidationError) {
            return new NextResponse(`Validation error: ${e.message}`, {
                status: 422,
            });
        } else if (e instanceof SyntaxError) {
            return new NextResponse("Invalid JSON payload", { status: 400 });
        } else if (e instanceof TypeError) {
            return new NextResponse("Missing or invalid fields", { status: 422 });
        } else {
            return new NextResponse("Internal server error", { status: 500 });
        }
    }
}
