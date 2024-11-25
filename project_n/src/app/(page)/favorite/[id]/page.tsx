import prisma from "@/lib/prisma/db";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const favoriteByUserIdPage = async ({ params }: { params: { id: number } }) => {
  const userId = Number(params.id);
  const favoriteData = await prisma.favorite.findMany({
    where: { userId: userId },
    include: {
      product: {
        select: {
          name: true,
          image: true,
          price: true,
          store: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  const handleDelete = async (data: FormData) => {
    "use server";
    const deleteButton = data.get("deleteButton");
    await prisma.favorite.delete({
      where:{id: Number(deleteButton) },
    })
    revalidatePath(`/favorite/${userId}`)
  };

  return (
    <>
      <div className="flex w-full justify-center">
        <div className="flex flex-col">
          <div className="header flex flex-col my-2 text-4xl font-bold">
            <p>รายการที่ฉันชอบ</p>
          </div>
          <div className="flex flex-col h-full rounded-xl border border-black my-2 p-4">
            {favoriteData.map((item, index) => (
              <div
                key={index}
                // href={`/product/${item.productId}`}
                className="flex flex-col border border-black rounded-xl p-2"
              >
                <div className="header flex text-2xl font-bold mb-1">
                  <p>{item.product?.store?.name}</p>
                </div>
                <div className="body flex justify-between ">
                  {/* <div><Image width={120} height={120} src={item.im}/></div> */}
                  <div>{item.product?.name}</div>
                  <div>quatity</div>
                  <div>{item.product?.price}</div>
                  <div>
                    <form action={handleDelete}>
                      <button name="deleteButton" value={item.id}>
                        ลบ
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default favoriteByUserIdPage;
