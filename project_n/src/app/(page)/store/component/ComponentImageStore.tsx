
import ButtonChat from "./buttonChat";
import ButtonFollow from "./buttonFollow";

interface prop {
  userId: number;
  storeId: number;
}

const ImageStore = ({ userId, storeId }: prop) => {
  return (
    <div className="flex p-3">
      <div className="flex flex-col w-full h-[500px] bg-[url('https://images.unsplash.com/photo-1657161540865-a46753494068?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] p-4 justify-end items-end mb-2 rounded-lg">
        <div className="flex space-x-3">
          <div className="flex ">
            <ButtonChat userId={1} storeId={storeId} />
          </div>
          <div className="flex ">
            <ButtonFollow userId={1} storeId={storeId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageStore;
