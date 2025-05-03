"use client";
import { CancelOrder } from "@/app/service/(payment)/service";
import { useRouter } from "next/navigation";
import { orderDetailInterface } from "@/app/interface/orderDetailInterface";
import OrderItemCard from "./OrderItemCard";

interface prop {
  OrderDetailToPay: orderDetailInterface[];
  refesh: () => void;
}

export default function ToPay({ OrderDetailToPay, refesh }: prop) {
  const router = useRouter();

  const handleOnCancel = async (id: number) => {
    await CancelOrder(id);
    refesh();
  };

  return (
    <div className="max-w-7xl mx-auto p-4 hover:shadow-lg rounded-lg">
      <div className="space-y-4">
        {OrderDetailToPay.map((orderDetail, index) => (
          <div key={`${index}+${index}`}>
            <p className="text-xl font-bold mb-2">รายการยังไม่ชำระที่ {index+1}</p>
            {orderDetail.OrderItem?.map((orderItem, index) => (
              <OrderItemCard
                orderItem={orderItem}
                key={`${index + orderItem.id}`}
              />
            ))}
            {OrderDetailToPay.length > 0 && (
              <div className="flex p-4 font-semibold border-gray-200 text-right justify-end gap-2">
                <button
                  onClick={() => handleOnCancel(orderDetail.id)}
                  className="px-6 py-2 bg-red-500 text-white rounded-lg "
                >
                  ยกเลิก
                </button>
                <button
                  onClick={() => router.push(`/payment/${orderDetail.id}`)}
                  className="px-6 py-2 bg-primary text-white rounded-lg "
                >
                  ชำระเงิน
                </button>
              </div>
            )}
          </div>
        ))}
        {/* { OrderDetailToPay.length > 0 && <div className="flex p-4 font-semibold border-gray-200 text-right justify-end gap-2">
          <button
            onClick={() => handleOnCancel(OrderDetailToPay[0].id)}
            className="px-6 py-2 bg-red-500 text-white rounded-lg "
          >
            ยกเลิก
          </button>
          <button
            onClick={() => router.push(`/payment`)}
            className="px-6 py-2 bg-primary text-white rounded-lg "
          >
            ชำระเงิน
          </button>
        </div>} */}
      </div>
    </div>
  );
}
