"use client";

import { orderItemInterface } from "@/app/interface/orderItemInterface";
import { GetAllOrderItemsWaitToShip } from "@/app/service/orderItem/service";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import OrderItemCard from "./OrderItemCard";
import { ReportShippinpAction } from "../action/waitForShip-action";
import { useToast } from "@/hooks/use-toast";

export default function WaitforShip() {
  const { toast } = useToast();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [OrderItemsWaitToShip, setOrderItemsWaitToShip] = useState<orderItemInterface[]>(
    []
  );

  // Fetch data from the API
  const fetchData = async () => {
    const data = await GetAllOrderItemsWaitToShip(Number(session?.user.id));
    setOrderItemsWaitToShip(data);
  };

  // Handle submit for reporting shipping
  const handleSubmit = async (orderItemId: number) => {
    const formData = new FormData();
    formData.append("orderItemId", String(orderItemId));

    const result = await ReportShippinpAction(undefined, formData);
    if (result?.message) {
      toast({
        title: "แจ้งเตือน",
        description: result.message,
      });
    }
  };

  // Handle the click event of the button
  const handleButtonClick = async (orderItemId: number) => {
    try {
      setLoading(true);
      await handleSubmit(orderItemId);
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถแจ้งร้านค้าได้ กรุณาลองใหม่",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when session is available
  useEffect(() => {
    if (session?.user.id) {
      fetchData();
    }
  }, [session]);

  return (
    <div className="max-w-7xl mx-auto p-4 hover:shadow-lg rounded-lg">
      {OrderItemsWaitToShip.map((orderItem, index) => (
        <div className="flex flex-col space-y-2 border p-4 rounded-lg" key={index}>
          <OrderItemCard orderItem={orderItem} />
          <div className="flex justify-end">
            <button
              onClick={() => handleButtonClick(orderItem.id)} 
              disabled={loading}
              type="button"
              className={`px-6 py-2 bg-primary text-white rounded-lg ${loading ? "opacity-10": ""}`}
            >
              ยังไม่ได้รับสินค้า
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
