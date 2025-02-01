import { orderDetailInterface } from "@/app/interface/orderDetailInterface";
import { orderItemInterface } from "@/app/interface/orderItemInterface";
import { paymentInterface } from "@/app/interface/payment";
import { productInterface } from "@/app/interface/productInterface";
import { userInterface } from "@/app/interface/userInterface";
import { convertToThaiTime } from "@/lib/utils";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";

type prop = {
  user: userInterface;
  orderDatail: orderDetailInterface;
  OrderItems: orderItemInterface[];
  payment: paymentInterface;
};

Font.register({
  family: "ThaiFont",
  src: "/Kanit-Light.ttf",
});

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
    fontFamily: "ThaiFont",
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    marginBottom: 10,
  },
  table: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 5,
  },
  tableCol: {
    width: "70%",
  },
  tableColRight: {
    width: "30%",
    textAlign: "right",
  },
  subtotal: {
    marginTop: 10,
    borderTop: "1px solid black",
    paddingTop: 5,
  },
  text: {
    fontFamily: "ThaiFont", // ใช้ฟอนต์ภาษาไทย
  },
  separator: {
    borderBottom: "1px solid black", // เส้นคั่น
    marginVertical: 10,
  },
  image: {
    width: 80,  // กำหนดขนาดรูป
    height: 80,
    alignSelf: "center", // จัดให้อยู่ตรงกลาง

  },
});

const PrintReceipt = ({ user, orderDatail, OrderItems, payment }: prop) => (
  <Document>
    <Page size="A5" style={styles.page}>

      {/* <Image src={`/icon.png`} style={styles.image}/> */}

      <View style={styles.header}>
        <Text>SHOPKUB</Text>
        <Text>www.shopkub.com</Text>
        <Text>BY</Text>
        <Text>B6412104 THANAWAT THIANTHONG</Text>
        <Text>B6412128 POOMTAWAN PIMPROM</Text>
      </View>

      <View style={styles.section}>
        <Text>ชื่อผู้ใช้งาน : {user.name}</Text>
        <Text>ชำระเมื่อ :{convertToThaiTime(payment.createAt)}</Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.section}>
        <View style={styles.table}>
          <Text style={styles.tableCol}>ชื่อสินค้า</Text>
          <Text style={styles.tableColRight}>ราคา</Text>
        </View>
        {OrderItems.map((orderDetail, index) => (
          <View style={styles.table} key={index}>
            <Text style={styles.tableCol}>
              {orderDetail.product!.name} *{orderDetail.quantity}
            </Text>
            <Text style={styles.tableColRight}>
              {orderDetail.product!.price * orderDetail.quantity} บาท
            </Text>
          </View>
        ))}

        <View style={styles.table}>
          <Text style={styles.tableCol}>
            {orderDatail.transport?.providerName}
          </Text>
          <Text style={styles.tableColRight}>
            {orderDatail.transport?.transportPrice} บาท
          </Text>
        </View>
      </View>
      {/* total */}
      <View style={styles.subtotal}>
        <View style={styles.table}>
          <Text style={styles.tableCol}>รวมทั้งหมด</Text>
          <Text style={styles.tableColRight}>{payment.amount} บาท</Text>
        </View>
      </View>

      <View style={styles.section}></View>
      <View style={styles.section}></View>
      <View style={styles.header}>
        <Text>ขอขอบคุณลูกค้า</Text>
        <Text>ที่เลือกไว้ใจใช้บริการกับทาง</Text>
        <Text>SHOPKUB</Text>
      </View>
    </Page>
  </Document>
);

export default PrintReceipt;
