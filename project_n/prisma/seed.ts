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

const roleData = [
    { id: 1, name: "user", },
    { id: 2, name: "admin", },
    { id: 3, name: "super admin", },
]

const userStatusData = [
    { id: 1, name: "available" },
    { id: 2, name: "unavailable" },
]

const gednerData = [
    { id: 1, name: "Male", },
    { id: 2, name: "Female", },
    { id: 3, name: "LGBTQIA+", }
]

const reportCategoryData = [
    { id: 1, name: "สินค้าละเมิดลิขสิทธิ" },
    { id: 2, name: "สินค้าต้องห้าม" },
    { id: 3, name: "สินค้าที่เข้าข่ายหลอกลวง" },
    { id: 4, name: "อื่นๆ" },
]

const reportStatusData = [
    { id: 1, name: "ส่งแล้ว" },
    { id: 2, name: "รับเรื่องแล้ว" },
    { id: 3, name: "เรียบร้อยแล้ว" }
]

const orderStatusData = [
    {  name: "กำลังดำเนินการ" },
    {  name: "ดำเนินการเสร็จสิ้น" },
    {  name: "ยกเลิกรายการ" },
]

const paymentStatusData = [
    { id: 1, name: "ยังไม่ได้ชำระ" },
    { id: 2, name: "ชำระแล้ว" },
]

const userAddressStatusData = [
    { id: 1, name: "non" },
    { id: 2, name: "set-Default" },
]

const transportData = [
    { id: 1, providerName: "Matter shipping", transportPrice: 50 }
]

const orderItemStatus =[
    {name: "ยังไม่ชำระ"},
    {name:"ต้องจัดส่ง"},
    {name:"ได้รับสินค้าแล้ว"},
    {name:"ยกเลิกแล้ว"},
]

const WithdrawalStatus =[
    {name: "pending"},
    {name:"approved"},
    {name:"rejected"},
]
async function main() {
    try {
        await prisma.withdrawalStatus.createMany({data:WithdrawalStatus})
        await prisma.orderItemStatus.createMany({data:orderItemStatus})
        await prisma.orderStatus.createMany({ data: orderStatusData })
        await prisma.transport.createMany({ data: transportData })
        await prisma.addressStatus.createMany({ data: userAddressStatusData })
        await prisma.paymentStatus.createMany({ data: paymentStatusData })
        await prisma.productStatus.createMany({ data: productStatusData })
        await prisma.storeStatus.createMany({ data: storeStatusData })
        await prisma.gender.createMany({ data: gednerData })
        await prisma.userStatus.createMany({ data: userStatusData })
        await prisma.role.createMany({ data: roleData })
        await prisma.reportCategory.createMany({ data: reportCategoryData })
        await prisma.reportStatus.createMany({ data: reportStatusData })
    }
    catch (error) {
        console.log(error)
    }

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