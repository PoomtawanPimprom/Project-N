"use client";
import Form from "@/app/component/Form";
import Input from "@/app/component/Input";
import SubmitButtton from "@/app/component/SubmitButtton";

import { useUser } from "@/app/context/userContext";
import { productInterface } from "@/app/interface/productInterface";
import { createReview } from "@/app/service/review/service";
import {
  deleteUploadedImage,
  genarateImageName,
  uploadImageToFirebase,
} from "@/lib/firebase/firebase";
import { reviewSchema, validateWithZod } from "@/lib/zod/Schema";
import { ImagePlus, NotebookPen, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

type prop = {
  product: productInterface;
};

export default function CreateReview({ product }: prop) {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    router.push(`/login`);
    return;
  }
  const userId = Number(session.user?.id);

  const MAX_FILES = 5;
  const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"];
  const [formData, setFormData] = useState({
    comment: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{
    [key: string]: { message: string };
  } | null>(null);

  const [imageError, setImageError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((pre) => ({ ...pre, [name]: value }));
  };

  // Image handling
  const [images, setImages] = useState<File[]>([]);

  const validateFile = (file: File): boolean => {
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setImageError("รองรับเฉพาะไฟล์ JPEG, PNG และ WEBP เท่านั้น");
      return false;
    }

    return true;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageError(null);
    if (!e.target.files) return;

    const files = Array.from(e.target.files);

    // Check if adding new files would exceed the limit
    if (images.length + files.length > MAX_FILES) {
      setImageError(`สามารถอัพโหลดรูปได้สูงสุด ${MAX_FILES} รูปเท่านั้น`);
      return;
    }

    // Validate each file
    const validFiles = files.filter(validateFile);

    if (validFiles.length > 0) {
      setImages((prev) => [...prev, ...validFiles]);
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      const newImages = [...prev];
      newImages.splice(index, 1);
      return newImages;
    });
    setImageError(null);
  };

  //Submit Form
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let uploadedImages: { index: number; url: string; ref: any }[] = [];
    try {
      setLoading(true);
      setError(null);
      setImageError(null);

      //validate
      validateWithZod(reviewSchema, formData);

      //prepare image for upload to firebase
      const imageUrls: { [key: string]: string } = {};

      //upload image into firebase
      uploadedImages = await Promise.all(
        images.map(async (image, index) => {
          const reviewName = genarateImageName();
          const result = await uploadImageToFirebase(
            image,
            reviewName,
            "review"
          );
          return { index: index + 1, url: result.downloadURL, ref: result.Ref }; // เก็บ reference สำหรับลบ
        })
      );
      uploadedImages.forEach(({ index, url }) => {
        imageUrls[`image${index}`] = url;
      });

      //prepare final data for upload to server
      const finalData = {
        comment: formData.comment,
        images: imageUrls,
        userId: userId,
        productId: product.id,
      };

      // Send to API
      await createReview(finalData);

      // Reset form after successful submission
      setFormData({ comment: "" });
      setImages([]);
      router.refresh();
    } catch (error: any) {
      if (uploadedImages.length > 0) {
        await Promise.all(
          uploadedImages.map(async ({ ref, url }) => {
            try {
              await deleteUploadedImage("review", url); // Use the provided function to delete
            } catch (deleteError) {
              console.error("Error deleting uploaded image:", deleteError);
            }
          })
        );
      }
      if (error.fieldErrors) {
        setError(error.fieldErrors);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto border p-2 rounded-xl space-y-2 w-[600px]">
      <div className="flex p-2 text-2xl font-semibold">
        <NotebookPen className="mr-2" />
        <p>รีวิวสินค้า</p>
      </div>
      <div className="flex p-2 gap-2 items-center rounded-lg border">
        <img
          alt={product.name}
          src={product.image?.image1!}
          className="w-[100px] h-[100px] rounded-lg"
        />
        <div className="flex flex-col space-y-1 overflow-hidden">
            <p className="text-xl font-bold">ชื่อสินค้า : {product.name}</p>
            <p className="text-sm font-medium">จากร้าน : {product.store?.name}</p>
        </div>
      </div>
      <Form onSubmit={onSubmit} className="space-y-3">
        <Input
          name="comment"
          onChange={handleOnChange}
          inputClassName="w-full"
          type="textarea"
          value={formData.comment}
          placeholder="เขียนรีวิวของคุณที่นี่..."
          error={error?.comment}
        />

        {/* Image upload section */}
        <div className="space-y-2">
          <input
            ref={fileInputRef}
            type="file"
            accept={ALLOWED_FILE_TYPES.join(",")}
            multiple
            onChange={handleImageChange}
            className="hidden"
          />

          <button
            type="button"
            onClick={handleClickUpload}
            disabled={images.length >= MAX_FILES}
            className="flex items-center px-4 py-2 bg-gray-200 rounded-lg text-sm hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ImagePlus className="w-4 h-4 mr-2" />
            เพิ่มรูปภาพ ({images.length}/{MAX_FILES})
          </button>

          {imageError && <p className="text-red-500 text-sm">{imageError}</p>}
        </div>

        {/* Image previews */}
        {images.length > 0 && (
          <div className="grid grid-cols-5 gap-2">
            {images.map((file, index) => (
              <div key={index} className="relative group">
                <Image
                  priority
                  height={96}
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                  className="w-full  object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end">
          <SubmitButtton
            disabled={loading}
            label="ยืนยัน"
            labelUploading="กำลังสร้าง"
          />
        </div>
      </Form>
    </div>
  );
}
