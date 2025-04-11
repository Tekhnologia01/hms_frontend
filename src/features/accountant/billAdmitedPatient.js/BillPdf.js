import { Document, Page, View, Text, StyleSheet, Image } from '@react-pdf/renderer';
import Airavat from "../../../assets/images/Airavat.png";

// Create enhanced styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 12
  },
  header: {
    marginBottom: 15,  // Reduced margin
    textAlign: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 120,       // Reduced from 150
    height: 72,       // Reduced from 90 (maintaining aspect ratio)
    marginBottom: 5   // Reduced margin
  },
  section: {
    marginBottom: 8,  // Reduced margin
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 12,     // Reduced from 14
    marginBottom: 8,  // Reduced margin
    fontWeight: 'bold',
    color: '#1D949A',
    textAlign: 'left' // Explicitly set to left
  },
  subtitle: {
    fontSize: 12,     // Reduced from 14
    marginBottom: 3,  // Reduced margin
    fontWeight: 'bold'
  },
  text: {
    fontSize: 10,     // Reduced from 12
    marginBottom: 3   // Reduced margin
  },
  table: {
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#EAECF0',
    marginBottom: 12, // Reduced margin
    display: 'flex',
    flexDirection: 'column'
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EAECF0',
    alignItems: 'center'
  },
  tableHeader: {
    backgroundColor: '#F9FAFB',
    fontWeight: 'bold',
    padding: 6,       // Reduced padding
    textAlign: 'center',
    fontSize: 10,     // Reduced from 12
    borderRightWidth: 1,
    borderRightColor: '#EAECF0',
    flex: 1
  },
  tableCell: {
    padding: 6,       // Reduced padding
    fontSize: 9,      // Reduced from 10
    textAlign: 'center',
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#EAECF0'
  },
  tableCellLeft: {
    padding: 6,       // Reduced padding
    fontSize: 9,      // Reduced from 10
    textAlign: 'left',
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#EAECF0'
  },
  totalRow: {
    flexDirection: 'row',
    padding: 6,       // Reduced padding
    fontWeight: 'bold',
    backgroundColor: '#F9FAFB'
  },
  paymentMode: {
    marginTop: 15     // Reduced from 20
  },
  signatureRow: {
    marginTop: 20,    // Reduced from 30
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40 // Reduced from 50
  },
  signatureBox: {
    alignItems: 'center'
  },
  signatureLine: {
    width: 120,       // Reduced from 150
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 3   // Reduced margin
  }
});

