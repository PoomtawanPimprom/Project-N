import ReportInfoTable from "./component/reportInfoTable";

const ManageReportPage = () => {
  return (
    <>
      <div className="flex flex-col w-full  ">
        <div className="flex flex-col mx-auto space-y-2 bg-gray-100 p-4">
          <div className=" font-bold text-3xl">
            <p>จัดการคำร้องเรียน</p>
          </div>
          <div className="w-full">
            <ReportInfoTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageReportPage;
