import { productInterface } from "./productInterface"

export interface inventoryInterface {
    id: number
    quantity: number
    size: String
    color: String
    //fk
    productID: number
    product ?: productInterface
}