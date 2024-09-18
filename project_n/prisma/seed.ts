import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const productstatusData = [
    {id:1 ,name: "available"},
    {id:2 ,name: "unavailable"},
]

async function main() {
    await prisma.productStatus.createMany({ data :productstatusData})
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })