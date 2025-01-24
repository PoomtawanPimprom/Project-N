"use server"

import prisma from "@/lib/prisma/db";
import { revalidatePath } from "next/cache";

type updatype = {
    orderDetailId: string
}

export async function UpdateTransprotAction({ orderDetailId  }: updatype, formdata: FormData) {
    const transportId = formdata.get('transportId');
    await prisma.orderDetail.update({
        where:{id: Number(orderDetailId)},
        data:{transportId:Number(transportId)}
    })
    revalidatePath(`/payment`)
    return
}

