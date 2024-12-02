"use client";
import { favoriteInterface } from "@/app/interface/favoriteInterface";
import Image from "next/image";
import { actionDelete } from "./action";
import { format } from "date-fns";
import Link from "next/link";

type ProductInfoCardprop = {
  userId: number;
  data: favoriteInterface | any;
};

export default function ProductInfoCard({ userId, data }: ProductInfoCardprop) {
  const actionDeleteWithUserId = actionDelete.bind(null, userId);

  return (
    <div className="flex w-64 sm:w-[24rem] md:w-[26rem] lg:w-[48rem] mx-auto border border-gray-500 rounded-xl p-2 justify-between">
      <div className="flex rounded-xl ">
        <Image
          className="flex rounded-xl"
          alt={data.name}
          width={150}
          height={150}
          src={data.product!.image.image1}
        />
      </div>
      <div className="flex flex-col w-full ml-2 ">
        <Link
          href={`/product/${data.productId}`}
          className=" flex  mb-2 text-4xl font-bold "
        >
          <p className="hover:text-gray-500">{data.product?.name}</p>
        </Link>
        <div className="flex justify-between ">
          <div className="flex flex-col">
            <div className="  hidden sm:block justify-start  mb-4 text-gray-500  items-center ">
              <div className="flex text-sm md:text-base gap-1">
                <p className="flex  font-bold">เพิ่มเข้าเมื่อ : </p>
                <p className="flex  font-medium ">
                  {format(new Date(data.createdAt), "dd/MM/yyyy HH:mm")}
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm sm:text-xl  font-black">฿{data.product?.price}</p>
            </div>
          </div>
          <div className="flex">
            <form action={actionDeleteWithUserId}>
              <button
                name="deleteButton"
                className="px-4 py-2 font-bold rounded-xl bg-red-500 hover:bg-red-700  text-white"
                value={data.id}
              >
                ลบ
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
