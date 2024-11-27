// components
import Discout from "../component/Discout";
import ImageStore from "../component/ImageStore";
import InfoStore from "../component/InfoStore";
import ShowProduct from "../component/ShowProduct";
import prisma from "@/lib/prisma/db";

export default async function StorePage({params}: {params: { id: number };}) {
  const storeId = Number(params.id);
  const store = await prisma.store.findUnique({
    where: { id: storeId },
    include: { user: true, Product: true },
  });
  return (
    <>
      <div className="flex flex-col w-full  bg-white ">
        <ImageStore
          userId={1}
          ownerId={store?.user?.id}
          storeId={storeId}
          store={store}
        />
        <InfoStore store={store} />
        <Discout />
        <ShowProduct storeId={storeId} />
      </div>
    </>
  );
}
