// POST /api/withdrawal-request
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { accountNumber, accountName, bankName, userId, bookBankTypeId, Default } = body;

  try {
    await prisma.withdrawalBookBank.create({
      data: {
        accountName,
        accountNumber,
        bankName,
        userId,
        bookBankTypeId,
        default:Default ? Default : false
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

