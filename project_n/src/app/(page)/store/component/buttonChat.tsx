import { IoChatboxEllipsesOutline } from "react-icons/io5";

interface prop {
    userId:number
    storeId:number
}

const ButtonChat = ({userId,storeId}:prop) => {
  return (
    <>
      <button className="flex bg-white rounded-xl p-3 justify-center items-center text-center">
        <IoChatboxEllipsesOutline className="mx-1" />
        Chat
      </button>
    </>
  );
};

export default ButtonChat;
