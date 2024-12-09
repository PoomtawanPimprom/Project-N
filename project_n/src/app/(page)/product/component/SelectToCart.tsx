"use client";

import ReportButton from "@/app/component/reportButton";
import { inventoryInterface } from "@/app/interface/inventoryInterface";
import { useEffect, useState } from "react";
import ModalReportForm from "../../report/component/modalReportForm";
import { Heart } from "lucide-react";
import { getFavoriteByProductIdAndUserId } from "@/app/service/favorite/service";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import LikeButtonProductPage from "./LikeButton";

type SelectProp = {
  productId: number;
  product: any;
  inventory: any;
};

export default function SelectToCart({
  product,
  inventory,
  productId,
}: SelectProp) {
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
  const uniqueSizes = Array.from(
    new Set(inventories.map((item) => item.size).filter((size) => size !== ""))
  );
  const uniqueColors = Array.from(
    new Set(
      inventories.map((item) => item.color).filter((color) => color !== "")
    )
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

  useEffect(() => {
    setInventories(inventory);
  }, []);
  return (
    <div className="flex flex-col justify-between space-y-2  border rounded-xl p-4">
      {/* header */}
      <div>
        <div className="flex w-full  ">
          <div className="flex w-full justify-between ">
            <div className="flex text-5xl font-bold mb-3 w-full dark:text-white">
              {product?.name}
            </div>
            <div className="flex   items-start">
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
        <div className="flex text-lg font-semibold text-gray-600" >
          <p>฿{product.price}</p>
        </div>
      </div>
      {/* body */}
      <div>
        {uniqueSizes.length > 0 && (
          <div>
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
                    size === sizeItem ? "bg-green-main text-white" : ""
                  }`}
                >
                  {sizeItem}
                </button>
              ))}
            </div>
          </div>
        )}
        {uniqueColors.length > 0 && (
          <div>
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
                    color === colorItem ? "bg-green-main text-white" : ""
                  }`}
                >
                  {colorItem}
                </button>
              ))}
            </div>
          </div>
        )}
        {availableQuantity !== null && (
          <div className="mt-2">
            <p>จำนวนสินค้าที่เหลือ: {availableQuantity}</p>
          </div>
        )}
      </div>

      {/* footer */}
      <div>
        <div className="flex justify-between space-x-2 ">
          <div className="flex border border-black w-1/3  rounded-lg ">
            <button
              onClick={() => setCount(count - 1)}
              disabled={count === 1}
              className="w-1/3 mx-2 justify-center items-center font-bold"
            >
              <p>-</p>
            </button>
            <div className="flex w-1/3 mx-2 justify-center items-center font-bold ">
              <p>{count}</p>
            </div>
            <button
              onClick={() => setCount(count + 1)}
              className="w-1/3 mx-2 justify-center items-center font-bold"
            >
              <p>+</p>
            </button>
          </div>
          <div className="flex w-full  border rounded-lg justify-center items-center">
            <button className="px-4 py-2 rounded-lg h-full w-full justify-center items-center bg-green-main text-white font-bold">
              เพิ่มลงตะกร้า
            </button>
          </div>
          <div>
            <LikeButtonProductPage userId={1} productId={productId} />
          </div>
        </div>
      </div>
    </div>
  );
}
