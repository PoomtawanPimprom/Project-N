import prisma from "@/lib/prisma/db";
import StoreSideBar from "../StoreSideBar";
import { productInterface } from "@/app/interface/productInterface";
import { Box, Settings, Warehouse } from "lucide-react";
import Link from "next/link";

export default async function ManageStorePage({
  params,
}: {
  params: { id: number };
}) {
  const storeId = Number(params.id);
  const products = (await prisma.product.findMany({
    where: { storeID: storeId },
  })) as productInterface[];

  const statsBoxes = [
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
              <Link
                href={box.href}
                key={index}
                className={`${box.bgColor} p-6 rounded-lg shadow-md flex items-center`}
              >
                <div className="mr-4">{box.icon}</div>
                <div>
                  <h3 className="text-lg font-medium text-gray-700">
                    {box.title}
                  </h3>
                  <p className="text-3xl font-bold text-gray-900">
                    {box.count ?  (<p>จำนวน {box.count} ชิ้น</p>) : ""}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
