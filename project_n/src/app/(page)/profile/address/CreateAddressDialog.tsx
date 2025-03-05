// React Hooks
import React, { useEffect, useState } from "react";
// Shadcn ui
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { userAddressInterface } from "@/app/interface/userAddressInterface";
import { createAddress } from "@/app/service/address/service";
import { userAddressSchema, validateWithZod } from "@/lib/zod/Schema";
import Input from "@/app/component/Input";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

type Province = {
  id: number;
  name_th: string;
  name_en: string;
};

type District = {
  id: number;
  province_id: number;
  name_th: string;
  name_en: string;
};

type SubDistrict = {
  id: number;
  zip_code: number;
  name_th: string;
  name_en: string;
  amphure_id: number;
};

type DropdownProps<T> = {
  label: string;
  options: T[];
  value: string | number | undefined;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  optionLabel: (item: T) => string;
  optionValue: (item: T) => string | number;
};

interface CreateAddressDialogProps {
  classNameButton?: string;
  onAddressCreated: () => void;
  userId: number;
}

const Dropdown = <T,>({
  label,
  options,
  value,
  onChange,
  optionLabel,
  optionValue,
}: DropdownProps<T>) => {
  return (
    <div>
      <label htmlFor={label} className="dark:text-white block text-sm font-medium text-gray-700">{label}</label>
      <select id={label} value={value ?? ""} onChange={onChange} className="focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm">
        <option value="">เลือก...</option>
        {options.map((item, index) => (
          <option key={index} value={optionValue(item)}>
            {optionLabel(item)}
          </option>
        ))}
      </select>
    </div>
  );
};

