import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()

// Get coupon for Voucher Page
export async function GET(req: NextRequest) {
    try {
        // ดึง userId จาก query หรือ session
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        // Find active
        const activeCoupons = await prisma.discount.findMany({ where: { isActive: true } });

        // Check to used coupon
        const usedCoupons = await prisma.usedDiscount.findMany({
            where: {
                userId: Number(userId),
                discountId: 
                { 
                    in: activeCoupons.map(coupon => coupon.id) 
                }
            }
        });

        // กรองเฉพาะคูปองที่ user ยังไม่ได้ใช้
        const availableCoupons = activeCoupons.filter(coupon =>
            !usedCoupons.some(used => used.discountId === coupon.id) // 
        );
        return NextResponse.json(availableCoupons);
    } catch (error) {
        console.error("Error fetching coupons:", error);
        return NextResponse.json({ message: "เกิดข้อผิดพลาด" }, { status: 500 });
    }
}
