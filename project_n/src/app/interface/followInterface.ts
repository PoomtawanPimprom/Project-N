import { storeInterface } from "./storeInterface";
import { userInterface } from "./userInterface";

export interface followInterface {
    id: number;
    createdAt: Date
    //fk
    userId: number;
    user?:userInterface
    
    storeId: number;
    store?: storeInterface
    
}