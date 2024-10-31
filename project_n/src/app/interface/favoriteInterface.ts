import { productInterface } from "./productInterface";
import { userInterface } from "./userInterface";

export interface favoriteInterface {
    id: number;
    //fk
    userId: number;
    user?:userInterface
    
    productId: number;
    product?: productInterface
    
}