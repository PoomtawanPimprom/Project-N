"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { getCountCartById } from "@/app/service/cart/service";
import { useSession } from "next-auth/react";

// กำหนดค่าเริ่มต้นของ Context
const CartContext = createContext({
  amountItem: 0,
  fetchCart: async () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const [amountItem, setAmountItem] = useState(0);

  // ฟังก์ชันดึงข้อมูลตะกร้า
  const fetchCart = async () => {
    if (!session?.user?.id) return;
    const res = await getCountCartById(Number(session!.user.id));
    setAmountItem(res);
  };

  useEffect(() => {
    fetchCart();
  }, [session]);

  return (
    <CartContext.Provider value={{ amountItem, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook สำหรับใช้ Context
export const useCart = () => useContext(CartContext);
