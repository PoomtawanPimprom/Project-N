import { orderDetailInterface } from "@/app/interface/orderDetailInterface";
import OrderItemCard from "./OrderItemCard";

interface type {
  orderDetails: orderDetailInterface[];
  cancel:()=>void
}

export default function OrderDetailToPayCard({ orderDetails,cancel }: type) {
  
    return (
    <div className="space-y-4">
      {orderDetails.map((orderDetail, index) => (
        <div key={index}>
          {orderDetail.OrderItem?.map((orderItem, i) => (
            <OrderItemCard orderItem={orderItem} />
          ))}
        </div>
      ))}
      {OrderDetailToPay.length > 0 && (
        <div className="flex p-4 font-semibold border-gray-200 text-right justify-end gap-2">
          <button
            onClick={() => cancel(OrderDetailToPay[0].orderDetailId)}
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
        </div>
      )}
    </div>
  );
}
