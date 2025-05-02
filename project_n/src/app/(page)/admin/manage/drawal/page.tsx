"use client";
import { z } from "zod";
import { WithDrawalRequestInterface } from "@/app/interface/withDrawalRequestInterface";
import {
  getAllDrawalRequestToApprove,
  updateApproveStatusDrawal,
  updateRejectStatusDrawal,
} from "@/app/service/withdrawal-request/service";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/app/context/userContext";
import { validateWithZod } from "@/lib/zod/Schema";

const AdminSideBar = dynamic(() => import("../../AdminSideBar"));
const rejectMessageSchema = z.object({
  message: z.string().min(5, "ข้อความต้องมีอย่างน้อย 5 ตัวอักษร").max(80,"ข้อความต้องไม่เกิน 80 ตัวอักษร"),
});

export default function DrawalPage() {
  const { user } = useUser();
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [isRejecting, setIsRejecting] = useState(false);
  const [drawal, setDrawal] = useState<WithDrawalRequestInterface[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] =
    useState<WithDrawalRequestInterface | null>(null);

  const fetchData = async () => {
    const res = await getAllDrawalRequestToApprove();
    setDrawal(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRejectClick = () => {
    setIsRejecting(true); // เปิด Dialog พิมพ์ข้อความ
  };

  const handleOpenDialog = (request: WithDrawalRequestInterface) => {
    setSelectedRequest(request);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedRequest(null);
  };

  const handleReject = async (drawalId: number | string) => {
    try {
      validateWithZod(rejectMessageSchema,{message})
      const res = await updateRejectStatusDrawal(drawalId, user?.id!,message);
      handleCloseDialog();
      toast({
        variant: "success",
        description: res.message,
      });
      setIsRejecting(false);
      setMessage("");
      fetchData();
    } catch (error: any) {
      console.log(error)
      if(error.fieldErrors){
        toast({
          variant: "destructive",
          description: error.fieldErrors.message.message,
        });
      }
      else{

        toast({
          variant: "destructive",
          description: error.message,
        });
      }
    }
  };

  const handleApprove = async (drawalId: number | string) => {
    try {
      const res = await updateApproveStatusDrawal(drawalId, user?.id!);
      handleCloseDialog();
      toast({
        variant: "success",
        description: res.message,
      });
      fetchData();
    } catch (error: any) {
      toast({
        variant: "destructive",
        description: error.message,
      });
    }
  };

  const formatDate = (dateString: any) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()} ${date.getHours()}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen flex">
      <AdminSideBar />
      <div className="flex-grow p-6">
        <div className="flex flex-col mx-auto space-y-4">
          <div className="font-bold text-3xl">
            <p>จัดการการเบิกเงิน</p>
          </div>
          <div className="w-full">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-left border-b">
                      เลขที่บัญชี
                    </th>
                    <th className="py-3 px-4 text-left border-b">ชื่อบัญชี</th>
                    <th className="py-3 px-4 text-left border-b">ธนาคาร</th>
                    <th className="py-3 px-4 text-left border-b">จำนวนเงิน</th>
                    <th className="py-3 px-4 text-left border-b">
                      วันที่สร้าง
                    </th>
                    <th className="py-3 px-4 text-left border-b">สถานะ</th>
                    <th className="py-3 px-4 text-left border-b">การจัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  {drawal.length > 0 ? (
                    drawal.map((request, index) => (
                      <tr
                        key={`${index} request`}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="py-2 px-4 border-b">
                          {request.accountNumber}
                        </td>
                        <td className="py-2 px-4 border-b">
                          {request.accountName}
                        </td>
                        <td className="py-2 px-4 border-b">
                          {request.bankName}
                        </td>
                        <td className="py-2 px-4 border-b">
                          {request.amount.toLocaleString()} บาท
                        </td>
                        <td className="py-2 px-4 border-b">
                          {formatDate(request.createdAt)}
                        </td>
                        <td className="py-2 px-4 border-b">
                          {request.statusId === 1 ? (
                            <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                              รออนุมัติ
                            </span>
                          ) : request.statusId === 2 ? (
                            <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                              อนุมัติแล้ว
                            </span>
                          ) : (
                            <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                              ปฏิเสธ
                            </span>
                          )}
                        </td>
                        <td className="py-2 px-4 border-b">
                          <button
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                            onClick={() => handleOpenDialog(request)}
                          >
                            จัดการ
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="text-center py-8 border-b">
                        ไม่พบข้อมูลการเบิกเงิน
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Dialog for withdrawal request details */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>รายละเอียดการเบิกเงิน</DialogTitle>
            <DialogDescription>
              กรุณาตรวจสอบข้อมูลก่อนดำเนินการ
            </DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="font-medium">เลขที่บัญชี:</div>
                <div className="col-span-2">
                  {selectedRequest.accountNumber}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="font-medium">ชื่อบัญชี:</div>
                <div className="col-span-2">{selectedRequest.accountName}</div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="font-medium">ธนาคาร:</div>
                <div className="col-span-2">{selectedRequest.bankName}</div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="font-medium">จำนวนเงิน:</div>
                <div className="col-span-2">
                  {selectedRequest.amount.toLocaleString()} บาท
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="font-medium">วันที่สร้าง:</div>
                <div className="col-span-2">
                  {formatDate(selectedRequest.createdAt)}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="font-medium">สถานะ:</div>
                <div className="col-span-2">
                  {selectedRequest.statusId === 1
                    ? "รออนุมัติ"
                    : selectedRequest.statusId === 2
                    ? "อนุมัติแล้ว"
                    : "ปฏิเสธ"}
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="flex justify-between sm:justify-between">
            <button
              type="button"
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={handleRejectClick}
            >
              ปฏิเสธ
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={() => handleApprove(selectedRequest!.id!)}
            >
              อนุมัติ
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isRejecting} onOpenChange={setIsRejecting}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>เหตุผลในการปฏิเสธ</DialogTitle>
            <DialogDescription>
              กรุณาระบุเหตุผลที่ต้องการปฏิเสธคำขอนี้
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <textarea
              className="w-full p-2 border rounded"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="ระบุเหตุผล..."
            />
          </div>

          <DialogFooter className="flex justify-end">
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              onClick={() => setIsRejecting(false)}
            >
              ยกเลิก
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ml-2"
              onClick={()=> handleReject(selectedRequest!.id!)}
            >
              ยืนยันการปฏิเสธ
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
