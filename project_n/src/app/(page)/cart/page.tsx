"use client";
import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { FaLongArrowAltRight } from "react-icons/fa";
import { deleteCartById, getCartById, updateCartById } from '@/app/service/cart/service';
import { useToast } from '@/hooks/use-toast';
import { cartItemInterface } from '@/app/interface/cartItemInterface';

function cart() {
    const { toast } = useToast();
    const [item, setItem] = useState<cartItemInterface[]>([]);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    const handleQuantityChange = async (index: number, delta: number) => {
        setItem((prevItems) => {
            return prevItems.map((cart, i) => {
                if (i === index) {
                    const newQuantity = Math.max(0, Math.min((cart.quantity || 1) + delta, 100)); // Value 0 to 100
                    return { ...cart, quantity: newQuantity };
                }
                return cart;
            });
        });
        const updatedCart = item[index];
        try {
            await updateCartById(updatedCart.id, {
                ...updatedCart,
                quantity: Math.max(0, Math.min((updatedCart.quantity || 1) + delta, 100)),
            });
        } catch (error) {
            console.error("Failed to update cart:", error);
        }
    };

    const handleCheckboxChange = (id: number) => {
        setSelectedItems((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((itemId) => itemId !== id) // เอา id ออกถ้าอยู่ใน selected
                : [...prevSelected, id] // add id เข้าไปถ้ายังไม่มี
        );
    };

    // Works when button is pressed
    const handleCheckout = async () => {
        try {
            const selectedCartItems = item.filter( (cart) => selectedItems.includes(cart.id) );

            console.log(selectedCartItems)
            // Payload for OrderItem
            const orderItems = selectedCartItems.map((cart) => ({
                orderDetailId: 1,
                productId: cart.product?.id,
                color: cart.color,
                size: cart.size,
                quantity: cart.quantity || 1,
            }));


        } catch (error) {
            console.error('Checkout error:', error);
            toast({ title: 'Error', description: 'Failed to save order items.' });
        }
    };

    const deleteDataAddress = async (id: Number) => {
            await deleteCartById(id);
            fetchCartData();
        }

    const fetchCartData = async () => {
        const res = await getCartById(2);
        setItem(res);
        console.log(res);
    }

    useEffect(() => {
        fetchCartData();
    }, []);

    return (
        <section className='h-screen bg-gray-100 sm:py-16 lg:py-20'>
            <div className='mx-auto px-4 sm:px-6 lg:px-8'>
                <div className="flex items-center justify-center">
                    <h1 className="text-2xl font-semibold text-gray-900">รถเข็น</h1>
                </div>
            </div>

            <div className="mx-auto mt-8 max-w-2xl md:mt-12">
                <div className="bg-white border-4 border-black">
                    <div className="px-4 py-6 sm:px-8 sm:py-10">

                        <div className="flow-root">
                            <ul className="-my-8">

                                {item.map((cart, index) => (
                                    <li key={cart.id} className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                                        <input
                                            type="checkbox"
                                            checked={selectedItems.includes(cart.id)}
                                            onChange={() => handleCheckboxChange(cart.id)}
                                            className="h-5 w-5 text-blue-600"
                                        />
                                        <div className="shrink-0">
                                            <img className="h-24 w-24 max-w-full rounded-lg object-cover" src={cart.product?.image.image1} alt="" />
                                        </div>

                                        <div className="relative flex flex-1 flex-col justify-between">
                                            <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                                                <div className="pr-8 sm:pr-5">
                                                    <p className="text-base font-semibold text-gray-900">{cart.product?.name}</p>
                                                    <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">{cart.size}</p>
                                                    <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">{cart.color}</p>
                                                </div>

                                                <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                                                    <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">{cart.product?.price}</p>
                                                    <div className="sm:order-1">
                                                        <div className="mx-auto flex h-8 items-stretch text-gray-600">
                                                            {/* Decrease button */}
                                                            <button
                                                                onClick={() => handleQuantityChange(index, -1)}
                                                                className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                                                            >
                                                                -
                                                            </button>
                                                            {/* Quantity display */}
                                                            <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
                                                                {cart.quantity || 1}
                                                            </div>
                                                            {/* Increase button */}
                                                            <button
                                                                onClick={() => handleQuantityChange(index, 1)}
                                                                className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                                                <button onClick={(e) => deleteDataAddress(cart.id)} type="button" className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out  hover:text-gray-900">
                                                    {/* <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" className=""></path>
                                                    </svg> */}
                                                    <X />
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}

                            </ul>
                        </div>

                        {/* <div className="mt-6 border-t border-b py-2">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-400">Subtotal</p>
                                <p className="text-lg font-semibold text-gray-900">$399.00</p>
                            </div>
                        </div> */}
                        <div className="mt-6 flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">รวม</p>
                            <p className="text-2xl font-semibold text-gray-900"><span className="text-xs font-normal text-gray-400">฿</span>
                                {item.reduce((total, cart) => total + (cart.product?.price || 0), 0).toFixed(2)}
                            </p>
                        </div>

                        <div className="mt-6 text-center">
                            <button onClick={handleCheckout} type="button" className="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800">
                                ชำระเงิน
                                <FaLongArrowAltRight className='group-hover:ml-8 ml-4 h-6 w-6 transition-all' />
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default cart