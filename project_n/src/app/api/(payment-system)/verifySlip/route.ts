
import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()


//update want checked
export async function POST(request: NextRequest) {
    const formData = await request.formData();
    try {
        const res = await fetch('https://developer.easyslip.com/api/v1/verify',{
            method: 'POST',
            headers:{
                "Authorization": `Bearer ${process.env.EASYSLIP_TOKEN}`
            },
            body:formData
        })
        const data = await res.json();
        return NextResponse.json({ data }, { status: 200 });
    } catch (error: any) {
        console.log(error.message)
        return new NextResponse(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}