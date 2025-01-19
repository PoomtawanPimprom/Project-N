"use client";
import Input from "@/app/component/Input";
//interfaces
import { categoryInterface } from "@/app/interface/categoryInterface";

import { getAllCategory } from "@/app/service/category/service";
import { CreateProdcut } from "@/app/service/product/service";

import { useToast } from "@/hooks/use-toast";

import { storage } from "@/lib/firebase/firebase";
import { productSchema, validateWithZod } from "@/lib/zod/Schema";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { v4 } from "uuid";

const createProductpage = ({ params }: { params: { storeId: number } }) => {
  const { toast } = useToast();
  const storeId = params.storeId;
  //data
  const [categoryData, setCategoryData] = useState<categoryInterface[]>([]);

  //state
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<{
    [key: string]: { message: string };
  } | null>(null);

  const [errorImage, setErrorImage] = useState("");
  //product
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState<number>(0);

  //image
  const [images, setImages] = useState<File[]>([]);
  const MAX_FILES = 5;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);

    if (images.length + files.length > 5) {
      setErrorImage("สามารถอัพโหลดรูปได้สูงสุด 5 รูปเท่านั้น");
      return;
    }

    setImages((prev) => [...prev, ...files]);
    setErrorImage("");
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      const newImages = [...prev];
      newImages.splice(index, 1);
      return newImages;
    });
  };

  //inventory
  const [inventory, setInventory] = useState<
    { quantity: number; size: string; color: string }[]
  >([{ quantity: 0, size: "", color: "" }]);

  const removeInventoryRow = (index: number) => {
    if (index == 0) return;
    const updatedInventory = inventory.filter((_, i) => i !== index);
    setInventory(updatedInventory);
  };

  const addInventoryRow = () => {
    setInventory([...inventory, { quantity: 0, size: "", color: "" }]);
  };

  const updateInventoryRow = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updatedInventory = inventory.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setInventory(updatedInventory);
  };

  const onSubmitCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    let uploadedImages: { index: number; url: string; ref: any }[] = [];
    try {
      setLoading(true);
      if (images.length === 0) throw new Error("กรุ��าเลือกรูปสินค้า");
      const imageUrls: { [key: string]: string } = {};
      uploadedImages = await Promise.all(
        images.map(async (image, index) => {
          const productName = v4();
          const storageRef = ref(storage, `products/${storeId}/${productName}`);
          await uploadBytes(storageRef, image);
          const url = await getDownloadURL(storageRef);
          return { index: index + 1, url, ref: storageRef }; // เก็บ reference สำหรับลบ
        })
      );

      uploadedImages.forEach(({ index, url }) => {
        imageUrls[`image${index}`] = url;
      });

      const data = {
        name: name,
        description: description,
        price: price,
        storeID: 1,
        categoryID: category,
        image: imageUrls, // เปลี่ยนจาก image เป็น images และใช้ object แทน array
        inventory: inventory,
      };
      console.log(data);
      validateWithZod(productSchema, data);
      await CreateProdcut(data);
      toast({
        description: "สร้างสินค้าเรียบร้อยแล้ว",
      });
    } catch (error: any) {
      if (uploadedImages.length > 0) {
        await Promise.all(
          uploadedImages.map(async ({ ref }) => {
            try {
              await deleteObject(ref);
              console.log("Deleted file from Firebase:", ref.fullPath);
            } catch (deleteError) {
              console.error("Error deleting file:", ref.fullPath, deleteError);
            }
          })
        );
      }

      if (error instanceof Error) {
        console.error("Error uploading or submitting data", error);
        toast({
          description: error.message,
        });
      } else {
        console.error("Unexpected error", error);
        toast({
          description: "An unexpected error occurred.",
        });
      }

      if (error.fieldErrors) {
        setError(error.fieldErrors);
      }
    } finally {
      setLoading(false);

      // Router.push(`/store/inventory/${1}`); โ
    }
  };

  const fetchDataCategory = async () => {
    const data = await getAllCategory();
    setCategoryData(data);
  };

  useEffect(() => {
    fetchDataCategory();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex flex-col xl:w-[1000px] mx-auto p-4 border-x dark:border-gray-500">
          <div className="text-5xl font-bold my-4">
            <p>เพิ่มสินค้า</p>
          </div>
          <div className="flex w-full">
            <div className="flex flex-col w-full">
              <form className="space-y-2" onSubmit={onSubmitCreateProduct}>
                <Input
                  required={true}
                  label="ชื่อสินค้า"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="โปรดระบุชื่อสินค้า..."
                  type="text"
                  value={name}
                  error={error?.name}
                />
                <Input
                  label="รายละเอียดสินค้า"
                  required={true}
                  type="textarea"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  name="description"
                  placeholder="โปรดระบุรายละเอียดสินค้า"
                  error={error?.description}
                />
                <Input
                  label="ราคา"
                  required={true}
                  name="price"
                  onChange={(e) => setPrice(Number(e.target.value))}
                  value={price}
                  error={error?.price}
                  type="text"
                  placeholder="โปรดระบุราคาสินค้า"
                  inputClassName="w-64"
                />
                {/* input inventory */}
                <div className="space-y-2">
                  <p className="font-bold text-2xl">สินค้าในสต็อก</p>
                  {inventory.map((item, index) => (
                    <div key={index} className="flex space-x-4">
                      <div>
                        <p>จำนวน</p>
                        <input
                          name={`quantity-${index}`}
                          onChange={(e) =>
                            updateInventoryRow(
                              index,
                              "quantity",
                              Number(e.target.value)
                            )
                          }
                          type="number"
                          className="p-2 border border-black rounded-lg"
                          placeholder="จำนวนสินค้า"
                        />
                      </div>
                      <div>
                        <p>ไซต์</p>
                        <input
                          name={`size-${index}`}
                          onChange={(e) =>
                            updateInventoryRow(index, "size", e.target.value)
                          }
                          type="text"
                          className="p-2 border border-black rounded-lg"
                          placeholder="ขนาดสินค้า"
                        />
                      </div>
                      <div>
                        <p>สี</p>
                        <input
                          name={`color-${index}`}
                          onChange={(e) =>
                            updateInventoryRow(index, "color", e.target.value)
                          }
                          type="text"
                          className="p-2 border border-black rounded-lg"
                          placeholder="สีสินค้า"
                        />
                      </div>
                      <div className="flex items-end">
                        <div className="flex rounded-lg">
                          <button
                            type="button"
                            className="px-4 py-2  rounded-lg  text-center bg-red text-white bg-red-500"
                            onClick={() => removeInventoryRow(index)}
                          >
                            -
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addInventoryRow}
                    className="p-2 bg-gray-300 rounded-lg"
                  >
                    เพิ่มตัวเลือก
                  </button>
                </div>

                {/* input image */}
                <div className="space-y-2">
                  <p className="text-xl font-bold">รูปสินค้า</p>
                  <div className="grid grid-cols-2 gap-3">
                    {images.map((file, index) => (
                      <div key={index} className="relative aspect-square">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                          <IoMdClose className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    {images.length < MAX_FILES && (
                      <div className="flex items-center justify-center w-full">
                        <label
                          htmlFor="image-logo"
                          className="flex flex-col items-center justify-center w-full h-[369px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 "
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
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                              />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              SVG, PNG, JPG or GIF (MAX. 120x120px)
                            </p>
                          </div>
                          <input
                            required
                            multiple
                            accept="image/*"
                            name="image-logo"
                            id="image-logo"
                            type="file"
                            className="hidden"
                            onChange={handleImageChange}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <p>เลือกประเภทสินค้า</p>
                  <select
                    value={category || 0}
                    onChange={(e) => setCategory(Number(e.target.value))}
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
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex px-4 py-2 bg-green-main rounded-xl text-white  font-bold"
                  >
                    {loading ? "กำลังบันทึก" : "บันทึก"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default createProductpage;
