"use client";
import Form from "@/app/component/Form";
import Input from "@/app/component/Input";
import Modal from "@/app/component/modal";
import SubmitButtton from "@/app/component/SubmitButtton";
import { createTransport } from "@/app/service/admin/transport/service";
import { transportSchema, validateWithZod } from "@/lib/zod/Schema";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface prop {
  open: boolean;
  onClose: () => void;
}


export default function CreateTransportModal({ open, onClose }: prop) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{
    [key: string]: { message: string };
  } | null>(null);
  const [formdata, setFormData] = useState({
    providerName: "",
    transportPrice: "",
  });
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      validateWithZod(transportSchema, formdata);
      await createTransport(formdata);
      router.refresh();
    } catch (error: any) {
      if (error.fieldErrors) {
        setError(error.fieldErrors); // ตั้งค่าข้อผิดพลาดโดยตรง
      }
    } finally {
      setLoading(false);
    }
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((pre) => ({ ...pre, [name]: value }));
  };
  return (
    <>
      <Modal open={open} onClose={onClose}>
        <div className="w-96 gap-2">
          <div className="text-2xl font-semibold mb-2">เพิ่มบริษัทขนส่ง</div>
          <Form onSubmit={onSubmit} className="space-y-2">
            <Input
              labelClassName="text-lg font-medium"
              label="ชื่อบริษัทขนส่ง"
              name="providerName"
              onChange={handleOnChange}
              value={formdata.providerName}
              placeholder=""
              type=""
              error={error?.providerName}
            />
            <Input
              labelClassName="text-lg font-medium"
              label="ราคาของบริษัทขนส่ง"
              name="transportPrice"
              onChange={handleOnChange}
              value={formdata.transportPrice}
              placeholder=""
              type=""
              error={error?.transportPrice}
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="rounded-xl bg-gray-500 py-2 px-6 font-bold text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={onClose}
              >
                ยกเลิก
              </button>
              <SubmitButtton
                disabled={loading}
                label="ยืนยัน"
                labelUploading="กำลังสร้าง"
              />
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
}
