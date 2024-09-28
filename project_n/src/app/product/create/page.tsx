"use client";
//interfaces
import { categoryInterface } from "@/app/interface/categoryInterface";
import { productInterface } from "@/app/interface/productInterface";

//services
import { getAllCategory } from "@/app/service/category/service";
import { CreateProdcut } from "@/app/service/product/service";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const createProductpage = () => {
  const Router = useRouter();

  const [categoryData, setCategoryData] = useState<categoryInterface[]>([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [image, setImage] = useState("");
  const [category, setCategory] = useState<number>(0);

  const fetchDataCategory = async () => {
    const data = await getAllCategory();
    setCategoryData(data);
  };

  const onSubmitCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name: name,
      description: description,
      price: price,
      storeID: 1,
      categoryID: category,
    };
    console.log(data);
    await CreateProdcut(data);
  };

  useEffect(() => {
    fetchDataCategory();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex flex-col w-3/5 px-4 pt-4">
          <div className="Header text-4xl font-sans my-4">
            <p>เพิ่มสินค้า</p>
          </div>
          <div className="body flex flex-col h-dvh">
            <div className="flex flex-col border border-black w-full h-[600px] rounded-xl p-4">
              <form action="" onSubmit={onSubmitCreateProduct}>
                <div className=" my-4 space-y-2">
                  <p>ชื่อสินค้า</p>
                  <input
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className="p-2 border border-black rounded-lg"
                    placeholder="โปรดระบุชื่อสินค้า"
                  />
                </div>
                <div className=" my-4 space-y-2">
                  <p>รายละเอียดสินค้า</p>
                  <input
                    name="description"
                    onChange={(e) => setDescription(e.target.value)}
                    type="text"
                    className="p-2 border border-black rounded-lg"
                    placeholder="โปรดระบุรายละเอียดสินค้า"
                  />
                </div>
                <div className=" my-4 space-y-2">
                  <p>ราคา</p>
                  <input
                    name="price"
                    onChange={(e) => setPrice(Number(e.target.value))}
                    type="text"
                    className="p-2 border border-black rounded-lg"
                    placeholder="โปรดระบุราคาสินค้า"
                  />
                </div>
                <div className=" my-4 space-y-2">
                  <p>จำนวน</p>
                  <input
                    name="quantity"
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    type="text"
                    className="p-2 border border-black rounded-lg"
                    placeholder="โปรดระบุจำนวนสินค้า"
                  />
                </div>
                <div className=" my-4 space-y-2">
                  <p>รูปภาพสินค้า</p>
                  <input
                    name="image"
                    onChange={(e) => setImage(e.target.value)}
                    type="file"
                    className="p-2 border border-black rounded-lg"
                  />
                </div>
                <div className=" my-4 space-y-2">
                  <p>option</p>
                  <select
                    value={category || 0}
                    onChange={(e) => {
                      setCategory(Number(e.target.value));
                    }}
                    className="border rounded-xl p-2"
                  >
                    <option value={0} disabled>
                      เลือกหมวดหมู่
                    </option>
                    {categoryData.map((item, index) => (
                      <>
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      </>
                    ))}
                  </select>
                </div>
                <button>Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default createProductpage;
