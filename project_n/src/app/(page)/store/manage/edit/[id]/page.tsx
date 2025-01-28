"use client";

import Form from "@/app/component/Form";
import Input from "@/app/component/Input";
import ShowError from "@/app/component/ShowError";
import { storeInterface } from "@/app/interface/storeInterface";
import { getStoreByID, updateStoreById } from "@/app/service/store/service";
import { useToast } from "@/hooks/use-toast";
import { storage } from "@/lib/firebase/firebase";
import { StoreSchema, validateWithZod } from "@/lib/zod/Schema";

import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import Image from "next/image";
import { useEffect, useState, use } from "react";
import { IoMdClose } from "react-icons/io";
import { v4 } from "uuid";
import StoreSideBar from "../../StoreSideBar";

const UpdateStorePage = (props: { params: Promise<{ id: number }> }) => {
  const params = use(props.params);
  const { toast } = useToast();
  const storeID = params.id;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  //new image
  const [imageLogo, setImageLogo] = useState<any>();
  const [imageBackgroud, setImageBackgroud] = useState<any>();

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<{
    [key: string]: { message: string };
  } | null>(null);

  //old
  //file name
  const [oldLogoImageFileName, setOldLogoImageFileName] = useState<
    string | null | undefined
  >(undefined);
  const [oldBgImageFileName, setOldBgImageFileName] = useState<
    string | null | undefined
  >(undefined);
  //old image preview
  const [oldLogo, setOldLogo] = useState<any>("");
  const [oldBg, setOldBg] = useState<any>("");

  const handleLogoFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      if (oldLogo) URL.revokeObjectURL(oldLogo);
      console.log(imageLogo);
      setImageLogo(file);
      setOldLogo(URL.createObjectURL(file));
    }
  };
  const handleBgFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      if (oldBg) URL.revokeObjectURL(oldBg);
      console.log(imageBackgroud);
      setImageBackgroud(file);
      setOldBg(URL.createObjectURL(file));
    }
  };

  const handleCancelLogo = () => {
    if (oldLogo) URL.revokeObjectURL(oldLogo);
    setImageLogo(null);
    setOldLogo("");
    const input = document.getElementById("image-logo") as HTMLInputElement;
    if (input) input.value = "";
  };

  const handleCancelBackground = () => {
    if (oldBg) URL.revokeObjectURL(oldBg);
    setImageBackgroud(null);
    setOldBg("");
    const input = document.getElementById(
      "image-background"
    ) as HTMLInputElement;
    if (input) input.value = "";
  };

  useEffect(() => {
    return () => {
      if (oldLogo) URL.revokeObjectURL(oldLogo);
      if (oldBg) URL.revokeObjectURL(oldBg);
    };
  }, [oldLogo, oldBg]);

  const handelOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newImagelogoFileName = v4();
    const newImageBgFileName = v4();

    try {
      setUploading(true);
      let logoUrl = "";
      let bgUrl = "";

      if (imageLogo && imageBackgroud) {
        if (oldLogoImageFileName && oldBgImageFileName) {
          const storageOldLogoRef = ref(
            storage,
            `store/logo/${oldLogoImageFileName}`
          );
          const storageOldBgRef = ref(
            storage,
            `store/background/${oldBgImageFileName}`
          );

          await deleteObject(storageOldLogoRef);
          await deleteObject(storageOldBgRef);
        }
        const storageLogoRef = ref(
          storage,
          `store/logo/${newImagelogoFileName}`
        );
        const storageBgRef = ref(
          storage,
          `store/background/${newImageBgFileName}`
        );

        await uploadBytes(storageBgRef, imageBackgroud);
        await uploadBytes(storageLogoRef, imageLogo);

        logoUrl = await getDownloadURL(storageLogoRef);
        bgUrl = await getDownloadURL(storageBgRef);
      }
      const data = {
        name,
        description,

        imageLogoURL: imageLogo ? logoUrl : "",
        imageLogoFileName: imageLogo ? newImagelogoFileName : "",
        imageBackgroundURL: imageBackgroud ? bgUrl : "",
        imageBgFileName: imageBackgroud ? newImageBgFileName : "",
      };
      validateWithZod(StoreSchema, data);
      await updateStoreById(storeID, data);
      toast({
        description: "บันทึกข้อมูลสำเร็จ",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        description: "บันทึกไม่สำเร็จ",
      });
      //delete images on firebase
      const deleteLogoRef = ref(storage, `store/logo/${newImagelogoFileName}`);
      const deleteBgRef = ref(
        storage,
        `store/background/${newImageBgFileName}`
      );
      deleteObject(deleteLogoRef)
        .then(() => {
          console.log("delete logo successful");
        })
        .catch((error: any) => {
          console.log(error.message);
        });
      deleteObject(deleteBgRef)
        .then(() => {
          console.log("delete Background successful");
        })
        .catch((error: any) => {
          console.log(error.message);
        });
      if (error.fieldErrors) {
        setError(error.fieldErrors); // ตั้งค่าข้อผิดพลาดโดยตรง
      }
    } finally {
      setUploading(false);
    }
  };

  const fetchStoreDataById = async () => {
    const data: storeInterface = await getStoreByID(storeID);
    console.log(data);
    setDescription(data.description);
    setName(data.name);
    setOldLogo(data.imageLogoURL);
    setOldBg(data.imageBackgroundURL);

    //set old-image file name
    setOldLogoImageFileName(data.imageLogoFileName); // ใช้ฟังก์ชันดึงชื่อไฟล์
    setOldBgImageFileName(data.imageBgFileName); // ใช้ฟังก์ชันดึงชื่อไฟล์
  };
  useEffect(() => {
    fetchStoreDataById();
  }, []);

  useEffect(() => {
    console.log("oldBG", oldBgImageFileName);
    console.log("oldLogo", oldLogoImageFileName);
  }, [description]);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <StoreSideBar storeId={storeID.toString()} />
      <div className="w-full border p-4">
        <div className="flex flex-col w-full border p-4 rounded-lg bg-white  dark:bg-black dark:border-gray-600 dark:border-x">
          <div className="header  p-2  ">
            <div className="text-3xl font-bold">แก้ไขข้อมูล</div>
          </div>
          <div>
            <Form onSubmit={handelOnSubmit}>
              <div className="body h-full  px-4 pb-4">
                <div className="flex flex-col space-y-2">
                  <Input
                    required={true}
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    label="ชื่อร้านค้าของคุณ"
                    labelClassName="text-lg"
                    placeholder="ชื่อร้านค้า..."
                    type=""
                    error={error?.name}
                  />
                  <Input
                    required={true}
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    label="รายละเอียดร้าน"
                    labelClassName="text-lg"
                    placeholder="รายละเอียดร้านค้า..."
                    type="textarea"
                    error={error?.description}
                  />

                  <div>
                    <p className="text-lg font-bold mb-1">
                      รูปโลโก้ร้านค้าของคุณ
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start justify-start w-full">
                        <label
                          htmlFor="image-logo"
                          className="flex flex-col items-center justify-center h-[400px] w-[400px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                        >
                          <div className="flex flex-col h-[400px] w-[400px] items-center justify-center pt-5 pb-6">
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
                              SVG, PNG, JPG or GIF (MAX. 120x120px)
                            </p>
                          </div>
                          <input
                            disabled={oldLogo ? true : false}
                            required
                            accept="image/*"
                            name="image-logo"
                            id="image-logo"
                            type="file"
                            className="hidden"
                            onChange={handleLogoFileChange}
                          />
                        </label>
                      </div>
                      {oldLogo && (
                        <div className="flex items-start justify-start">
                          <div className="flex relative w-[400px] h-[400px]">
                            <Image
                              src={oldLogo}
                              fill
                              priority
                              alt="Logo preview"
                              className="object-cover  rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={handleCancelLogo}
                              className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
                              aria-label="Remove logo image"
                            >
                              <IoMdClose size={16} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-bold mb-1 ">
                      รูปพื้นหลังร้านค้าของคุณ
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start justify-start w-full">
                        <label
                          htmlFor="image-background"
                          className="flex flex-col items-center justify-center h-[400px] w-[400px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                        >
                          <div className="flex flex-col h-[400px] w-[400px] items-center justify-center pt-5 pb-6">
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
                              SVG, PNG, JPG or GIF
                            </p>
                          </div>
                          <input
                            disabled={oldBg ? true : false}
                            required
                            name="image-background"
                            id="image-background"
                            accept="image/*"
                            type="file"
                            className="hidden"
                            onChange={handleBgFileChange}
                          />
                        </label>
                      </div>
                      {oldBg && (
                        <div className="flex items-start justify-start">
                          <div className="flex relative">
                            <Image
                              priority
                              src={oldBg}
                              width={400}
                              height={400}
                              alt="Background preview"
                              className="rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={handleCancelBackground}
                              className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
                              aria-label="Remove background image"
                            >
                              <IoMdClose size={16} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      disabled={uploading}
                      type="submit"
                      className="bg-primary px-4 py-2 text-white duration-200 rounded-xl"
                    >
                      {uploading ? "กำลังแก้ไข..." : "สร้าง"}
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateStorePage;
