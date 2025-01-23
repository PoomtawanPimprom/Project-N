import { BarChart2, Tag, Truck } from "lucide-react";
import Link from "next/link";
const menuItems = [
  {
    href: "/admin/manage/report",
    icon: <BarChart2 className="w-6 h-6" />,
    label: "รายงาน",
  },
  {
    href: "/admin/manage/promotion",
    icon: <Tag className="w-6 h-6" />,
    label: "โปรโมชัน",
  },
  {
    href: "/admin/manage/transport",
    icon: <Truck className="w-6 h-6" />,
    label: "การขนส่ง",
  },
];

export default function AdminSideBar() {
  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-5 border-b">
        <Link href={`/admin`} className="text-xl font-bold text-center">Admin Dashboard</Link>
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
