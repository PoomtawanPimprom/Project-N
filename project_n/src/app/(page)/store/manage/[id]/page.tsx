import prisma from "@/lib/prisma/db";
import StoreSideBar from "../StoreSideBar";
import { productInterface } from "@/app/interface/productInterface";
import { Box, Settings, Truck, Warehouse } from "lucide-react";
import Link from "next/link";
import { orderItemInterface } from "@/app/interface/orderItemInterface";
import CardInfo from "./cardInfo";

export default async function ManageStorePage({
  params,
}: {
  params: { id: number };
}) {
  const storeId = Number(params.id);
  const products = (await prisma.product.findMany({
    where: { storeID: storeId },
  })) as productInterface[];

  const toShipItems = (await prisma.orderItem.findMany({
    where:{storeId:storeId,orderItemStatusId:2}
})) as orderItemInterface[]

  const statsBoxes = [
    {
      icon: <Truck className="w-8 h-8 text-red-500" />,
      title: "สินค้าที่ต้องส่ง",
      count: toShipItems.length,
      bgColor: "bg-red-50",
      href: `/store/manage/toShip/${storeId}`,
    },
    {
      icon: <Box className="w-8 h-8 text-indigo-500" />,
      title: "สินค้าทั้งหมด",
      count: products.length,
      bgColor: "bg-indigo-50",
      href: `/store/manage/product/${storeId}`,
    },
    {
      icon: <Warehouse className="w-8 h-8 text-teal-500" />,
      title: "จัดการคลังสินค้า",
      bgColor: "bg-teal-50",
      href: `/store/manage/inventory/${storeId}`,
    },
    {
      icon: <Settings className="w-8 h-8 text-emerald-500" />,
      title: "แก้ไขรายละเอียดร้านค้า",
      bgColor: "bg-emerald-50",
      href: `/store/manage/edit/${storeId}`,
    },
    {
      icon: <Settings className="w-8 h-8 text-amber-500" />,
      title: "แก้ไขรายละเอียดร้านค้า",
      bgColor: "bg-amber-50",
      href: `/store/manage/product/${storeId}`,
    },
  ];
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <StoreSideBar storeId={storeId.toString()} />
      <main className="flex-grow p-6 bg-gray-100 ">
        <div className="bg-white h-full  shadow-md rounded-lg p-6 mb-6">
          <div className=" shadow-md rounded-lg p-6 mb-6">
            <h1 className="text-2xl font-semibold mb-4">
              ยินดีต้อนรับสู่ Admin Dashboard
            </h1>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {statsBoxes.map((box, index) => (
              <CardInfo box={box} key={index}/>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
