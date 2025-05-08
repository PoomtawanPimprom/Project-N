// POST /api/withdrawal-request
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { accountNumber, accountName, bankName, userId,bookBankTypeId } = body;

  try {
    await prisma.withdrawalBookBank.create({
      data: {
        accountName,
        accountNumber,
        bankName,
        userId,
        bookBankTypeId
      },
    });

    return NextResponse.json({
      success: true,
      message: `บันทึกข้อมูลธนาคารเรียบร้อย`,
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
