"use client";
import { storeInterface } from "@/app/interface/storeInterface";
import { getStoreByID, updateStoreById } from "@/app/service/store/service";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";

const UpdateSoterexport = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const storeID = Number(params.id);
  const [store, setStore] = useState<storeInterface>();
  const [name, setName] = useState("");
  const [imageLogo, setImageLogo] = useState<any>();
  const [imageBackgroud, setImageBackgroud] = useState<any>();
  const fetchStoreDataById = async () => {
    const data: storeInterface = await getStoreByID(storeID);
    setStore(data);
    setName(data.name);
    setImageLogo(data.imageBackgroud);
    setImageBackgroud(data.imageBackgroud);
  };

  const handelOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {name}
    const res = await updateStoreById(storeID,data)
    router.push(`/store/${storeID}`)
  };

  useEffect(() => {
    fetchStoreDataById();
  }, []);
  return (
    <>
      <div className="flex flex-col h-dvh p-4">
        <div className="bg-slate-300 h-full w-full p-4">
          <div className="header h-16 p-2 bg-slate-500 ">
            <p className="text-3xl font-bold">Edit your Store profile</p>
          </div>
          <form action="" onSubmit={handelOnSubmit}>
            <div className="body h-full bg-red-400 p-4">
              <div className="flex flex-col">
                <div>
                  <p>Name</p>
                </div>
                <div className="flex flex-col w-1/3">
                  <input
                    className="p-2 mb-2"
                    type="text"
                    value={name}
                    placeholder="enter your store name..."
                    onChange={(e) => setName(e.target.value)}
                  />
                  <button className=" bg-slate-400">submit</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateSoterexport;
