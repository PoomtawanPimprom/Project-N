import { getServerSession } from "next-auth";
import TabelAllReport from "../component/tabelAllReport";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma/db";
import { reportInterface } from "@/app/interface/reportInterface";

export default async function MyReportPage() {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user.id);
  if (!session) {
    redirect("/login");
  }
  const reportDataByUserID = (await prisma.report.findMany({
    where: { userId: userId },
    include: {
      product: true,
      user: true,
      reportCategory: true,
      reportStatus: true,
    },
    orderBy: { createdAt: "desc" },
  })) as reportInterface[];

  return (
    <>
      <div className="flex flex-col w-full h-lvh items-center">
        <div className=" h-full w-4/5 p-4">
          <div className="mt-4  text-3xl font-bold">
            <p className="ml-4">รายงานของฉัน</p>
          </div>
          <div className=" h-full w-full">
            <TabelAllReport reportDataByUserID={reportDataByUserID} userId={userId} />
          </div>
        </div>
      </div>
    </>
  );
}
