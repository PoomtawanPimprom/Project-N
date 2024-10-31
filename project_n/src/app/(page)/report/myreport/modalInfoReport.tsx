"use client";
import Modal from "@/app/component/modal";
import React from "react";

interface prop {
  message: string;
  open: boolean;
  OnClose: () => void;
}

const ModalInfoReport = ({ message, open, OnClose }: prop) => {
  return (
    <Modal open={open} onClose={OnClose}>
      <div className="w-96">
        <div className="mt-2 text-black text-2xl">
          <p>ข้อความที่รายงาน</p>
        </div>
        <div className="mt-2 border border-gray-300 p-4 rounded-xl text-black">{message}</div>
        <div className="flex justify-end mt-2">
          <button 
          onClick={OnClose}
          className="px-4 py-2 bg-gray-500 rounded-lg text-white hover:bg-gray-700">ปิด</button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalInfoReport;
