"use client";

import { storeInterface } from "@/app/interface/storeInterface";
import { getStoreByID, updateStoreById } from "@/app/service/store/service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UpdateStorePage = async ({params}: { params: Promise<{ id: number }> }) => {
  const router = useRouter();
  const storeID = (await params).id;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageLogo, setImageLogo] = useState<any>();
  const [imageBackgroud, setImageBackgroud] = useState<any>();
  
  const fetchStoreDataById = async () => {
    const data: storeInterface = await getStoreByID(storeID);
    setDescription(data.description);
    setName(data.name);
    setImageLogo(data.imageBackgroud);
    setImageBackgroud(data.imageBackgroud);
  };

  const handelOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name,
      userId: 1,
      imageBackgroud,
      imageLogo,
    };
    await updateStoreById(storeID, data)
    router.push(`/store/${storeID}`);
  };

  useEffect(() => {
    fetchStoreDataById();
  }, []);
  return (
    <div className="flex ">
      <div className="w-[1200px] border  mx-auto px-4">
        <div className="header  p-2  ">
          <p className="text-5xl font-bold">แก้ไขข้อมูล</p>
        </div>
        <form onSubmit={handelOnSubmit}>
          <div className="body h-full  px-4 pb-4">
            <div className="flex flex-col space-y-2">
              <div className="flex text-xl font-bold">
                <p>ชื่อร้านค้า</p>
              </div>
              <div className="flex flex-col w-1/3">
                <input
                  name="name"
                  className="p-2  rounded-xl  bg-gray-50 border border-gray-500"
                  type="text"
                  value={name}
                  placeholder="ใส่ชื่อร้านค้า..."
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex text-xl font-bold">
                <p>รายละเอียดร้านค้า</p>
              </div>
              <div className="flex flex-col w-1/3">
                <textarea
                  name="description"
                  value={description}
                  cols={50}
                  rows={4}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-500 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="ใส่รายละเอียดร้านค้า..."
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div>
                <p className="text-xl font-bold mb-1">รูปโลโก้ร้านค้าของคุณ</p>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="image-logo"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 "
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 120x120px)
                      </p>
                    </div>
                    <input
                      name="image-logo"
                      id="image-logo"
                      type="file"
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              <div>
                <p className="text-xl font-bold mb-1 ">
                  รูปพื้นหลังร้านค้าของคุณ
                </p>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="image-background"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 1400x500px)
                      </p>
                    </div>
                    <input
                      name="image-background"
                      id="image-background"
                      type="file"
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              <div className="flex justify-end">
                <button className="bg-green px-4 py-2 text-white duration-200 rounded-xl">
                  ยืนยัน
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateStorePage;
