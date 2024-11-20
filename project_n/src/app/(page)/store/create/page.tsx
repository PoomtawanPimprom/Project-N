"use client";

import { CreateStore } from "@/app/service/store/service";
import { storage } from "@/lib/firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 } from "uuid";

const CreateStorePage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageLogo, setImageLogo] = useState(null);
  const [imageBackground, setImageBackground] = useState(null);

  const [uploading, setUploading] = useState(false);

  const [uploadedLogoUrl, setUploadedLogoUrl] = useState("");
  const [uploadedBGUrl, setUploadedBGUrl] = useState("");

  const handleLogoFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setImageLogo(file);
  };
  const handleBgFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setImageBackground(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    const storageLogoRef = ref(storage, `store/logo/${v4()}`);
    const storageBgRef = ref(storage, `store/background/${v4()}`);

    try {
      let logoUrl = "";
      let bgUrl = "";

      if (imageLogo && imageBackground) {
        // Upload images
        await uploadBytes(storageBgRef, imageBackground);
        await uploadBytes(storageLogoRef, imageLogo);

        // Get download URLs
        logoUrl = await getDownloadURL(storageLogoRef);
        bgUrl = await getDownloadURL(storageBgRef);

        setUploadedBGUrl(bgUrl);
        setUploadedLogoUrl(logoUrl);
      }

      // Prepare data for submission
      const data = {
        name,
        description,
        imageLogo: logoUrl,
        imageBackgroud: bgUrl,
        userId: 1,
      };

      console.log("data", data);

      // Submit data
      await CreateStore(data);
    } catch (error) {
      console.error("Error uploading or submitting data", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex px-4 ">
      <div className="flex flex-col h-full w-[1200px] p-4 mx-auto border">
        <div className="text-5xl font-bold mb-4">สร้างร้านค้าของคุณ!</div>
        <form onSubmit={handleSubmit}>
          <div className=" space-y-2">
            <div className="mb-3">
              <p className="text-xl font-bold mb-1">ชื่อร้านค้าของคุณ</p>
              <input
                required
                onChange={(e) => setName(e.target.value)}
                name="name"
                placeholder="ชื่อร้านค้า..."
                type="text"
                className="p-3 rounded-xl border border-gray-500 bg-gray-50"
              />
            </div>
            <div className="mb-3">
              <p className="text-xl font-bold mb-1">รายละเอียดร้าน</p>
              <textarea
                required
                onChange={(e) => setDescription(e.target.value)}
                cols={40}
                rows={5}
                name="description"
                placeholder="รายละเอียดร้านค้า..."
                className="p-3 rounded-xl border border-gray-500 bg-gray-50"
              />
            </div>
            <div>
              <p className="text-xl font-bold mb-1">รูปโลโก้ร้านค้าของคุณ</p>
              <div className="">
                <input
                  required
                  onChange={handleLogoFileChange}
                  name="image-logo"
                  id="image-logo"
                  type="file"
                />
              </div>
            </div>
            <div>
              <p className="text-xl font-bold mb-1">รูปพื้นหลังร้านค้าของคุณ</p>
              <div className="">
                <input
                  required
                  onChange={handleBgFileChange}
                  name="image-background"
                  id="image-background"
                  type="file"
                  className="p-4"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button className=" rounded-xl bg-green dark:bg-black py-2 px-6 font-bold text-white  duration-200">
                สร้าง
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateStorePage;
