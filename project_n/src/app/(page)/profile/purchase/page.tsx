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
import ReturnRefund from "./components/returnRefund";

export default function MyPurchase() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("ALL");
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
    { id: "RETURN_REFUND", label: "Return/Refund" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "ALL":
        return <All />;
      case "TO_PAY":
        return <ToPay />;
      case "TO_RECEIVE":
        return <ToReceive />;
      case "COMPLETE":
        return <Complete />;
      case "CANCELLED":
        return <Cancelled />;
      case "RETURN_REFUND":
        return <ReturnRefund />;
      default:
        return <p>Unknown tab selected.</p>;
    }
  };

  const fetchUserData = async () => {
    const res = await getUserById(Number(session?.user.id));
    setUserData(res);
  };

  useEffect(() => {
    fetchUserData();
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
