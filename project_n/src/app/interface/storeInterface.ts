import { storeStatuInterface } from "./storeStatusInterface";
import { userInterface } from "./userInterface";

export interface storeInterface {
    id: number;
    name: string;
    description:string;

    imageLogoFileName?: string | null;
    imageLogoURL?: string | null
    imageBgFileName?: string | null;
    imageBackgroundURL?: string | null

    productTotal: number;

    createdDate?: Date;
    updatedAt?: Date;
    //fk
    userId: number;
    user?:userInterface

    storeStatusId: number;
    storeStatus?: storeStatuInterface;
}