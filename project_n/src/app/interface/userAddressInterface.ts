import { userInterface } from "./userInterface"
export interface userAddressInterface {
    id: number
    fullName: string
    houseNo: string
    moo: string
    province: string
    district: string
    subDistrict: string
    postalCode: string
    mobile: string
    
    userId:number
    user?: userInterface
}
