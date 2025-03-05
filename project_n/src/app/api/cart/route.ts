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

        // check inventory is enough?
        const stock = await prisma.inventory.findFirst({
            where: {
                color,
                size,
            },
        });

        if (!stock) {
            throw new Error("internal error");
        }
        if (stock.quantity === 0) {
            throw new Error("สินค้าหมดแล้ว");
        }

        if (stock.quantity - quantity < 0) {
            throw new Error("สินค้าไม่พอ");
        }

        if (existingCartItem) {
            // อัปเดต quantity ถ้ามีอยู่ใน cart แล้ว
            const updatedCartItem = await prisma.cartItem.update({
                where: {
                    id: existingCartItem.id,
                },
                data: {
                    quantity: existingCartItem.quantity + quantity,
                },
            });

            return NextResponse.json(
                {
                    message: "Cart updated successfully",
                    data: updatedCartItem,
                },
                { status: 200 }
            );
        } else {
            // เพิ่มสินค้าเข้า cart ถ้าไม่มี
            const newCartItem = await prisma.cartItem.create({
                data: {
                    userId,
                    productId,
                    color,
                    size,
                    quantity,
                },
            });

            return NextResponse.json(
                {
                    message: "Cart created successfully",
                    data: newCartItem,
                },
                { status: 201 }
            );
        }
    } catch (e: any) {
        console.error(e);
        let status = 500;
        let message = "Internal server error";

        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            switch (e.code) {
                case "P2002":
                    status = 409; // Conflict
                    message = "Duplicate field value violates unique constraint";
                    break;
                default:
                    message = `Database error: ${e.message}`;
            }
        } else if (e instanceof Prisma.PrismaClientUnknownRequestError) {
            message = "Unknown database error occurred";
        } else if (e instanceof Prisma.PrismaClientValidationError) {
            status = 422;
            message = `Validation error: ${e.message}`;
        } else if (e instanceof SyntaxError) {
            status = 400;
            message = "Invalid JSON payload";
        } else if (e instanceof TypeError) {
            status = 422;
            message = "Missing or invalid fields";
        } else {
            message = e.message || "Unknown error occurred";
        }

        return NextResponse.json({ message }, { status });
    }
}
