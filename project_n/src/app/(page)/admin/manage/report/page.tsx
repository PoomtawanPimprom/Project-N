import dynamic from "next/dynamic";

const AdminSideBar = dynamic(()=> import("../../AdminSideBar"))
const ReportInfoTable = dynamic(()=> import("./reportInfoTable"))

const ManageReportPage = () => {
  return (
    <div className="min-h-screen flex">
      <AdminSideBar />
      <div className="flex-grow p-6 ">
        <div className="flex flex-col mx-auto space-y-2">
          <div className=" font-bold text-3xl">
            <p>จัดการคำร้องเรียน</p>
          </div>
          <div className="w-full">
            <ReportInfoTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageReportPage;
