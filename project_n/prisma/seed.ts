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

const userAddressData =
{
    fullName: "test1 String",
    houseNo: "String",
    moo: "String",
    province: "String",
    district: "String",
    subDistrict: "String",
    postalCode: "123",
    mobile: "1324",
    userId: 1
}
    ;

const userData =
{
    id: 1,
    name: "test1",
    username: "test1",
    password: "test1",
    email: "test1@gmail.com",
    mobile: 1,
    birthdate: new Date(1990, 0, 1),
    profile: "test1",
    saler: false,
    genderId: 1,
    roleId: 1,
    userStatusId: 1,
}

const orderStatusData = [
    {  name: "ยังไม่ชำระ" },
    {  name: "รอร้านค้าจัดส่ง" },
    {  name: "กำลังจัดส่ง" },
    {  name: "ดำเนินการเสร็จสิ้น" },
    {  name: "ยกเลิกรายการ" },
]

const paymentStatusData = [
    { id: 1, name: "ยังไม่ได้ชำระ" },
    { id: 2, name: "ชำระแล้ว" },
]

const userAddressStatusData = [
    { id: 0, name: "non" },
    { id: 1, name: "set-Default" },
]

const transportData = [
    { id: 1, providerName: "Matter shipping", transportPrice: 50 }
]

async function main() {
    try {
        await prisma.orderStatus.createMany({ data: orderStatusData })
        await prisma.transport.createMany({ data: transportData })
        await prisma.addressStatus.createMany({ data: userAddressStatusData })
        await prisma.paymentStatus.createMany({ data: paymentStatusData })
        await prisma.productStatus.createMany({ data: productStatusData })
        await prisma.storeStatus.createMany({ data: storeStatusData })
        await prisma.category.createMany({ data: categoryData })
        await prisma.gender.createMany({ data: gednerData })
        await prisma.userStatus.createMany({ data: userStatusData })
        await prisma.role.createMany({ data: roleData })
        await prisma.reportCategory.createMany({ data: reportCategoryData })
        await prisma.reportStatus.createMany({ data: reportStatusData })
        await prisma.userAddress.create({ data: userAddressData });
        await prisma.user.create({ data: userData });
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