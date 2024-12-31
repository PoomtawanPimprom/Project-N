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
      <div className="flex flex-col w-full space-y-2  bg-white ">
        <ImageStore
          ownerId={store?.user!.id}
          store={store}
          storeId={storeId}
        />
        <InfoStore store={store} />
        <Discout />
        <ShowProduct storeId={storeId} />
      </div>
    </>
  );
}
