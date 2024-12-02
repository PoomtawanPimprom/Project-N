import { productInterface } from "./productInterface";
import { reportCategoryInterface } from "./reportCategoryInterface";
import { reportStatusInterface } from "./reportStatusInterface";
import { userInterface } from "./userInterface";

export interface reportInterface {
    id: number;
    comment: string;
    createdAt: string;
    
    //fk
    userId: number;
    user?: userInterface;

    productId: number;
    product?: productInterface;

    reportCategoryId: number;
    reportCategory: reportCategoryInterface

    reportStatusId: number;
    reportStatus: reportStatusInterface;
}