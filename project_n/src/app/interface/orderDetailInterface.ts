import { orderStatusInterface } from "./orderStatusInterface"
import { paymentInterface } from "./payment"
import { transportInterface } from "./transportInterface"
import { userInterface } from "./userInterface"


export interface orderDetailInterface {
    id: number
    total: number
    createdAt: Date

    userId: number
    user?: userInterface

    paymentId: number
    payment?: paymentInterface

    transportId: number
    transport?: transportInterface
    
    orderStatusId: number
    orderStatus?: orderStatusInterface
}
