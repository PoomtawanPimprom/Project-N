"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { Promotion } from "@/app/interface/promotionInterface";

// interface Promotion {
//     id: number;
//     name: string;
//     description: string;
//     discountPercentage: number;
//     discountAmount: number;
//     minimumPrice: number;
//     isActive: boolean;
// }

export default function AdminPromotions() {
    const [promotions, setPromotions] = useState<Promotion[]>([]);
    const [formData, setFormData] = useState<Omit<Promotion, "id">>({
        name: "",
        description: "",
        discountPercentage: 0,
        discountAmount: 0,
        minimumPrice: 0,
        isActive: true,
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "discountPercentage" || name === "discountAmount" || name === "minimumPrice"
                ? Number(value)
                : value,
        });
    };

    const handleAddPromotion = (e: FormEvent) => {
        e.preventDefault();
        setPromotions([...promotions, { ...formData, id: Date.now() }]);
        setFormData({
            name: "",
            description: "",
            discountPercentage: 0,
            discountAmount: 0,
            minimumPrice: 0,
            isActive: true,
        });
    };

    const togglePromotionStatus = (id: number) => {
        setPromotions(
            promotions.map((promo) =>
                promo.id === id ? { ...promo, isActive: !promo.isActive } : promo
            )
        );
    };

    return (
        <section id="admin-promotions" className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-6 space-y-6">
                <h1 className="text-2xl font-bold text-center sm:text-left">Manage Promotions</h1>

                <form className="space-y-4 bg-white p-4 rounded-lg shadow-md max-w-xl mx-auto sm:mx-0" onSubmit={handleAddPromotion}>
                    <h2 className="text-xl font-semibold">Add New Promotion</h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium">Promotion Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full border rounded-md p-2" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Description</label>
                            <textarea name="description" value={formData.description} onChange={handleInputChange} className="w-full border rounded-md p-2" rows={2} required></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Discount Percentage (%)</label>
                            <input type="number" name="discountPercentage" value={formData.discountPercentage} onChange={handleInputChange} className="w-full border rounded-md p-2" min={0} max={100} required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Discount Amount</label>
                            <input type="number" name="discountAmount" value={formData.discountAmount} onChange={handleInputChange} className="w-full border rounded-md p-2" min={0} required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Minimum Price</label>
                            <input type="number" name="minimumPrice" value={formData.minimumPrice} onChange={handleInputChange} className="w-full border rounded-md p-2" min={0} required/>
                        </div>
                    </div>
                    <button type="submit" className="w-full py-2 px-4 text-white bg-gray-600 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition">
                        Add Promotion
                    </button>
                </form>

                <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
                    <h2 className="text-xl font-semibold mb-4">Promotions List</h2>
                    <table className="w-full table-auto border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-sm">
                                <th className="border p-2">Name</th>
                                <th className="border p-2">Description</th>
                                <th className="border p-2">Discount (%)</th>
                                <th className="border p-2">Discount Amount</th>
                                <th className="border p-2">Minimum Price</th>
                                <th className="border p-2">Active</th>
                            </tr>
                        </thead>
                        <tbody>
                            {promotions.map((promo) => (
                                <tr key={promo.id} className="text-center text-sm">
                                    <td className="border p-2">{promo.name}</td>
                                    <td className="border p-2">{promo.description}</td>
                                    <td className="border p-2">{promo.discountPercentage}</td>
                                    <td className="border p-2">{promo.discountAmount}</td>
                                    <td className="border p-2">{promo.minimumPrice}</td>
                                    <td className="border p-2">
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={promo.isActive}
                                                onChange={() => togglePromotionStatus(promo.id)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 transition-all"></div>
                                            <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full peer-checked:translate-x-5 transition-transform"></div>
                                        </label>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
