import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const productStatusData = [
    { id: 1, name: "available" },
    { id: 2, name: "unavailable" },
]

const storeStatusData = [
    { id: 1, name: "available" },
    { id: 2, name: "unavailable" },
]

const categoryData = [
    { id: 1, name: "tech", },
    { id: 2, name: "sport", },
];

async function main() {
    await prisma.productStatus.createMany({ data: productStatusData })
    await prisma.storeStatus.createMany({ data: storeStatusData })
    await prisma.category.createMany({ data: categoryData })
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