"use client";

import { productInterface } from "@/app/interface/productInterface";
import { inventoryInterface } from "@/app/interface/inventoryInterface";

import { useEffect, useState } from "react";

import ReportButton from "@/app/component/reportButton";
import ModalReportForm from "../../report/component/modalReportForm";
import Desription from "../component/CompoDesription";
import StoreInfo from "../component/CompoStoreBox";

import { getProductById } from "@/app/service/product/service";
import { getInventoriesByProductId } from "@/app/service/inventory/service";

const ProductByIdPage = ({ params }: { params: { id: number } }) => {
  const [product, setProduct] = useState<productInterface>();
  const [size, setSize] = useState<string | undefined>();
  const [color, setColor] = useState<string | undefined>();
  const [count, setCount] = useState(1);

  const [inventories, setInventories] = useState<inventoryInterface[]>([]);

  //report system
  const [openReportModal, setOpenReportModal] = useState(false);

  //inventory
  const [availableQuantity, setAvailableQuantity] = useState<number | null>(
    null
  );

  const fetchData = async () => {
    const Productdata = await getProductById(params.id);
    const InvenData = await getInventoriesByProductId(params.id, "");
    setProduct(Productdata);
    setInventories(InvenData);
  };

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
    fetchData();
  }, []);

  useEffect(() => {
    if (size && color) {
      getAvailableQuantity();
    } else {
      setAvailableQuantity(null);
    }
  }, [size, color]);

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex flex-col border  w-[1000px] p-4 bg-green dark:bg-black">
          <div className="flex text-5xl font-bold mb-3 w-full dark:text-white">
            {product?.name}
          </div>
          <div className="grid grid-cols-1 grid-flow-row auto-rows-auto gap-2 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-1 gap-2 mx-auto ">
              <div className="flex w-full justify-start">
                <img
                  src={product?.image}
                  alt={product?.name}
                  className=" rounded-xl w-[450px] h-[450px]"
                />
              </div>
              <div className="flex flex-col bg-white  border rounded-xl p-2">
                <div className="flex w-full ">
                  <div className="flex w-full justify-between ">
                    <div className="flex items-center text-xl ">
                      <p>โปรดเลือก</p>
                    </div>
                    <div className="flex  items-center">
                      <div>
                        <ReportButton
                          userId={1}
                          productId={params.id}
                          onClick={() => setOpenReportModal(true)}
                        />
                        <ModalReportForm
                          productId={params.id}
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
                              size === sizeItem
                                ? undefined
                                : (sizeItem as string)
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
                              color === colorItem
                                ? undefined
                                : (colorItem as string)
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
            </div>
            <Desription product={product} />
            <StoreInfo store={product?.store} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductByIdPage;
