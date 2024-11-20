import { storeStatuInterface } from "./storeStatusInterface";
import { userInterface } from "./userInterface";

export interface storeInterface {
    id: number;
    name: string;
    description:string;
    imageLogo?: string | null;
    imageBackgroud?: string | null;
    scores:number;
    productTotal: number;
    follow: number;
    follower: number;
    createdDate: string;
    updatedAt?: string;
    //fk
    userId: number;
    user?:userInterface

    storeStatusId: number;
    storeStatus?: storeStatuInterface;
}