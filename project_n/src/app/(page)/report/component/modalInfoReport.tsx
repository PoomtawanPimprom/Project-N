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
                {new Date(reportData?.createdAt!).toLocaleString()}
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
              <p className="text-base"> {reportData?.reportCategory?.name}</p>
            </p>
          </div>
          <div>
            <p className="flex items-center gap-2 justify-between">
              <p className="font-bold text-base">สถานะของคำร้องเรียน :</p>
              <p className="text-base"> {reportData?.reportStatus?.name}</p>
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
