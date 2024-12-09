import TabelAllReport from "../component/tabelAllReport";

const MyReportPage = () => {
  return (
    <>
      <div className="flex flex-col w-full h-lvh items-center">
        <div className=" h-full w-4/5 p-4">
          <div className="mt-4  text-3xl font-bold">
            <p className="ml-4">รายงานของฉัน</p>
          </div>
          <div className=" h-full w-full">
            <TabelAllReport userId={1} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyReportPage;
