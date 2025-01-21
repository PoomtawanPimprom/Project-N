"use client";
import { AiOutlineSearch } from "react-icons/ai";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { promotionInterface } from "@/app/interface/promotionInterface";
import { createPromotion, getPromotionAll, updatePromotionById } from "@/app/service/promotion/service";
import { useToast } from "@/hooks/use-toast";


export default function AdminPromotions() {
    const { toast } = useToast();
    const [search, setSearch] = useState<string>("");
    const [promotions, setPromotions] = useState<promotionInterface[]>([]);
    const [formData, setFormData] = useState<promotionInterface>({
        id: 0,
        name: "",
        description: "",
        discountPercentage: 0,
        discountAmount: 0,
        minimumPrice: 0,
        isActive: false,
    });

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value.toLowerCase());
    };

    const filteredPromotions = promotions.filter((promo) =>
        promo.name.toLowerCase().includes(search.toLowerCase()) ||
        promo.description.toLowerCase().includes(search.toLowerCase())
    );


    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };


    const onSubmitAddPromotion = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const submissionData = {
            ...formData,
            discountPercentage: parseFloat(formData.discountPercentage.toString()),
            discountAmount: parseInt(formData.discountAmount.toString()),
            minimumPrice: parseInt(formData.minimumPrice.toString()),
        };
        console.log(submissionData)
        await createPromotion(submissionData);
    };

    const togglePromotionStatus = async (id: number) => {
        try {
            const updatedPromotions = promotions.map((promo) =>
                promo.id === id ? { ...promo, isActive: !promo.isActive } : promo
            );
            // Set ui status
            setPromotions(updatedPromotions);
            // find id promotion
            const updatedPromo = updatedPromotions.find((promo) => promo.id === id);
            console.log(updatedPromo?.isActive)
            await updatePromotionById(id, { isActive: updatedPromo?.isActive });
            if (updatedPromo?.isActive === true) {
                toast({
                    title: "ใช้งานโปรโมชั่นนี้",
                    variant: "default",
                });
            } else {
                toast({
                    title: "ยกเลิกโปรโมชั่นนี้",
                    variant: "default",
                });
            }
        } catch (error) {
            console.error("Failed to update promotion:", error);
            // Set before value
            setPromotions(promotions);
            toast({
                title: "ใช้งานโปรโมชั่นนี้",
                variant: "destructive",
            });
        }
    };

    const fetchUserData = async () => {
        const res = await getPromotionAll();
        setPromotions(res);
        console.log(res);
    }

    useEffect(() => {
        fetchUserData();
    }, [])

    return (
        <section id="admin-promotions" className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-6 space-y-6">
                <h1 className="text-2xl font-bold text-center sm:text-left">Manage Promotions</h1>

                <form className="space-y-4 bg-white p-4 rounded-lg shadow-md max-w-xl mx-auto sm:mx-0" onSubmit={onSubmitAddPromotion}>
                    <h2 className="text-xl font-semibold">Add New Promotion</h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium">Promotion Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full border rounded-md p-2" required />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium">Description</label>
                            <textarea name="description" value={formData.description} onChange={handleInputChange} className="w-full border rounded-md p-2" rows={2} required></textarea>
                        </div>
                        <div>
                            <label htmlFor="discountPercentage" className="block text-sm font-medium">Discount Percentage (%)</label>
                            <input type="number" name="discountPercentage" value={formData.discountPercentage} onChange={handleInputChange} className="w-full border rounded-md p-2" min={0} required />
                        </div>
                        <div>
                            <label htmlFor="discountAmount" className="block text-sm font-medium">Discount Amount</label>
                            <input type="number" name="discountAmount" value={formData.discountAmount} onChange={handleInputChange} className="w-full border rounded-md p-2" min={0} required />
                        </div>
                        <div>
                            <label htmlFor="minimumPrice" className="block text-sm font-medium">Minimum Price</label>
                            <input type="number" name="minimumPrice" value={formData.minimumPrice} onChange={handleInputChange} className="w-full border rounded-md p-2" min={0} required />
                        </div>
                    </div>
                    <button type="submit" className="w-full py-2 px-4 text-white bg-gray-600 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition">
                        Add Promotion
                    </button>
                </form>

                <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
                    <h2 className="text-xl font-semibold mb-4">Promotions List</h2>

                    <div className="mb-4 flex items-center space-x-2">
                        <div className="relative w-full max-w-md">
                            <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search name promotions..."
                                value={search}
                                onChange={handleSearchChange}
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                            />
                        </div>
                    </div>

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
                            {filteredPromotions.map((promo) => (
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
