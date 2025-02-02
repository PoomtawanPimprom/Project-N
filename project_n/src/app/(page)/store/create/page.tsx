"use client";

import Form from "@/app/component/Form";
import Input from "@/app/component/Input";
import SubmitButtton from "@/app/component/SubmitButtton";
import { CreateStore } from "@/app/service/store/service";
import { useToast } from "@/hooks/use-toast";
import { genarateImageName, storage } from "@/lib/firebase/firebase";
import { StoreSchema, validateWithZod } from "@/lib/zod/Schema";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";

export default function CreateStorePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageLogo, setImageLogo] = useState<File | null>(null);
  const [imageBackground, setImageBackground] = useState<File | null>(null);

  const [logoPreview, setLogoPreview] = useState<string>("");
  const [bgPreview, setBgPreview] = useState<string>("");

  const [uploading, setUploading] = useState(false);

  //error
  const [error, setError] = useState<{
    [key: string]: { message: string };
  } | null>(null);
  const [errorBg, setErrorBg] = useState("");
  const [errorLogo, setErrorLogo] = useState("");

  // Cleanup function for preview URLs
  useEffect(() => {
    return () => {
      if (logoPreview) URL.revokeObjectURL(logoPreview);
      if (bgPreview) URL.revokeObjectURL(bgPreview);
    };
  }, [logoPreview, bgPreview]);

  //logo image =================================================================

  //for logo images
  const handleLogoFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      if (logoPreview) URL.revokeObjectURL(logoPreview);
      setImageLogo(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  //delete Logo image
  const handleCancelLogo = () => {
    if (logoPreview) URL.revokeObjectURL(logoPreview);
    setImageLogo(null);
    setLogoPreview("");
    const input = document.getElementById("image-logo") as HTMLInputElement;
    if (input) input.value = "";
  };

  //Background image =================================================================

  const handleBgFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      if (bgPreview) URL.revokeObjectURL(bgPreview);
      setImageBackground(file);
      setBgPreview(URL.createObjectURL(file));
    }
  };

  //delete Background image
  const handleCancelBackground = () => {
    if (bgPreview) URL.revokeObjectURL(bgPreview);
    setImageBackground(null);
    setBgPreview("");
    const input = document.getElementById(
      "image-background"
    ) as HTMLInputElement;
    if (input) input.value = "";
  };

  //================================================================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    const logoFileName = genarateImageName();
    const BgFileName = genarateImageName();
    try {
      let logoUrl = "";
      let bgUrl = "";
      if (!imageLogo) {
        setErrorLogo("กรุณาอัปโหลดรูปโลโก้ร้านค้าของคุณ");
        return;
      }

      if (!imageBackground) {
        setErrorBg("กรุณาอัปโหลดรูปพื้นหลังร้านค้าของคุณ");
        return;
      }
      if (!imageLogo || !imageBackground) {
        return; // หยุดการทำงานหากไม่มีรูปภาพใดรูปหนึ่ง
      }
      //in case have both
      if (imageLogo && imageBackground) {
        //prepare
        const storageLogoRef = ref(storage, `store/logo/${logoFileName}`);
        const storageBgRef = ref(storage, `store/background/${BgFileName}`);
        //upload into firebase
        await uploadBytes(storageBgRef, imageBackground);
        await uploadBytes(storageLogoRef, imageLogo);

        //get path url
        logoUrl = await getDownloadURL(storageLogoRef);
        bgUrl = await getDownloadURL(storageBgRef);
      }

      const data = {
        name,
        description,

        imageLogoURL: logoUrl,
        imageLogoFileName: logoFileName,
        imageBackgroundURL: bgUrl,
        imageBgFileName: BgFileName,
        userId: Number(session?.user.id),
      };
      //validate
      validateWithZod(StoreSchema, data);

      const res:any = await CreateStore(data);
      
      if (!res.success) {
        throw new Error(res.message); // ดึง message จาก API แล้วโยน error ออกไป
    }
      toast({
        variant: "success",
        description: "สร้างร้านค้าสำเร็จ",
      });
      router.push(`/`);
    } catch (error: any) {
      console.log(error)
      const deleteLogoRef = ref(storage, `store/logo/${logoFileName}`);
      const deleteBgRef = ref(storage, `store/background/${BgFileName}`);

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
      if (error.message) {
        toast({
          description: error.message,
          variant: "destructive",
        });
      }

      //handle error from Zod
      if (error.fieldErrors) {
        setError(error.fieldErrors); // ตั้งค่าข้อผิดพลาดโดยตรง
      }
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    setErrorLogo("");
  }, [imageLogo]);

  useEffect(() => {
    setErrorBg("");
  }, [imageBackground]);
  return (
    <div className="flex px-4">
      <div className="flex flex-col h-full w-full max-w-[1200px] mt-4 p-4 mx-auto border rounded-lg">
        <h1 className="text-5xl font-bold mb-4">สร้างร้านค้าของคุณ!</h1>
        <Form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Input
              required={true}
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="ชื่อร้านค้าของคุณ"
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
              placeholder="รายละเอียดร้านค้า..."
              type="textarea"
              error={error?.description}
            />

            <div>
              <div className="flex text-xl font-bold">
                <p className=" mb-2">รูปโลโก้ร้านค้าของคุณ</p>
                <span className="text-red-500 ml-1">*</span>
              </div>
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
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        SVG, PNG, JPG or GIF (MAX. 120x120px)
                      </p>
                    </div>
                    <input
                      disabled={imageLogo ? true : false}
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
                  <div className=" flex items-start justify-start">
                    <div className="flex relative">
                      <Image
                        src={logoPreview}
                        width={400}
                        height={400}
                        alt="Logo preview"
                        className="rounded-lg"
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
              {errorLogo && (
                <p className="text-sm text-red-500 mt-1 animate-fade-in">
                  {errorLogo}
                </p>
              )}
            </div>

            <div>
              <div className="flex text-xl font-bold">
                <p className="text-xl font-bold mb-2">
                  รูปพื้นหลังร้านค้าของคุณ
                </p>
                <span className="text-red-500 ml-1">*</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start justify-start w-full">
                  <label
                    htmlFor="image-background"
                    className="flex flex-col items-center justify-center h-[400px] w-[400px]  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
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
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        SVG, PNG, JPG or GIF
                      </p>
                    </div>
                    <input
                      disabled={imageBackground ? true : false}
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
                  <div className=" flex items-start justify-start">
                    <div className="flex relative">
                      <Image
                        src={bgPreview}
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
              {errorBg && (
                <p className="text-sm text-red-500 mt-1 animate-fade-in">
                  {errorBg}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <SubmitButtton
              label="สร้าง"
              labelUploading="กำลังสร้าง..."
              disabled={uploading}
            />
          </div>
        </Form>
      </div>
    </div>
  );
}
