import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()

//create
export async function POST(request: NextRequest) {
  try {

    const { orderId, amount, moneySlip } = await request.json();

    const payment = await prisma.payment.create({
      data: {
        orderId: orderId,
        amount: amount,
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
