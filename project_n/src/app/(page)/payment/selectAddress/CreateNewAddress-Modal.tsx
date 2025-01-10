"use client";
import Form from "@/app/component/Form";
import Input from "@/app/component/Input";
import Modal from "@/app/component/modal";
import SubmitButtton from "@/app/component/SubmitButtton";
import { userInterface } from "@/app/interface/userInterface";
import { createAddress } from "@/app/service/address/service";
import { validateWithZod } from "@/lib/zod/Schema";
import { revalidatePath } from "next/cache";
import { useState } from "react";
import { z } from "zod";

type Modalprop = {
  user: userInterface;
  open: boolean;
  onClose: () => void;
};

const userAddressSchema = z.object({
  fullName: z
    .string()
    .max(30, "ชื่อ-นามสกุลมีความยาวมากเกินไป")
    .min(1, "โปรดกรอกชื่อ-นามสกุล"),
  houseNo: z.string().regex(/^\d+$/, "เลขที่บ้านควรเป็นตัวเลข"), //บ้านเลขที่
  moo: z.string().regex(/^\d*$/, "เลขที่หมู่บ้านควรเป็นตัวเลข").optional(), //หมู่
  subDistrict: z.string().optional(), //ตำบล
  district: z
    .string()
    .max(30, "ชื่ออำเภอมีความยาวมากเกินไป")
    .min(1, "โปรดกรอกอำเภอ"), //อำเภอ
  province: z
    .string()
    .max(30, "ชื่อจังหวัดมีความยาวมากเกินไป")
    .min(1, "โปรดกรอกจังหวัด"), //จังหวัด
  postalCode: z //รหัสไปรษณ์
    .string()
    .min(1, "โปรดกรอกรหัสไปรษณี")
    .regex(/^\d+$/, "รหัสไปรษณีควรเป็นตัวเลข")
    .regex(/^\d{5}$/, "รหัสไปรษณีควรมีแค่ 5 หลัก"),
  mobile: z //เบอร์
    .string()
    .regex(/^\d+$/, "เลขที่หมู่บ้านควรเป็นตัวเลข")
    .refine((val) => val.toString().length === 10, {
      message: "เบอร์โทรศัพท์ควรเป็นตัวเลข 10 หลัก",
    }),
  userId: z.number().int(),
});

export default function CreateNewAddressModal({
  open,
  onClose,
  user,
}: Modalprop) {
  const [formData, setFormData] = useState({
    fullName: "",
    houseNo: "",
    moo: "",
    province: "",
    district: "",
    subDistrict: "",
    postalCode: "",
    mobile: "",
    userId: user.id,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{
    [key: string]: { message: string };
  } | null>(null);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((pre) => ({ ...pre, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      //validate
      validateWithZod(userAddressSchema, formData);

      //send to server
      await createAddress(formData);
      setError(null);
      revalidatePath("/payment");
    } catch (error: any) {
      if (error.fieldErrors) {
        setError(error.fieldErrors); // ตั้งค่าข้อผิดพลาดโดยตรง
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col w-64 sm:w-96 space-y-2 ">
        <div className="flex font-bold text-3xl mb-2">
          <p>สร้างที่อยู่ใหม่</p>
        </div>
        <Form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              inputClassName="w-full"
              labelClassName="font-semibold text-base mb-1"
              required={true}
              name="fullName"
              value={formData.fullName}
              onChange={handleOnChange}
              label="ชื่อ - นามสกุล"
              placeholder="ชื่อ..."
              type=""
              error={error?.fullName}
            />
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <Input
                  inputClassName="w-full"
                  labelClassName="font-semibold text-base mb-1"
                  required={true}
                  name="houseNo"
                  value={formData.houseNo}
                  onChange={handleOnChange}
                  label="เลขที่บ้าน"
                  placeholder="เลขที่บ้าน..."
                  type=""
                  error={error?.houseNo}
                />
              </div>
              <div>
                <Input
                  inputClassName="w-full"
                  labelClassName="font-semibold text-base mb-1"
                  name="moo"
                  value={formData.moo}
                  onChange={handleOnChange}
                  label="หมู่"
                  placeholder="หมู่..."
                  type=""
                  error={error?.moo}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="">
                <Input
                  inputClassName="w-full"
                  labelClassName="font-semibold text-base mb-1"
                  name="subDistrict"
                  value={formData.subDistrict}
                  onChange={handleOnChange}
                  label="ตำบล"
                  placeholder="ตำบล..."
                  type=""
                  error={error?.subDistrict}
                />
              </div>
              <div className="col-span-2">
                <Input
                  inputClassName="w-full"
                  labelClassName="font-semibold text-base mb-1"
                  required={true}
                  name="district"
                  value={formData.district}
                  onChange={handleOnChange}
                  label="อำเภอ"
                  placeholder="อำเภอ..."
                  type=""
                  error={error?.district}
                />
              </div>
            </div>
            <div className="grid grid-cols-5 gap-2">
              <div className=" col-span-3">
                <Input
                  inputClassName="w-full"
                  labelClassName="font-semibold text-base mb-1"
                  required={true}
                  name="province"
                  value={formData.province}
                  onChange={handleOnChange}
                  label="จังหวัด"
                  placeholder="จังหวัด..."
                  type=""
                  error={error?.province}
                />
              </div>
              <div className=" col-span-2">
                <Input
                  inputClassName="w-full"
                  labelClassName="font-semibold text-base mb-1"
                  required={true}
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleOnChange}
                  label="รหัสไปรษณีย์"
                  placeholder="รหัสไปรษณีย์..."
                  type=""
                  error={error?.postalCode}
                />
              </div>
            </div>
            <Input
              inputClassName="w-full"
              labelClassName="font-semibold text-base mb-1"
              required={true}
              name="mobile"
              value={formData.mobile}
              onChange={handleOnChange}
              label="เบอร์มือถือ"
              placeholder="เบอร์มือถือ..."
              type=""
              error={error?.mobile}
            />
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-xl font-semibold"
              type="button"
            >
              ยกเลิก
            </button>
            <SubmitButtton
              label="ยืนยัน"
              labelUploading="กำลังสร้าง"
              disabled={loading}
            />
          </div>
        </Form>
      </div>
    </Modal>
  );
}
