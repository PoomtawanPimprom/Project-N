"use client";

import Modal from "@/app/component/modal";

type Modalprop = {
  open: boolean;
  onClose: () => void;
};

export default function ChangeShipperModal({ open, onClose }: Modalprop) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col w-64 sm:w-96 space-y-2 ">
        <div className="flex text-xl font-semibold">
          เลือกผู้ให้บริการการจัดส่ง
        </div>
        <div className="flex w-full flex-col">
          <div className="flex flex-col w-full space-y-1">
            <div className="flex  w-full border p-3 space-x-3 rounded-lg">
              <div className="flex  mx-2">
                <input type="radio" name="address" />
              </div>
              <div className="flex  w-full flex-col space-y-1">
                <div className="flex font-bold">item</div>
                <div className="flex text-sm">item</div>
                <div className="flex text-sm">item.mobile</div>
              </div>
              <div className="flex text-green-main">
                <button type="button">แก้ไข</button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-end space-x-2 font-semibold">
          <button
            onClick={onClose}
            type="button"
            className="flex py-2 px-4 rounded-lg border  border-gray-400"
          >
            ยกเลิก
          </button>
          <button
            onClick={onClose}
            className="flex py-2 px-4 rounded-lg bg-green-main text-white"
          >
            ยืนยัน
          </button>
        </div>
      </div>
    </Modal>
  );
}
