"use server";

import prisma from "@/lib/prisma/db";
import nodemailer from "nodemailer";

const sendEmail = async (
  productName: string,
  address: string,
  userName: string | null,
  storeName: string
) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: address,
    subject: `รบกวนจัดส่งสินค้า`,
    html: `
      <p>เรียน ${userName ?? ""}</p>
      <p>เจ้าของร้านค้า ${storeName}</p>
      <p>โปรดทำการจัดส่งสินค้า <b>"${productName}"</b> ให้เสร็จสิ้นด้วยค่ะ</p>
    `,
  });
};

export async function ReportShippinpAction(_: any, formdata: FormData) {
  try {
    const orderItemId = Number(formdata.get("orderItemId"));
    if (isNaN(orderItemId)) return { message: "ไม่พบข้อมูลสินค้า" };

    const orderItem = await prisma.orderItem.findFirst({
      select: {
        reportAt: true,
        product: {
          select: {
            name: true,
            store: {
              select: {
                name: true,
                user: {
                  select: {
                    name: true,
                    email: true,
                  },
                },
              },
            },
          },
        },
      },
      where: { id: orderItemId },
    });

    if (!orderItem || !orderItem.product.store.user.email) {
      return { message: "ไม่สามารถดำเนินการได้: ไม่พบข้อมูลร้านค้า" };
    }

    const now = new Date();

    if (orderItem.reportAt === null) {
      // กรณีไม่เคยแจ้งมาก่อน — ส่งอีเมลก่อน แล้วค่อยอัปเดต
      await sendEmail(
        orderItem.product.name,
        orderItem.product.store.user.email,
        orderItem.product.store.user.name,
        orderItem.product.store.name
      );

      await prisma.orderItem.update({
        where: { id: orderItemId },
        data: { reportAt: now },
      });

      return { message: "ได้ทำการแจ้งร้านค้าแล้ว โปรดรอการจัดส่ง" };
    }

    if (orderItem.reportAt) {
      const diffTime = now.getTime() - new Date(orderItem.reportAt).getTime();
      const diffDays = diffTime / (1000 * 60 * 60 * 24);

      if (diffDays >= 3) {
        // เคยแจ้งแล้ว และครบ 3 วัน — ส่งอีเมลซ้ำ
        await sendEmail(
          orderItem.product.name,
          orderItem.product.store.user.email,
          orderItem.product.store.user.name,
          orderItem.product.store.name
        );

        return { message: "ได้ทำการแจ้งร้านค้าอีกรอบแล้ว โปรดรอการจัดส่ง" };
      } else {
        // แจ้งแล้วแต่ยังไม่ครบ 3 วัน
        return { message: "โปรดส่งใหม่ในอีก 3 วันข้างหน้า" };
      }
    }

    return { message: "ไม่สามารถดำเนินการได้" };
  } catch (error) {
    console.error("ReportShippinpAction error:", error);
    return { message: "เกิดข้อผิดพลาดขณะส่งคำร้อง กรุณาลองใหม่อีกครั้ง" };
  }
}
