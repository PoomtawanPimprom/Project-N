import { userAddressInterface } from "./userAddressInterface"
import { genderInterface } from "./genderInterface"
import { roleInterface } from "./roleInterface"
import { userStatusInterface } from "./userStatusInterface"

export interface userInterface{
    id:number
    name      ?:string
    username  :string
    password  :string
    email     ?:string
    mobile    ?:number
    birthdate? :Date   //Optional   
    profile   ?:string
    saler     :boolean
    resetToken? :string
    resetTokenExp :Date

    genderId:number
    gender?: genderInterface
    
    roleId:number
    role?: roleInterface

    userStatusId:number
    userStatus?: userStatusInterface

}