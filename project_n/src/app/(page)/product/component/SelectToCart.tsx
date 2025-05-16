"use client";

import ReportButton from "@/app/component/reportButton";
import { inventoryInterface } from "@/app/interface/inventoryInterface";
import { useEffect, useState } from "react";
import ModalReportForm from "../../report/component/modalReportForm";
import LikeButtonProductPage from "./LikeButton";
import { productInterface } from "@/app/interface/productInterface";
import Description from "./Desription";
import { createCart } from "@/app/service/cart/service";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/app/context/cartContext";
import { useRouter } from "next/navigation";

type SelectProp = {
  productId: number;
  product: productInterface;
  inventory: inventoryInterface[];
};

export default function SelectToCart({
  product,
  inventory,
  productId,
}: SelectProp) {
  const route = useRouter()
  const { toast } = useToast();
  const { fetchCartAll } = useCart();
  const [size, setSize] = useState<string | undefined>();
  const [color, setColor] = useState<string | undefined>();
  const [count, setCount] = useState(1);
  const { data: session } = useSession();
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
    
    // Convert quantity to a number before updating the state
    setAvailableQuantity(inventoryItem ? Number(inventoryItem.quantity) : null);
  };
  const onSubmitAddToCart = async () => {
    if(!session){
      route.push("/login")
      return
    }
    try {
      await createCart({
        userId: Number(session?.user.id),
        productId: product.id,
        color: color,
        size: size,
        quantity: count,
      });
      await fetchCartAll(); // update quantity
      toast({
        description: "เพิ่มสินค้าเข้าตะกร้าเรียบร้อยแล้ว",
      });
    } catch (error:any) {
      if(error.message){
        toast({
          description: error.message
        })
      }
      console.log(error);
    }
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
    <div className="flex flex-col  space-y-2  border rounded-xl p-4">
      {/* header */}
      <div>
        <div className="flex w-full  ">
          <div className="flex w-full justify-between ">
            <div className="flex text-4xl md:text-5xl font-bold w-full dark:text-white">
              {product?.name}
            </div>
            <div className="flex   items-start">
              <div>
                <ReportButton
                  userId={Number(session?.user.id)}
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
        <div className="flex flex-col  text-accent-foreground">
          <p className="md:text-lg font-semibold">ราคา : {product.price} บาท</p>
          <p className="  text-sm font-medium text-zinc-500">ขายไปแล้ว : {product.sales} ชิ้น</p>

        </div>
      </div>
      {/* body */}
      <Description product={product} />
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
                    size === sizeItem ? "bg-primary text-white" : ""
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
                  key={colorItem}
                  onClick={() =>
                    setColor(
                      color === colorItem ? undefined : (colorItem as string)
                    )
                  }
                  className={`flex h-10 border rounded-xl justify-center items-center ${
                    color === colorItem ? "bg-primary text-white" : ""
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
      <div className="flex h-full items-end ">
        <div className="flex justify-between space-x-2 h-fit  w-full">
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
            <button
              onClick={() => onSubmitAddToCart()}
              className="px-4 py-2 rounded-lg h-full w-full justify-center items-center bg-primary text-white font-bold"
            >
              เพิ่มลงตะกร้า
            </button>
          </div>
          <div>
            <LikeButtonProductPage userId={Number(session?.user.id)} productId={productId} />
          </div>
        </div>
      </div>
    </div>
  );
}
