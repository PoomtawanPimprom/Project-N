"use client";
import { DollarSign } from "lucide-react";
import { useState } from "react";
import ChangeShipperModal from "./ChangeShipper-Modal";
import { productInterface } from "@/app/interface/productInterface";

type prop = {
  products: productInterface[];
};

export default function ProductCart({ products }: prop) {
  const [openModal, setOpenModal] = useState(false);
  const [shipper, setShipper] = useState(null);
  return (
    <div className="flex flex-col w-full space-y-1  p-4 border border-gray-300 rounded-xl">
      {/* product lis */}
      <div>
        <div className="flex font-bold text-xl">
          <DollarSign className="mr-2" />
          <p>รายการสั่งซื้อ</p>
        </div>
        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className={`p-2 border rounded-lg cursor-pointer transition-all `}
            >
              <div className="flex  space-x-4">
                <img
                  src={product.image!.image1}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-xl">{product.name}</h3>
                  <p className="text-gray-600">${product.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* shipping method */}
      <div className="">
        <div className="flex font-bold text-xl">
          <p>รูปแบบการส่ง</p>
        </div>
        <div className="p-2 border rounded-lg cursor-pointer transition-all">
          <div className="flex  space-x-4">
            <div className="flex-1">
              <button
                className="px-4 py-2 rounded-xl bg-gray-300"
                type="button"
                onClick={() => setOpenModal(true)}
              >
                เปลี่ยน
              </button>
            </div>
          </div>
        </div>
        <ChangeShipperModal
          open={openModal}
          onClose={() => setOpenModal(false)}
        />
      </div>
      {/* discount  */}
      <div className="">
        <div className="flex font-bold text-xl">
          <p>ส่วนลด</p>
        </div>
        <div className="p-2 border rounded-lg cursor-pointer transition-all">
          <div className="flex  space-x-4">
            {/* <img src={product.image!.image1} alt={product.name} className="w-20 h-20 object-cover rounded" /> */}
            <div className="flex-1">
              <input
                placeholder="ใส่โค้ด..."
                type="text"
                className="p-2 w-32 bg-gray-50 rounded-lg border "
              />
            </div>
          </div>
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
          <span>Product Total</span>
          <span>qwe</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery Fee</span>
          <span>qwe</span>
        </div>
        <div className="border-t pt-4">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>qwe</span>
          </div>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
}
