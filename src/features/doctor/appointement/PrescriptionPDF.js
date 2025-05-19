


        
import { Document, Page, Text, View, StyleSheet, Font, Image } from "@react-pdf/renderer";
import Airavat from "../../../assets/images/Airavat.png";

Font.register({
    family: 'Times New Roman',
    fonts: [
        { src: '/fonts/Times New Roman.ttf', fontWeight: 'normal' },
        { src: '/fonts/Times New Roman Bold.ttf', fontWeight: 'bold' },
    ],
});

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Times New Roman',
        padding: 20,
        fontSize: 12,
        // backgroundColor:"transpernt"
    },
    custom_header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
        marginBottom: 15,
    },
        custom_header1: {
       
        marginTop:120,
    },
            custom_header1: {
       
        marginBottom:120,
    },
    headerSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 10,
    },
    clinicInfo: {
        textAlign: 'center',
        marginBottom: 5,
    },
    clinicName: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: "center",
        marginLeft:60
    },
    clinicAddress: {
        fontSize: 12,
    },
    table: {
        display: "table",
        width: "100%",
        borderCollapse: "collapse",
    },
    tableRow: {
        flexDirection: "row",
        borderBottom: "1px solid #EAECF0",
    },
    tableHeader: {
        backgroundColor: "#F9FAFB",
        fontSize: 12,
        fontWeight: "bold",
        padding: 8,
        textAlign: "center",
    },
    tableCol: {
        width: "10%", // Divide equally among 8 columns
        padding: 6,
        textAlign: "center",
    },
    medicineNameCol: {
        width: "17%",
        fontWeight: "bold",
        padding: 6,
        textAlign: "center",
    },
    remarksCol: {
        width: "20%",
        padding: 6,
        textAlign: "center",
    },
    signatureSection: {
        marginTop: 30,
        marginLeft: 350,
        flexDirection: 'column', // Vertical alignment
        alignItems: 'flex-end', // Right-align elements
    },
    signatureLine: {
        borderTop: "1px solid #000",
        width: 150,
        marginVertical: 5, // Space above and below the line
    },
    doctorName: {
        fontSize: 14, // Slightly larger for emphasis
        fontWeight: "bold", // Bold for prominence
        marginBottom: 5, // Space before the signature line
    },
    signatureText: {
        fontSize: 12,
        marginTop: 5, // Space after the signature line
        marginRight:50
    },
});

const PrescriptionPDF = ({ prescriptionData, patientDetails }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* <View style={styles.headerSection}>
                    <Image
                        src={Airavat}
                        style={{ width: 130, height: 80, margin: 'auto', marginBottom: 5 }}
                    />
                    <View style={styles.clinicInfo}>
                        <Text style={styles.clinicName}>Airavat Clinic</Text>
                        <Text style={styles.clinicAddress}>
                            123 Health Street, Medical City, State 12345
                        </Text>
                    </View>
                </View> */}

                        <View style={styles.custom_header1}>
                   
                </View> 

                <View style={styles.custom_header} >
                    <View>
                        <Text style={{ marginBottom: 7 }}><Text style={{ fontWeight: "bold" }}>Patient Name:</Text> {patientDetails?.Patient_Name}</Text>
                        <Text style={{ marginBottom: 7 }}><Text style={{ fontWeight: "bold" }}>Age:</Text> {patientDetails?.Patient_Age}</Text>
                        <Text><Text style={{ fontWeight: "bold" }}>Consulting Dr.:</Text> {patientDetails?.Doctor_Name}</Text>
                    </View>
                    <View>
                        <Text style={{ marginBottom: 7 }}><Text style={{ fontWeight: "bold" }}>UH I’d Number:</Text> {patientDetails?.uh_id}</Text>
                        <Text style={{ marginBottom: 7 }}><Text style={{ fontWeight: "bold" }}>Sex:</Text> {patientDetails?.Patient_Sex}</Text>
                        <Text><Text style={{ fontWeight: "bold" }}>Date:</Text> {patientDetails?.RegisterDate?.split("T")[0]}</Text>
                    </View>
                </View>


                <View style={{ width: '100%', borderTop: '1px solid #475467', marginTop: 8 }} />
                <View style={{ marginBottom: 10, marginTop: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>Prescription</Text>
                </View>

                {/* Table Header */}
                <View style={styles.table}>
                    <View style={[styles.tableRow, { backgroundColor: "#F9FAFB" }]}>
                        <Text style={[styles.tableCol, { fontWeight: "bold" }]}>No</Text>
                        <Text style={styles.medicineNameCol}>Medicine Name</Text>
                        <Text style={[styles.tableCol, { fontWeight: "bold" }]}>Dose</Text>
                        <Text style={[styles.tableCol, { fontWeight: "bold" }]}>Type</Text>
                        <Text style={[styles.tableCol, { fontWeight: "bold", width: "12%" }]}>Frequency</Text>
                        <Text style={[styles.tableCol, { fontWeight: "bold" }]}>Days</Text>
                        <Text style={[styles.tableCol, { fontWeight: "bold", width: "11%" }]}>Quantity</Text>
                        <Text style={[styles.remarksCol, { fontWeight: "bold" }]}>Remarks</Text>
                    </View>

                    {/* Table Rows */}
                    {prescriptionData?.map((prescription, index) => (
                        <View style={styles.tableRow} key={prescription.Prescription_Id}>
                            <Text style={[styles.tableCol, { fontSize: '12px' }]}>{index + 1}</Text>
                            <Text style={[styles.medicineNameCol, { fontSize: '12px' }]}>{prescription?.medicine_name}</Text>
                            <Text style={[styles.tableCol, { fontSize: '12px' }]}>{prescription?.dosage}</Text>
                            <Text style={[styles.tableCol, { fontSize: '12px' }]}>{prescription?.medicine_type}</Text>
                            <Text style={[styles.tableCol, { width: "12%", fontSize: '12px' }]}>{prescription?.frequency}</Text>
                            <Text style={[styles.tableCol, { fontSize: '12px' }]}>{prescription?.days}</Text>
                            <Text style={[styles.tableCol, { width: "11%", fontSize: '12px' }]}>{prescription?.quantity}</Text>
                            <Text style={[styles.remarksCol, { fontSize: '12px' }]}>{prescription?.common_note}</Text>
                        </View>
                    ))}
                </View>

                {/* Doctor's Name and Signature Section */}
                <View style={styles.signatureSection}>
                    {/* <Text style={styles.doctorName}>Dr. {patientDetails?.Doctor_Name}</Text> */}
                    <View style={styles.signatureLine}></View>
                    <Text style={styles.signatureText}>Signature</Text>
                </View>



                              <View style={styles.custom_header2}>
                   
                </View> 
            </Page>
        </Document>
    );
};

export default PrescriptionPDF;