type prop = {
  status: string;
};
export default function TaskStatus({ status }: prop) {
  const renderStatus = () => {
    switch (status) {
      case "ส่งแล้ว":
        return (
          <div className="flex space-x-2 bg-gray-300 rounded-xl items-center w-fit justify-self-center p-1">
            <div className="flex rounded-full bg-gray-500 h-3 w-3"></div>
            <div className="text-black">{status}</div>
          </div>
        );
      case "รับเรื่องแล้ว":
        return (
          <div className="flex space-x-2 bg-yellow-300 rounded-xl items-center w-fit justify-self-center p-1">
            <div className="flex rounded-full bg-yellow-500 h-3 w-3"></div>
            <div className="text-black">{status}</div>
          </div>
        );
      case "เรียบร้อยแล้ว":
        return (
          <div className="flex space-x-2 bg-green-300 rounded-xl items-center w-fit justify-self-center p-1">
            <div className="flex rounded-full bg-green-500 h-3 w-3"></div>
            <div className="text-black">{status}</div>
          </div>
        );
      default:
        return null;
    }
  };
  return renderStatus();
}
