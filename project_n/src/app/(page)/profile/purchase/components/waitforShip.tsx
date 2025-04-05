"use client";

import { orderItemInterface } from "@/app/interface/orderItemInterface";
import {
  GetAllOrderItemsWaitToShip,
} from "@/app/service/orderItem/service";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import OrderItemCard from "./OrderItemCard";

export default function WaitforShip() {
    const { data: session } = useSession();
    const [OrderItemsWaitToShip, setOrderItemsWaitToShip] = useState<
      orderItemInterface[]
    >([]);
  
    const fecthdata = async () => {
      const data = await GetAllOrderItemsWaitToShip(Number(session?.user.id));
      setOrderItemsWaitToShip(data);
      console.log(data);
    };
  

    useEffect(() => {
      fecthdata();
    }, [session]);
  
  
    return (
        <div className="max-w-7xl mx-auto p-4 hover:shadow-lg rounded-lg">
        {OrderItemsWaitToShip.map((orderItem,index) => (
          <div className="space-y-4" key={index}>
            <OrderItemCard orderItem={orderItem}/>            
          </div>
        ))}
      </div>
  )
}