"use client"
import { Box, FileClock, LayoutDashboard, Menu, Plus, Settings,  Truck, Warehouse, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type prop = {
  storeId: string
}

export default function StoreSideBar({storeId}:prop) {
  const [isOpen, setIsOpen] = useState(false);
  const menuItems = [
    {
      href: `/store/manage/dashboard/${storeId}`,
      icon: <LayoutDashboard    className="w-6 h-6" />,
      label: "แดชบอร์ด",
    },
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
      href: `/store/manage/product/create/${storeId}`,
      icon: <Plus  className="w-6 h-6" />,
      label: "สร้างสินค้า",
    },
    {
      href: `/store/manage/edit/${storeId}`,
      icon: <Settings  className="w-6 h-6" />,
      label: "แก้ไขรายละเอียดร้านค้า",
    },
    {
      href: `/store/manage/history/${storeId}`,
      icon: <FileClock   className="w-6 h-6" />,
      label: "ประวัติการขาย",
    },
  ];
  return (
    <>
    {/* Mobile Toggle Button */}
    {isOpen === false &&(

    <button 
      onClick={() => setIsOpen(!isOpen)}
      className="absolute md:hidden  top-4 right-4 z-50 bg-primary text-white p-2 rounded-lg"
    >
     <Menu />
    </button>
    )}

    {/* Sidebar */}
    <div 
      className={`
        fixed inset-y-0 left-0 w-72 bg-white dark:bg-black 
        transform transition-transform duration-300 ease-in-out
        md:static md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        shadow-md dark:border-r z-40
      `}
    >
      <div className="p-5 border-b">
        <Link 
          href={`/store/manage/${storeId}`} 
          className="text-xl font-bold text-center block"
        >
          จัดการร้านค้า
        </Link>
      </div>
      <nav className="p-4">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setIsOpen(false)}
            className="flex items-center p-3 hover:bg-primary hover:text-white dark:hover:bg-background rounded-lg mb-2 transition-colors"
          >
            {item.icon}
            <span className="ml-3 font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>

    {/* Overlay for mobile */}
    {isOpen && (
      <div 
        onClick={() => setIsOpen(false)}
        className="md:hidden fixed inset-0 bg-black/50 z-30" 
      />
    )}
  </>
  );
}
