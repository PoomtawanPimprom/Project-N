import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

async function sendEmailWhenShipping(productName: string, useEmail: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: useEmail,
    subject: `สินค้าชื่อ "${productName}" ได้ถูกจัดส่งแล้ว`,
    text: `สินค้าชื่อ "${productName}" ทางร้านได้รับสินค้าเรียบร้อยแล้วนะ รอรับสินค้าได้เลย`,
  };

  await transporter.sendMail(mailOptions);
}

export async function PUT(request: NextRequest) {
  const { orderItemId } = await request.json();
  try {
    const orderItem = await prisma.orderItem.update({
        where: { id: orderItemId },
        data: { orderItemStatusId: 3 },
        select: {
          id: true, 
          product: {
            select: { name: true },
          },
          orderDetail: {
            select: {
              user: {
                select: { email: true },
              },
            },
          },
        },
      });
    sendEmailWhenShipping(
      orderItem.product.name,
      orderItem.orderDetail?.user?.email!
    );
    return NextResponse.json(
      { message: "update order status done!" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error.message);
    return new NextResponse(
      error instanceof Error ? error.message : String(error),
      { status: 500 }
    );
  }
}
