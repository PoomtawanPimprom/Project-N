import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer"; // ใช้สำหรับส่งอีเมล

const prisma = new PrismaClient();

// ฟังก์ชันส่งอีเมลแจ้งเตือนสินค้าใกล้หมด
async function sendLowStockAlert(productName: string, storeEmail: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // กำหนดค่าใน .env
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: storeEmail,
    subject: "แจ้งเตือนสินค้าใกล้หมด",
    text: `สินค้าชื่อ "${productName}" ใกล้หมดแล้ว! กรุณาเติมสต็อก`,
  };

  await transporter.sendMail(mailOptions);
}

export async function PUT(request: NextRequest) {
  const { paymentId, orderDetailId, userId } = await request.json();
  try {
    // ดึงที่อยู่เริ่มต้นของผู้ใช้
    const userAddress = await prisma.userAddress.findFirst({
      where: { userId: userId, addressStatusId: 2 },
    });

    // อัปเดตสถานะการชำระเงินเป็น "เสร็จสมบูรณ์"
    await prisma.payment.update({
      where: { id: paymentId },
      data: { paymentStatusId: 2 },
    });

    // อัปเดตข้อมูล orderDetail
    const orderDetail = await prisma.orderDetail.update({
      where: { id: orderDetailId },
      data: { paymentId: paymentId, orderStatusId: 2 },
    });

    // อัปเดต orderItem เป็นกำลังจัดส่ง
    await prisma.orderItem.updateMany({
      where: { orderDetailId: orderDetailId },
      data: { orderItemStatusId: 2, userAddressId: userAddress?.id },
    });

    // ดึงข้อมูล order items ทั้งหมด
    const allOrderItems = await prisma.orderItem.findMany({
      where: { orderDetailId: orderDetail.id },
    });

    // ลบสินค้าจากสต็อก
    await Promise.all(
      allOrderItems.map(async (orderItem) => {
        const inventory = await prisma.inventory.findUnique({
          where: {
            productID_size_color: {
              color: orderItem.color ? orderItem.color : "",
              productID: orderItem.productId,
              size: orderItem.size ? orderItem.size : "",
            },
          },
          include: {
            product: {
              select: { name: true }
            }
          }
        });

        if (!inventory) {
          throw new Error(`ไม่พบสินค้ารหัส ${orderItem.productId} ในสต็อก`);
        }

        // ตรวจสอบว่าสินค้าเหลือพอไหม
        if (inventory.quantity - orderItem.quantity < 0) {
          throw new Error(`${inventory.product.name} เหลือจำนวนไม่พอ!`);
        }
        if (inventory.quantity === 0) {
          throw new Error(`${inventory.product.name} หมดแล้ว!`);
        }

        // อัปเดตจำนวนสต็อก
        await prisma.inventory.update({
          where: {
            productID_size_color: {
              color: orderItem.color ? orderItem.color : "",
              productID: orderItem.productId,
              size: orderItem.size ? orderItem.size : "",
            },
          },
          data: { quantity: { decrement: orderItem.quantity } },
        });

        // อัปเดตจำนวนสินค้าที่ขายไป
        await prisma.product.update({
          where: { id: orderItem.productId },
          data: { sales: { increment: orderItem.quantity } },
        });

        // ถ้าสินค้าคงเหลือน้อยกว่า 5 ชิ้น ให้ส่งอีเมลแจ้งเตือน
        const updatedInventory = await prisma.inventory.findUnique({
          where: {
            productID_size_color: {
              color: orderItem.color ? orderItem.color : "",
              productID: orderItem.productId,
              size: orderItem.size ? orderItem.size : "",
            },
          },
        });

        if (updatedInventory?.quantity && updatedInventory.quantity <= 5) {
          const product = await prisma.product.findUnique({
            where: { id: orderItem.productId },
            select: { name: true, store: { select: { user: { select: { email: true } } } } },
          });

          if (product?.store?.user.email) {
            await sendLowStockAlert(product.name, product.store.user.email);
          }
        }
      })
    );

    // ลบสินค้าที่ซื้อแล้วออกจากตะกร้า
    await prisma.cartItem.deleteMany({
      where: {
        userId: userId,
        productId: { in: allOrderItems.map((item) => item.productId) },
      },
    });

    return NextResponse.json({ message: "ชำระเงินเสร็จสิ้น" }, { status: 200 });
  } catch (error: any) {
    console.log(error)
    if (error.code === "ECONNRESET") {
      return NextResponse.json({ message: "Database connection lost" }, { status: 500 });
    }
    let message = "internal server error: "
    let status = 500
    message = error.message
    return NextResponse.json({ message }, { status });
  }
}
