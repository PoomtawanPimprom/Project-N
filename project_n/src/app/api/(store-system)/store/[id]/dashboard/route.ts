import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        const storeId = Number(params.id);

        if (isNaN(storeId)) {
            return new NextResponse("Invalid store ID", { status: 400 });
        }

        // 1. ยอดขายรวม (Total Revenue)
        const totalRevenue = await prisma.orderDetail.aggregate({
            where: {
                OrderItem: { some: { storeId } }, 
            },
            _sum: { total: true },
        });

        // 2. จำนวนออเดอร์ (Total Orders)
        const totalOrders = await prisma.orderDetail.count({
            where: {
                OrderItem: { some: { storeId } },
            },
        });

        // 3. สินค้าขายดี (Best Selling Products)
        const bestSellingProducts = await prisma.orderItem.groupBy({
            by: ['productId'],
            where: { storeId },
            _sum: { quantity: true },
            orderBy: { _sum: { quantity: 'desc' } },
            take: 5,
          });
          
          const productIds = bestSellingProducts.map((item) => item.productId);
          
          const products = await prisma.product.findMany({
            where: { id: { in: productIds } },
            select: { id: true, name: true },
          });
          
          // รวมข้อมูลสินค้าเข้าไปใน bestSellingProducts
          const bestSellingProductsWithNames = bestSellingProducts.map((item) => ({
            ...item,
            name: products.find((p) => p.id === item.productId)?.name || "ไม่พบชื่อสินค้า",
          }));
          
          

        // 4. สินค้าคงเหลือ (Low Stock Alert)
        const lowStockProducts = await prisma.inventory.findMany({
            where: {
                quantity: { lte: 10 }, // สินค้าที่เหลือน้อยกว่า 10 ชิ้น
                product: { storeID: storeId }, // ดึงเฉพาะสินค้าของร้านนี้
            },
            select: {
                id: true,
                product: { select: { name: true } },
                quantity: true,
            },
        });

        // 5. ยอดขายรายวัน / รายเดือน / รายปี (Sales Chart)
        const salesData = await prisma.orderDetail.groupBy({
            by: ['createdAt'],
            where: {
                OrderItem: { some: { storeId } },
            },
            _sum: { total: true },
            orderBy: { createdAt: 'asc' },
        });

        return NextResponse.json({
            totalRevenue: totalRevenue._sum.total || 0,
            totalOrders,
            bestSellingProductsWithNames,
            lowStockProducts,
            salesData,
        }, { status: 200 });

    } catch (error) {
        return new NextResponse(error instanceof Error ? error.message : String(error), { status: 500 });
    }
}
