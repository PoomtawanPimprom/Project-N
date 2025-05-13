"use client"
import { BarChart2, HandCoins, Tag, Truck, User } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const menuItems = [
  {
    href: "/admin/manage/report",
    icon: <BarChart2 className="w-6 h-6" />,
    label: "รายงาน",
  },
  {
    href: "/admin/manage/discount",
    icon: <Tag className="w-6 h-6" />,
    label: "โปรโมชั่น",
  },
  {
    href: "/admin/manage/transport",
    icon: <Truck className="w-6 h-6" />,
    label: "การขนส่ง",
  },
    {
    href: "/admin/manage/drawal",
    icon: <HandCoins className="w-6 h-6" />,
    label: "จัดการการเบิกเงิน",
  },
  {
    href: "/admin/manage/admins",
    icon: <User className="w-6 h-6" />,
    label: "จัดการแอดมิน",
  },

];
export default function AdminSideBar() {
  const { data: session } = useSession();
  return (
    <div className="w-64 dark:bg-black dark:border-r  shadow-md">
      <div className="p-5 border-b">
        <Link href={`/admin`} className="text-xl font-bold text-center">
          Admin Dashboard
        </Link>
      </div>
      <nav className="p-4">
        {menuItems
          .filter((item) => session?.user.roleId === "3" || item.label !== "จัดการแอดมิน")

          .map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center p-3 hover:bg-gray-500 hover:text-white dark:hover:bg-background rounded-lg mb-2 transition-colors"
            >
              {item.icon}
              <span className="ml-3 font-medium">{item.label}</span>
            </Link>
          ))}
      </nav>
    </div>
  );
}
