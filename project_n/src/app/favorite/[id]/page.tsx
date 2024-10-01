"use client";

import { favoriteInterface } from "@/app/interface/favoriteInterface";
import { deleteFavoriteByid, getAllFavoriteByUserID } from "@/app/service/favorite/service";
import { useEffect, useState } from "react";

const favoriteByUserIdPage = ({ params }: { params: { id: number } }) => {
  const userId = params.id;
  const [favoriteData, setFavoriteData] = useState<favoriteInterface[]>([]);

  const fetchData = async () => {
    const data = await getAllFavoriteByUserID(userId);
    setFavoriteData(data);
  };

  const handleDeleteButton = async (favoriteId:number) => {
    await deleteFavoriteByid(favoriteId);
    await fetchData();
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="flex w-full h-lvh justify-center">
        <div className="flex flex-col  w-3/5">
          <div className="header flex flex-col my-2 text-4xl font-bold">
            <p>Favorite</p>
          </div>
          <div className="flex flex-col h-full rounded-xl border border-black my-2 p-4">
            {favoriteData.map((item, index) => (
              <div className="flex flex-col border border-black rounded-xl p-2">
                <div className="header flex text-2xl font-bold mb-1">
                  <p>{item.Product?.store?.name}</p>
                </div>
                <div className="body flex justify-between ">
                  <div>{item.Product?.image}</div>
                  <div>{item.Product?.name}</div>
                  <div>quatity</div>
                  <div>{item.Product?.price}</div>
                  <div>
                    <button
                      onClick={async ()=>{
                        await handleDeleteButton(item.id);
                      } }
                    >ลบ</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default favoriteByUserIdPage;
