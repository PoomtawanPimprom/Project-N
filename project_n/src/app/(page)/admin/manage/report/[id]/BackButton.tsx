"use client"
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const BackButton = () => {
    const router = useRouter()

  return (
    <button 
      onClick={()=> router.back()}
      className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
    >
      <ArrowLeft className="mr-2 w-5 h-5" />
      <span>ย้อนกลับ</span>
    </button>
  );
};

export default BackButton;