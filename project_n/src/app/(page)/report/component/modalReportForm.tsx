"use client";
import Input from "@/app/component/Input";
import Modal from "@/app/component/modal";
import ShowError from "@/app/component/ShowError";
import { reportCategoryInterface } from "@/app/interface/reportCategoryInterface";
import { createReport } from "@/app/service/report/service";
import { getAllReportCategoies } from "@/app/service/reportCategory/service";
import { useToast } from "@/hooks/use-toast";
import { renderError, ReportSchema, validateWithZod } from "@/lib/zod/Schema";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface prop {
  productId: number;
  open: boolean;
  onClose: () => void;
}

const ModalReportForm = ({ productId, open, onClose }: prop) => {
  const {toast} =useToast()
  const { data: session, status } = useSession();
  const [reportCate, setReportCate] = useState<reportCategoryInterface[]>([]);

  const [comment, setComment] = useState("");
  const [selectCate, setSelectCate] = useState("");

  const [error, setError] = useState<{
    [key: string]: { message: string };
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      validateWithZod(ReportSchema, { comment, selectCate });
      const data = {
        comment,
        userId: Number(session?.user.id),
        productId: productId,
        reportCategoryId: Number(selectCate),
        reportStatusId: 1,
      };
      await createReport(data);
      toast({
        description: "ส่งคำรายงานเรียบร้อย",
      });
    } catch (error: any) {
      console.log(error);
      if (error.fieldErrors) {
        setError(error.fieldErrors); // ตั้งค่าข้อผิดพลาดโดยตรง
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    const data = await getAllReportCategoies();
    setReportCate(data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Modal open={open} onClose={onClose}>
        <div className="w-96">
          <p className="text-2xl mb-2">รายงานสินค้า</p>
          <div className="border rounded-xl w-full p-4">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-2 ">
                <h1>หัวข้อ</h1>
                <select
                  required
                  className="border border-gray-200  p-2 rounded-xl"
                  value={0 || selectCate}
                  onChange={(e) => setSelectCate(e.target.value)}
                >
                  <option value={0} className=" text-gray-400">
                    โปรดระบุ
                  </option>
                  {reportCate.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <Input
                labelClassName="text-lg font-medium"
                label="ข้อความ"
                name="comment"
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                placeholder=""
                type=""
                inputClassName="w-full"
                error={error?.comment}
              />
              <div className="flex justify-end space-x-2">
                <div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-white bg-red-600 rounded-xl font-semibold"
                  >
                    ปิด
                  </button>
                </div>
                <div>
                  <button
                    disabled={loading}
                    className="px-4 py-2 bg-green-main text-white rounded-xl font-semibold"
                  >
                    ส่ง
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalReportForm;
