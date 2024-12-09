"use client";

import { CreateStore } from "@/app/service/store/service";
import { useToast } from "@/hooks/use-toast";
import { storage } from "@/lib/firebase/firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { v4 } from "uuid";

const CreateStorePage = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageLogo, setImageLogo] = useState<File | null>(null);
  const [imageBackground, setImageBackground] = useState<File | null>(null);

  const [logoPreview, setLogoPreview] = useState<string>("");
  const [bgPreview, setBgPreview] = useState<string>("");

  const [uploading, setUploading] = useState(false);

  // Cleanup function for preview URLs
  useEffect(() => {
    return () => {
      if (logoPreview) URL.revokeObjectURL(logoPreview);
      if (bgPreview) URL.revokeObjectURL(bgPreview);
    };
  }, [logoPreview, bgPreview]);

  const handleLogoFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      if (logoPreview) URL.revokeObjectURL(logoPreview);
      setImageLogo(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleBgFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      if (bgPreview) URL.revokeObjectURL(bgPreview);
      setImageBackground(file);
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
    setImageBackground(null);
    setBgPreview("");
    const input = document.getElementById(
      "image-background"
    ) as HTMLInputElement;
    if (input) input.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    const logoFileName = v4();
    const BgFileName = v4();
    try {
      let logoUrl = "";
      let bgUrl = "";

      if (imageLogo && imageBackground) {
        const storageLogoRef = ref(storage, `store/logo/${logoFileName}`);
        const storageBgRef = ref(storage, `store/background/${BgFileName}`);

        await uploadBytes(storageBgRef, imageBackground);
        await uploadBytes(storageLogoRef, imageLogo);

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
        userId: 1,
      };
      console.log(data);
      await CreateStore(data);
      toast({
        description: "Create store successful!",
      });
    } catch (error) {
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
      if (error instanceof Error) {
        console.error("Error uploading or submitting data", error);
        toast({
          variant: "destructive",
          description: error.message,
        });
      } else {
        console.error("Unexpected error", error);
        toast({
          variant: "destructive",
          description: "An unexpected error occurred.",
        });
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex px-4">
      <div className="flex flex-col h-full w-full max-w-[1200px] p-4 mx-auto border rounded-lg">
        <h1 className="text-5xl font-bold mb-4">สร้างร้านค้าของคุณ!</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="text-xl font-bold block mb-2">
                ชื่อร้านค้าของคุณ
              </label>
              <input
                required
                id="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="ชื่อร้านค้า..."
                type="text"
                className="w-96 p-3 rounded-xl border border-gray-500 bg-gray-50"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="text-xl font-bold block mb-2"
              >
                รายละเอียดร้าน
              </label>
              <textarea
                required
                id="description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                rows={5}
                placeholder="รายละเอียดร้านค้า..."
                className="w-96 p-3 rounded-xl border border-gray-500 bg-gray-50"
              />
            </div>

            <div>
              <p className="text-xl font-bold mb-2">รูปโลโก้ร้านค้าของคุณ</p>
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
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        SVG, PNG, JPG or GIF (MAX. 120x120px)
                      </p>
                    </div>
                    <input
                      disabled={imageLogo ? true : false}
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
              <p className="text-xl font-bold mb-2">รูปพื้นหลังร้านค้าของคุณ</p>
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
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        SVG, PNG, JPG or GIF
                      </p>
                    </div>
                    <input
                      disabled={imageBackground ? true : false}
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
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="submit"
              disabled={uploading}
              className="rounded-xl bg-green-main  py-2 px-6 font-bold text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? "กำลังสร้าง..." : "สร้าง"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateStorePage;
