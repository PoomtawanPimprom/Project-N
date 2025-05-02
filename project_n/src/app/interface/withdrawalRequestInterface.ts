import { storeInterface } from "./storeInterface"
import { userInterface } from "./userInterface"
import { WithDrawalStatusInterface } from "./withDrawalStatusInterface"

export interface WithDrawalRequestInterface{
    id?:number
    accountNumber :string 
    accountName   :string 
    bankName      :string 
    amount:number
    createdAt?: Date
    updatedAt?: Date
    message?:string

    statusId:number
    status?:WithDrawalStatusInterface

    storeId:number
    store?:storeInterface

    approvedById?:number
    approvedBy?:userInterface
    approvedAt?:Date
}