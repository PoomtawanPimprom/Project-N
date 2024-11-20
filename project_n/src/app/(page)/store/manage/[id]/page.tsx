"use client";
import { useState, use } from "react";
import Sidebar from "./sidebar";

export default function ManagePage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const storeId = Number(params.id);
  const [select, setSelect] = useState("");

  const renderContent = () => {
    switch (select) {
      case "ข้อมูลร้านค้า":
        return <div>Content 1</div>;
      case "จัดการสินค้า":
        return <div>Content 2</div>;

      default:
        return <div>Default Content</div>;
    }
  };

  return (
    <div className="flex w-full h-full p-4">
      <div className="flex mx-auto w-[1400px] h-[675px] border rounded-xl ">
        <Sidebar value={select} onclick={setSelect} />
        
        <div className="flex flex-col w-full h-full">{renderContent()}</div>
      </div>
    </div>
  );
}
