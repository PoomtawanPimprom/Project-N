import Modal from "@/app/component/modal";
import { userAddressInterface } from "@/app/interface/userAddressInterface";
import { userInterface } from "@/app/interface/userInterface";
import { useEffect, useState } from "react";
import { UpdateAddressAction } from "./action";
import { CirclePlus } from "lucide-react";

type Modalprop = {
  user: userInterface;
  open: boolean;
  allUserAddress: userAddressInterface[];
  defalutAddress: userAddressInterface;
  onClose: () => void;
  closeSelectOpenCreateAddress: () => void;
};

export default function SelectAddressModal({
  open,
  user,
  allUserAddress,
  defalutAddress,
  onClose,
  closeSelectOpenCreateAddress,
}: Modalprop) {
  const [selectAddress, setSelectAddress] = useState<userAddressInterface>();
  const UpdateAddressActionBindUserId = UpdateAddressAction.bind(null, {
    userId: user.id,
    defalutAddressId: defalutAddress?.id,
  });

  const concatAddress = (address: userAddressInterface) => {
    return `${address.houseNo}, ม.${address.moo}, ต.${address.subDistrict}, อ.${address.district}, จ.${address.province}, ${address.postalCode}`;
  };
  useEffect(() => {
    // Set the default address when the modal is opened
    if (defalutAddress) {
      setSelectAddress(defalutAddress);
    }
  }, [defalutAddress]);



  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col w-64 sm:w-96 ">
        <form action={UpdateAddressActionBindUserId} className="space-y-2">
          <div className="flex font-bold text-xl">
            <p>ที่อยู่ของฉัน</p>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col space-y-1">
              {allUserAddress.map((item, index) => (
                <div
                  key={index}
                  className="flex  w-full border p-3 space-x-3 rounded-lg"
                >
                  <div className="flex  mx-2">
                    <input
                      type="radio"
                      name="address"
                      value={item.id}
                      checked={selectAddress?.id === item.id}
                      onChange={() => setSelectAddress(item)}
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <div className="flex font-bold">{item.fullName}</div>
                    <div className="flex text-sm">{concatAddress(item)}</div>
                    <div className="flex text-sm">{item.mobile}</div>
                  </div>
                  <div className="flex text-green-main">
                    <button type="button">แก้ไข</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex w-full justify-between space-x-2 font-semibold">
            <div>
              <button
                type="button"
                onClick={closeSelectOpenCreateAddress}
                className="flex px-2 py-4 border rounded-lg justify-center font-bold"
              >
                <CirclePlus className="mr-2" />
                <p>สร้างที่อยู่ใหม่</p>
              </button>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={onClose}
                type="button"
                className="flex py-2 px-4 rounded-lg border  border-gray-400 items-center"
              >
                ยกเลิก
              </button>
              <button
                onClick={onClose}
                className="flex py-2 px-4 rounded-lg bg-primary text-white  items-center"
              >
                ยืนยัน
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
}
