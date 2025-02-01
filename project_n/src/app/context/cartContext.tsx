"use client";
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { getCartById, getCountCartById } from "@/app/service/cart/service";
import { useSession } from "next-auth/react";
import { cartItemInterface } from "../interface/cartItemInterface";

// hover cart interface
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// Context for cart interface
interface CartContextType {
  itemCount: number;
  item: cartItemInterface[];
  fetchCart: () => Promise<void>;
  fetchCartAll: () => Promise<void>;
}

// Default Context
const CartContext = createContext<CartContextType>({
  itemCount: 0,
  item: [],
  fetchCart: async () => { },
  fetchCartAll: async () => { },
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const [ amountItem, setAmountItem] = useState(0);
  const [item, setItem] = useState<cartItemInterface[]>([]);
  const itemCount = useMemo(() => item.length, [item]);

  const fetchCartAll = async () => {
    const res = await getCartById(Number(session!.user.id));
    console.log("Cart updated:", res);
    setItem(res);
  }
  // fetch amount cart items
  const fetchCart = async () => {
    if (!session?.user?.id) return;
    const res = await getCountCartById(Number(session!.user.id));
    setAmountItem(res);
  };

  useEffect(() => {
    fetchCart();
    fetchCartAll();
  }, [session]);

  return (
    <CartContext.Provider value={{ item, itemCount, fetchCart, fetchCartAll }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook for use Context
export const useCart = () => useContext(CartContext);
