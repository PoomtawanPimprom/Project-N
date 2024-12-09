"use server"

import prisma from "@/lib/prisma/db";
import { revalidatePath } from "next/cache";

export async function ManageReportAction(reportId: number, formData: FormData) {
    const selectStatus = formData.get("selectReportStatus");
    await prisma.report.update({
        where: { id: Number(reportId) },
        data: { reportStatusId: Number(selectStatus) }
    })
    revalidatePath(`/admin/manage/report/${reportId}`)
    return
}