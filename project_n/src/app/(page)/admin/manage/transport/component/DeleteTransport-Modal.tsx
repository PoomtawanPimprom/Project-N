"use client";

import Modal from "@/app/component/modal";
import { deleteTransportByTransportId } from "@/app/service/admin/transport/service";
import { useRouter } from "next/navigation";
interface prop {
  open: boolean;
  onClose: () => void;
  id: number;
}

export default function DeleteTransportModal({ open, onClose, id }: prop) {
  const router = useRouter()
  const DeleteTransport = async () => {
    await deleteTransportByTransportId(id);
    router.refresh()
  };
  return (
    <>
      <Modal open={open} onClose={onClose}>
        <div className="w-96 gap-2 p-4">
          <div className="flex text-2xl font-semibold mb-2">
            คุณต้องการลบบริษัทนี้ออกหรือไม่
          </div>
          <div className="flex justify-center  gap-2">
            
            <button 
            onClick={onClose}
            className="rounded-xl bg-gray-500 py-4 text-lg px-6 font-bold text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
              ยกเลิก
            </button>
            <button
            onClick={DeleteTransport}
            className="rounded-xl bg-red-600 py-4 text-lg px-6 font-bold text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
              ยืนยัน
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
