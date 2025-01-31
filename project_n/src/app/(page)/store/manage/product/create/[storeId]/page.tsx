"use client";
import Input from "@/app/component/Input";
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
import { useState, use } from "react";
import { IoMdClose } from "react-icons/io";
import { v4 } from "uuid";
import StoreSideBar from "../../../StoreSideBar";
import { useRouter } from "next/navigation";

const createProductpage = (props: { params: Promise<{ storeId: number }> }) => {
  const params = use(props.params);
  const { toast } = useToast();
  const router = useRouter();
  const storeId = params.storeId;

  //state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{
    [key: string]: { message: string };
  } | null>(null);

  const [errorImage, setErrorImage] = useState("");
  //product
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

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
    { quantity: string; size: string; color: string }[]
  >([{ quantity: "", size: "", color: "" }]);

  const removeInventoryRow = (index: number) => {
    if (index == 0) return;
    const updatedInventory = inventory.filter((_, i) => i !== index);
    setInventory(updatedInventory);
  };

  const addInventoryRow = () => {
    setInventory([...inventory, { quantity: "", size: "", color: "" }]);
  };

  const updateInventoryRow = (index: number, field: string, value: string) => {
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
      if (images.length === 0) throw new Error("กรุณาเลือกรูปสินค้า");
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
        storeID: Number(storeId),
        image: imageUrls, // เปลี่ยนจาก image เป็น images และใช้ object แทน array
        inventory: inventory,
      };
      validateWithZod(productSchema, data);
      await CreateProdcut(data);
      toast({
        description: "สร้างสินค้าเรียบร้อยแล้ว",
      });
      setTimeout(() => {
        router.push(`/store/manage/product/${storeId}`);
      }, 2000);
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
        console.log(error);
        toast({
          description: "An unexpected error occurred.",
        });
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

      if (error.fieldErrors) {
        setError(error.fieldErrors);
      }
    } finally {
      setLoading(false);
      router.push(`/store/manage/inventory/${storeId}`);
    }
  };

  return (
    <div className="min-h-screen flex">
      <StoreSideBar storeId={storeId.toString()} />
      <div className=" w-full border p-4">
        <div className="flex flex-col w-full border p-4 rounded-lg bg-white  dark:bg-black dark:border-gray-600 dark:border-x">
          <div className="p-2">
            <div className="text-3xl font-bold">
              <p>เพิ่มสินค้า</p>
            </div>
          </div>
          <div className="flex w-full p-2">
            <div className="flex flex-col w-full">
              <form className="space-y-2" onSubmit={onSubmitCreateProduct}>
                <Input
                labelClassName="text-lg"
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
                labelClassName="text-lg"

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
                labelClassName="text-lg"

                  label="ราคา"
                  required={true}
                  name="price"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  error={error?.price}
                  type="text"
                  placeholder="โปรดระบุราคาสินค้า"
                  inputClassName="w-64"
                />
                {/* input inventory */}
                <div className="space-y-2 flex flex-col">
                  <p className="font-bold text-2xl">สินค้าในสต็อก</p>
                  {inventory.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col lg:flex-row gap-4"
                    >
                      <div>
                        <div className="flex">
                          <p>จำนวน</p>
                          <p className="text-red-500">*</p>
                        </div>
                        <input
                          name={`quantity-${index}`}
                          onChange={(e) =>
                            updateInventoryRow(
                              index,
                              "quantity",
                              e.target.value
                            )
                          }
                          value={item.quantity}
                          type=""
                          className="p-2 border  rounded-lg"
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
                          value={item.size}
                          type="text"
                          className="p-2 border  rounded-lg"
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
                          value={item.color}
                          type="text"
                          className="p-2 border  rounded-lg"
                          placeholder="สีสินค้า"
                        />
                      </div>
                      <div className="flex items-end">
                        <div className="flex rounded-lg">
                          <button
                            type="button"
                            className="px-4 py-2  rounded-lg  text-center bg-red text-accent-foreground bg-red-500"
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

                {/* input image */}
                <div className="space-y-2">
                  <p className="text-xl font-bold">รูปสินค้า</p>
                  <div className="grid grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-3">
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
                          className="flex flex-col items-center justify-center w-full h-[369px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-zinc-800 dark:bg-zinc-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 "
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                              className="w-8 h-8 mb-4 text-gray-500 dark:text-zinc-400"
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
                            className="absolute opacity-0 -z-10"
                            onChange={handleImageChange}
                          />
                        </label>
                      </div>
                    )}
                  </div>
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default createProductpage;
