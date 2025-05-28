import React from "react";
import { Document, Page, Text, View, StyleSheet, Font, Image } from "@react-pdf/renderer";
import Airavat from "../../../assets/images/Airavat.png";

Font.register({
    family: 'Times New Roman',
    fonts: [
        {
            src: '/fonts/Times New Roman.ttf',
            fontWeight: 'normal',
        },
        {
            src: '/fonts/Times New Roman Bold.ttf',
            fontWeight: 'bold',
        },
    ],
});

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Times New Roman',
        padding: 30,
        fontSize: 12,
    },
    section: {
        margin: 20,
    },
    headerName: {
        fontFamily: 'Times New Roman',
        fontSize: 20,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    header: {
        fontFamily: 'Times New Roman',
        fontSize: 12,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    margin_t: {
        marginTop: 10,
    },
    custom_header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
        marginBottom: 15,
    },
    table: {
        display: "table",
        width: "100%",
    },
    tableRow: {
        flexDirection: "row",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: '#EAECF0',
    },
    tableHeader: {
        backgroundColor: "#F9FAFB",
        fontSize: 14,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: '#EAECF0',
        padding: 5,
    },
    tableCol: {
        width: "25%",
        borderStyle: "solid",
        borderWidth: 1,
        padding: 5,
    },
    semiBoldText: {
        fontFamily: 'Times New Roman',
        fontSize: 11,
        fontWeight: 'bold',
        letterSpacing: 0.3,
    },
    signatureSection: {
        marginTop: 30,
        marginLeft: 'auto', 
        marginRight: 30,
        flexDirection: 'column',
        alignItems: 'flex-end',
        width: 150,
    },
    signatureLine: {
        borderTopWidth: 1,
        borderTopColor: '#000',
        borderTopStyle: 'solid',
        width: 150, 
        marginVertical: 5,
    },
    signatureText: {
        fontSize: 12,
        textAlign: 'right', 
        marginRight:50,
    },
});

const BillPDF = ({ billData }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={{ textAlign: 'center' }}>
                    <Image
                        src={Airavat}
                        style={{ width: 130, height: 80, margin: 'auto', marginBottom: 5 }}
                    />
                </View>
                <View style={styles.custom_header}>
                    <View>
                        <Text style={styles.margin_t}><Text style={styles.header}>Patient Name : </Text>{billData?.patient_name}</Text>
                        <Text style={styles.margin_t}><Text style={styles.header}>Patient Age : </Text>{billData?.patient_age}</Text>
                        <Text style={styles.margin_t}><Text style={styles.header}>Disease : </Text>{billData?.disease}</Text>
                        <Text style={styles.margin_t}><Text style={styles.header}>Consulting Dr. : </Text>{billData?.doctor_name}</Text>
                    </View>
                    <View>
                        <Text style={styles.margin_t}><Text style={styles.header}>UH I’d Number : </Text>{billData?.uh_id}</Text>
                        <Text style={styles.margin_t}><Text style={styles.header}>Patient Sex: </Text>{billData?.patient_sex}</Text>
                        <Text style={styles.margin_t}><Text style={styles.header}>Receipt No. : </Text>{billData?.receipt_number}</Text>
                        <Text style={styles.margin_t}><Text style={styles.header}>Receipt Date : </Text>{billData?.bill_date?.split("T")[0]}</Text>
                    </View>
                </View>
                <View style={{ width: '100%', borderTop: '1px solid #475467', marginTop: 8 }} />
                <View style={{ marginBottom: 10, marginTop: 10 }}>
                    <Text style={[styles.headerName, styles.margin_t]}>Billing</Text>
                </View>
                <View style={styles.table}>
                    <View style={[styles.tableRow, styles.tableHeader]}>
                        <Text style={{ width: '15%', padding: 5, fontWeight: 'bold', textAlign: 'center' }}>No</Text>
                        <Text style={{ width: '50%', padding: 5, fontWeight: 'bold', textAlign: 'center' }}>Summary</Text>
                        <Text style={{ width: '15%', padding: 5, fontWeight: 'bold', textAlign: 'center' }}>Quantity</Text>
                        <Text style={{ width: '20%', padding: 5, fontWeight: 'bold', textAlign: 'center' }}>Amount</Text>
                    </View>
                    <View style={[styles.tableRow, { borderTop: 'none' }]}>
                        <Text style={{ width: '15%', padding: 10, textAlign: 'center' }}>1</Text>
                        <Text style={[{ width: '50%', padding: 10 }, styles.semiBoldText]}>Consultation fee</Text>
                        <Text style={{ width: '15%', padding: 10, textAlign: 'center' }}>-</Text>
                        <Text style={{ width: '20%', padding: 10, textAlign: 'center' }}>{billData?.consultancy_fee}</Text>
                    </View>
                    {billData?.chargesList?.map((charges, index) => (
                        <View style={[styles.tableRow, { borderTop: 'none' }]} key={charges.chargeId}>
                            <Text style={{ width: '15%', padding: 10, textAlign: 'center' }}>{index + 2}</Text>
                            <Text style={[{ width: '50%', padding: 10 }, styles.semiBoldText]}>{charges?.billingType}</Text>
                            <Text style={{ width: '15%', padding: 10, textAlign: 'center' }}>{charges?.quantity}</Text>
                            <Text style={{ width: '20%', padding: 10, textAlign: 'center' }}>{charges?.total}</Text>
                        </View>
                    ))}
                    <View style={[styles.tableRow, { borderTop: 'none' }]}>
                        <Text style={[{ width: '80%', padding: 10, textAlign: 'right' }, styles.semiBoldText]}>Grand Total</Text>
                        <Text style={{ width: '20%', padding: 10, textAlign: 'center' }}>{billData?.bill_total_amount}</Text>
                    </View>
                </View>
                <View style={styles.signatureSection}>
                    <View style={styles.signatureLine} />
                    <Text style={styles.signatureText}>Signature</Text>
                </View>
            </Page>
        </Document>
    );
};

export default BillPDF;
