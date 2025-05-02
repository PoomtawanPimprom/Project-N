
interface bankListType {
    engName:string
    thName:string
    logo:string
}

const bankList:bankListType[] = [
    {
        engName:'SCB',
        thName:"ธนาคารไทยพาณิชย์",
        logo:"/bankLogo/SCB.jpg",
    },
    {
        engName:'KBANK',
        thName:"ธนาคารกสิกรไทย",
        logo:"/bankLogo/KBANK.jpg",

    },
    {
        engName:'KTB',
        thName:"ธนาคารกรุงไทย",
        logo:"/bankLogo/KTB.jpg",
    },
] 

export default bankList