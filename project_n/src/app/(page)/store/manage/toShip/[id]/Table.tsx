"use client";
import { MapPin, Truck } from "lucide-react";
import { orderItemInterface } from "@/app/interface/orderItemInterface";
import { userAddressInterface } from "@/app/interface/userAddressInterface";
import { useRouter } from "next/navigation";
import { UpdateOrderStatus } from "@/app/service/(payment)/service";

type prop = {
  products: orderItemInterface[];
  userAddress: userAddressInterface;
};

const DataTable = ({ products, userAddress }: prop) => {
  const router = useRouter();
  const concatAddress = (address: userAddressInterface) => {
    if (address == null) {
      return;
    }
    return `${address.houseNo}, ม.${address.moo}, ต.${address.subDistrict}, อ.${address.district}, จ.${address.province}, ${address.postalCode}`;
  };

  const handleOnShip = async (orderItemId: number) => {
    await UpdateOrderStatus({ orderItemId });
    router.refresh();
  };
  return (
    <div className="w-full overflow-x-auto rounded-lg border">
      <div className="min-w-full inline-block align-middle">
        <div className="overflow-hidden">
          {/* Desktop view */}
          <table className="min-w-full hidden md:table">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  ชื่อสินค้า
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  สี
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  ไซส์
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  จำนวน
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  ที่อยู่ผู้รับ
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  สถานะ
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                  จัดการสถานะ
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.product?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {item.color ? item.color : "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {item.size ? item.size : "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm  text-gray-600">
                    {item.quantity}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm  text-gray-600">
                    {/* ที่อยู่ */}
                    <div className="flex flex-col xl:flex-row gap-2">
                      <p className="flex font-semibold">
                        {userAddress.fullName}
                      </p>
                      <p className="flex">{concatAddress(userAddress)}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm  text-gray-600">
                    {item.orderItemStatus?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    {item.orderItemStatusId !== 3 && (
                      <button
                        onClick={async () => await handleOnShip(item.id)}
                        className="px-3 py-2 bg-green-main text-white rounded-md hover:bg-green-600 transition"
                      >
                        ดำเนินการ
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile view */}
          <div className="w-full space-y-4 md:hidden">
            {products.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {item.product?.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {item.color || "-"} / {item.size || "-"}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-gray-800">
                      x {item.quantity}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-md mb-3">
                  <div className="flex items-center mb-2">
                    <MapPin className="w-5 h-5 mr-2 text-blue-500" />
                    <span className="font-medium text-gray-700">
                      {userAddress.fullName}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {concatAddress(userAddress)}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm text-gray-600">
                    <Truck className="w-5 h-5 mr-2" />
                    <span>สถานะ: {item.orderItemStatus?.name}</span>
                  </div>
                  <div className="space-x-2">
                    {item.orderItemStatusId !== 3 && (
                      <button
                        onClick={async () => await handleOnShip(item.id)}
                        className="px-3 py-2 bg-green-main text-white rounded-md hover:bg-green-600 transition"
                      >
                        ดำเนินการ
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
