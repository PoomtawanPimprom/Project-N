"use client";

import { categoryInterface } from "@/app/interface/categoryInterface";
import { inventoryInterface } from "@/app/interface/inventoryInterface";
import { productInterface } from "@/app/interface/productInterface";
import { getAllCategory } from "@/app/service/category/service";
import {
  getInventoriesByProductId,
  updateInventoryByInventoryId,
} from "@/app/service/inventory/service";
import {
  getProductById,
  updateProductbyID,
} from "@/app/service/product/service";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import ModalDelete from "./ModalDelete";
import { v4 } from "uuid";
import { storage } from "@/lib/firebase/firebase";
import { deleteObject, ref, uploadBytes } from "firebase/storage";
interface ProductImage {
  [key: string]: string;
}

const editProductpage = ({ params }: { params: { productId: number } }) => {
  const ProductId = params.productId;
  const { toast } = useToast();
  const router = useRouter();
  //modal
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  //state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //data
  const [categoryData, setCategoryData] = useState<categoryInterface[]>([]);
  const [product, setProduct] = useState<productInterface>();

  //Product
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [categoryId, setCategoryId] = useState<number>(0);

  //image
  const [oldImages, setOldImages] = useState<string[]>([]);
  const [oldImagesURL, setOldImagesURL] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const MAX_FILES = 5;

  //inventory
  const [inventories, setInventories] = useState<inventoryInterface[]>([]);
  const [inventory, setInventory] = useState<
    { quantity: number; size: string; color: string }[]
  >([{ quantity: 0, size: "", color: "" }]);

  //image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    const totalImages = oldImages.length + newImages.length + files.length;

    if (totalImages > MAX_FILES) {
      setError("สามารถอัพโหลดรูปได้สูงสุด 5 รูปเท่านั้น");
      return;
    }

    setNewImages((prev) => [...prev, ...files]);
    setError("");
  };

  const removeExistingImage = (index: number) => {
    setOldImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeNewImage = (index: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  //inventory system
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

  const onSubmitUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    let uploadedImages: { index: number; url: string; refPath: string }[] = [];
  
    try {
      setLoading(true);
  
      // Step 1: ลบรูปภาพเก่าก่อน
      if (oldImagesURL.length > 0) {
        await deleteUploadedImages(oldImagesURL); // ลบรูปภาพเก่า
      }
  
      // Step 2: อัปโหลดรูปใหม่ไปที่ Firebase
      uploadedImages = await Promise.all(
        newImages.map(async (image, index) => {
          const uniqueId = v4(); // Generate a unique ID for the image
          const refPath = `products/${product?.storeID}/${uniqueId}`; // Path in Firebase
          const storageRef = ref(storage, refPath);
  
          await uploadBytes(storageRef, image);
          const url = `https://firebasestorage.googleapis.com/v0/b/${
            storage.app.options.storageBucket
          }/o/${encodeURIComponent(refPath)}?alt=media`;
  
          return { index, url, refPath };
        })
      );
  
      // Step 3: รวมข้อมูลรูปภาพใหม่กับเก่า
      const ProductData = {
        name: name,
        price: price,
        description: description,
        image: {
          ...Object.fromEntries(
            oldImages.map((url, idx) => [`image${idx + 1}`, url])
          ),
          ...Object.fromEntries(
            uploadedImages.map((img, idx) => [
              `image${oldImages.length + idx + 1}`,
              img.url,
            ])
          ),
        },
        categoryID: categoryId,
      };
  
      console.log(ProductData);
      // Step 4: อัปเดตข้อมูลสินค้า
      await updateProductbyID(ProductId, ProductData);
  
      // Step 5: อัปเดตข้อมูลสินค้าคงคลัง
      await Promise.all(
        inventories.map(async (inventory) => {
          await updateInventoryByInventoryId(inventory.id, {
            quantity: inventory.quantity,
            size: inventory.size,
            color: inventory.color,
            productId: ProductId,
          });
        })
      );
  
      toast({
        description: "แก้ไขสินค้าเรียบร้อยแล้ว",
      });
      fetchData();
    } catch (error) {
      // Step 6: ลบรูปใหม่หากเกิดข้อผิดพลาด
      if (uploadedImages.length > 0) {
        await deleteUploadedImages(uploadedImages.map(image => image.url));
      }
  
      console.error("Error uploading or submitting data", error);
      toast({
        variant: "destructive",
        description:
          error instanceof Error ? error.message : "Unexpected error occurred.",
      });
    } finally {
      setLoading(false);
    }
  };

  const extractFileNameFromUrl = (url: string): string | null => {
    const regex = /products%2F([^?]+)/;  
    const match = url.match(regex);
    
    if (match && match[1]) {
      return decodeURIComponent(match[1]);  
    }
  
    return null;  // ถ้าไม่พบผลลัพธ์จะคืนค่า null
  };

  // ฟังก์ชันลบรูปภาพจาก Firebase
  const deleteUploadedImages = async (images: string[]) => {
    try {
      console.log("start detele")
      await Promise.all(
        images.map(async (imgUrl) => {
          const fileName = extractFileNameFromUrl(imgUrl);
          console.log(fileName)
          const refPath = `products/${fileName}`;
  
          const storageRef = ref(storage, refPath);
  
          await deleteObject(storageRef);
          console.log("deleted image done")
        })
      );
    } catch (error) {
      console.error("Error deleting uploaded images", error);
    }
  };
  
  const onclickDeleteProduct = async () => {
    setOpenDeleteModal(true);
  };

  const fetchData = async () => {
    const invenData = await getInventoriesByProductId(ProductId, "");
    setInventories(invenData);

    const productData = await getProductById(ProductId);
    setProduct(productData);
    setName(productData.name);
    setDescription(productData.description);
    setPrice(productData.price);
    setCategoryId(productData.categoryID);

    const imageUrls = Object.values(productData.image as ProductImage).filter(
      (url) => url
    );
    setOldImages(imageUrls);
    setOldImagesURL(imageUrls);

    const cateData = await getAllCategory();
    setCategoryData(cateData);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex ">
      <div className="flex flex-col w-3/5 px-4 mt-2 mx-auto">
        <div className="Header flex justify-between  my-2">
          <div className="text-4xl font-bold">
            <p>แก้ไขสินค้า</p>
          </div>
          <div className="flex justify-center items-center">
            <button
              onClick={onclickDeleteProduct}
              className="flex rounded-xl p-2 border text-white bg-red-600"
            >
              <p>DELETE</p>
            </button>
            <ModalDelete
              storeId={product?.store?.id}
              id={ProductId}
              open={openDeleteModal}
              onClose={() => setOpenDeleteModal(false)}
            />
          </div>
        </div>
        <div className="body flex flex-col h-dvh">
          <div className="flex flex-col border border-black w-full  rounded-xl p-4">
            <form
              action=""
              className=" space-y-2"
              onSubmit={onSubmitUpdateProduct}
            >
              <div className=" space-y-2">
                <p>ชื่อสินค้า</p>
                <input
                  value={name}
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="w-96 p-2 border border-black rounded-lg"
                  placeholder="โปรดระบุชื่อสินค้า"
                />
              </div>
              <div className=" space-y-2">
                <p>รายละเอียดสินค้า</p>
                <textarea
                  rows={5}
                  cols={40}
                  value={description}
                  name="description"
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-96 p-2 border border-black rounded-lg"
                  placeholder="โปรดระบุรายละเอียดสินค้า"
                />
              </div>
              <div className="  space-y-2">
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
              <div className="  space-y-2">
                <p className="">แก้ไขสต็อกสินค้า</p>
                {inventory.map((item, index) => (
                  <div key={index} className="flex space-x-4">
                    <div>
                      <p>จำนวน</p>
                      <input
                        name={`quantity-${index}`}
                        value={item.quantity}
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
                        value={item.size}
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
                        value={item.color}
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

              <div className="space-y-2">
                <p>รูปภาพสินค้า</p>
                <div className="grid grid-cols-2 gap-3">
                  {oldImages.map((imageUrl, index) => (
                    <div
                      key={`existing-${index}`}
                      className="relative aspect-square"
                    >
                      <Image
                        width={400}
                        height={400}
                        src={imageUrl}
                        alt={`Product ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                        loading="lazy"
                      />
                      <button
                        type="button"
                        onClick={() => removeExistingImage(index)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <IoMdClose className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {newImages.map((file, index) => (
                    <div
                      key={`new-${index}`}
                      className="relative aspect-square"
                    >
                      <Image
                        width={400}
                        height={400}
                        src={URL.createObjectURL(file)}
                        alt={`New ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                         loading="lazy"
                      />
                      <button
                        type="button"
                        onClick={() => removeNewImage(index)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <IoMdClose className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {/* Upload Button */}
                  {oldImages.length + newImages.length < MAX_FILES && (
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="image-upload"
                        className="flex flex-col items-center justify-center w-full h-[369px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-8 h-8 mb-4 text-gray-500"
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
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">
                            SVG, PNG, JPG or GIF (MAX. 800x800px)
                          </p>
                        </div>
                        <input
                          id="image-upload"
                          type="file"
                          multiple
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>
                  )}
                </div>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </div>
              <div className="space-y-2">
                <p>option</p>
                <select
                  value={categoryId}
                  onChange={(e) => {
                    setCategoryId(Number(e.target.value));
                  }}
                  className="border rounded-xl p-2"
                >
                  <option value={0} disabled>
                    เลือกหมวดหมู่
                  </option>
                  {categoryData.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  className="px-4 py-2 bg-green-main dark:bg-black text-white rounded-xl"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default editProductpage;
