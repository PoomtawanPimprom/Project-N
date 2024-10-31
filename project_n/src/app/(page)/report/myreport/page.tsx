import TabelAllReport from "./tabelAllReport";

const MyReportPage = () => {
  return (
    <>
      <div className="flex flex-col w-full h-lvh items-center">
        <div className="bg-green h-full w-4/5">
          <div className=" h-full w-full">
            <TabelAllReport userId={1} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyReportPage;
