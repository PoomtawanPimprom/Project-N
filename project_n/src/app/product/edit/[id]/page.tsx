"use client";

import { categoryInterface } from "@/app/interface/categoryInterface";
import { productInterface } from "@/app/interface/productInterface";
import { getAllCategory } from "@/app/service/category/service";
import {
  deleteProductByID,
  getProductById,
  updateProductbyID,
} from "@/app/service/product/service";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const editProductpage = ({ params }: { params: { id: number } }) => {
  const id = params.id;
  const router = useRouter();
  const [categoryData, setCategoryData] = useState<categoryInterface[]>([]);

  const [product, setProduct] = useState<productInterface>();

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [image, setImage] = useState("");
  const [categoryId, setCategoryId] = useState<number>(0);

  const fetchData = async () => {
    const data: productInterface = await getProductById(id);
    const cataData = await getAllCategory();
    setCategoryData(cataData);
    setProduct(data);

    setName(data.name);
    setDescription(data.description);
    setPrice(data.price);
  };

  const onSubmitUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name: name,
      price: price,
      description: description,
      categoryID: categoryId,
    };
    await updateProductbyID(id, data);
  };

  const oncliclDeleteProduct = async () => {
    await deleteProductByID(id);
    // router.push("/")
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex flex-col w-3/5 px-4 pt-4">
          <div className="Header flex justify-between  my-2">
            <div className="text-4xl">
              <p>แก้ไขสินค้า</p>
            </div>
            <div className="flex justify-center items-center">
              <button
                onClick={oncliclDeleteProduct}
                className="flex rounded-xl p-2 border text-white bg-red-600"
              >
                <p>DELETE</p>
              </button>
            </div>
          </div>
          <div className="body flex flex-col h-dvh">
            <div className="flex flex-col border border-black w-full h-[600px] rounded-xl p-4">
              <form action="" onSubmit={onSubmitUpdateProduct}>
                <div className=" my-4 space-y-2">
                  <p>ชื่อสินค้า</p>
                  <input
                    value={name}
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
                    value={description}
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
                    value={price}
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
                    value={categoryId || 0}
                    onChange={(e) => {
                      setCategoryId(Number(e.target.value));
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

export default editProductpage;
