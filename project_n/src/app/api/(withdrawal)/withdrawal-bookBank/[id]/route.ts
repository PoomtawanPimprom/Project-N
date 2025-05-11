import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const userId = Number(params.id);
  try {
    const bookBank = await prisma.withdrawalBookBank.findMany({
      where: { userId, delete: false },
      omit: { delete: true },
    });

    return NextResponse.json({ success: true, bookBank });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "Approval failed" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const id = Number(params.id);
  const { accountNumber, accountName, bankName, bookBankTypeId } =
    await req.json();
  try {
    //already have?
    const book = await prisma.withdrawalBookBank.findFirst({
      where: {
        id,
      },
    });
    if (!book) {
      return NextResponse.json(
        { success: false, message: `ไม่พบข้อมูล` },
        { status: 404 }
      );
    }

    await prisma.withdrawalBookBank.update({
      data: {
        accountNumber: accountNumber ? accountNumber : book.accountNumber,
        accountName: accountName ? accountName : book.accountName,
        bankName: bankName ? bankName : book.bankName,
        bookBankTypeId: bookBankTypeId ? bookBankTypeId : book.bookBankTypeId,
      },
      where: { id },
      omit: { id: true },
    });

    return NextResponse.json({ success: true, message: `อัพเดทสำเร็จ` });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "Approval failed" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const id = Number(params.id);
  try {
    await prisma.withdrawalBookBank.update({
      where: { id },
      data: { delete: true },
    });

    return NextResponse.json({
      success: true,
      message: `ลบข้อมูลสมุดบัญชีเสร็จสิ้น`,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "Approval failed" },
      { status: 500 }
    );
  }
}
