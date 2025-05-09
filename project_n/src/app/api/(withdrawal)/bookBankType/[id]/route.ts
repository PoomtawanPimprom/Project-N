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
    const bookBank = await prisma.withdrawalBookBank.findFirst({
      where: { userId,default:true },
      omit: { id: true },
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
  const old_id = Number(params.id);
  const { new_id } = await req.json();

  try {
    //check has Bookbank
    const book = await prisma.withdrawalBookBank.findFirst({
      where: {
        id:old_id,
      },
    });
    if (!book) {
      return NextResponse.json(
        { success: false, message: `ไม่พบข้อมูล` },
        { status: 404 }
      );
    }

    // remove default
    await prisma.withdrawalBookBank.update({
        where:{id:book.id},
        data:{
            default:false
        }
    })
    
    // update new
    await prisma.withdrawalBookBank.update({
        where:{id:new_id},
        data:{
            default:false
        }
    })


    return NextResponse.json({ success: true, message:'อัพเดทสถานะเสร็จสิ้น' });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "Approval failed" },
      { status: 500 }
    );
  }
}
