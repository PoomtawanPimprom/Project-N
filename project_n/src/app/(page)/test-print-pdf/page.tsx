"use client";
import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MyDocument from "./MyDocument";

const products = [
    { name: "HENDRICKS", price: 8.0 },
    { name: "BOURBON MANHATTAN", price: 8.75 },
    { name: "SOUP", price: 8.0 },
    // เพิ่มสินค้าเพิ่มเติมตามต้องการ
  ];


const totalPrice = products.reduce((total, product) => total + product.price, 0);

export default function Page() {
  return (
    <div>
      <h1>สร้างสลิปเงินเดือน</h1>
      <PDFDownloadLink document={<MyDocument products={products}total={totalPrice} />} fileName="salary-slip.pdf">
        <button>ดาวโหลด</button>
      </PDFDownloadLink>
    </div>
  );
}
