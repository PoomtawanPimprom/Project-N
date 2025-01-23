import BackButton from "./BackButton";
import InfoReportComponent from "./infoReport";

const ManageReportByIdPage = async ({ params }: { params: { id: number } }) => {
  const reportId = Number(params.id);
  return (
    <>
      <div className="flex relative w-full ">
        <InfoReportComponent reportId={reportId} />
        <div className="absolute left-4 top-4">
          <BackButton />
        </div>
      </div>
    </>
  );
};

export default ManageReportByIdPage;
