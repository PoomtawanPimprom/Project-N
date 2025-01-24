"use client";
import { DollarSign } from "lucide-react";
import { useState } from "react";
import ChangeShipperModal from "./ChangeShipper-Modal";
import { orderDetailInterface } from "@/app/interface/orderDetailInterface";
import { orderItemInterface } from "@/app/interface/orderItemInterface";
import { promotionInterface } from "@/app/interface/promotionInterface";
import { AddDiscouteAction } from "./action-promotion";

type prop = {
  discount?: promotionInterface;
  orderDetail: orderDetailInterface;
  orderItems: orderItemInterface[];
};

export default function ProductCart({
  discount,
  orderDetail,
  orderItems,
}: prop) {
 console.log(discount)
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formdata = new FormData(event.currentTarget);
    const result = await AddDiscouteActionBindOrderDetail(formdata);
    setMessage(result?.message || "เกิดข้อผิดพลาด");
  };

  const AddDiscouteActionBindOrderDetail = AddDiscouteAction.bind(null, {
    orderDetailId: orderDetail.id,
    userId: orderDetail.userId,
  });
  return (
    <div className="flex flex-col w-full gap-5  p-4 border border-gray-300 rounded-xl">
      {/* product list */}
      <div>
        <div className="flex font-bold text-xl">
          <DollarSign className="mr-2" />
          <p>รายการสั่งซื้อ</p>
        </div>
        <div className="space-y-4">
          {orderItems.map((item, index) => (
            <div
              key={index}
              className={`flex justify-between p-2 border rounded-lg cursor-pointer transition-all `}
            >
              <div className="flex gap-4">
                <img
                  src={item.product?.image!.image1}
                  alt={item.product?.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-col gap-1">
                  <h3 className="font-semibold text-xl">
                    {item.product?.name}
                  </h3>
                  <p className="text-gray-600">
                    ราคาต่อชิ้น: ${item.product?.price}
                  </p>
                  <p className="text-gray-600">จำนวน: {item.quantity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* shipping method */}
      <div className="w-full">
        <div className="flex font-bold text-xl">
          <p>รูปแบบการส่ง</p>
        </div>
        <div className="p-2 border rounded-lg cursor-pointer transition-all">
          <div className="flex w-full gap-2 justify-between p-1">
            <div className="flex flex-col">
              <p className="text-xl font-medium">
                {orderDetail.transport?.providerName}
              </p>
              <p>฿{orderDetail.transport?.transportPrice}</p>
            </div>
            <div className="flex items-center">
              <button
                className="h-fit px-4 py-2 rounded-lg bg-green-main text-white font-semibold"
                type="button"
                onClick={() => setOpenModal(true)}
              >
                เปลี่ยน
              </button>
            </div>
          </div>
        </div>
        <ChangeShipperModal
          orderDetailId={orderDetail.id}
          open={openModal}
          onClose={() => setOpenModal(false)}
        />
      </div>
      {/* discount  */}
      <div className="">
        <div className="flex font-bold text-xl">
          <p>ส่วนลด</p>
        </div>
        <div className="p-2 border rounded-lg cursor-pointer transition-all ">
          <form className="flex gap-2" onSubmit={handleSubmit}>
            {/* <img src={product.image!.image1} alt={product.name} className="w-20 h-20 object-cover rounded" /> */}
            <div className="flex w-full">
              <input
                name="discountCode"
                placeholder="ใส่โค้ด..."
                type="text"
                className="p-2 w-full bg-gray-50 rounded-lg border "
              />
            </div>
            <button className="py-2 px-4 border bg-green-main text-white font-semibold rounded-lg">
              ยืนยัน
            </button>
          </form>
          {message && (
            <div className="p-2 mb-4 text-center text-white bg-red-500 rounded-lg">
              {message}
            </div>
          )}
        </div>
      </div>

      {/* summary */}
      <div className="">
        <div className="flex font-bold text-xl">
          <p>รวมทั้งหมด</p>
        </div>
        <div className="p-2 border rounded-lg cursor-pointer transition-all">
          <div className="flex flex-col p-1 justify-between">
            <div className="flex justify-between">
              <span>ราคาสินค้ารวม</span>
              <span>
                {orderItems.reduce((sum, item) => {
                  return sum + item.quantity * item.product!.price;
                }, 0)}{" "}
                บาท
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span>จัดส่ง</span>
              <span>{orderDetail.transport?.transportPrice} บาท</span>
            </div>
            {orderDetail.discountId && discount?.discountAmount != null ? (
              <div className="flex justify-between mb-2">
                <span>ส่วนลด</span>
                <span>-{discount.discountAmount} บาท</span>
              </div>
            ):(<></>)}

            <div className="border-t pt-4">
              <div className="flex justify-between font-semibold">
                <span>รวมทั้งหมด</span>
                <span>
                  {orderItems.reduce(
                    (sum, item) => sum + item.quantity * item.product!.price,
                    0
                  ) +
                    (orderDetail.transport?.transportPrice || 0) -
                    (discount?.discountAmount || 0)}{" "}
                   บาท
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
