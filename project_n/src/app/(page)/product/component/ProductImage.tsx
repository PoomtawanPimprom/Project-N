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
    <div className="flex flex-col w-full gap-4">
    {/* Main Image Container */}
    <div className="relative w-full aspect-square max-w-xl mx-auto">
      {/* Navigation Buttons */}
      <div className="absolute inset-0 flex items-center justify-between px-2 sm:px-4 z-10">
        <button
          onClick={prevImage}
          className="p-1 sm:p-2 rounded-full bg-white/80 hover:bg-white/90 shadow-lg transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 dark:text-black" />
        </button>
        <button
          onClick={nextImage}
          className="p-1 sm:p-2 rounded-full bg-white/80 hover:bg-white/90 shadow-lg transition-colors"
          aria-label="Next image"
        >
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 dark:text-black" />
        </button>
      </div>

      {/* Main Image */}
      <div className="relative w-full h-full">
        <Image
          src={imageArray[currentImage]}
          alt={`${product.name} - Image ${currentImage + 1}`}
          fill
          className="rounded-lg object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 450px, 500px"
          priority
        />
      </div>
    </div>

    {/* Thumbnail Navigation */}
    <div className="flex gap-2 overflow-x-auto px-2 pb-2 scrollbar-hide">
      <div className="flex gap-2 mx-auto item-start">
        {imageArray.map((img, index) => (
          <button
            key={img}
            onClick={() => setCurrentImage(index)}
            className={`relative flex w-16 h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden transition-all
              ${
                currentImage === index
                  ? "ring-2 ring-blue-500"
                  : "ring-1 ring-gray-200 hover:ring-blue-200"
              }`}
            aria-label={`View image ${index + 1}`}
          >
            <Image
              src={img}
              alt={`${product.name} thumbnail ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 64px, 80px"
            />
          </button>
        ))}
      </div>
    </div>
  </div>
  );
}
