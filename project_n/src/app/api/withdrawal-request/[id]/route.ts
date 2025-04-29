import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// withdrawal-request ดูยอดที่เบิกได้
export async function GET(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const storeId = Number(params.id);
  try {
    const orderItems = await prisma.orderItem.findMany({
      select: { product: { select: { price: true } } },
      //   include: { product: { select: { price: true } } },
      where: {
        storeId: storeId,
        Already_withdrawn: false,
        orderItemStatusId: 3,
      },
    });

    const amount = orderItems.reduce((sum,curr)=> sum + curr.product.price,0)

    return NextResponse.json({ success: true, amount });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "Approval failed" },
      { status: 500 }
    );
  }
}
