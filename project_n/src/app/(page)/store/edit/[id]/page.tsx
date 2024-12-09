"use client";

import { storeInterface } from "@/app/interface/storeInterface";
import { getStoreByID, updateStoreById } from "@/app/service/store/service";
import { useToast } from "@/hooks/use-toast";
import { storage } from "@/lib/firebase/firebase";

import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { v4 } from "uuid";

const UpdateStorePage = ({ params }: { params: { id: number } }) => {
  const { toast } = useToast();
  const storeID = params.id;
  const router = useRouter();
  const [uploading, setUploading] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageLogo, setImageLogo] = useState<any>();
  const [imageBackgroud, setImageBackgroud] = useState<any>();

  //image
  const [oldLogoImageFileName, setOldLogoImageFileName] = useState<
    string | null | undefined
  >(undefined);
  const [oldBgImageFileName, setOldBgImageFileName] = useState<
    string | null | undefined
  >(undefined);

  const [logoPreview, setLogoPreview] = useState<any>("");
  const [bgPreview, setBgPreview] = useState<any>("");

  const handleLogoFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      if (logoPreview) URL.revokeObjectURL(logoPreview);
      console.log(imageLogo);
      setImageLogo(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };
  const handleBgFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      if (bgPreview) URL.revokeObjectURL(bgPreview);
      console.log(imageBackgroud);
      setImageBackgroud(file);
      setBgPreview(URL.createObjectURL(file));
    }
  };

  const handleCancelLogo = () => {
    if (logoPreview) URL.revokeObjectURL(logoPreview);
    setImageLogo(null);
    setLogoPreview("");
    const input = document.getElementById("image-logo") as HTMLInputElement;
    if (input) input.value = "";
  };

  const handleCancelBackground = () => {
    if (bgPreview) URL.revokeObjectURL(bgPreview);
    setImageBackgroud(null);
    setBgPreview("");
    const input = document.getElementById(
      "image-background"
    ) as HTMLInputElement;
    if (input) input.value = "";
  };

  const getFileNameFromURL = (
    url: string | null | undefined
  ): string | null => {
    if (!url) return null;

    try {
      const decodedURL = decodeURIComponent(url);
      const parts = decodedURL.split("/");
      const fileName = parts[parts.length - 1].split("?")[0];
      return fileName;
    } catch (error) {
      console.error("Error extracting file name:", error);
      return null;
    }
  };

  useEffect(() => {
    return () => {
      if (logoPreview) URL.revokeObjectURL(logoPreview);
      if (bgPreview) URL.revokeObjectURL(bgPreview);
    };
  }, [logoPreview, bgPreview]);

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
          const storageOldLogoRef = ref(storage,`store/logo/${oldLogoImageFileName}`);
          const storageOldBgRef = ref(storage,`store/background/${oldBgImageFileName}`);

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

        imageLogoURL: logoUrl,
        imageLogoFileName: newImagelogoFileName,
        imageBackgroundURL: bgUrl,
        imageBgFileName: newImageBgFileName,
      };
      await updateStoreById(storeID, data);
      toast({
        description: "บันทึกข้อมูลสำเร็จ"
      })
      // router.push(`/store/${storeID}`);
    
    } catch (error) {
      //delete images on firebase
      const deleteLogoRef = ref(storage, `store/logo/${newImagelogoFileName}`);
      const deleteBgRef = ref(storage,`store/background/${newImageBgFileName}`);
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

      //handle error
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

    } finally {
      setUploading(false);
    }
  };

  const fetchStoreDataById = async () => {
    const data: storeInterface = await getStoreByID(storeID);
    console.log(data);
    setDescription(data.description);
    setName(data.name);
    setLogoPreview(data.imageLogoURL);
    setBgPreview(data.imageBackgroundURL);

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
    <div className="flex ">
      <div className="w-[1200px] border  mx-auto px-4">
        <div className="header  p-2  ">
          <div className="text-5xl font-bold">แก้ไขข้อมูล</div>
        </div>
        <div>
          <form onSubmit={handelOnSubmit}>
            <div className="body h-full  px-4 pb-4">
              <div className="flex flex-col space-y-2">
                <div className="flex text-xl font-bold">
                  <div>ชื่อร้านค้า</div>
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
                  <div>รายละเอียดร้านค้า</div>
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
                  <p className="text-xl font-bold mb-1">
                    รูปโลโก้ร้านค้าของคุณ
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="image-logo"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
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
                            SVG, PNG, JPG or GIF (MAX. 120x120px)
                          </p>
                        </div>
                        <input
                          disabled={logoPreview ? true : false}
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
                    {logoPreview && (
                      <div className=" flex items-center justify-center">
                        <div className="flex relative">
                          <Image
                            src={logoPreview}
                            width={400}
                            height={400}
                            alt="Logo preview"
                            className="  rounded-lg"
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
                  <p className="text-xl font-bold mb-1 ">
                    รูปพื้นหลังร้านค้าของคุณ
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="image-background"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
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
                            SVG, PNG, JPG or GIF
                          </p>
                        </div>
                        <input
                          disabled={bgPreview ? true : false}
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
                    {bgPreview && (
                      <div className=" flex items-center justify-center">
                        <div className="flex relative">
                          <Image
                            src={bgPreview}
                            width={400}
                            height={256}
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
                    className="bg-green-main px-4 py-2 text-white duration-200 rounded-xl"
                  >
                    {uploading ? "กำลังแก้ไข..." : "สร้าง"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateStorePage;
