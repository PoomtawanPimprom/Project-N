"use client";

import { orderItemInterface } from "@/app/interface/orderItemInterface";
import {
    GetAllOrderItemsComplete,
  updateStatusOrderItemsToRecevie,
} from "@/app/service/orderItem/service";
import { generateKey } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Complete() {
    const router = useRouter();
    const { data: session } = useSession();
    const [OrderItemsComplete, setOrderItemsComplete] = useState<
      orderItemInterface[]
    >([]);

    const fecthdata = async () => {
      const data = await GetAllOrderItemsComplete(Number(session?.user.id));
      setOrderItemsComplete(data);
      console.log(data);
    };
  
    useEffect(() => {
      fecthdata();
    }, [session]);

    return (
        <div className="max-w-7xl mx-auto p-4 hover:shadow-lg rounded-lg">
      {OrderItemsComplete.map((orderItem) => (
        <div className="space-y-4"  key={generateKey()}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 p-4 border-b border-gray-200">
            {/* Image */}
            <div className="w-24 h-24 sm:w-32 sm:h-32">
              <img
                src={orderItem.product?.image?.image1}
                alt="image"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Product Info */}
            <div className="mt-3 sm:mt-0 flex-1">
              <p className="text-lg font-semibold text-gray-800">
                {orderItem.product?.name}
              </p>
              <p className="text-gray-600">
                {orderItem.color ? orderItem.color : ""}
              </p>
              <p className="text-gray-600">
                {orderItem.size ? orderItem.size : ""}
              </p>
              <p className="text-gray-600">{orderItem.quantity}</p>
            </div>

            {/* Price Info */}
            <div className="mt-3 sm:mt-0 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
              <p className="text-lg font-semibold text-gray-800">
                ราคา: {orderItem.quantity * orderItem.product?.price!} บาท
              </p>
              {/* <p className="text-sm text-gray-500 sm:text-lg">ราคารวมทั้งหมด: 200000</p> */}
            </div>
          </div>
         
        </div>
      ))}
    </div>
    );
}
