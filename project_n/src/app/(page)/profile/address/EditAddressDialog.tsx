import React, { useState, useEffect } from "react";
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
import { updateUserAddress } from "@/app/service/address/service";
import { MdEdit } from "react-icons/md";
import { userAddressSchema, validateWithZod } from "@/lib/zod/Schema";
import Input from "@/app/component/Input";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

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

interface EditAddressDialogProps {
  address: userAddressInterface;
  onAddressUpdated: () => void;
  classNameButton?: string;
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
      <label htmlFor={label} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={label}
        value={value ?? ""}
        onChange={onChange}
        className="focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
      >
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

export const EditAddressDialog: React.FC<EditAddressDialogProps> = ({ address, onAddressUpdated, classNameButton }) => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [subDistricts, setSubDistricts] = useState<SubDistrict[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string | number>();
  const [selectedDistrict, setSelectedDistrict] = useState<string | number>();
  const [selectedSubDistrict, setSelectedSubDistrict] = useState< string | number >();
  const [addressData, setAddressData] = useState<userAddressInterface>(address);
  const { toast } = useToast();
  const [error, setError] = useState<{ [key: string]: { message: string } } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Fetch provinces and initialize selections
  const initializeLocationData = async () => {
    try {
      // Fetch provinces
      const provincesRes = await fetch("https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json");
      const provincesJson = await provincesRes.json();
      setProvinces(provincesJson);

      // Find and set selected province
      const selectedProvinceData = provincesJson.find( (p: Province) => p.name_th === address.province );
      if (selectedProvinceData) {
        setSelectedProvince(selectedProvinceData.id);

        // Fetch districts for selected province
        const districtsRes = await fetch("https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_amphure.json");
        const districtsJson = await districtsRes.json();
        const filteredDistricts = districtsJson.filter( (d: District) => d.province_id === selectedProvinceData.id );
        setDistricts(filteredDistricts);

        // Find and set selected district
        const selectedDistrictData = filteredDistricts.find(
          (d: District) => d.name_th === address.district
        );
        if (selectedDistrictData) {
          setSelectedDistrict(selectedDistrictData.id);

          // Fetch subdistricts for selected district
          const subDistrictsRes = await fetch("https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_tambon.json");
          const subDistrictsJson = await subDistrictsRes.json();
          const filteredSubDistricts = subDistrictsJson.filter(
            (sd: SubDistrict) => sd.amphure_id === selectedDistrictData.id
          );
          setSubDistricts(filteredSubDistricts);

          // Find and set selected subdistrict
          const selectedSubDistrictData = filteredSubDistricts.find(
            (sd: SubDistrict) => sd.name_th === address.subDistrict
          );
          if (selectedSubDistrictData) {
            setSelectedSubDistrict(selectedSubDistrictData.id);
          }
        }
      }
    } catch (error) {
      console.error("Error initializing location data:", error);
    }
  };

  // Handle province change
  const onChangeProvince = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const index = event.target.selectedIndex;
    const label = event.target.options[index].text;
    const provinceId = event.target.value;
    try {
      setSelectedProvince(provinceId);
      setSelectedDistrict(undefined);
      setSelectedSubDistrict(undefined);
      setDistricts([]);
      setSubDistricts([]);
      setAddressData((prevState) => ({
        ...prevState,
        province: label,
        district: "",
        subDistrict: "",
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
  const onChangeAmphure = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
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
        subDistrict: "",
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        addressStatusId: Number(addressData.addressStatusId),
      };
      console.log(addressData.id);

      //validate data
      validateWithZod(userAddressSchema, data);

      //update data
      await updateUserAddress(addressData.id, data);
      onAddressUpdated();
      toast({
        title: "แก้ไขที่อยู่สำเร็จ",
        variant: "success",
    });
    } catch (error: any) {
      if (error.fieldErrors) {
        setError(error.fieldErrors);
      }
      console.error("Validation error:", error);
      toast({
        title: "แก้ไขที่อยู่ไม่สำเร็จ",
        variant: "destructive",
    });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initializeLocationData();
  }, [address]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button 
          className={cn(`w-full sm:w-auto px-4 py-2 text-white bg-gray-600 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2`,classNameButton)}>
          <MdEdit />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>แก้ไขที่อยู่</DialogTitle>
          <DialogDescription>
            แก้ไขข้อมูลที่อยู่ของคุณด้านล่าง
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Input
                label="ชื่อ-นามสกุล"
                labelClassName="block text-sm font-medium text-gray-700"
                required={true}
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
                labelClassName="block text-sm font-medium text-gray-700"
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
                labelClassName="block text-sm font-medium text-gray-700"
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
                labelClassName="block text-sm font-medium text-gray-700"
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
                labelClassName="block text-sm font-medium text-gray-700"
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
                className={`${loading ? "bg-gray-600/10":""} px-4 py-2 text-sm text-white bg-gray-600 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2`}
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
