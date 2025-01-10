"use server"

import prisma from "@/lib/prisma/db";
import { revalidatePath } from "next/cache";


export async function UpdateAddressAction(addressId:any,formdata:FormData) {
    const data = formdata.get('address');
    await prisma.userAddress.update({
        where:{id:addressId},
        data:{
        }
    })
    revalidatePath(`/payment`)
    return
}

