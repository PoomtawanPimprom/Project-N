"use client";

import Modal from "@/app/component/modal";
import { transportInterface } from "@/app/interface/transportInterface";
import { GetAllTransport } from "@/app/service/transport/service";
import { useEffect, useState } from "react";
import { UpdateTransprotAction } from "./action";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Modalprop = {
  orderDetailId: number
  open: boolean;
  onClose: () => void;
};

export default function ChangeShipperModal({ open, onClose,orderDetailId }: Modalprop) {
  const router = useRouter();
  const { data: session } = useSession();
  if (!session) {
    router.push("/login");
    return;
  }
  const UpdateTransprotActionBindOrderDetailId = UpdateTransprotAction.bind(null, {
    orderDetailId: orderDetailId.toString()
  });
  const [transports, setTransports] = useState<transportInterface[]>([]);

  const fetchdata = async () => {
    const data = await GetAllTransport();
    setTransports(data);
  };
  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col w-64 sm:w-96 space-y-2 ">
        <div className="flex text-xl font-semibold">
          เลือกผู้ให้บริการการจัดส่ง
        </div>
        <form action={UpdateTransprotActionBindOrderDetailId} className="space-y-2">
          <div className="flex w-full flex-col">
            <div className="flex flex-col w-full space-y-1">
              {transports.map((transport, index) => (
                <div
                  key={index}
                  className="flex  w-full border p-3 space-x-3 rounded-lg"
                >
                  <div className="flex  mx-2">
                    <input type="radio" name="transportId" value={transport.id}/>
                  </div>
                  <div className="flex  w-full flex-col space-y-1">
                    <div className="flex font-bold">
                      {transport.providerName}
                    </div>
                    <div className="flex text-sm">
                      {transport.transportPrice} บาท
                    </div>
                  </div>
                </div>
              ))}
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
              className="flex py-2 px-4 rounded-lg bg-primary text-white"
            >
              ยืนยัน
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
