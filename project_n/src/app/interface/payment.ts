import { paymentMethodInterface } from './paymentMethodInterdface'
import { paymentStatusInterface } from './paymentStatusInterface'

export interface paymentInterface {
    id: number
    orderId: number
    amount: number
    moneySlip: string
    createAt: Date
    updatedAt?: Date

    paymentStatusId: number
    paymentStatus?: paymentStatusInterface

    paymentMethodId: number
    paymentMethod?: paymentMethodInterface

}