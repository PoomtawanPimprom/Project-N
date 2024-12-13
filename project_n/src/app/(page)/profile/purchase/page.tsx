"use client";
import React, { useState } from "react";
import MenuLeft from "../menuleft";

export default function MyPurchase() {
    const [activeTab, setActiveTab] = useState("ALL");

    const tabs = [
        { id: "ALL", label: "All" },
        { id: "TO_PAY", label: "To Pay" },
        { id: "TO_SHIP", label: "To Ship" },
        { id: "TO_RECEIVE", label: "To Receive" },
        { id: "COMPLETE", label: "Complete" },
        { id: "CANCELLED", label: "Cancelled" },
        { id: "RETURN_REFUND", label: "Return/Refund" },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case "ALL":
                return <p>All orders </p>;
            case "TO_PAY":
                return <p>Orders waiting for payment </p>;
            case "TO_SHIP":
                return <p>Orders waiting to be shipped </p>;
            case "TO_RECEIVE":
                return <p>Orders waiting to be received </p>;
            case "COMPLETE":
                return <p>Completed orders </p>;
            case "CANCELLED":
                return <p>Cancelled orders </p>;
            case "RETURN_REFUND":
                return <p>Return/Refund orders </p>;
            default:
                return <p>Unknown tab selected.</p>;
        }
    };

    return (
        <section id="profile">
            <div className="container mx-auto flex flex-col lg:flex-row py-6 gap-4 px-4 sm:px-6 lg:px-8">
                <MenuLeft />

                <div className="flex flex-col lg:w-3/4 gap-4 bg-white border rounded-lg shadow-md p-4 sm:p-6 sm:shadow-none sm:border-black">
                    <div className="flex border-b">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                className={`py-2 px-4 text-sm font-medium ${
                                    activeTab === tab.id
                                        ? "border-b-2 border-gray-500 text-gray-500"
                                        : "text-gray-500"
                                }`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>


                    <div className="mt-4">{renderContent()}</div>
                </div>
            </div>
        </section>
    );
}
