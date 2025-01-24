"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

interface prop {
  box: any;
}

export default function CardInfo({ box }: prop) {
    const router = useRouter()
    return (
    <Link
      href={box.href}
      className={`${box.bgColor} p-6 rounded-lg shadow-md flex items-center`}
    >
      <div className="mr-4">{box.icon}</div>
      <div>
        <h3 className="text-lg font-medium text-gray-700">{box.title}</h3>
        <div className="text-3xl font-bold text-gray-900">
          {box.count ? <p>จำนวน {box.count} ชิ้น</p> : ""}
        </div>
      </div>
    </Link>
  );
}
