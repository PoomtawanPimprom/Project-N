import { IoChatboxEllipsesOutline } from "react-icons/io5";

interface prop {
    userId:number
    storeId:number
}

const ButtonChat = ({userId,storeId}:prop) => {
  return (
    <>
      <button className="flex max-h-[60px] bg-white rounded-xl p-3 justify-center items-center text-center hover:bg-gray-100 duration-200">
        <IoChatboxEllipsesOutline className="mx-1" />
        Chat
      </button>
    </>
  );
};

export default ButtonChat;
