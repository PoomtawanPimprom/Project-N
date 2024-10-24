"use client"

import { useRouter } from "next/navigation"
import { createReport } from "../service/report/service"

interface prop {
    userId: number
    productId : number
}

const ReportButton = (prop:prop) => {
  const router = useRouter(); 
  return (
    <>
        <button
        onClick={() => router.push(`/report/create/${prop.productId}`) }
        className="text-white rounded-lg px-4 py-2 bg-red-500 hover:bg-red-600"
        >Report</button>
    </>
  )
}

export default ReportButton