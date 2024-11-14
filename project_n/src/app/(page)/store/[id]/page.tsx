"use client";
import { useEffect, useState } from "react";
import { getStoreByID } from "@/app/service/store/service";
import { storeInterface } from "@/app/interface/storeInterface";

// components
import Discout from "../component/ComponentDiscout";
import ImageStore from "../component/ComponentImageStore";
import InfoStore from "../component/ComponentInfoStore";
import ShowProduct from "../component/ComponentShowProduct";

const StorePage = ({ params }: { params: { id: number } }) => {
  const [store, setStore] = useState<storeInterface>();
  const storeId = Number(params.id);

  const fetchStoreData = async () => {
    const data = await getStoreByID(storeId);
    setStore(data);
  };

  useEffect(() => {
    fetchStoreData();
  }, []);
  return (
    <>
      <div className="flex flex-col w-full  bg-white ">
        <ImageStore userId={1} ownerId={store?.user?.id} storeId={storeId} store={store} />
        <InfoStore store={store} />
        <Discout />
        <ShowProduct storeId={storeId}/>
      </div>
    </>
  );
};

export default StorePage;
