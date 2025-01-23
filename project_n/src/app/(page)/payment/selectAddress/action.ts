"use server"

import prisma from "@/lib/prisma/db";
import { revalidatePath } from "next/cache";

type updatype = {
    userId: number
    defalutAddressId?: number
}

export async function UpdateAddressAction({ userId, defalutAddressId }: updatype, formdata: FormData) {
    const newAddressId = formdata.get('address');
    //in case doesn't have defalutAddressId
    if (!defalutAddressId) {
        await prisma.userAddress.update({
            where: { userId: userId, id: Number(newAddressId) },
            data: {
                addressStatusId: 1,
            }
        })
    }
    //in case have defalutAddressId
    else{
        await prisma.userAddress.update({
            where:{id:defalutAddressId},
            data:{
                addressStatusId:0
            }
        })
        await prisma.userAddress.update({
            where:{id:Number(newAddressId)},
            data:{
                addressStatusId:1
            }
        })
    }
    revalidatePath(`/payment`)
    return
}

