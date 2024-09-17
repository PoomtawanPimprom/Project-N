"use client";
import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { getStoreByID } from "@/app/service/store/service";
import { storeInterface } from "@/app/interface/storeInterface";

const StorePage = ({ params }: { params: { id: number } }) => {
  const [Store, setStore] = useState<storeInterface>();
  const id = Number(params.id);

  const fetchStoreData = async () => {
    const data = await getStoreByID(id);
    setStore(data);
  };

  useEffect(() => {
    fetchStoreData();
  }, []);
  console.log(Store);
  return (
    <>
      <div className="flex flex-col w-full  bg-white ">
        {/* image */}
        <div className="Header flex flex-col w-full h-[500px] bg-gradient-to-r from-cyan-500 to-blue-500 p-4 justify-end items-end">
          <div className="flex space-x-3">
            <div className="flex ">
              <button className="flex bg-white rounded-xl p-3 justify-center items-center text-center">
                <IoChatboxEllipsesOutline className="mx-1" />
                Chat
              </button>
            </div>
            <div className="flex ">
              <button className="flex bg-white rounded-xl p-3 justify-center items-center text-center">
                <CiCirclePlus className="mx-1" />
                Follow
              </button>
            </div>
          </div>
        </div>
        {/* body */}
        <div className="Body flex flex-col items-center p-4">
          <div className="flex flex-col h-dvh w-4/5 bg-slate-400 border border-black rounded-xl p-3 ">
            {/*1st info card */}
            <div className=" grid grid-cols-5 w-full h-40 bg-white p-3 rounded gap-x-3 mb-3">
              <div className=" col-span-2 border">
                <div className="flex w-full h-full ">
                  <div className="flex w-2/5 h-full bg-slate-500 justify-center items-center">
                    <div className="flex w-16 h-16 rounded-full bg-neutral-400"></div>
                  </div>
                  <div className="flex w-3/5 h-full bg-slate-200 p-4 text-2xl font-bold">
                    {Store?.name}
                  </div>
                </div>
              </div>
              <div className=" col-span-3 bg-zinc-100 border">
                <div className="flex flex-col h-full w-full p-3 font-bold">
                  <div className="flex h-1/3 w-full text-lg ">
                    <div className="flex w-1/2 bg-slate-200 p-1">
                      รายการสินค้า : {Store?.productTotal}
                    </div>
                    <div className="flex w-1/2 bg-slate-500 p-1">
                      คะแนน : {Store?.scores}
                    </div>
                  </div>
                  <div className="flex h-1/3 w-full text-lg ">
                    <div className="flex w-1/2 bg-slate-200 p-1">
                      Follow : {Store?.follow}
                    </div>
                    <div className="flex w-1/2 bg-slate-500 p-1">
                      Follower : {Store?.follower}
                    </div>
                  </div>
                  <div className="flex h-1/3 w-full text-lg ">
                    <div className="flex w-1/2 bg-slate-200 p-1"></div>
                    <div className="flex w-1/2 bg-slate-500 p-1"></div>
                  </div>
                </div>
              </div>
            </div>
            {/*2rd discount card */}
            <div className="flex flex-row w-full h-40 bg-white p-3 mb-3 ">
              discount
            </div>
            <div className="flex flex-col w-full h-full bg-white ">
              <div className="header flex flex-col h-12 w-full bg-slate-600 p-2">
                ewa
              </div>
              <div className="header flex flex-col h-full w-full bg-slate-200 p-3">
                <div className="grid h-full grid-cols-4 gap-3">
                  {/* component card Product */}
                  <div className="bg-slate-400 rounded-lg p-2">01</div>
                  <div className="bg-slate-400 rounded-lg p-2">01</div>
                  <div className="bg-slate-400 rounded-lg p-2">01</div>
                  <div className="bg-slate-400 rounded-lg p-2">01</div>
                  <div className="bg-slate-400 rounded-lg p-2">01</div>
                  <div className="bg-slate-400 rounded-lg p-2">01</div>
                  <div className="bg-slate-400 rounded-lg p-2">01</div>
                  <div className="bg-slate-400 rounded-lg p-2">01</div>
                  <div className="bg-slate-400 rounded-lg p-2">01</div>
                  <div className="bg-slate-400 rounded-lg p-2">01</div>
                  <div className="bg-slate-400 rounded-lg p-2">01</div>
                  <div className="bg-slate-400 rounded-lg p-2">01</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StorePage;
