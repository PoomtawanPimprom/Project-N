import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// approve or reject
export async function PUT(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  // const requestId  = Number(params.id);
  const { id } = await params;
  const requestId = Number(id);
  const { approvedById,message } = await req.json();
  const searchparams = req.nextUrl.searchParams;
  const status = searchparams.get("status") || "";
  try {
    if (status === `update`) {
      const data = await prisma.withdrawalRequest.update({
        select: {
          store: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        where: { id: requestId },
        data: {
          statusId: 2, // สมมติว่า "2" คือ approved
          approvedById,
          approvedAt: new Date(),
        },
      });

      await prisma.orderItem.updateMany({
        data: { Already_withdrawn: 2 },
        where: { storeId: data.store.id },
      });

      return NextResponse.json({
        success: true,
        message: `ทำการอนุมัติการเบิกเงินของร้านค้า ${data.store.name} เรียบร้อย
        `,
      });
    } else {
      const data = await prisma.withdrawalRequest.update({
        select: {
          store: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        where: { id: requestId },
        data: {
          statusId: 3, // สมมติว่า "3" คือ rejected
          approvedById,
          approvedAt: new Date(),
          message:message
        },
      });
      await prisma.orderItem.updateMany({
        data: { Already_withdrawn: 0 },
        where: { 
          storeId: data.store.id,
          Already_withdrawn:1
         },
      });
      return NextResponse.json({
        success: true,
        message: `ทำการยกเลิกการเบิกเงินของร้านค้า ${data.store.name} เรียบร้อย
        `,
      });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "Approval failed" },
      { status: 500 }
    );
  }
}
