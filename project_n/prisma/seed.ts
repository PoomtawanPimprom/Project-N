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

const roleData = [
    { id: 1, name: "user", },
    { id: 2, name: "admin", },
    { id: 3, name: "super admin", },
]

const userStatusData = [
    { id: 1, name: "available" },
    { id: 2, name: "unavailable" },
]

const gednerData =[
    { id: 1, name: "Male", },
    { id: 2, name: "Female", },
    { id: 3, name: "LGBTQIA+", }
]


async function main() {
    await prisma.productStatus.createMany({ data: productStatusData })
    await prisma.storeStatus.createMany({ data: storeStatusData })
    await prisma.category.createMany({ data: categoryData })
    await prisma.gender.createMany({data:gednerData})
    await prisma.userStatus.createMany({data:userStatusData})
    await prisma.role.createMany({data:roleData})
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