"use client";

import { CreditCard, X } from "lucide-react";
import React, { Suspense, useState } from "react";
import SkeletonLoading from "./SkeletonLoading";
import Image from "next/image";
import Form from "@/app/component/Form";

type prop = {
  amount: number;
};

export default function Payment({ amount }: prop) {
  const [image, setImage] = useState<File | null>(null);
  const [showInput, setShowInput] = useState<boolean>(true);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

  };

  const handleFileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setImage(file);
      setShowInput(false); // Hide input after upload
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
      <Suspense fallback={<SkeletonLoading />}>
        <img src={`https://promptpay.io/0991523224/${amount}.png`} />
      </Suspense>
      {/*  */}
      <div className="">
        <Form onSubmit={onSubmit}>
          <div className="grid grid-cols-1  gap-4">
            {showInput && (
              <div className="flex items-start justify-start w-full">
                <label
                  htmlFor="image-logo"
                  className="flex flex-col items-center justify-center h-[400px] w-[400px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="flex flex-col h-[400px] w-[400px] items-center justify-center pt-5 pb-6">
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
        </Form>
      </div>
      {/*  */}
      <div className="flex justify-end space-x-2 w-full">
        <button
          type="button"
          className="flex py-2 px-4 rounded-lg border border-gray-400"
        >
          ยกเลิก
        </button>
        <button className="flex py-2 px-4 rounded-lg bg-green-main text-white">
          ยืนยัน
        </button>
      </div>
    </div>
  );
}