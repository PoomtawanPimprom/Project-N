import { discountInterface } from "./discountInterface"
import { orderItemInterface } from "./orderItemInterface"
import { orderStatusInterface } from "./orderStatusInterface"
import { paymentInterface } from "./payment"
import { transportInterface } from "./transportInterface"
import { userInterface } from "./userInterface"


export interface orderDetailInterface {
    id: number
    total: number
    createdAt: Date

    discountId?: number
    discount?:discountInterface

    userId: number
    user?: userInterface

    paymentId?: number
    payment?: paymentInterface

    transportId: number
    transport?: transportInterface
    
    orderStatusId: number
    orderStatus?: orderStatusInterface

    OrderItem?: orderItemInterface[]
}
