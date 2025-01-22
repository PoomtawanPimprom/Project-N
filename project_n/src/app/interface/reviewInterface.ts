import { productInterface } from "./productInterface";
import { userInterface } from "./userInterface";


export interface reivewInterface {
    id: number;
    comment: string;
    createdAt: Date
    images?: {
        image1?: string;
        image2?: string;
        image3?: string;
        image4?: string;
        image5?: string;
    };

    userId: number;
    user?: userInterface
    productId: number;
    product?: productInterface
}