"use server";

import prisma from "@/lib/prisma/db";
import { revalidatePath } from "next/cache";

type updatype = {
    orderDetailId: number;
};

export async function cancelDiscouteAction({ orderDetailId }: updatype, formdata: FormData) {
    // Apply discount code if not used
    await prisma.orderDetail.update({
        where: { id: orderDetailId },
        data: { discountId: 0},
    });

    revalidatePath(`/payment`);
    return { message: "ยกเลิกโค้ดส่วนลดสำเร็จ" };
}