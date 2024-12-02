"use server";

import prisma from "@/lib/prisma/db";
import { revalidatePath } from "next/cache";

export const actionDelete = async (userId:number,formData: FormData) => {
  const deleteButton = formData.get("deleteButton");
    console.log("delete",deleteButton)
    console.log("userId ",userId)
  // await prisma.favorite.delete({
  //   where: { id: Number(deleteButton) },
  // });
  // revalidatePath(`/favorite/${userId}`);
  return {massage: "Deleted successfully!"};
};
