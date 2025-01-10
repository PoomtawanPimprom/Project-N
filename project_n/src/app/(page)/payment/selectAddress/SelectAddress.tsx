"use client";

import { CirclePlus, MapPin } from "lucide-react";
import { useState } from "react";

import CreateNewAddressModal from "./CreateNewAddress-Modal";
import SelectAddressModal from "./SelectAddress-Modal";

import { userInterface } from "@/app/interface/userInterface";
import { userAddressInterface } from "@/app/interface/userAddressInterface";

type SelectAddressProps = {
  user: userInterface;
  AllUserAddress: userAddressInterface[];
  default_address: userAddressInterface;
};

export default function SelectAddress({
  user,
  AllUserAddress,
  default_address
}: SelectAddressProps) {
  const [openModalSelectAdd, setOpenModalSelectAdd] = useState(false);
  const [openModalCreateNewAdd, setOpenModalCreateNewAdd] = useState(false);

  const concatAddress = (address: userAddressInterface) => {
    if (address == null) {
      return;
    }
    return `${address.houseNo}, ม.${address.moo}, ต.${address.subDistrict}, อ.${address.district}, จ.${address.province}, ${address.postalCode}`;
  };

  return (
    <div className="flex flex-col w-full mx-auto p-4 border border-gray-300 rounded-xl space-y-2">
      <div className="flex font-bold text-xl">
        <MapPin className="mr-2" />
        <p>ที่อยู่ในการจัดส่ง</p>
      </div>
      {/* Have default address yet?? */}
      {default_address != null ? (
        //in case have address
        <>
          <div className="flex space-x-2 text-sm sm:text-base md:text-lg">
            <div className="flex p-2 font-semibold">
              {default_address.fullName}
            </div>
            <div className="flex p-2">{concatAddress(default_address!)}</div>
            <div className="flex">
              <button
                onClick={() => {
                  setOpenModalSelectAdd(true);
                }}
                className="h-fit px-4 py-2 rounded-lg bg-green-main text-white font-semibold"
              >
                เปลี่ยน
              </button>
            </div>
          </div>
        </>
      ) 
      // in case have address but don't have default address
      : AllUserAddress != null ? (
        <>
          <div className="flex space-x-2 text-sm sm:text-base md:text-lg">
            <div className="flex w-full">
              <button
                onClick={() => {
                  setOpenModalSelectAdd(true);
                }}
                className="flex w-full p-4 border rounded-lg justify-center font-bold"
              >
                เลือกที่อยู่
              </button>
            </div>
          </div>
        </>
      ) : (
        //case dosent have any address
        <>
          <div className="flex space-x-2 text-sm sm:text-base md:text-lg">
            <div className="flex w-full">
              <button
                onClick={() => {
                  setOpenModalCreateNewAdd(true);
                }}
                className="flex w-full p-4 border rounded-lg justify-center font-bold"
              >
                <CirclePlus className="mr-2" />
                <p>สร้างที่อยู่ใหม่</p>
              </button>
            </div>
          </div>
        </>
      )}

      <CreateNewAddressModal
        user={user}
        onClose={() => setOpenModalCreateNewAdd(false)}
        open={openModalCreateNewAdd}
      />
      
      <SelectAddressModal
        closeSelectOpenCreateAddress={() => {
          setOpenModalSelectAdd(false);
          setOpenModalCreateNewAdd(true);
        }}
        allUserAddress={AllUserAddress}
        defalutAddress={default_address}
        user={user}
        onClose={() => setOpenModalSelectAdd(false)}
        open={openModalSelectAdd}
      />
    </div>
  );
}
