import { productInterface } from "./productInterface";
import { userInterface } from "./userInterface";

export interface cartItemInterface{
    id: number;

    userId: number;
    user?: userInterface

    productId: number;
    product?: productInterface

    color?: string;
    size?: string;
    quantity: number;
}