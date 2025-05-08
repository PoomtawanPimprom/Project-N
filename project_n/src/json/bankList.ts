interface bankListType {
  id: number;
  engName: string;
  thName: string;
  logo: string;
}

const bankList: bankListType[] = [
  {
    id: 1,
    engName: "SCB",
    thName: "ธนาคารไทยพาณิชย์",
    logo: "/bankLogo/SCB.jpg",
  },
  {
    id: 2,

    engName: "KBANK",
    thName: "ธนาคารกสิกรไทย",
    logo: "/bankLogo/KBANK.jpg",
  },
  {
    id: 3,
    engName: "KTB",
    thName: "ธนาคารกรุงไทย",
    logo: "/bankLogo/KTB.jpg",
  },
];

export default bankList;
