"use server";

import prisma from "@/lib/prisma/db";
import { revalidatePath } from "next/cache";

type updatype = {
    orderDetailId: number;
};

export async function cancelDiscouteAction({ orderDetailId }: updatype) {
    // Apply discount code if not used
    await prisma.orderDetail.update({
        where: { id: orderDetailId },
        data: { discountId: null},
    });

    revalidatePath(`/payment`);
    return { message: "ยกเลิกโค้ดส่วนลดสำเร็จ" };
}