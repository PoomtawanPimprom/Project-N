// POST /api/withdrawal-request
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { storeId, accountNumber, accountName, bankName, amount } = body;

  try {
    await prisma.withdrawalRequest.create({
      data: {
        storeId,
        accountNumber,
        accountName,
        bankName,
        amount,
        statusId: 1, // รหัสสถานะ "pending"
      },
    });

    return NextResponse.json({ success: true, message: `ทำการเบิกเสร็จสิ้น รอแอดมินอนุมัติ` });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Create failed" }, { status: 500 });
  }
}
