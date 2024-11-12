import { CiCirclePlus } from "react-icons/ci";

interface prop {
  userId: number;
  storeId: number;
}

const ButtonFollow = ({ userId, storeId }: prop) => {
  return (
    <>
      <button className="flex bg-white rounded-xl p-3 justify-center items-center text-center">
        <CiCirclePlus className="mx-1" />
        Follow
      </button>
    </>
  );
};

export default ButtonFollow;
