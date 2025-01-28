import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const userId = Number(params.id);
  try {
    const userAddress = await prisma.userAddress.findMany({
      where: {
        userId: userId,
      },
    });

    return NextResponse.json(userAddress);
  } catch (error) {
    console.error("Error fetching user address:", error);
    throw new Error("Failed to fetch user address");
  }
};

export async function PUT(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const addressId = Number(params.id)
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
      addressStatusId,
    } = await request.json();

    if (addressStatusId === 2) {
      await prisma.userAddress.updateMany({
        where: {
          addressStatusId: 2,
          id: {
            not: addressId
          }, // ยกเว้น row ที่กำลังแก้ไข
        },
        data: {
          addressStatusId: 1, // เปลี่ยนเป็น 1
        },
      });
    }
    const updatePost = await prisma.userAddress.update({
      where: { id: addressId }, data: {
        fullName,
        houseNo,
        moo,
        province,
        district,
        subDistrict,
        postalCode,
        mobile,
        addressStatusId,
      }
    })
    return NextResponse.json(updatePost);
  } catch (e: any) {
    return new NextResponse(e instanceof Error ? e.message : String(e), { status: 500 })
  }
}

export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const addressID = Number(params.id)
  try {
    await prisma.userAddress.delete({
      where: { id: addressID }
    })
    return new NextResponse("Address delete successfully", { status: 200 });
  } catch (e: any) {
    console.error(e);

    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // Handle specific Prisma error codes
      switch (e.code) {
        case "P2025": // Record not found
          return new NextResponse("Address not found", { status: 404 });
        case "P2003": // Foreign key constraint violation
          return new NextResponse(
            "Cannot delete address: It is referenced by other records.",
            { status: 409 } // 409 Conflict
          );
        default:
          return new NextResponse(`Database error: ${e.message}`, { status: 500 });
      }
    } else {
      return new NextResponse("Internal server error", { status: 500 });
    }
  }
}
