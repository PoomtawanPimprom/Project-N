"use client";
import { favoriteInterface } from "@/app/interface/favoriteInterface";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { deleteFavoriteByid } from "@/app/service/favorite/service";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

type ProductInfoCardprop = {
  userId: number;
  data: favoriteInterface;
};

export default function ProductInfoCard({ userId, data }: ProductInfoCardprop) {
  const router = useRouter()
  const onSubmitDelete = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await deleteFavoriteByid(data.id)
    router.refresh();
  }
  return (
    <div className="flex w-full mx-auto border rounded-xl p-2 justify-between">
      <div className="flex rounded-xl w-[150px]">
        <Image
          className="object-cover rounded-xl w-[150px] h-[150px]"
          alt={data.product!.name}
          width={150}
          height={150}
          src={data.product?.image?.image1!}
        />
      </div>
      <div className="flex flex-col w-full ml-2 ">
        <Link
          href={`/product/${data.productId}`}
          className=" flex  mb-2 text-2xl font-bold "
        >
          <p className="hover:text-gray-500">{data.product?.name}</p>
        </Link>
        <div className="flex justify-between h-full">
          <div className="flex flex-col justify-between">
            <div className="  hidden sm:block justify-start  mb-4 text-gray-500  items-center ">
              <div className="flex text-sm md:text-base gap-1">
                <p className="flex  font-semibold">เพิ่มเข้าเมื่อ : </p>
                <p className="flex  font-medium ">
                  {format(new Date(data.createdAt), "dd/MM/yyyy HH:mm")}
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm sm:text-xl  font-bold">{data.product?.price} บาท</p>
            </div>
          </div>
          <div className="flex">
            <form onSubmit={onSubmitDelete}>
              <button
                name="deleteButton"
                className="flex px-4 py-2 font-bold rounded-xl bg-red-500 hover:bg-red-700  text-white"
                value={data.id}
              >
                <Trash2  className="mr-2"/>ลบ
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
