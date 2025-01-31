"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { getCountCartById } from "@/app/service/cart/service";
import { useSession } from "next-auth/react";

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
  amountItem: number;
  cart: CartItem[];
  fetchCart: () => Promise<void>;
  addToCart: (item: CartItem) => void;
}

// Default Context
const CartContext = createContext<CartContextType>({
  amountItem: 0,
  cart: [],
  fetchCart: async () => { },
  addToCart: () => { },
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const [amountItem, setAmountItem] = useState(0);
  const [cart, setCart] = useState<CartItem[]>([]);

  // fetch amount cart items
  const fetchCart = async () => {
    if (!session?.user?.id) return;
    const res = await getCountCartById(Number(session!.user.id));
    console.log("Cart updated:", res); // ✅ ตรวจสอบค่าที่รีเทิร์นมา
    setAmountItem(res);
  };


  useEffect(() => {
    fetchCart();
  }, [session, cart]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      let updatedCart;
      if (existingItem) {
        updatedCart = prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        updatedCart = [...prevCart, { ...item, quantity: 1 }];
      }
  
      setAmountItem(updatedCart.reduce((total, item) => total + item.quantity, 0));
      return updatedCart;
    });
  };

  return (
    <CartContext.Provider value={{ amountItem, cart, fetchCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook for use Context
export const useCart = () => useContext(CartContext);
