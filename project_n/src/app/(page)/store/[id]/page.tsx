import { storeInterface } from "@/app/interface/storeInterface";

// components
import Discout from "../component/ComponentDiscout";
import ImageStore from "../component/ComponentImageStore";
import InfoStore from "../component/ComponentInfoStore";
import ShowProduct from "../component/ComponentShowProduct";
import prisma from "@/lib/prisma/db";

export default async function StorePage(
  {params}: {
    params: Promise<{ id: number }>;
  }
) {
  const storeId = Number((await params).id);
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
