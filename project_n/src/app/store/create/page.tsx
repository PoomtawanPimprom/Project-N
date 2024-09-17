import React from "react";

const CreateStorePage = () => {
  return (
    <div className="flex flex-col w-full h-lvh p-2 justify-center items-center">
      <div className="flex flex-col h-full w-full bg-slate-300 p-4">
        <div className="text-5xl font-bold mb-4">Create your store</div>
        <div>
            <div className="mb-3">
                <p className="text-xl font-bold mb-1">ชื่อร้านค้าของคุณ</p>
                <input type="text" className="p-3 rounded-xl border border-black" />
            </div>
            <div>
                <p className="text-xl font-bold mb-1">รูปพื้นหลังร้านค้าของคุณ</p>
                <input type="file" className="p-3 rounded-xl border border-black" />
            </div>
            <div>
                <p className="text-xl font-bold mb-1">รูปพื้นหลังร้านค้าของคุณ</p>
                <input type="file" className="p-3 rounded-xl border border-black" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default CreateStorePage;
