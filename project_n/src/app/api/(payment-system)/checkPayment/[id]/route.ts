// import { PrismaClient } from '@prisma/client'
// import { NextRequest, NextResponse } from 'next/server';

// const prisma = new PrismaClient()

// export async function GET(request: NextRequest, props: { params: Promise<{ id: string}>}) {
//     const params = await props.params;
//     const orderId  = params.id;
//     try {

//         const payment = await prisma.payment.findFirst({
//             where: { orderId: Number(orderId) },
//             select: { paymentStatus: true },
//           });
//         return NextResponse.json({ message: "done" }, { status: 200 });
//     } catch (error: any) {
//         console.error(error.message)
//         return new NextResponse(error instanceof Error ? error.message : String(error), { status: 500 })
//     }
// }
