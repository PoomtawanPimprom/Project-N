"use client";

import { orderDetailInterface } from "@/app/interface/orderDetailInterface";
import { orderItemInterface } from "@/app/interface/orderItemInterface";
import { GetAllOrderItemsCancel } from "@/app/service/orderItem/service";
import { generateKey } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import OrderItemCard from "./OrderItemCard";

export default function Cancelled() {
  const router = useRouter();
  const { data: session } = useSession();
  const [OrderDetailCannel, setOrderDetailCannel] = useState<
    orderDetailInterface[]
  >([]);

  const fecthdata = async () => {
    if (!session?.user?.id) return; // ป้องกันการ fetch ถ้า session ยังไม่พร้อม
    const data = await GetAllOrderItemsCancel(Number(session?.user.id));
    setOrderDetailCannel(data);
  };

  useEffect(() => {
    fecthdata();
  }, [session]); // ให้ fetch ข้อมูลแค่ตอนที่ session เปลี่ยน

  return (
    <div className="max-w-7xl mx-auto p-2 space-y-2 ">
      {OrderDetailCannel.map((orderDetail) => (
        <div
          className="bg-gray-50 shadow-lg hover:shadow-none rounded-lg "
          key={generateKey()}
        >
          <div className="flex h-12 p-2 bg-red-500 rounded-t-lg">
            <div className="flex items-center justify-center text-white font-bold text-xl">
              <p className="">รายการที่ยกเลิกแล้ว</p>
            </div>
            <div className=""></div>
          </div>
          <div className="space-y-1">
            {orderDetail.OrderItem?.map((orderItem) => (
              <OrderItemCard orderItem={orderItem} key={orderItem.id}/>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
