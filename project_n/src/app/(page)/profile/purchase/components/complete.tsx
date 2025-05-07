"use client";

import { orderDetailInterface } from "@/app/interface/orderDetailInterface";
import {
  GetAllOrderItemsComplete,
} from "@/app/service/orderItem/service";
import { generateKey } from "@/lib/utils";
import { NotebookPen, ReceiptText } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PrintReceipt from "@/app/(page)/test-print-pdf/receipt";
import { useUser } from "@/app/context/userContext";
import OrderItemCard from "./OrderItemCard";

export default function Complete() {
  const {user} = useUser()
  const [OrderDetailComplete, setOrderDetailComplete] = useState<
    orderDetailInterface[]
  >([]);

  const fecthdata = async () => {
    const data = await GetAllOrderItemsComplete(user!.id);
    console.log(data);
    setOrderDetailComplete(data);
  };

  useEffect(() => {
    fecthdata();
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto p-2 space-y-2 ">
      {OrderDetailComplete.map((orderDetail) => (
        <div
          className="bg-gray-50 dark:bg-zinc-900 shadow-lg hover:shadow-none rounded-lg "
          key={generateKey()}
        >
          <div className="flex h-12 p-2 bg-primary rounded-t-lg">
            <div className="flex items-center justify-center text-white font-bold text-xl">
              <p className="">รายการที่ทำเสร็จแล้ว</p>
            </div>
            <div className=""></div>
          </div>
          <div className="space-y-1">
            {orderDetail.OrderItem?.map((orderItem) => (
              <div key={orderItem.id}>
                <OrderItemCard orderItem={orderItem} />
                {/* check over 3 day */}
                {new Date(orderItem.createdAt).getTime() <
                new Date().getTime() - 3 * 24 * 60 * 60 * 1000 ? (
                  <></>
                ) : (
                  <div
                    className="flex justify-end gap-2 p-2 bg-zinc-900 "
                  >
                    <Link
                    href={`/review?pId=${orderItem.productId}`}
                    className="flex rounded-lg px-4 py-2 text-white  bg-primary">
                      <NotebookPen className="mr-1" />
                      รีวิวสินค้า
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex px-2 py-4  justify-end border-t">
          <PDFDownloadLink document={<PrintReceipt user={user!} orderDatail={orderDetail} OrderItems={orderDetail.OrderItem!} payment={orderDetail.payment!} />} fileName="salary-slip.pdf">
            <button className="flex rounded-lg px-4 py-2 text-white bg-gray-600">
              <ReceiptText className="mr-1" />
              ปลิ้นใบเสร็จ
            </button>
            </PDFDownloadLink>
          </div>
        </div>
      ))}
    </div>
  );
}
