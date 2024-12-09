import prisma from "@/lib/prisma/db";
import InfoReportComponent from "../component/infoReport";

const ManageReportByIdPage = async ({ params }: { params: { id: number } }) => {
  const reportId = Number(params.id);
  const reportData = prisma.report.findUnique({
    where: { id: reportId },
    include: {
      product: { select: { id: true, name: true } },
      user: { select: { id: true, name: true } },
    },
  });
  return (
    <>
      <div className="flex w-full ">
        <InfoReportComponent reportId={reportId} />
      </div>
    </>
  );
};

export default ManageReportByIdPage;
