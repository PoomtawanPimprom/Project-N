import prisma from "@/lib/prisma/db";
import {
  LayoutDashboard,
  PackagePlus,
  Settings,
  Truck,
  Warehouse,
} from "lucide-react";
import { orderItemInterface } from "@/app/interface/orderItemInterface";

import StoreSideBar from "../StoreSideBar";
import CardInfo from "./cardInfo";

export default async function ManageStorePage(props: {
  params: Promise<{ id: number }>;
}) {
  const params = await props.params;
  const storeId = Number(params.id);

  const toShipItems = (await prisma.orderItem.findMany({
    where: { storeId: storeId, orderItemStatusId: 2 },
  })) as orderItemInterface[];

  const count = toShipItems.length != 0 ? toShipItems.length : 0;
  const statsBoxes = [
    {
      icon: <Truck className="w-8 h-8 text-red-500" />,
      title: "สินค้าที่ต้องส่ง",
      count: count,
      bgColor:
        "bg-red-50 dark:bg-zinc-800 hover:bg-red-200 dark:hover:bg-zinc-600 ",
      href: `/store/manage/toShip/${storeId}`,
    },

    {
      icon: <LayoutDashboard className="w-8 h-8 text-fuchsia-500" />,
      title: "แดชบอร์ด",
      bgColor:
        "bg-fuchsia-50 dark:bg-zinc-800 hover:bg-fuchsia-200 dark:hover:bg-zinc-600 ",
      href: `/store/manage/dashboard/${storeId}`,
    },
    {
      icon: <Warehouse className="w-8 h-8 text-teal-500" />,
      title: "จัดการคลังสินค้า",
      bgColor:
        "bg-teal-50 dark:bg-zinc-800 hover:bg-teal-200 dark:hover:bg-zinc-600 ",
      href: `/store/manage/inventory/${storeId}`,
    },
    {
      icon: <Settings className="w-8 h-8 text-emerald-500" />,
      title: "แก้ไขรายละเอียดร้านค้า",
      bgColor:
        "bg-emerald-50 dark:bg-zinc-800 hover:bg-emerald-200 dark:hover:bg-zinc-600 ",
      href: `/store/manage/edit/${storeId}`,
    },
    {
      icon: <PackagePlus className="w-8 h-8 text-amber-500" />,
      title: "สร้างสินค้า",
      bgColor:
        "bg-amber-50 dark:bg-zinc-800 hover:bg-amber-200 dark:hover:bg-zinc-600 ",
      href: `/store/manage/product/create/${storeId}`,
    },
  ];

  return (
    <div className="min-h-screen  relative flex">
      <StoreSideBar storeId={storeId.toString()} />
      <main className="flex-grow p-6  bg-gray-100 dark:bg-background">
        <div className="bg-white dark:bg-black h-full  shadow-md rounded-lg p-6 mb-6">
          <div className="text-black dark:text-white  bg-white dark:bg-zinc-900 shadow-md rounded-lg p-6 mb-6">
            <h1 className="text-4xl font-semibold mb-4">
              ยินดีต้อนรับสู่ Store Overview
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {statsBoxes.map((box, index) => (
              <CardInfo box={box} key={index} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
