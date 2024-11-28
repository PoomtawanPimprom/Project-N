"use client";

import ReportButton from "@/app/component/reportButton";
import { inventoryInterface } from "@/app/interface/inventoryInterface";
import { useEffect, useState } from "react";
import ModalReportForm from "../../report/component/modalReportForm";

type SelectProp = {
    productId: number;
  product: any;
  inventory: any;
};

export default function SelectToCart({ product, inventory,productId }: SelectProp) {
  const [size, setSize] = useState<string | undefined>();
  const [color, setColor] = useState<string | undefined>();
  const [count, setCount] = useState(1);
  //report system
  const [openReportModal, setOpenReportModal] = useState(false);

  //inventory
  const [inventories, setInventories] = useState<inventoryInterface[]>([]);
  const [availableQuantity, setAvailableQuantity] = useState<number | null>(
    null
  );
  const uniqueSizes = Array.from(new Set(inventories.map((item) => item.size)));
  const uniqueColors = Array.from(
    new Set(inventories.map((item) => item.color))
  );
  const getAvailableQuantity = () => {
    const inventoryItem = inventories.find(
      (item) => item.size === size && item.color === color
    );
    setAvailableQuantity(inventoryItem ? inventoryItem.quantity : null);
  };

  useEffect(() => {
    if (size && color) {
      getAvailableQuantity();
    } else {
      setAvailableQuantity(null);
    }
  }, [size, color]);

  useEffect(()=>{
    setInventories(inventory)
  },[])
  return (
    <div className="flex flex-col bg-white  border rounded-xl p-2">
      <div>
        <div className="flex w-full ">
          <div className="flex w-full justify-between ">
            <div className="flex items-center text-xl ">
              <p>โปรดเลือก</p>
            </div>
            <div className="flex  items-center">
              <div>
                <ReportButton
                  userId={1}
                  productId={productId}
                  onClick={() => setOpenReportModal(true)}
                />
                <ModalReportForm
                  productId={productId}
                  open={openReportModal}
                  onClose={() => setOpenReportModal(false)}
                />
              </div>
            </div>
          </div>
        </div>
        {uniqueSizes.length > 0 && (
          <>
            <div>
              <p>ไซส์</p>
            </div>
            <div className="grid grid-cols-5 gap-2 border p-2 rounded-xl mt-2">
              {uniqueSizes.map((sizeItem, index) => (
                <button
                  key={index}
                  onClick={() =>
                    setSize(
                      size === sizeItem ? undefined : (sizeItem as string)
                    )
                  }
                  className={`flex h-10 border rounded-xl justify-center items-center ${
                    size === sizeItem ? "bg-green text-white" : ""
                  }`}
                >
                  {sizeItem}
                </button>
              ))}
            </div>
          </>
        )}
        {uniqueColors.length > 0 && (
          <>
            <div>สี</div>
            <div className="grid grid-cols-5 gap-2 border p-2 rounded-xl mt-2">
              {uniqueColors.map((colorItem, index) => (
                <button
                  key={index}
                  onClick={() =>
                    setColor(
                      color === colorItem ? undefined : (colorItem as string)
                    )
                  }
                  className={`flex h-10 border rounded-xl justify-center items-center ${
                    color === colorItem ? "bg-green text-white" : ""
                  }`}
                >
                  {colorItem}
                </button>
              ))}
            </div>
          </>
        )}
        {availableQuantity !== null && (
          <div className="mt-2">
            <p>จำนวนสินค้าที่เหลือ: {availableQuantity}</p>
          </div>
        )}
      </div>

      <div className="flex flex-col h-1/6 justify-end">
        <div className="flex  justify-between my-2 h-10">
          <div className="flex border border-black  rounded-lg w-32 ">
            <button
              onClick={() => setCount(count - 1)}
              disabled={count === 1}
              className="w-1/3 mx-2 justify-center items-center"
            >
              <p>-</p>
            </button>
            <div className="flex w-1/3 mx-2 justify-center items-center ">
              <p>{count}</p>
            </div>
            <button
              onClick={() => setCount(count + 1)}
              className="w-1/3 mx-2 justify-center items-center"
            >
              <p>+</p>
            </button>
          </div>
          <div className="flex w-full ml-3 border rounded-lg justify-center items-center">
            <button className=" rounded-lg h-full w-full justify-center items-center bg-green text-white font-bold">
              เพิ่มลงตะกร้า
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
