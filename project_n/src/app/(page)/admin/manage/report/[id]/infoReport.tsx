import { reportInterface } from "@/app/interface/reportInterface";
import { reportStatusInterface } from "@/app/interface/reportStatusInterface";
import prisma from "@/lib/prisma/db";
import { Calendar, MessageCircle, Package, User } from "lucide-react";
import { ManageReportAction } from "./action";

interface prop {
  reportId: number;
}

const InfoReportComponent = async ({ reportId }: prop) => {
  const manageReportActionWithReportId = ManageReportAction.bind(
    null,
    reportId
  );
  const report = (await prisma.report.findUnique({
    where: { id: reportId },
    include: {

      user: { select: { id: true, name: true } },
      reportStatus: { select: { id: true, name: true } },
    },
  })) as reportInterface | null;

  const reportStatus =
    (await prisma.reportStatus.findMany()) as reportStatusInterface[];

  return (
    <>
      <div className="flex  gap-3 mx-auto p-4 ">
        <div className="flex flex-col border  bg-gray-50 p-4 rounded-xl shadow-xl space-y-4">
          {/* header */}
          <div className="flex flex-row text-4xl mt-2 w-full">
            <p className=" font-bold">รายงานปัญหาสินค้า</p>
          </div>
          <div className="h-[1px] bg-gray-200"></div>
          {/* body */}
          <div className=" grid grid-cols-2 w-full gap-2 ">
            <div className="grid grid-rows-3 space-y-2">
              <div className="flex">
                <div className="mr-2">
                  <User />
                </div>
                <div className="flex-col">
                  <p className=" text-gray-500">ผู้รายงาน</p>
                  <p className="font-semibold">{report?.user?.name}</p>
                </div>
              </div>
              <div className="flex">
                <div className="mr-2">
                  <Package />
                </div>
                <div className="flex-col">
                  <p className=" text-gray-500">สินค้า</p>
                  <p className="font-semibold">{report?.product?.name}</p>
                </div>
              </div>
              <div className="flex">
                <div className="mr-2">
                  <Calendar />
                </div>
                <div className="flex-col">
                  <p className=" text-gray-500">วันที่รายงาน</p>
                  <p className="font-semibold">
                    {report?.createdAt
                      ? new Date(report.createdAt).toLocaleDateString("th-TH")
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-rows-3">
              <div>
                <p className="text-gray-500">สถานะของรายงาน</p>
                <p className="font-semibold">{report?.reportStatus?.name}</p>
              </div>
            </div>
          </div>
          <div className="h-[1px] bg-gray-200"></div>

          {/* footer */}
          <div>
            <div className="flex">
              <div className="mr-2">
                <MessageCircle />
              </div>
              <div>
                <p className=" text-gray-500">รายละเอียดปัญหา</p>
                <p>{report?.comment}</p>
              </div>
            </div>
          </div>
          <div className="h-[1px] bg-gray-200"></div>
          <div className="flex flex-col space-y-1">
            <div className="flex">
              <p>จัดการสถานะ</p>
            </div>
            <div className="flex w-full">
              <form
                action={manageReportActionWithReportId}
                className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 space-x-2 w-full"
              >
                <select
                  name="selectReportStatus"
                  className="p-2 w-full sm:w-96 border rounded-xl"
                  defaultValue={report?.reportStatusId}
                >
                  {reportStatus.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <button
                  className="py-2 px-4 bg-black text-white rounded-lg"
                  type="submit"
                >
                  อัพเดทสถานะ
                </button>
              </form>
            </div>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default InfoReportComponent;
