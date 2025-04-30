import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

//create
export async function POST(request: NextRequest) {
  try {
    const { orderId, amount, moneySlip } = await request.json();
    // check have default address
    const order = await prisma.orderItem.findFirst({
      select: {
        orderDetail: { select: { userId: true } },
      },
      where: { orderDetailId: orderId },
    });
    const userAddress = await prisma.userAddress.findFirst({
      where: {
        userId: order?.orderDetail?.userId,
        addressStatusId: 2,
      },
    });
    if (userAddress === null) {
      throw new Error("โปรดเลือกที่ต้องการจัดส่งสินค้า");
    }

    // if have default address
    await prisma.orderDetail.update({
      where: { id: orderId },
      data: { total: amount },
    });

    const payment = await prisma.payment.create({
      data: {
        paymentStatusId: 1, // 1 = Pending, can be updated later
        moneySlip: moneySlip,
      },
    });
    return NextResponse.json({ payment }, { status: 200 });
  } catch (error: any) {
    console.error(error.message);

    return NextResponse.json(
      { message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
