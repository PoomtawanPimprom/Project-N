import { reivewInterface } from "@/app/interface/reviewInterface";
import ImageSkeletion from "./ImageSkeletion";
import Image from "next/image";

type prop = {
  reviews: reivewInterface[];
};

export default function ReviewBox({ reviews }: prop) {
  const defaultProfileImage = "../../../../public/pngtree.png";
  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col w-[450px] bg-white  lg:justify-between lg:w-full border p-4 rounded-xl  dark:border-none">
        <div className="flex text-2xl font-semibold">รีวิวสินค้า</div>
        <div className="flex flex-col gap-2">
          {reviews.map((item, index) => (
            <>
              <div
                key={index}
                className="flex flex-col justify-center p-2 border rounded-lg gap-2"
              >
                <div className="flex gap-2">
                  <div>
                    {item.user?.profile ? (
                      <img
                        width={50}
                        height={50}
                        alt={item.user?.name ?? ""}
                        src={item.user?.profile}
                        className="rounded-full"
                      />
                    ) : (
                      <ImageSkeletion />
                    )}
                  </div>
                  <div className="flex items-center text-xl font-semibold">
                    <p className="flex">{item.user?.name}</p>
                  </div>
                </div>
                <div className="flex flex-col border p-2 gap-2 rounded-lg">
                  <div className="">{item.comment}</div>
                  <div className="flex gap-2">
                    {item.images &&
                      Object.values(item.images).map((image, index) => (
                        <Image
                          key={index}
                          src={image}
                          alt={`Image ${index + 1}`}
                          className="w-[100px] h-[100px] rounded-lg object-cover"
                          width={100}
                          height={100}
                          priority
                        />
                      ))}
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
