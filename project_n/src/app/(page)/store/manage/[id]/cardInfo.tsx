
import Link from "next/link";

interface prop {
  box: any;
}

export default function CardInfo({ box }: prop) {
    return (
    <Link
      href={box.href}
      className={`${box.bgColor} p-6 rounded-lg shadow-md flex items-center`}
    >
      <div className="mr-4">{box.icon}</div>
      <div className="">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-100">{box.title}</h3>
        <div className="text-3xl font-bold text-gray-900 dark:text-white">
        {box.count !== null && box.count !== undefined ? <p>จำนวน {box.count} ชิ้น</p> : ""}
        </div>
      </div>
    </Link>
  );
}
