"use client";
import Modal from "@/app/component/modal";
import { reportInterface } from "@/app/interface/reportInterface";
import React from "react";

type prop = {
  reportData: reportInterface | null;
  open: boolean;
  OnClose: () => void;
};

const ModalInfoReport = ({ reportData, open, OnClose }: prop) => {
  const convertFormatDate = (dataString: string) => {
    if (dataString === "") {
      return "Invalid Date";
    }
    const date = new Date(dataString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  };
  return (
    <Modal open={open} onClose={OnClose}>
      <div className="w-96 space-y-6">
        <div className="text-black text-3xl mt-2 ">
          <p className="mb-2">รายละเอียดการายงาน</p>
          <div className="flex w-full bg-gray-200 h-[1px]"></div>
        </div>
        <div className=" space-y-1  text-black">
          <div className="">
            <p className="flex items-center gap-2 justify-between">
              <p className="font-bold text-base">ส่งคำร้องเรียนเมื่อ : </p>
              <p className="text-base ">
                {convertFormatDate(reportData?.createdAt!)}
              </p>
            </p>
          </div>
          <div>
            <p className="flex items-center gap-2 justify-between">
              <p className="font-bold text-base">ชื่อสินค้า : </p>
              <p className="text-base ">{reportData?.product?.name}</p>
            </p>
          </div>
          <div>
            <p className="flex items-center gap-2 justify-between">
              <p className="font-bold text-base">ข้อความที่ร้องเรียน : </p>
              <p className="text-base">{reportData?.comment}</p>
            </p>
          </div>
          <div>
            <p className="flex items-center gap-2 justify-between">
              <p className="font-bold text-base">ประเภทของคำร้องเรียน :</p>
              <p className="text-base"> {reportData?.reportCategory.name}</p>
            </p>
          </div>
          <div>
            <p className="flex items-center gap-2 justify-between">
              <p className="font-bold text-base">สถานะของคำร้องเรียน :</p>
              <p className="text-base"> {reportData?.reportStatus.name}</p>
            </p>
          </div>
        </div>
        <div className="flex justify-end mt-2">
          <button
            onClick={OnClose}
            className="px-6 py-2 bg-red-500 hover:bg-red-700 rounded-lg text-white "
          >
            ปิด
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalInfoReport;
