"use client"
import { Box, Plus, Settings,  Truck, Warehouse } from "lucide-react";
import Link from "next/link";

type prop = {
  storeId: string
}

export default function StoreSideBar({storeId}:prop) {
  const menuItems = [
    {
      href: `/store/manage/toShip/${storeId}`,
      icon: <Truck   className="w-6 h-6" />,
      label: "สินค้าที่ต้องส่ง",
    },
    {
      href: `/store/manage/inventory/${storeId}`,
      icon: <Warehouse  className="w-6 h-6" />,
      label: "คลังสินค้า",
    },
    {
      href: `/store/manage/edit/${storeId}`,
      icon: <Settings  className="w-6 h-6" />,
      label: "แก้ไขรายละเอียดร้านค้า",
    },
    {
      href: `/store/manage/product/${storeId}`,
      icon: <Box  className="w-6 h-6" />,
      label: "จัดการสินค้า",
    },
    {
      href: `/store/manage/product/create/${storeId}`,
      icon: <Plus  className="w-6 h-6" />,
      label: "สร้างสินค้า",
    },
  ];
  return (
    <div className="w-72 bg-white shadow-md">
      <div className="p-5 border-b">
        <Link href={`/store/manage/${storeId}`} className="text-xl font-bold text-center">จัดการร้านค้า</Link>
      </div>
      <nav className="p-4">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center p-3 hover:bg-gray-100 rounded-lg mb-2 transition-colors"
          >
            {item.icon}
            <span className="ml-3 font-medium">{item.label}</span>
           
          </Link>
        ))}
      </nav>
    </div>
  );
}
