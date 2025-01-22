import { orderDetailInterface } from "./orderDetailInterface"
import { productInterface } from "./productInterface"


export interface orderItemInterface {
    id: number
    quantity: number

    orderDetailId: number
    orderDetail?: orderDetailInterface

    productId: number
    product?: productInterface

    color?: string;
    size?: string;
}