// GET /api/withdrawal-request/store/:storeId
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
// show history 
export async function GET(req: NextRequest, props: { params: Promise<{ storeId: string }> }) {
  const params = await props.params;
  const storeId = parseInt(params.storeId);

  try {
    const history = await prisma.withdrawalRequest.findMany({
      where: { storeId },
      omit:{id:true},
      include: {
        status: true,
        approvedBy: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ success: true, data: history });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Fetch failed" }, { status: 500 });
  }
}
