"use client";

import { inventoryInterface } from "@/app/interface/inventoryInterface";
import { productInterface } from "@/app/interface/productInterface";
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
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState, use } from "react";
import { IoMdClose } from "react-icons/io";
import ModalDelete from "./ModalDelete";
import { v4 } from "uuid";
import { extractFileNameFromUrl, storage } from "@/lib/firebase/firebase";
import { deleteObject, ref, uploadBytes } from "firebase/storage";
import Form from "@/app/component/Form";
import Input from "@/app/component/Input";
import StoreSideBar from "../../../StoreSideBar";
import { productSchema, validateWithZod } from "@/lib/zod/Schema";

interface ProductImage {
  [key: string]: string;
}

export default function editProductpage(props: {
  params: Promise<{ productId: number }>;
}) {
  const params = use(props.params);
  const searchparams = useSearchParams();
  const ProductId = params.productId;
  const { toast } = useToast();
  const router = useRouter();
  const storeId = searchparams.get("storeId");
  //modal
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  //state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{
    [key: string]: { message: string };
  } | null>(null);
  const [errorImage, setErrorImage] = useState("");
  //data
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
    { quantity: string; size: string; color: string }[]
  >([{ quantity: "", size: "", color: "" }]);

  //image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    const totalImages = oldImages.length + newImages.length + files.length;

    if (totalImages > MAX_FILES) {
      setErrorImage("สามารถอัพโหลดรูปได้สูงสุด 5 รูปเท่านั้น");
      return;
    }

    setNewImages((prev) => [...prev, ...files]);
    setErrorImage("");
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
    setInventory([...inventory, { quantity: "", size: "", color: "" }]);
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
      };

      const validateData = {
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
        inventory:inventories
      };

      validateWithZod(productSchema,validateData)

      // Step 5: อัปเดตข้อมูลสินค้า
      await updateProductbyID(ProductId, ProductData);

      // Step 6: อัปเดตข้อมูลสินค้าคงคลัง
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
    } catch (error: any) {
      if (uploadedImages.length > 0) {
        await deleteUploadedImages(uploadedImages.map((image) => image.url));
      }


      if (error instanceof Error) {
        console.error("Error uploading or submitting data", error);
        toast({
          description: error.message,
        });
      } else {
        console.log(error);
        toast({
          description: "An unexpected error occurred.",
        });
      }


      if (error.fieldErrors) {
        setError(error.fieldErrors);
      }

      if (error.fieldErrors?.inventory) {
        const inventoryErrorMessage =
          typeof error.fieldErrors.inventory === "object" &&
          error.fieldErrors.inventory.message
            ? error.fieldErrors.inventory.message
            : String(error.fieldErrors.inventory);
        toast({
          description: inventoryErrorMessage,
          variant:"destructive"
        });
      }

    } finally {
      setLoading(false);
    }
  };

  // ฟังก์ชันลบรูปภาพจาก Firebase
  const deleteUploadedImages = async (images: string[]) => {
    try {
      await Promise.all(
        images.map(async (imgUrl) => {
          const fileName = extractFileNameFromUrl("products", imgUrl);
          const refPath = `products/${fileName}`;

          const storageRef = ref(storage, refPath);

          await deleteObject(storageRef);
          console.log("deleted image done");
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
    if (invenData.length > 0) {
      setInventory(
        invenData.map((item:any) => ({
          quantity: item.quantity.toString(),
          size: item.size,
          color: item.color,
        }))
      );
    }
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
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex ">
      <StoreSideBar storeId={storeId!} />
      <div className="w-full border p-4">
        <div className="flex flex-col w-full border p-4 rounded-lg bg-white  dark:bg-black dark:border-gray-600 dark:border-x">
          {/* header */}
          <div className="flex justify-between p-2">
            <div className="text-3xl font-bold">
              <p>แก้ไขสินค้า</p>
            </div>
            <button
              onClick={onclickDeleteProduct}
              className="flex rounded-xl p-2 border font-bold text-white bg-red-600"
              >
              ลบสินค้า
            </button>
            <ModalDelete
              storeId={product?.store?.id}
              id={ProductId}
              open={openDeleteModal}
              onClose={() => setOpenDeleteModal(false)}
            />
          </div>
          <div className="body flex flex-col">
            <div className="flex flex-col  w-full  rounded-xl p-4">
              <Form className=" space-y-2" onSubmit={onSubmitUpdateProduct}>
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
                              e.target.value
                            )
                          }
                          className="p-2 border  rounded-lg"
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
                          className="p-2 border  rounded-lg"
                          placeholder="ขนาดของสินค้า"
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
                          className="p-2 border  rounded-lg"
                          placeholder="สีของสินค้า"
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
                    className="p-2 bg-gray-300 dark:bg-zinc-600 dark:hover:bg-zinc-700 text-accent-foreground rounded-lg"
                  >
                    เพิ่มตัวเลือก
                  </button>
                </div>

                <div className="space-y-2">
                  <p>รูปภาพสินค้า</p>
                  <div className="grid grid-cols-2 gap-3">
                    {oldImages.map((imageUrl, index) => (
                      <div key={`existing-${index}`} className="relative w-fit">
                        <Image
                          width={400}
                          height={400}
                          src={imageUrl}
                          alt={`Product ${index + 1}`}
                          className="w-[400px] h-[400px] object-cover rounded-lg"
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
                        className="relative w-fit  aspect-square"
                      >
                        <Image
                          width={400}
                          height={400}
                          src={URL.createObjectURL(file)}
                          alt={`New ${index + 1}`}
                          className="w-[400px] h-[400px] object-cover rounded-lg"
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
                  {errorImage && (
                    <p className="text-red-500 text-sm mt-2">{errorImage}</p>
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex px-4 py-2 bg-primary rounded-xl text-white  font-bold"
                  >
                    {loading ? "กำลังบันทึก" : "บันทึก"}
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
