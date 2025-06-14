"use client";

import { CreditCard, X } from "lucide-react";
import React, { Suspense, useState } from "react";
import SkeletonLoading from "./SkeletonLoading";
import Image from "next/image";
import Form from "@/app/component/Form";
import {
  deleteUploadedImage,
  genarateImageName,
  uploadImageToFirebase,
} from "@/lib/firebase/firebase";
import { CancelOrder, CreatePayment, UpdatePaymentStatusWhenChecked, verifySlip } from "@/app/service/(payment)/service";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

type prop = {
  userId:number
  orderDetailId: number
  amount: number;
};

export default function Payment({ orderDetailId,amount,userId }: prop) {
  const {toast} = useToast()
  const router = useRouter()
  const [image, setImage] = useState<File | null>(null);
  const [showInput, setShowInput] = useState<boolean>(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let url = "";
    try {
      setLoading(true);
      setError(null);
      console.log("start");

      if (image === null) {
        setError("โปรดใส่รูป");
        return;
      }
      //upload image to firebase
      const imagename = genarateImageName();
      const upload = await uploadImageToFirebase(image, imagename, "slip");
      url = upload.downloadURL;
      const data = {
        orderId: orderDetailId,
        amount: amount,
        moneySlip:url,
      };

      //create payment
      const createPayment = await CreatePayment(data);

      //verify payment
      const formData = new FormData();
      formData.append('file', image); 
      const result = await verifySlip(formData);
      console.log(result);
      if(result.data.data.receiver.account.name.th !== "นายภูมิตะวัน พ"){
        toast({
          description: "โปรดใส่สลิปให้ถูกต้อง",
        });
        throw new Error("โปรดใส่สลิปให้ถูกต้อง")
      }
      if(result.data.data.amount.amount !== amount){
        toast({
          description: "โปรดใส่สลิปให้ถูกต้อง",
        });
        throw new Error("โปรดใส่สลิปให้ถูกต้อง")
      }
      

      //check payment
      const dataupdate ={
        paymentId:createPayment.payment.id,
        orderDetailId:orderDetailId,
        userId:userId

      }
      console.log(dataupdate)
      if (!dataupdate.paymentId || !dataupdate.orderDetailId || !dataupdate.userId) {
        throw new Error("ข้อมูล payment ไม่ครบถ้วน");
    }
      await UpdatePaymentStatusWhenChecked(dataupdate)
      toast({
        variant:"success",
        description: "ทำรายการเสร็จสิ้น",
      });
      setTimeout(()=>{
        router.push(`/profile/purchase`)
      },4000)
    } catch (error:any) {
      console.log(error.message)
      toast({
        description: error.message,
      });
      await deleteUploadedImage("slip", url);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    await CancelOrder(orderDetailId)
    router.push(`/cart`)
  }

  const handleFileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setImage(file);
      setShowInput(false); // Hide input after upload
      setError(null)
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setShowInput(true); // Show input after removal
  };
  return (
    <div className="flex flex-col w-full space-y-2 p-4 border border-gray-300 rounded-xl">
      <div className="flex font-bold text-xl">
        <CreditCard className="mr-2" />
        <p>ชำระเงิน</p>
      </div>
      {/* side bar */}
        <img src={`https://promptpay.io/0991523224/${amount}.png`} />
      {/*  */}
      <div className="">
        <Form onSubmit={onSubmit} className="space-y-2">
          <div className="grid grid-cols-1  gap-4">
            {showInput && (
              <div className="flex items-start justify-start w-full">
                <label
                  htmlFor="image-logo"
                  className="flex flex-col items-center justify-center h-full w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="flex flex-col h-full w-full items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      SVG, PNG, JPG or GIF (MAX. 120x120px)
                    </p>
                  </div>
                  <input
                    accept="image/*"
                    name="image-logo"
                    id="image-logo"
                    type="file"
                    className="hidden"
                    onChange={handleFileImageChange}
                  />
                </label>
              </div>
            )}
            {image && (
              <div className="flex items-start justify-start">
                <div className="flex relative">
                  <Image
                    src={URL.createObjectURL(image)}
                    width={400}
                    height={400}
                    alt="Logo preview"
                    className="rounded-lg object-fill"
                  />
                  <button
                    onClick={handleRemoveImage}
                    className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="mt-1 mb-1 text-lg text-red-500">
              <p>{error}</p>
            </div>
          )}
          <div className="flex justify-end space-x-2 w-full">
            <button
              type="button"
              className="flex py-2 px-4 rounded-lg border border-gray-400"
              onClick={handleCancelOrder}
            >
              ยกเลิก
            </button>
            <button
              disabled={loading}
              className="flex py-2 px-4 rounded-lg bg-primary text-white disabled:bg-primary/20"
            >
              {loading ? "กำลังชำระ" : "ยืนยัน"}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
