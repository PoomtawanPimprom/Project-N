import { productInterface } from "./productInterface";
import { userInterface } from "./userInterface";


export interface reivewInterface {
    id: number;
    comment: string;
    createdAt: Date
    images?: string[];

    userId: number;
    user?: userInterface
    productId: number;
    product?: productInterface
}