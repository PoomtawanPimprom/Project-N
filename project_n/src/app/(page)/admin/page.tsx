import React from "react";
import { FileText, Tag } from "lucide-react";
import prisma from "@/lib/prisma/db";
import { reportInterface } from "@/app/interface/reportInterface";
import { discountInterface } from "@/app/interface/discountInterface";
import Link from "next/link";
import dynamic from "next/dynamic";

const AdminSideBar = dynamic(()=> import("./AdminSideBar"))

const AdminDashboard = async () => {
  const reports = (await prisma.report.findMany({
    where: { reportStatusId: 1 },
  })) as reportInterface[]

  const activeDiscount = (await prisma.discount.findMany({
    where:{ isActive:true}
  })) as discountInterface[]


  const statsBoxes = [
    {
      icon: <FileText className="w-8 h-8 text-blue-500" />,
      title: "รายงานที่ต้องจัดการ",
      count: reports.length,
      bgColor: "bg-blue-50",
      href:'/admin/manage/report'
    },
    {
      icon: <Tag className="w-8 h-8 text-green-500" />,
      title: "โค้ดส่วนลดที่ใช้งาน",
      count: activeDiscount.length,
      bgColor: "bg-green-50",
      href:'/admin/manage/promotion'
    },
  ];

  return (
    <div className="min-h-screen   flex">
      <AdminSideBar />
      <main className="flex-grow p-6 bg-gray-100 dark:bg-background">
        <div className=" bg-white dark:bg-black h-full shadow-md rounded-lg p-6 mb-6">
          <div className=" bg-white shadow-md rounded-lg p-6 mb-6 dark:bg-zinc-800">
            <h1 className="text-4xl  font-semibold mb-4">
              ยินดีต้อนรับสู่ Admin Dashboard
            </h1>
          </div>

          <div className="grid grid-cols-2 gap-6 ">
            {statsBoxes.map((box, index) => (
              <Link href={box.href} key={index} className={`${box.bgColor} p-6 rounded-lg shadow-md flex items-center dark:bg-zinc-800`}>
                <div className="mr-4">{box.icon}</div>
                <div>
                  <h3 className="text-lg font-medium  ">
                    {box.title}
                  </h3>
                  <p className="text-3xl font-bold">
                    {box.count}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
