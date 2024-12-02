import { productInterface } from "./productInterface";
import { userInterface } from "./userInterface";

export interface favoriteInterface {
    id: number;
    createdAt:string
    //fk
    userId: number;
    user?:userInterface
    
    productId: number;
    product?: productInterface
    
}