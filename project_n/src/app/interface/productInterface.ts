import { categoryInterface } from "./categoryInterface";
import { productStatusInterface } from "./productStatusInterface";
import { storeInterface } from "./storeInterface";

export interface productInterface {
    id: number
    name: string
    description: string
    price: number
    image?: {
        image1?: string,
        image2?: string,
        image3?: string,
        image4?: string,
        image5?: string,
    },
    createdAt:Date

    //fk
    storeID: number
    store?: storeInterface

    categoryID: number
    category?:categoryInterface

    //discountID :number
    //discount :discountInterface

    productstatusID?: number
    productstatus?: productStatusInterface
}