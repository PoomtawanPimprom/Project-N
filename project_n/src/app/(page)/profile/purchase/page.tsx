"use client";
import React, { useEffect, useState } from "react";
import MenuLeft from "../menuleft";
import { useSession } from "next-auth/react";
import { getUserById } from "@/app/service/profile/service";
import { userInterface } from "@/app/interface/userInterface";
import All from "./components/all";
import ToPay from "./components/toPay";
import ToReceive from "./components/toReceive";
import Complete from "./components/complete";
import Cancelled from "./components/cancelled";
import { orderItemInterface } from "@/app/interface/orderItemInterface";
import { GetAllOrderItemsToPay } from "@/app/service/orderItem/service";

export default function MyPurchase() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("ALL");
  const [OrderItemsToPay, setOrderItemsToPay] = useState<orderItemInterface[]>(
    []
  );
  const [userData, setUserData] = useState<userInterface>({
    id: 0,
    name: "",
    username: "",
    password: "",
    email: "",
    mobile: "",
    birthdate: new Date(),
    profile: "",
    saler: false,
    genderId: 0,
    roleId: 0,
    userStatusId: 0,
    resetToken: "",
    resetTokenExp: new Date(),
  });

  const tabs = [
    { id: "ALL", label: "All" },
    { id: "TO_PAY", label: "To Pay" },
    { id: "TO_RECEIVE", label: "To Receive" },
    { id: "COMPLETE", label: "Complete" },
    { id: "CANCELLED", label: "Cancelled" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "ALL":
        return <All />;
      case "TO_PAY":
        return <ToPay OrderItemsToPay={OrderItemsToPay} />;
      case "TO_RECEIVE":
        return <ToReceive />;
      case "COMPLETE":
        return <Complete />;
      case "CANCELLED":
        return <Cancelled />;
      default:
        return <p>Unknown tab selected.</p>;
    }
  };

  const fecthdata2 = async () => {
    const data = await GetAllOrderItemsToPay(Number(session?.user.id));
    setOrderItemsToPay(data);
    console.log(data);
  };

  const fetchUserData = async () => {
    const res = await getUserById(Number(session?.user.id));
    setUserData(res);
  };

  useEffect(() => {
    fetchUserData();
    fecthdata2();
  }, [session]);

  return (
    <section id="profile">
      <div className="container mx-auto flex flex-col lg:flex-row py-6 gap-4 px-4 sm:px-6 lg:px-8">
        <MenuLeft
          checkCreatedStore={session?.user.storeId}
          profile={userData}
        />

        <div className="flex flex-col lg:w-3/4 gap-4 bg-white border rounded-lg shadow-md p-4 sm:p-6 sm:shadow-none sm:border-black">
          <div className="flex border-b">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const isToPayTab = tab.id === "TO_PAY";
              const hasOrdersToPay = OrderItemsToPay.length > 0;

              return (
                <button
                  key={tab.id}
                  className={`py-2 px-4 text-sm font-medium 
          ${
            isActive
              ? "border-b-2 border-gray-500 text-gray-500"
              : "text-gray-500"
          } 
          ${isToPayTab && hasOrdersToPay ? "text-red-500" : ""}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="mt-4">{renderContent()}</div>
        </div>
      </div>
    </section>
  );
}
