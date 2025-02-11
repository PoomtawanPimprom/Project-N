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
    <Modal  open={open} onClose={OnClose}>
      <div className="w-96 space-y-3 ">
        <div className="text-black dark:text-white font-bold text-3xl mt-2 ">
          <p className="mb-2">รายละเอียดการายงาน</p>
        </div>
        <div className=" space-y-2  text-black dark:text-white ">
          <div className="">
            <p className="flex items-center gap-2 justify-between">
              <span className="font-semibold text-base">ส่งคำร้องเรียนเมื่อ : </span>
              <span className="text-base ">
                {new Date(reportData?.createdAt!).toLocaleString()}
              </span>
            </p>
          </div>
          <div>
            <p className="flex items-center gap-2 justify-between">
              <span className="font-semibold text-base">ชื่อสินค้า : </span>
              <span className="text-base ">{reportData?.product?.name}</span>
            </p>
          </div>
          <div>
            <p className="flex items-center gap-2 justify-between">
              <span className="font-semibold text-base">ข้อความที่ร้องเรียน : </span>
              <span className="text-base">{reportData?.comment}</span>
            </p>
          </div>
          <div>
            <p className="flex items-center gap-2 justify-between">
              <span className="font-semibold text-base">ประเภทของคำร้องเรียน :</span>
              <span className="text-base"> {reportData?.reportCategory?.name}</span>
            </p>
          </div>
          <div>
            <p className="flex items-center gap-2 justify-between">
              <span className="font-semibold text-base">สถานะของคำร้องเรียน :</span>
              <span className="text-base"> {reportData?.reportStatus?.name}</span>
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
