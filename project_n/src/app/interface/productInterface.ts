import { inventoryInterface } from "./inventoryInterface";
import { productStatusInterface } from "./productStatusInterface";
import { storeInterface } from "./storeInterface";

export interface productInterface {
    id: number
    name: string
    description: string
    price: number
    sales:number
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


    //discountID :number
    //discount :discountInterface

    productstatusID?: number
    productstatus?: productStatusInterface

    Inventory?: inventoryInterface[];
}