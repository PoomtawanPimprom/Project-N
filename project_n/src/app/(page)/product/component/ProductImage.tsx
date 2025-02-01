"use client";
import { productInterface } from "@/app/interface/productInterface";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface prop {
  product: productInterface| any;
}

export default function ProductImage({ product }: prop) {
  const [currentImage, setCurrentImage] = useState(0);

  if (!product) return null;

  const imageArray = Object.values(product.image).filter(
    (img): img is string => typeof img === "string" && img.length > 0
  );

  if (imageArray.length === 0) return null;

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % imageArray.length);
  };

  const prevImage = () => {
    setCurrentImage(
      (prev) => (prev - 1 + imageArray.length) % imageArray.length
    );
  };

  return (
    <div className="flex flex-col w-full justify-start">
      <div className="flex  relative h-[450px] sm:w-[450px]  sm:h-[450px] xl:w-[500px] xl:h-[500px]">
        <div className="absolute inset-0 flex items-center justify-between px-4 z-10">
          <button
            onClick={prevImage}
            className="p-2 rounded-full bg-white/80 hover:bg-white/90 shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextImage}
            className="p-2 rounded-full bg-white/80 hover:bg-white/90 shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
        <Image
          src={imageArray[currentImage]}
          alt={`${product.name} - Image ${currentImage + 1}`}
          width={500}
          height={500}
          layout="fixed"
          className="rounded-lg"
          priority
        />
      </div>

      {/* Thumbnail Navigation */}
      <div className="flex gap-2 overflow-x-auto p-2">
        {imageArray.map((img, index) => (
          <button
            key={img}
            onClick={() => setCurrentImage(index)}
            className={`flex-shrink-0 relative w-20 h-20 rounded-md overflow-hidden 
              ${
                currentImage === index
                  ? "ring-2 ring-blue-500"
                  : "ring-1 ring-gray-200"
              }`}
          >
            <Image
              src={img}
              alt={`${product.name} thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
