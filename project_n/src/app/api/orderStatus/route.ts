import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()


export async function GET(request: NextRequest ) {
    try{
      const data = await prisma.orderStatus.findMany()
    return NextResponse.json(data)  
    }
    catch(error){
        NextResponse.json("error",{status:500})
    }
}


