"use client";
import { MapPin, Truck } from "lucide-react";
import { orderItemInterface } from "@/app/interface/orderItemInterface";
import { userAddressInterface } from "@/app/interface/userAddressInterface";
import { useRouter } from "next/navigation";
import { UpdateOrderStatus } from "@/app/service/(payment)/service";
import Table from "@/app/component/table/Table";
import TableHeader from "@/app/component/table/TableHeader";
import TableRow from "@/app/component/table/TableRow";
import TableHead from "@/app/component/table/TableHead";
import TableBody from "@/app/component/table/TableBody";
import TableData from "@/app/component/table/Tabledata";

type prop = {
  products: orderItemInterface[];
  userAddress: userAddressInterface[];
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
      <div className="min-w-full inline-block align-middle  rounded-lg">
        <div className="overflow-hidden  rounded-lg">
          {/* Desktop view */}
          <Table className="min-w-full hidden md:table">
            <TableHeader className="text-sm 2xl:text-base  text-gray-800  bg-gray-50 dark:bg-black dark:text-accent-foreground">
              <TableRow className="font-semibold">
                <TableHead className="px-4 py-3 text-left text-sm  ">
                  ชื่อสินค้า
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-sm  ">
                  สี
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-sm  ">
                  ไซส์
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-sm  ">
                  จำนวน
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-sm  ">
                  ที่อยู่ผู้รับ
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-sm hidden lg:table-cell ">
                  สถานะ
                </TableHead>
                <TableHead className="px-4 py-3 text-right text-sm  ">
                  จัดการสถานะ
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((item, index) => (
                <TableRow
                  key={index}
                  className="bg-white border-b dark:bg-zinc-900  hover:bg-gray-50 dark:hover:bg-zinc-600"
                >
                  <TableData className="px-4 py-4 whitespace-nowrap text-sm  ">
                    {item.product?.name}
                  </TableData>
                  <TableData className="px-4 py-4 whitespace-nowrap text-sm">
                    {item.color ? item.color : "-"}
                  </TableData>
                  <TableData className="px-4 py-4 whitespace-nowrap text-sm">
                    {item.size ? item.size : "-"}
                  </TableData>
                  <TableData className="px-4 py-4 whitespace-nowrap text-sm ">
                    {item.quantity}
                  </TableData>

                  <TableData className="px-4 py-4 text-sm">
                    {/* ที่อยู่ */}
                    {(() => {
                      const address = userAddress.find(
                        (addr) => addr.id === item.userAddressId
                      );

                      return (
                        <div className="flex flex-col xl:flex-row gap-2">
                          <p className="font-semibold">
                            {address?.fullName || "-"}
                          </p>
                          {address ? (
                            <div className="flex flex-wrap gap-x-1">
                              {" "}
                              {/* ✅ ใช้ `flex-wrap` เพื่อให้ขึ้นบรรทัดใหม่เมื่อหน้าจอแคบ */}
                              <span>{address.houseNo}</span>
                              <span>ม.{address.moo},</span>
                              <span>ต.{address.subDistrict},</span>
                              <span>อ.{address.district},</span>
                              <span>จ.{address.province},</span>
                              <span>{address.postalCode}</span>
                            </div>
                          ) : (
                            <p>-</p>
                          )}
                        </div>
                      );
                    })()}
                </TableData>
                  <TableData className="px-4 py-4 hidden lg:table-cell whitespace-nowrap text-sm  ">
                    {item.orderItemStatus?.name}
                  </TableData>
                  <TableData className="px-4 py-4 whitespace-nowrap text-right text-sm">
                    {item.orderItemStatusId !== 3 && (
                      <button
                        onClick={async () => await handleOnShip(item.id)}
                        className="px-3 py-2 bg-primary text-white rounded-md hover:bg-green-600 transition"
                      >
                        ดำเนินการ
                      </button>
                    )}
                  </TableData>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Mobile view */}
          <div className="w-full space-y-4 md:hidden">
            {products.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-black shadow-md rounded-lg p-4 border border-gray-200 dark:border-zinc-800"
              >
                <div className="flex justify-between items-start mb-3 ">
                  <div className="">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {item.product?.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-zinc-400">
                      {item.color || "-"} / {item.size || "-"}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-gray-800 dark:text-zinc-100">
                      x {item.quantity}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-zinc-700  p-3 rounded-md mb-3">
                  {(() => {
                    const address = userAddress.find(
                      (addr) => addr.id === item.userAddressId
                    );

                    return (
                      <div className="">
                        <div className="flex items-center mb-2 ">
                          <MapPin className="w-5 h-5 mr-2 text-blue-500" />
                          <span className="font-medium text-gray-700 dark:text-zinc-100">
                            {address?.fullName || "-"}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-zinc-400">
                          {address ? concatAddress(address) : "-"}
                        </p>
                      </div>
                    );
                  })()}
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm text-gray-600 dark:text-zinc-300">
                    <Truck className="w-5 h-5 mr-2" />
                    <span>สถานะ: {item.orderItemStatus?.name}</span>
                  </div>
                  <div className="space-x-2">
                    {item.orderItemStatusId !== 3 && (
                      <button
                        onClick={async () => await handleOnShip(item.id)}
                        className="px-3 py-2 bg-primary text-white rounded-md hover:bg-green-600 transition"
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
