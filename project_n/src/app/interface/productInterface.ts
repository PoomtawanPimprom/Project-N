import { categoryInterface } from "./categoryInterface";
import { productStatusInterface } from "./productStatusInterface";
import { storeInterface } from "./storeInterface";

export interface productInterface {
    id: number
    name: String
    description: String
    price: number

    //fk
    storeID: number
    store: storeInterface

    categoryID: number
    category:categoryInterface

    //discountID :number
    //discount :discountInterface

    productstatusID: number
    productstatus: productStatusInterface
}