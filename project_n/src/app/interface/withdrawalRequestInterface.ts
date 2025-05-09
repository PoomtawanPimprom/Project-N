import { storeInterface } from "./storeInterface"
import { userInterface } from "./userInterface"
import { WithDrawalBookBankInterface } from "./withDrawalBookBankInterface"
import { WithDrawalStatusInterface } from "./withDrawalStatusInterface"

export interface WithDrawalRequestInterface{
    id?:number

    amount:number
    createdAt?: Date
    updatedAt?: Date
    message?:string

    bookBankId:number
    bookBank?:WithDrawalBookBankInterface

    statusId:number
    status?:WithDrawalStatusInterface

    storeId:number
    store?:storeInterface

    approvedById?:number
    approvedBy?:userInterface
    approvedAt?:Date
}