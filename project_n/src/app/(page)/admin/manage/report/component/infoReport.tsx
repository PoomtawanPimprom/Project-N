"use client"

import { reportInterface } from "@/app/interface/reportInterface";
import { getReportById } from "@/app/service/report/service";
import { useEffect, useState } from "react";

interface prop {
    reportId : number;
}

const InfoReportComponent = (prop:prop) => {
    const [report,setReport]= useState<reportInterface>();
    
    const fetchReport = async (reportId:number) => {
      const data = await getReportById(reportId);
      setReport(data);
    }

    useEffect(()=>{
      fetchReport(prop.reportId);
    })

    return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-col w-full">
        <p>รายงานสินค้าของ {report?.product?.name}</p>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex flex-col w-full">{report?.image}</div>
        <div className="flex flex-col w-full">{report?.comment}</div>
        <div className="flex flex-col w-full">{report?.userId}</div>
        <div><button></button></div>
      </div>
    </div>
  );
};

export default InfoReportComponent;
