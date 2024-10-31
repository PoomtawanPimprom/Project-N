import { PrismaClient } from '@prisma/client'
import { NextRequest } from 'next/server';

const prisma = new PrismaClient()

// getAllReport
export async function GET(request: NextRequest) {
    try {
        const searchparams = request.nextUrl.searchParams
        const search = searchparams.get("search") || ""
        const sortReportCate = searchparams.get("sortReportCate") || ""
        const sortDate = searchparams.get("sortDate") || "desc"

        //condition
        const whereCondition: any = {
            AND: []
        };

        if (search) {
            whereCondition.AND.push({
                product: {
                    id: Number(search)
                    // id: {
                    //     contains: search,
                    //     mode: 'insensitive'
                    // }
                }
            });
        }

        // ถ้ามีค่า sortReportCate ให้กรองตามหมวดหมู่ของรายงาน
        if (sortReportCate) {
            whereCondition.AND.push({
                reportCategory: {
                    id: Number(sortReportCate)
                }
            });
        }

        const data = await prisma.report.findMany({
            where:whereCondition,
            include: {
                user: true,
                reportCategory: true,
                product: true
            },
            orderBy: {
                createdAt: sortDate === 'asc' ? 'asc' : 'desc', // จัดเรียงตามวันที่
            },

        });
        return Response.json(data)
    } catch (error: any) {
        console.log(error.message)
        return new Response(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}

// createReport
export async function POST(request: NextRequest) {
    try {
        const { comment, image, userId, productId, reportCategoryId, reportStatusId } = await request.json();
        const result = await prisma.report.create({
            data: {
                comment,
                userId,
                productId,
                reportCategoryId,
                reportStatusId
            }
        });
        return Response.json(result, { status: 200 })
    } catch (error: any) {
        console.log(error.message)
        return new Response(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}