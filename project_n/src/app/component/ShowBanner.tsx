"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

type prop = {
  // banners: string[]
  banners: {
    id: number;
    title: string;
    description: string;
    color: string;
  }[];
};

export default function ShowBanner({ banners }: prop) {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };
  return (
    <div className="max-w-7xl mx-auto sm:mt-2  ">
      <div className="relative overflow-hidden sm:rounded-lg">
        <div className="relative h-96">
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`absolute w-full h-full transition-opacity duration-500 ${
                index === currentBanner ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className={`w-full h-full ${banner.color} relative`}>
                
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
                  <h2 className="text-4xl font-bold mb-4">{banner.title}</h2>
                  <p className="text-xl">{banner.description}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Buttons */}
          <button
            onClick={prevBanner}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextBanner}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Banner Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBanner(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentBanner ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
