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
  const searchparams = req.nextUrl.searchParams;
  const status = searchparams.get("status") || "";
  console.log(id, status);
  const { approvedById } = await req.json();
  try {
    if (status === `update`) {
      const data = await prisma.withdrawalRequest.update({
        select: { store: { select: { name: true } } },
        where: { id: requestId },
        data: {
          statusId: 2, // สมมติว่า "2" คือ approved
          approvedById,
          approvedAt: new Date(),
        },
      });
      return NextResponse.json({
        success: true,
        message: `ทำการอนุมัติการเบิกเงินของร้านค้า ${data.store.name} เรียบร้อย
        `,
      });
    } else {
      const data = await prisma.withdrawalRequest.update({
        select: { store: { select: { name: true } } },
        where: { id: requestId },
        data: {
          statusId: 3, // สมมติว่า "3" คือ rejected
          approvedById,
          approvedAt: new Date(),
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
