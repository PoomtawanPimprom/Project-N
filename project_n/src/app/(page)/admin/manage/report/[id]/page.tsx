import InfoReportComponent from "../component/infoReport";

const ManageReportByIdPage = async ({params}:{params: Promise<{ id: number }>;}) => {
  const reportId = (await params).id;
  return (
    <>
      <div className="flex flex-col h-lvh w-full items-center">
        <div className="flex flex-col h-full w-4/5 bg-slate-500 p-4">
          <div>
            <InfoReportComponent reportId={reportId} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageReportByIdPage;
