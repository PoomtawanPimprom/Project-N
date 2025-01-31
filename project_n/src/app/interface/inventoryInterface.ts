import { productInterface } from "./productInterface"

export interface inventoryInterface {
    id: number
    quantity: number
    size: string
    color: string
    //fk
    productID: number
    product ?: productInterface
}