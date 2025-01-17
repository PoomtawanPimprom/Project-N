"use client";
import { reivewInterface } from "@/app/interface/reviewInterface";
import { deleteReviewById } from "@/app/service/review/service";
import { deleteUploadedImage } from "@/lib/firebase/firebase";
import { Image, MessageSquare, MoreVertical, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type prop = {
  reviewByProductId: reivewInterface[];
  userId: number;
};

export default function ShowComment({ reviewByProductId, userId }: prop) {
  const router = useRouter();
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [filterType, setFilterType] = useState<
    "all" | "withImages" | "withoutImages"
  >("all");

  if (reviewByProductId.length === 0) {
    return <></>;
  }

  const handleOpenMenu = (reviewId: number) => {
    setOpenMenuId(openMenuId === reviewId ? null : reviewId);
  };

  const handleDeleteReview = async (review: reivewInterface) => {
    try {
      console.log(review)
      //check if the review have images
      if (review.images && Object.keys(review.images).length > 0) {
        console.log("start deleting images...");
        
        const imageUrls = getImageUrls(review.images);
        for (const imgUrl of imageUrls) {
          await deleteUploadedImage("review", imgUrl);
        }
      }
      
      await deleteReviewById(review.id);
      setOpenMenuId(null);
      router.refresh();
    } catch (error) {
      console.error("Failed to delete review:", error);
    }
  };

  const getImageUrls = (images: string[] | undefined): string[] => {
    if (!images) return [];
    return Object.values(images).filter(
      (url): url is string => typeof url === "string" && url.length > 0
    );
  };

  const filteredReviews = reviewByProductId.filter((review) => {
    const imageUrls = getImageUrls(review.images);
    switch (filterType) {
      case "withImages":
        return imageUrls.length > 0;
      case "withoutImages":
        return imageUrls.length === 0;
      default:
        return true;
    }
  });

  return (
    <>
      {/* Filter buttons */}
      <div className="mx-auto border p-2 rounded-xl w-[600px] space-y-2">
        <div className="flex  gap-2 ">
          <button
            onClick={() => setFilterType("all")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              filterType === "all"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            ทั้งหมด
          </button>
          <button
            onClick={() => setFilterType("withImages")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              filterType === "withImages"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <Image className="w-4 h-4" />
            มีรูปภาพ
          </button>
          <button
            onClick={() => setFilterType("withoutImages")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              filterType === "withoutImages"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            ไม่มีรูปภาพ
          </button>
        </div>
      </div>

      {/* Show filtered comments */}
      <div className="mx-auto border p-2 rounded-xl w-[600px] space-y-2">
        {filteredReviews.map((review) => {
          const imageUrls = getImageUrls(review.images);

          return (
            <div
              key={review.id}
              className="flex flex-col rounded-lg border p-4 gap-2"
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-2 items-center">
                  {review.user?.profile ? (
                    <img
                      src={review.user.profile}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="p-2 bg-red-300 rounded-full w-8 h-8" />
                  )}
                  <div className="font-bold text-2xl">{review.user?.name}</div>
                </div>

                {review.userId === userId && (
                  <div className="relative">
                    <button
                      onClick={() => handleOpenMenu(review.id)}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <MoreVertical className="w-5 h-5 text-gray-500" />
                    </button>
                    {openMenuId === review.id && (
                      <div className="absolute right-0 mt-1 w-36 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                        <button
                          onClick={() => handleDeleteReview(review)}
                          className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 flex items-center gap-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          ลบรีวิวนี้
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="flex p-2 border rounded-lg">{review.comment}</div>
              {imageUrls.length > 0 && (
                <div className="grid grid-cols-5 gap-2">
                  {imageUrls.map((imageUrl, index) => (
                    <div key={index} className="relative aspect-square">
                      <img
                        src={imageUrl}
                        alt={`Review image ${index + 1}`}
                        className="absolute inset-0 w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
