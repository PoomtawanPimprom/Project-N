"use client";
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { FaLongArrowAltRight } from "react-icons/fa";
import {
  deleteCartById,
  getCartById,
  updateCartById,
} from "@/app/service/cart/service";
import { useToast } from "@/hooks/use-toast";
import { cartItemInterface } from "@/app/interface/cartItemInterface";
import { CreateOrder } from "@/app/service/(payment)/service";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";
import { useCart } from "@/app/context/cartContext";

function cart() {
  const router = useRouter();
  const { fetchCartAll } = useCart();
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <Loading />; // แสดงข้อความระหว่างโหลด session
  }

  if (!session) {
    router.push("/login");
    return null; // ป้องกันการ render อื่น ๆ
  }
  const { toast } = useToast();
  const [item, setItem] = useState<cartItemInterface[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const handleQuantityChange = async (index: number, delta: number) => {
    setItem((prevItems) => {
      return prevItems.map((cart, i) => {
        if (i === index) {
          const newQuantity = Math.max(
            0,
            Math.min((cart.quantity || 1) + delta, 100)
          ); // Value 0 to 100
          return { ...cart, quantity: newQuantity };
        }
        return cart;
      });
    });
    const updatedCart = item[index];
    try {
      await updateCartById(updatedCart.id, {
        ...updatedCart,
        quantity: Math.max(
          0,
          Math.min((updatedCart.quantity || 1) + delta, 100)
        ),
      });
    } catch (error) {
      console.error("Failed to update cart:", error);
    }
  };

  const isOutOfStock = (cart: cartItemInterface): boolean => {
    const inventory = cart.product?.Inventory || [];
    const match = inventory.find(
      (inv) => inv.size === cart.size && inv.color === cart.color
    );
    return !match || Number(match.quantity) === 0;
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedItems(
      (prevSelected) =>
        prevSelected.includes(id)
          ? prevSelected.filter((itemId) => itemId !== id) // เอา id ออกถ้าอยู่ใน selected
          : [...prevSelected, id] // add id เข้าไปถ้ายังไม่มี
    );
  };

  // Works when button is pressed
  const handleCheckout = async () => {
    try {
      const selectedCartItems = item.filter((cart) =>
        selectedItems.includes(cart.id)
      );

      if (selectedCartItems.length == 0) {
        return null;
      }
      // Payload for OrderItem
      const orderItems = selectedCartItems.map((cart) => ({
        productId: cart.productId,
        storeId: cart.product?.storeID,
        price: cart.product?.price,
        quantity: cart.quantity || 1,
        color: cart.color,
        size: cart.size,
      }));
      //
      const data = {
        userId: Number(session?.user.id),
        items: orderItems
      };

      //create order
      await CreateOrder(data);

      router.push(`/payment`);
    } catch (error: any) {
      if (error.message) {
        toast({
          variant: "destructive",
          description: error.message,
        });
        router.push(`/profile/purchase`)
      }
    }
  };

  const goToProduct = (id: string | number) => {
    router.push(`/product/${id}`)
  }

  const deleteDataAddress = async (id: Number) => {
    await deleteCartById(id);
    fetchCartDatas();
    fetchCartAll();
  };

  const fetchCartDatas = async () => {
    console.log("Fetching cart data for user ID:", session?.user?.id);
    if (!session?.user?.id) return; // ป้องกัน error
    const res = await getCartById(Number(session.user.id));
    setItem(res);
    console.log("Cart data:", res);
  };

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      fetchCartDatas(); // เรียกใช้เมื่อ session พร้อมใช้งาน
    }
  }, [status, session]);

  return (
    <section className="h-screen sm:py-16 lg:py-20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <h1 className="dark:text-white text-2xl font-semibold text-gray-900">รถเข็น</h1>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-2xl md:mt-12">
        <div className="dark:bg-zinc-800 dark:border-zinc-600 bg-white border-4 border-black">
          <div className="px-4 py-6 sm:px-8 sm:py-10">
            <div className="flow-root">

              <ul className="-my-8 ">
                {item.map((cart, index) => (
                  <li
                    key={cart.id}
                    className={`flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0 ${isOutOfStock(cart) ? "opacity-50" : ""
                      }`}
                  >

                    <input
                      type="checkbox"
                      className="h-5 w-5 dark:bg-zinc-700 dark:border-zinc-600"
                      checked={selectedItems.includes(cart.id)}
                      onChange={() => handleCheckboxChange(cart.id)}
                      disabled={isOutOfStock(cart)}
                    />
                    <div className="shrink-0">
                      <img
                        onClick={() => goToProduct(cart.product?.id!)}
                        className="h-24 w-24 max-w-full rounded-lg object-cover hover:cursor-pointer" src={cart.product?.image!.image1} alt="" />
                    </div>

                    <div className="relative flex flex-1 flex-col justify-between">
                      <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">

                        <div className="pr-8 sm:pr-5">
                          <p
                            onClick={() => goToProduct(cart.product?.id!)}
                            className="text-base font-semibold text-gray-900 dark:text-white hover:cursor-pointer hover:text-gray-400">{cart.product?.name}</p>
                          <p className="mx-0 mt-1 mb-0 text-sm text-gray-400 dark:text-gray-300">{cart.size}</p>
                          <p className="mx-0 mt-1 mb-0 text-sm text-gray-400 dark:text-gray-300">{cart.color}</p>
                        </div>

                        <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                          <p className="dark:text-white shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                            ราคารวม ฿ {(cart.product?.price || 0) * (cart.quantity || 1)}
                          </p>

                          <div className="sm:order-1">
                            <div className="dark:text-gray-300 mx-auto flex h-8 items-stretch text-gray-600">

                              {/* Decrease button
                              <button onClick={() => handleQuantityChange(index, -1)} className="dark:bg-zinc-700 flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white">
                                -
                              </button>
                              {/* Quantity display */}
                              {/* <div className="dark:bg-zinc-600 flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
                                {cart.quantity || 1}
                              </div> */}
                              {/* Increase button */}
                              {/* <button onClick={() => handleQuantityChange(index, 1)} className="dark:bg-zinc-700 flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white">
                                +
                              </button> */}

                              <button
                                onClick={() => handleQuantityChange(index, -1)}
                                disabled={isOutOfStock(cart)}
                                className={`dark:bg-zinc-700 flex items-center justify-center rounded-l-md px-4 transition ${isOutOfStock(cart)
                                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                  : "bg-gray-200 hover:bg-black hover:text-white"
                                  }`}
                              >
                                -
                              </button>

                              <div className={`flex w-full items-center justify-center px-4 text-xs uppercase transition ${isOutOfStock(cart) ? "bg-gray-300 text-gray-500" : "bg-gray-100 dark:bg-zinc-600"
                                }`}>
                                {cart.quantity || 1}
                              </div>

                              <button
                                onClick={() => handleQuantityChange(index, 1)}
                                disabled={isOutOfStock(cart)}
                                className={`dark:bg-zinc-700 flex items-center justify-center rounded-r-md px-4 transition ${isOutOfStock(cart)
                                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                  : "bg-gray-200 hover:bg-black hover:text-white"
                                  }`}
                              >
                                +
                              </button>


                            </div>
                          </div>

                        </div>
                      </div>

                      <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                        <button onClick={(e) => deleteDataAddress(cart.id)} type="button" className="flex rounded p-2 text-center bg-red-600 hover:bg-red-500 text-white transition-all duration-200 ease-in-out  hover:text-gray-900">
                          <X />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <p className="dark:text-white text-sm font-medium text-gray-900">รวม</p>
              <p className="dark:text-white text-2xl font-semibold text-gray-900">
                <span className="dark:text-gray-300 text-xs font-normal text-gray-400">฿</span>
                {item
                  .filter((cart) => selectedItems.includes(cart.id)) // กรองเฉพาะที่ถูกเลือก
                  .reduce(
                    (total, cart) =>
                      total + (cart.product?.price || 0) * (cart.quantity || 1), // คำนวณราคา * จำนวน
                    0
                  )
                  .toFixed(2)}
              </p>
            </div>

            <div className="mt-6 text-center">
              <button onClick={handleCheckout} type="button"
                className="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 dark:bg-zinc-700 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800 dark:hover:bg-zinc-600"
              >
                ชำระเงิน
                <FaLongArrowAltRight className="group-hover:ml-8 ml-4 h-6 w-6 transition-all" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default cart;
