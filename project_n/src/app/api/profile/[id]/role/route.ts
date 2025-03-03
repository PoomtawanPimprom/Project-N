import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()


export async function PUT(request: NextRequest, props: { params: Promise<{ id: string}>}) {
    const params = await props.params;
    try {
        const userId = Number(params.id)
        const body = await request.json();
        const roleId  = body.roleId
        await prisma.user.update({
            data:{ roleId:Number(roleId)},
            where:{id:userId}
        })
        return NextResponse.json({message:"update successful"})
    } catch (error:any) {
        console.log(error)
        return NextResponse.json({message:error.message})
    }
}