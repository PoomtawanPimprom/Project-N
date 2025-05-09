// POST /api/withdrawal-request
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { storeId, bookBankId, amount } = body;

  try {
    await prisma.withdrawalRequest.create({
      data: {
        storeId,
        amount,
        bookBankId,
        statusId: 1, // รหัสสถานะ "pending"
      },
    });
    await prisma.orderItem.updateMany({
      data: { Already_withdrawn: 1 },
      where: { 
        storeId: storeId,
        Already_withdrawn:{
          not:2
        }
        
       },
    });
    return NextResponse.json({
      success: true,
      message: `ทำการเบิกเสร็จสิ้น รอแอดมินอนุมัติ`,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "Create failed" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.withdrawalRequest.findMany({
      where: {
        approvedById: null,
        approvedAt: null,
      },
      include:{bookBank:true}
    });


    return NextResponse.json({
      success: true,
      data: data,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "Create failed" },
      { status: 500 }
    );
  }
}