const BillPDF = ({ billData }) => {
  const calculateRoomDays = (startDate, endDate) => {
    if (!endDate) {
      const now = Math.floor(Date.now() / 1000);
      return Math.ceil((now - startDate) / (24 * 60 * 60));
    }
    return Math.ceil((endDate - startDate) / (24 * 60 * 60));
  };

  const calculateTotal = () => {
    const roomCharges = billData?.room1?.reduce((sum, item) => {
      const days = calculateRoomDays(item.start_date, item.end_date);
      return sum + (item.total * days);
    }, 0) || 0;
    
    const otherCharges = billData?.othercharges?.reduce((sum, item) => 
      sum + (item.amount * (item.quantity || 1)), 0) || 0;
      
    const doctorVisits = billData?.doctorvisiting?.reduce((sum, item) => sum + item.amount, 0) || 0;
    return roomCharges + otherCharges + doctorVisits;
  };

  const totalAmount = calculateTotal();

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header with smaller logo */}
        <View style={styles.header}>
          <Image 
            src={Airavat} 
            style={styles.logo}
            cache={false} 
          />
        </View>

        {/* Patient Information */}
        <View style={styles.section}>
          <View>
            <Text style={styles.text}>
              <Text style={{ fontWeight: 'bold' }}>Patient Name: </Text> 
              {billData.Name || 'N/A'}
            </Text>
            <Text style={styles.text}>
              <Text style={{ fontWeight: 'bold' }}>Department: </Text> 
              {billData.department || 'N/A'}
            </Text>
            <Text style={styles.text}>
              <Text style={{ fontWeight: 'bold' }}>Consulting Dr.: </Text> 
              {billData.doctor_name || 'N/A'}
            </Text>
          </View>
          <View>
            <Text style={[styles.text, { textAlign: 'right' }]}>
              <Text style={{ fontWeight: 'bold' }}>IPD ID: </Text> 
              {billData.ipd_id || 'N/A'}
            </Text>
            <Text style={[styles.text, { textAlign: 'right' }]}>
              <Text style={{ fontWeight: 'bold' }}>Receipt No.: </Text> 
              {billData.receipt_number || `IPD-${billData.ipd_id || ''}`}
            </Text>
            <Text style={[styles.text, { textAlign: 'right' }]}>
              <Text style={{ fontWeight: 'bold' }}>Admitted Date: </Text> 
              {formatDate(billData.admitted_date)}
            </Text>
          </View>
        </View>

        {/* Billing Details with smaller font and left-aligned */}
        <Text style={styles.title}>Billing Details</Text>

        {/* Billing Table */}
        <View style={styles.table}>
          {/* Table Header */}
          <View style={[styles.tableRow, { backgroundColor: '#F9FAFB' }]}>
            <Text style={[styles.tableHeader, { flex: 0.5 }]}>No</Text>
            <Text style={styles.tableHeader}>Description</Text>
            <Text style={styles.tableHeader}>Date</Text>
            <Text style={styles.tableHeader}>Qty</Text>
            <Text style={styles.tableHeader}>Amount (₹)</Text>
          </View>

          {/* Room Charges */}
          {billData.room1?.map((room, index) => {
            const days = calculateRoomDays(room.start_date, room.end_date);
            return (
              <View style={styles.tableRow} key={`room-${index}`}>
                <Text style={[styles.tableCell, { flex: 0.5 }]}>{index + 1}</Text>
                <Text style={styles.tableCellLeft}>Room Charge (Type {room.room_type})</Text>
                <Text style={styles.tableCell}>{formatDate(room.start_date)}</Text>
                <Text style={styles.tableCell}>{days} {days === 1 ? 'day' : 'days'}</Text>
                <Text style={styles.tableCell}>₹{room.total * days}</Text>
              </View>
            );
          })}

          {/* Other Charges */}
          {billData.othercharges?.map((charge, index) => (
            <View style={styles.tableRow} key={`charge-${index}`}>
              <Text style={[styles.tableCell, { flex: 0.5 }]}>{index + (billData.room1?.length || 0) + 1}</Text>
              <Text style={styles.tableCellLeft}>{charge.charge_name}</Text>
              <Text style={styles.tableCell}>{formatDate(charge.charge_date)}</Text>
              <Text style={styles.tableCell}>{charge.quantity || 1}</Text>
              <Text style={styles.tableCell}>₹{charge.amount * (charge.quantity || 1)}</Text>
            </View>
          ))}

          {/* Doctor Visits */}
          {billData.doctorvisiting?.map((visit, index) => (
            <View style={styles.tableRow} key={`visit-${index}`}>
              <Text style={[styles.tableCell, { flex: 0.5 }]}>
                {index + (billData.room1?.length || 0) + (billData.othercharges?.length || 0) + 1}
              </Text>
              <Text style={styles.tableCellLeft}>Doctor Visit - {visit.doctor_name}</Text>
              <Text style={styles.tableCell}>{formatDate(visit.visit_date)}</Text>
              <Text style={styles.tableCell}>1</Text>
              <Text style={styles.tableCell}>₹{visit.amount}</Text>
            </View>
          ))}

          {/* Total Row */}
          <View style={styles.totalRow}>
            <Text style={[styles.tableCellLeft, { flex: 4, textAlign: 'right', borderRightWidth: 0 }]}>
              Grand Total
            </Text>
            <Text style={[styles.tableCell, { fontWeight: 'bold', borderRightWidth: 0 }]}>
              ₹{totalAmount}
            </Text>
          </View>
        </View>

        {/* Payment Mode with smaller font */}
        <Text style={styles.subtitle}>Payment Mode</Text>
        <Text style={styles.text}>{billData.payment_method || 'Cash'}</Text>

        {/* Signature Section with reduced size */}
        <View style={styles.signatureRow}>
          <View style={styles.signatureBox}>
            <View style={styles.signatureLine} />
            <Text style={styles.text}>Patient Signature</Text>
          </View>
          <View style={styles.signatureBox}>
            <View style={styles.signatureLine} />
            <Text style={styles.text}>Hospital Authority</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default BillPDF;