export const CreateAddressDialog: React.FC<CreateAddressDialogProps> = ({ onAddressCreated, userId, classNameButton }) => {
  const router =  useRouter()
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [subDistricts, setSubDistricts] = useState<SubDistrict[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string | number>();
  const [selectedDistrict, setSelectedDistrict] = useState<string | number>();
  const [selectedSubDistrict, setSelectedSubDistrict] = useState<string | number>();

  const [error, setError] = useState<{ [key: string]: { message: string }; } | null>(null);
  const [loading, setLoading] = useState(false);

  const [addressData, setAddressData] = useState<userAddressInterface>({
    id: 0,
    fullName: "",
    houseNo: "",
    moo: "",
    province: "",
    district: "",
    subDistrict: "",
    postalCode: "",
    mobile: "",
    userId: userId,
    addressStatusId: 1,
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressData((prevState) => ({
      ...prevState,
      [name]: name === "addressStatusId" ? Number(value) : value,
    }));
  };

  const resetForm = () => {
    setAddressData({
      id: 0,
      fullName: "",
      houseNo: "",
      moo: "",
      province: "",
      district: "",
      subDistrict: "",
      postalCode: "",
      mobile: "",
      userId: userId,
      addressStatusId: 1,
    });
    setSelectedProvince(undefined);
    setSelectedDistrict(undefined);
    setSelectedSubDistrict(undefined);
  };

  // Fetch provinces
  const fetchProvinces = async () => {
    try {
      const res = await fetch(
        "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json"
      );
      const json = await res.json();
      setProvinces(json);
    } catch (err: any) {
      console.error("Error fetching provinces:", err.message);
    }
  };

  // Handle province change
  const onChangeProvince = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const index = event.target.selectedIndex;   // Get index of selected province
    const label = event.target.options[index].text; // Get label for selected province
    const provinceId = event.target.value; // Get selected province
    try {
      setSelectedProvince(provinceId);
      setSelectedDistrict(undefined); // Set default selected
      setSelectedSubDistrict(undefined); // Set default selected
      setDistricts([]);
      setSubDistricts([]);
      setAddressData((prevState) => ({
        ...prevState,
        province: label,
        postalCode: "",
      }));

      const res = await fetch(
        "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_amphure.json"
      );
      const json = await res.json();
      const filteredDistricts = json.filter(
        (item: any) => item.province_id === Number(provinceId)
      );
      setDistricts(filteredDistricts);
    } catch (err: any) {
      console.error("Error fetching districts:", err.message);
    }
  };

  // Handle district change
  const onChangeAmphure = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const index = event.target.selectedIndex;
    const label = event.target.options[index].text;
    const amphureId = event.target.value;
    try {
      setSelectedDistrict(amphureId);
      setSelectedSubDistrict(undefined);
      setSubDistricts([]);
      setAddressData((prevState) => ({
        ...prevState,
        district: label,
        postalCode: "",
      }));

      const res = await fetch(
        "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_tambon.json"
      );
      const json = await res.json();
      const filteredSubDistrict = json.filter(
        (item: any) => item.amphure_id === Number(amphureId)
      );
      setSubDistricts(filteredSubDistrict);
    } catch (err: any) {
      console.error("Error fetching sub-districts:", err.message);
    }
  };

  const onChangeSubDistrict = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const index = event.target.selectedIndex;
    const label = event.target.options[index].text;
    const subDistrictId = Number(event.target.value);

    const selectedSubDistrictData = subDistricts.find(
      (item) => item.id === subDistrictId
    );
    setAddressData((prevState) => ({
      ...prevState,
      subDistrict: label,
      postalCode: String(selectedSubDistrictData?.zip_code),
    }));
    setSelectedSubDistrict(event.target.value);
  };

  const addDataAddress = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = {
        fullName: addressData.fullName,
        houseNo: addressData.houseNo,
        moo: addressData.moo,
        province: addressData.province,
        district: addressData.district,
        subDistrict: addressData.subDistrict,
        postalCode: addressData.postalCode,
        mobile: addressData.mobile,
        userId: userId,
        addressStatusId: Number(addressData.addressStatusId),
      };
      //validate data
      validateWithZod(userAddressSchema, data);

      //create new address
      await createAddress(data);
      router.refresh()
      //fetch
      onAddressCreated();
      resetForm();
    } catch (error: any) {
      if (error.fieldErrors) {
        setError(error.fieldErrors); 
      }
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchProvinces();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button onClick={resetForm} className={cn(`w-full sm:w-auto px-4 py-2 text-white bg-gray-600 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2`, classNameButton)}>
          + เพิ่มที่อยู่
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>เพิ่มที่อยู่</DialogTitle>
          <DialogDescription>
            สร้างข้อมูลที่อยู่ใหม่ของคุณด้านล่าง
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={addDataAddress}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div>
              <Input label="ชื่อ-นามสกุล" labelClassName="dark:text-white block text-sm font-medium text-gray-700" required={true}
                name="fullName"
                value={addressData.fullName}
                onChange={handleInput}
                inputClassName="border-none focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                placeholder="ชื่อ-นามสกุล"
                type=""
                error={error?.fullName}
              />
            </div>

            <div>
              <Input
                label="เบอร์มือถือ"
                labelClassName="dark:text-white block text-sm font-medium text-gray-700"
                required={true}
                name="mobile"
                value={addressData.mobile}
                onChange={handleInput}
                inputClassName="border-none focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                placeholder="เบอร์มือถือ"
                type=""
                error={error?.mobile}
              />
            </div>

            <div>
              <Input
                label="บ้านเลขที่"
                labelClassName="dark:text-white block text-sm font-medium text-gray-700"
                required={true}
                name="houseNo"
                value={addressData.houseNo}
                onChange={handleInput}
                inputClassName="border-none focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                placeholder="บ้านเลขที่"
                type=""
                error={error?.houseNo}
              />
            </div>

            <div>
              <Input
                label="หมู่"
                labelClassName="dark:text-white block text-sm font-medium text-gray-700"
                name="moo"
                value={addressData.moo}
                onChange={handleInput}
                inputClassName="border-none focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                placeholder="หมู่"
                type=""
                error={error?.moo}
              />
            </div>

            <Dropdown
              label="จังหวัด"
              options={provinces}
              value={selectedProvince}
              onChange={onChangeProvince}
              optionLabel={(item) => `${item.name_th}`}
              optionValue={(item) => item.id}
            />
            {error?.province && (
              <p className="text-sm text-red-500 mt-1 animate-fade-in">
                {error.province.message}
              </p>
            )}
            <Dropdown
              label="อำเภอ"
              options={districts}
              value={selectedDistrict}
              onChange={onChangeAmphure}
              optionLabel={(item) => `${item.name_th}`}
              optionValue={(item) => item.id}
            />
            {error?.district && (
              <p className="text-sm text-red-500 mt-1 animate-fade-in">
                {error.district.message}
              </p>
            )}
            <Dropdown
              label="ตำบล"
              options={subDistricts}
              value={selectedSubDistrict}
              onChange={onChangeSubDistrict}
              optionLabel={(item) => `${item.name_th}`}
              optionValue={(item) => item.id}
            />
            {error?.subDistrict && (
              <p className="text-sm text-red-500 mt-1 animate-fade-in">
                {error.subDistrict.message}
              </p>
            )}
            <div>
              <Input
                label="รหัสไปรษณีย์"
                labelClassName="dark:text-white block text-sm font-medium text-gray-700"
                required={true}
                name="postalCode"
                value={addressData.postalCode}
                onChange={handleInput}
                inputClassName="border-none focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                placeholder="รหัสไปรษณีย์"
                type=""
                error={error?.postalCode}
              />
            </div>

            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={addressData.addressStatusId === 2}
                  onChange={(e) => setAddressData((prevState) => ({
                    ...prevState,
                    addressStatusId: e.target.checked ? 2 : 1,
                  }))}
                />
                <span>ตั้งเป็นค่าเริ่มต้น</span>
              </label>
            </div>

          </div>

          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <button
                type="button"
                className="px-4 py-2 text-sm text-gray-700 bg-white border rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                ยกเลิก
              </button>
            </DialogClose>
            <div>
              <button
                disabled={loading}
                type="submit"
                className={`${loading ? "bg-gray-600/10" : ""} px-4 py-2 text-sm text-white bg-gray-600 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2`}
              >
                บันทึก
              </button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
