import { storeStatuInterface } from "./storeStatus";

export interface storeInterface {
    id: number;
    name: string;
    imageLogo: string;
    imageBackgroud: string;
    scores:number;
    productTotal: number;
    follow: number;
    follower: number;
    createdDate: string;
    updatedAt: string;
    userId: number;
    storeStatusId: number;
    StoreStatus: storeStatuInterface;
}