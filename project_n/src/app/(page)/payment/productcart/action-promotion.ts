"use server";

import prisma from "@/lib/prisma/db";
import { revalidatePath } from "next/cache";

type updatype = {
    orderDetailId: number;
    userId: number;
};

export async function AddDiscouteAction({ orderDetailId, userId }: updatype, formdata: FormData) {
    const discountCode = formdata.get("discountCode");
    if (discountCode === null || discountCode === "") return { message: "กรุณาใส่โค้ดส่วนลด" };

    // Check discount
    const discount = await prisma.discount.findFirst({
        where: { code: discountCode.toString(), isActive: true },
    });
    if (!discount) return { message: "ไม่พบโค้ดส่วนลดนี้ หรือโค้ดหมดอายุแล้ว" };

    // Check if the discount code has been used
    const checkUsed = await prisma.orderDetail.findFirst({
        where: { id: orderDetailId, discountId: discount.id, userId: userId },
    });

    if (checkUsed) return { message: "คุณได้ใช้โค้ดนี้ไปแล้ว" };

    // Apply discount code if doesnt used
    await prisma.orderDetail.update({
        where: { id: orderDetailId },
        data: { discountId: discount.id },
    });

    revalidatePath(`/payment`);
    return { message: "ใช้โค้ดส่วนลดสำเร็จ" };
}


