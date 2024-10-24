import { productInterface } from "./productInterface";
import { userInterface } from "./userInterface";

export interface reportInterface{
    id :number;
    comment :string;
    createdAt ?:string;
    image :string;
    //fk
    userId :number;
    user ?: userInterface;
    
    productId :number;
    product ?: productInterface;
}