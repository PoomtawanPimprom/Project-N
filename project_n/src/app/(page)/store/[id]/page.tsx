// components
import dynamic from "next/dynamic";
const ImageStore = dynamic(()=> import("../component/ImageStore"))
const InfoStore = dynamic(()=> import("../component/InfoStore"))
const ShowProduct = dynamic(()=> import( "../component/ShowProduct"))

import prisma from "@/lib/prisma/db";
import NotFound from "@/app/not-found";

export default async function StorePage(props: {params: Promise<{ id: number }>;}) {
  const params = await props.params;


  const storeId = Number(params.id);
  if(  storeId === undefined){
    return <NotFound/> 
  }
  const store = await prisma.store.findUnique({
    where: { id: storeId },
    include: { user: true, Product: true },
  });
  return (
    <>
      <div className="flex flex-col w-full space-y-2  ">
        <ImageStore
          ownerId={store?.user!.id}
          store={store}
          storeId={storeId}
        />
        <InfoStore store={store} />
        <ShowProduct storeId={storeId} />
      </div>
    </>
  );
}
