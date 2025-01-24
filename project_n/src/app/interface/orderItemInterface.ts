import { orderDetailInterface } from "./orderDetailInterface"
import { orderItemStatusInterface } from "./orderItemStatusInterface"
import { productInterface } from "./productInterface"


export interface orderItemInterface {
    id: number
    quantity: number
    storeId:number
    userAddressId?:number

    orderDetailId: number
    orderDetail?: orderDetailInterface

    orderItemStatusId:number
    orderItemStatus?:orderItemStatusInterface

    productId: number
    product?: productInterface

    color?: string;
    size?: string;
}