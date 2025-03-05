"use client";
import LikeButton from "./likeButton";
import { useRouter } from "next/navigation";
import { productInterface } from "../interface/productInterface";
import { useSession } from "next-auth/react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { useCart } from "@/app/context/cartContext";
import { useToast } from "@/hooks/use-toast";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/app/components/ui/drawer";
import React, { useState } from "react";
import { getInventoriesByProductId } from "../service/inventory/service";
import { inventoryInterface } from "../interface/inventoryInterface";
import { createCart } from "../service/cart/service";
import { generateKey } from "@/lib/utils";

interface prop {
  product: productInterface;
}

const ProductCard = ({ product }: prop) => {
  const { data: session } = useSession();
  const { toast } = useToast();
  const { fetchCartAll } = useCart();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [inventory, setInventory] = useState<inventoryInterface[]>([]);
  const [filteredColors, setFilteredColors] = useState<string[]>([]); // เก็บสีที่กรองแล้ว
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  function onClick(adjustment: number) {
    setQuantity(Math.max(1, Math.min(100, quantity + adjustment)));
  }

  const handleGotoProductPage = () => {

    router.push(`/product/${product.id}`);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const color = e.target.value;
    setSelectedColor(color);
  };


  const onSubmitAddToCart = async () => {
    // ตรวจสอบว่าต้องเลือก Size หรือไม่
    const requiresSize = inventory.some(item => item.size);
    if (requiresSize && !selectedSize) {
      toast({
        description: "กรุณาเลือกขนาดก่อนทำการเพิ่มลงตะกร้า",
      });
      return;
    }
  
    // ตรวจสอบว่าต้องเลือก Color หรือไม่
    const requiresColor = inventory.some(item => item.color);
    if (requiresColor && !selectedColor) {
      toast({
        description: "กรุณาเลือกสีก่อนทำการเพิ่มลงตะกร้า",
      });
      return;
    }
  
    try {
      await createCart({
        userId: Number(session?.user.id),
        productId: product.id,
        color: selectedColor,
        size: selectedSize,
        quantity: quantity,
      });
      await fetchCartAll();
      toast({
        description: "เพิ่มสินค้าเข้าตะกร้าเรียบร้อยแล้ว",
      });
    } catch (error: any) {
      toast({
        description: error.message,
      });
      console.log(error);
    }
  };
  

  // ฟังก์ชันเรียกใช้เมื่อเลือก Size
  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const size = e.target.value;
    setSelectedSize(size);

    // กรองสีที่เกี่ยวข้องกับ Size ที่เลือก
    const colors: string[] = inventory.filter((item) => item.size === size).map((item) => item.color as string);  // ใช้การ cast ให้เป็น string
    setFilteredColors(colors);
  };

  const fetchInventoryData = async () => {
    const data = await getInventoriesByProductId(product.id, '');
    setInventory(data);
  }

  return (
    <>
      <div key={product.id} className="w-full overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer flex flex-col justify-between h-full">
        {/* Image Section */}
        <div onClick={handleGotoProductPage} className="relative h-64">
          <img src={product.image!.image1} alt={product.name} className="w-full h-full object-cover" />
        </div>

        {/* Content Section */}
        <div className="p-4 flex flex-col flex-grow dark:bg-card dark:text-white rounded-b-lg">
          <h3 onClick={handleGotoProductPage} className="text-lg font-semibold  mb-2" >
            {product.name}
          </h3>

          <div className="mt-auto ">
            <div className="flex justify-between items-center">

              {/* Price */}
              <span className="text-xl font-bold">
                {product.price} บาท
              </span>

              {/* Action Buttons */}
              <div className="gap-2 flex">
                {/* <LikeButton productId={product.id} /> */}

                {/* Add to Cart Drawer */}
                <Drawer>
                  <DrawerTrigger asChild>
                    <button onClick={(e) => {
                      e.stopPropagation();
                      if (!session) {
                        router.push("/login");
                        return null; // ป้องกันการ render อื่น ๆ
                      }
                      fetchInventoryData()
                    }} className="p-2 rounded-full bg-primary text-white hover:bg-primary/10 transition-colors" >
                      <ShoppingCart className="w-5 h-5 font-bold" />
                    </button>
                  </DrawerTrigger>

                  <DrawerContent onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
                    <div className="mx-auto w-full max-w-sm">
                      <DrawerHeader>
                        <DrawerTitle>{product.name}</DrawerTitle>
                        <DrawerDescription>{product.description}</DrawerDescription>
                      </DrawerHeader>

                      <div className="p-4 space-y-6">
                        {/* เงื่อนไข: ถ้ามีข้อมูล size หรือ color ค่อยแสดง UI */}
                        {inventory.length > 0 && (
                          <>
                            {/* Size Selection */}
                            {inventory.some(item => item.size) && (
                              <div className="max-w-sm mx-auto">
                                <label htmlFor="size" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                  เลือกขนาด
                                </label>
                                <select
                                  id="size"
                                  name="size"
                                  className="p-2.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                  value={selectedSize}
                                  onChange={handleSizeChange}
                                >
                                  <option value="">กรุณาเลือกขนาด</option>
                                  {Array.from(new Set(inventory.map((item) => item.size))).map(
                                    (size) => (
                                      <option key={generateKey()} value={size?.toString()}>
                                        {size}
                                      </option>
                                    )
                                  )}
                                </select>
                              </div>
                            )}

                            {/* Color Selection */}
                            {inventory.some(item => item.color) && (
                              <div>
                                <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-2">
                                  เลือกสี
                                </label>
                                <select
                                  id="color"
                                  name="color"
                                  className="p-2.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                  onChange={handleColorChange}
                                  disabled={inventory.some(item => item.size) && !selectedSize} // ถ้ามี size ให้เลือกก่อน
                                >
                                  <option value="">กรุณาเลือกสี</option>
                                  {filteredColors.length > 0
                                    ? filteredColors.map((color) => (
                                      <option key={generateKey()} value={color}>
                                        {color}
                                      </option>
                                    ))
                                    : inventory.map((item) => (
                                      <option key={generateKey()} value={item.color}>
                                        {item.color}
                                      </option>
                                    ))}
                                </select>
                              </div>
                            )}
                          </>
                        )}


                        {/* Quantity Selection */}
                        <div className="flex items-center justify-center space-x-2">
                          <Button onClick={() => { onClick(-1); }}
                            disabled={quantity <= 1}
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 shrink-0 rounded-full"
                          >
                            <Minus />
                            <span className="sr-only">Decrease</span>
                          </Button>
                          <div className="flex-1 text-center">
                            <div className="text-7xl font-bold tracking-tighter">{quantity}</div>
                            <div className="text-[0.70rem] uppercase text-muted-foreground">
                              จำนวน
                            </div>
                          </div>
                          <Button
                            onClick={() => {
                              onClick(1);
                            }}
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 shrink-0 rounded-full"
                            disabled={quantity >= 100}
                          >
                            <Plus />
                            <span className="sr-only">Increase</span>
                          </Button>
                        </div>
                      </div>

                      <DrawerFooter className="flex justify-between">
                        <DrawerClose asChild>

                          <Button onClick={() => onSubmitAddToCart()}>เพิ่มเข้ารถเข็น</Button>
                        </DrawerClose>
                        <DrawerClose asChild>
                          <Button variant="outline">ยกเลิก</Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </div>
                  </DrawerContent>
                </Drawer>

              </div>
            </div>

          </div>
        </div>
      </div>
    </>

  );
};

export default ProductCard;
