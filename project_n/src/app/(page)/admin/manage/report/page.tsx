import React, { useState } from "react";
import ReportInfoTable from "./component/reportInfoTable";

const ManageReportPage = () => {
  return (
    <>
      <div className="flex flex-col h-lvh w-full justify-center items-center">
        <div className="flex w-4/5 h-full bg-slate-200 p-4">
          <div className="w-full">
            <ReportInfoTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageReportPage;
