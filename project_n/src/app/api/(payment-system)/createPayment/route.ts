import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()

//create
export async function POST(request: NextRequest) {
  try {

    const { orderId, amount, moneySlip } = await request.json();

    await prisma.orderDetail.update({
      where:{ id: orderId},
      data:{ total: amount}
    })

    const payment = await prisma.payment.create({
      data: {
        paymentStatusId: 1, // 1 = Pending, can be updated later
        moneySlip: moneySlip,
      },
    });
    return NextResponse.json({payment}, { status: 200 });
  } catch (error: any) {
    console.error(error.message)
    return new NextResponse(error instanceof Error ? error.message : String(error), { status: 500 })
  }
}
