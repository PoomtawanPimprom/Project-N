import { orderDetailInterface } from "./orderDetailInterface"
import { orderItemStatusInterface } from "./orderItemStatusInterface"
import { productInterface } from "./productInterface"


export interface orderItemInterface {
    id: number
    color?: string;
    size?: string;
    quantity: number
    storeId:number
    userAddressId?:number
    updatedAt:Date
    createdAt:Date
    
    Already_withdrawn:number

    orderDetailId: number
    orderDetail?: orderDetailInterface

    orderItemStatusId:number
    orderItemStatus?:orderItemStatusInterface

    productId: number
    product?: productInterface
}