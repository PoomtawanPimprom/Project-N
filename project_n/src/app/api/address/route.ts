import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const {
      fullName,
      houseNo,
      moo,
      province,
      district,
      subDistrict,
      postalCode,
      mobile,
      userId,
      addressStatusId,
    } = await request.json();

    // ตรวจสอบว่ามี addressStatusId = 1 ในฐานข้อมูลหรือไม่
    if (addressStatusId === 2) {
      await prisma.userAddress.updateMany({
        where: {
          addressStatusId: 2,
          userId: userId, // เฉพาะข้อมูลของ userId นี้
        },
        data: {
          addressStatusId: 1, // เปลี่ยนเป็น 1
        },
      });
    }

    // เพิ่มข้อมูลใหม่
    const newAddress = await prisma.userAddress.create({
      data: {
        fullName,
        houseNo,
        moo,
        province,
        district,
        subDistrict,
        postalCode,
        mobile,
        userId,
        addressStatusId,
      },
    });

    return NextResponse.json(newAddress);
  } catch (e: any) {
    console.error(e);
    return new NextResponse("Internal server error", { status: 500 });
  }
}