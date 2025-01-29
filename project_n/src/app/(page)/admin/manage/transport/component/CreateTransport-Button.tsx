"use client";

import { useState } from "react";
import CreateTransportModal from "./CreateTransport-Modal";
import { Plus } from "lucide-react";

export default function CreateTransportButton() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <button 
      onClick={()=> setOpenModal(true)}
      className="flex items-center h-fit  bg-primary text-white px-4 py-2 rounded-lg">
        <Plus className="mr-2" />
        เพิ่มบริษัทขนส่ง
      </button>
      <CreateTransportModal
        onClose={() => setOpenModal(false)}
        open={openModal}
      />
    </>
  );
}
