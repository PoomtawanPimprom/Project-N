import { productInterface } from "./productInterface";

export interface favoriteInterface {
    id: number;
    userId: number;
    productId: number;
    Product?: productInterface
    
}