import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md">
        <div className="flex justify-center mb-6">
          <AlertTriangle className="w-16 h-16 text-yellow-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">ไม่พบหน้าที่คุณค้นหา</h1>
        <p className="text-gray-600 mb-6">
          ดูเหมือนว่าหน้านี้ไม่มีอยู่หรือถูกย้ายไปแล้ว กรุณาตรวจสอบ URL อีกครั้ง
        </p>
        <Link
          href="/" 
          className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          กลับสู่หน้าหลัก
        </Link>
      </div>
    </div>
  );
};

export default NotFound;