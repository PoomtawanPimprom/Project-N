import { productInterface } from '@/app/interface/productInterface';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

type prop = {
    total:number,
    products: productInterface[] | any[];
}

Font.register({
  family: 'ThaiFont',
  src: '/Kanit-Light.ttf',
});

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
    fontFamily: "Helvetica",
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
    fontFamily: 'ThaiFont', // ใช้ฟอนต์ภาษาไทย
  },
});

const MyDocument = ({products,total}:prop) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text>BOULEVARD</Text>
        <Text>ONE MISSION STREET</Text>
        <Text>SAN FRANCISCO, CA 94105</Text>
        <Text>(415) 543-6084</Text>
        <Text>DINING ROOM</Text>
      </View>

      <View style={styles.section}>
        <Text>1019 KEN</Text>
        <Text>Tbl.64/1 Chk 9458 Gst 2</Text>
        <Text>Feb15'06 07:20PM</Text>
      </View>

      <View style={styles.section}>
        {products.map((product, index) => (
          <View style={styles.table} key={index}>
            <Text style={styles.tableCol}>{product.name}</Text>
            <Text style={styles.tableColRight}>{product.price.toFixed(2)}</Text>
          </View>
        ))}
      </View>

      <View style={styles.subtotal}>
        <View style={styles.table}>
          <Text style={styles.tableCol}>TOTAL</Text>
          <Text style={styles.tableColRight}>{total.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text>BOULEVARD COOKBOOKS</Text>
        <Text>ARE NOW AVAILABLE</Text>
        <Text>PLEASE ASK YOUR SERVER</Text>
        <Text>THANK YOU FOR DINING WITH US</Text>
      </View>
    </Page>
  </Document>
);

export default MyDocument;
