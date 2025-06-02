import React from "react";
import { Document, Page, Text, View, StyleSheet, Font, Image } from "@react-pdf/renderer";
import Airavat from "../../assets/images/Airavat.png";

const formatEpochToDate = (epoch) => {
    if (!epoch) return '';
    const date = new Date(epoch * 1000);
    return date.toLocaleDateString('en-GB');
};

// Simplify font registration
Font.register({
    family: 'Helvetica',
    fonts: [
        { src: '/fonts/Helvetica.ttf' },
        { src: '/fonts/Helvetica-Bold.ttf', fontWeight: 'bold' }
    ],
});

const toBase64 = (file) => {

    return "data:image/png;base64,...";
};

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        padding: 40,
        fontSize: 11,
        lineHeight: 1.1,
        color: '#333',
        position: 'relative',
    },
    watermark: {
        position: 'absolute',
        top: '50%',
        left: '28%',
        transform: 'translate(-50%, -50%)',
        opacity: 0.05,  // Reduced from 0.1
        width: '50%',   // Reduced from 60%
        height: 'auto',
    },
    content: {
        position: 'relative',
        zIndex: 1,
    },
    section: {
        marginBottom: 12,
    },
    headerContainer: {
        textAlign: 'center',
        marginBottom: 15
    },
    logo: {
        width: 120,
        height: 80,
        margin: '0 auto',
    },
    headerName: {
        fontSize: 18,
        marginBottom: 8,
        fontWeight: 'bold',
        color: '#2c3e50',
        textTransform: 'uppercase',
        letterSpacing: 0.5
    },
    subHeader: {
        fontSize: 14,
        marginBottom: 8,
        fontWeight: 'bold',
        color: '#2c3e50',
        borderBottom: '1px solid #eaeaea',
        paddingBottom: 4
    },
    header: {
        fontSize: 11,
        marginBottom: 4,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    margin_t: {
        marginTop: 6,
    },
    reg: {
        color: "#606060",
        textAlign: "center",
        fontSize: 10,
    },
    custom_header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
        marginBottom: 12,
        width: '100%'
    },
    leftColumn: {
        width: '55%',
    },
    rightColumn: {
        width: '40%',
        alignItems: 'flex-end',
        textAlign: 'right'
    },
    divider: {
        width: '100%',
        borderTop: '1px solid #475467',
        marginTop: 10,
        marginBottom: 15
    },
    noCol: {
        width: '7%',
        padding: 4,
        textAlign: "center",
    },
    medicineNameCol: {
        width: "20%",
        padding: 4,
        textAlign: "left",
    },
    doseCol: {
        width: "10%",
        padding: 4,
        textAlign: "center",
    },
    typeCol: {
        width: "10%",
        padding: 4,
        textAlign: "center",
    },
    frequencyCol: {
        width: "12%",
        padding: 4,
        textAlign: "center",
    },
    daysCol: {
        width: "8%",
        padding: 4,
        textAlign: "center",
    },
    quantityCol: {
        width: "11%",
        padding: 4,
        textAlign: "center",
    },
    remarksCol: {
        width: "22%",
        padding: 4,
        textAlign: "left",
    },
    tableHeader: {
        backgroundColor: "#F9FAFB",
        fontSize: 10,
        fontWeight: "bold",
        color: '#2c3e50',
        border: '1px solid #e0e0e0'
    },
    tableCol: {
        fontSize: 9,
        borderRight: '1px solid #e0e0e0',
        borderBottom: '1px solid #EAECF0',
    },
    tableRow: {
        flexDirection: "row",
    },
    table: {
        width: "100%",
        marginTop: 8,
        marginBottom: 12
    },
    bulletPoint: {
        fontSize: 10,
        marginLeft: 10,
        marginBottom: 3
    },
    signatureSection: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
        marginBottom: 15
    },
    signatureLine: {
        borderTop: '1px solid #333',
        width: 150,
        marginTop: 25,
        paddingTop: 3,
        fontSize: 10
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 40,
        right: 40,
        fontSize: 10,
        color: '#666',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        borderTop: '1px solid #eaeaea',
        paddingTop: 10
    },
    highlightBox: {
        backgroundColor: '#f8f9fa',
        border: '1px solid #e0e0e0',
        borderRadius: 3,
        padding: 8,
        marginTop: 8,
        marginBottom: 12
    },
    twoColumn: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8
    },
    column: {
        width: '48%'
    },
    hospitalInfo: {
        fontSize: 10
    },
    patientSignature: {
        textAlign: 'center',
        fontSize: 10
    },
});

const DischargeSheetPDF = ({ data, prescription }) => {
    const admittedDate = data?.admitted_date ? formatEpochToDate(data?.admitted_date) : '';
    const dischargeDate = data?.discharge_date_time ? formatEpochToDate(data?.discharge_date_time) : '';
    const followUpDate = data?.follow_up_date_time ? formatEpochToDate(data?.follow_up_date_time) : '';

    const rowsPerPage = 20;

    const prescriptionChunks = [];
    if (prescription?.length > 0) {
        for (let i = 0; i < prescription.length; i += rowsPerPage) {
            prescriptionChunks.push(prescription.slice(i, i + rowsPerPage));
        }
    } else {
        prescriptionChunks.push([]);
    }

    return (
        <Document>

            {/* First Page */}
            <Page size="A4" style={styles.page} wrap>
                <Image src={toBase64(Airavat)} style={styles.watermark} cache={false} />

                <View style={styles.headerContainer}>
                    <Image src={toBase64(Airavat)} style={styles.logo} />
                </View>

                <View>
                    <Text style={styles.reg}>Reg No : MH/THA/NA073</Text>
                </View>

                <View style={styles.custom_header} wrap>
                    <View style={styles.leftColumn}>
                        <Text style={styles.margin_t}><Text style={styles.header}>NAME: </Text>{data?.patient_name}</Text>
                        <Text style={styles.margin_t}><Text style={styles.header}>AGE: </Text>{data?.patient_age} YEARS</Text>
                        <Text style={styles.margin_t}><Text style={styles.header}>CONSULTANT: </Text>{data?.doctor_name}</Text>
                        <Text style={styles.margin_t}><Text style={styles.header}>DATE OF ADMISSION: </Text>{admittedDate}</Text>
                    </View>
                    <View style={styles.rightColumn}>
                        <Text style={styles.margin_t}><Text style={styles.header}>UHID: </Text>{data?.uh_id}</Text>
                        <Text style={styles.margin_t}><Text style={styles.header}>IP NO.: </Text>{data?.ipd_id}</Text>
                        <Text style={styles.margin_t}><Text style={styles.header}>DEPARTMENT: </Text>{data?.department}</Text>
                        <Text style={styles.margin_t}><Text style={styles.header}>DATE OF DISCHARGE: </Text>{dischargeDate}</Text>
                    </View>
                </View>

                <View style={styles.divider}></View>

                <View style={styles.section} wrap>
                    <Text style={styles.subHeader}>Diagnosis</Text>
                    <View>
                        <Text>{data?.diagnosis}</Text>
                    </View>
                </View>

                <View style={styles.section} wrap>
                    <Text style={styles.subHeader}>Chief Complaints</Text>
                    <Text>{data?.chief_complaints}</Text>
                </View>

                <View style={styles.section} wrap>
                    <Text style={styles.subHeader}>Physical Examination</Text>
                    <View style={styles.section} wrap>
                        <Text style={styles.header}>Signs</Text>
                        {data?.signs?.split(',')?.map((item, index) => (
                            <Text key={index} style={styles.bulletPoint}>• {item}</Text>
                        ))}
                    </View>

                    <View style={styles.twoColumn} wrap>
                        <View>
                            <Text style={styles.margin_t}><Text style={styles.header}>Temperature: </Text>{data?.temprature}</Text>
                            <Text style={styles.margin_t}><Text style={styles.header}>Pulse: </Text>{data?.pulse}</Text>
                        </View>
                        <View>
                            <Text style={styles.margin_t}><Text style={styles.header}>Blood Pressure: </Text>{data?.blood_pressure}</Text>
                            <Text style={styles.margin_t}><Text style={styles.header}>Respiratory Rate: </Text>{data?.respiratory_rate}</Text>
                        </View>
                    </View>

                    <View style={styles.section} wrap>
                        <Text style={styles.margin_t}><Text style={styles.header}>Cardiovascular System (CVS): </Text>{data?.cvs}</Text>
                        <Text style={styles.margin_t}><Text style={styles.header}>Respiratory System (RS): </Text>{data?.rs}</Text>
                        <Text style={styles.margin_t}><Text style={styles.header}>Per Abdomen (PA): </Text>{data?.pa}</Text>
                        <Text style={styles.margin_t}><Text style={styles.header}>Central Nervous System (CNS): </Text>{data?.cns}</Text>
                    </View>

                    <View style={styles.section} wrap>
                        <Text style={styles.header}>Local Examination</Text>
                        <Text>{data?.local_examination}</Text>
                    </View>

                    <View style={styles.section} wrap>
                        <Text style={styles.header}>Past History</Text>
                        <Text>{data?.past_history || "None provided"}</Text>
                    </View>

                    <View style={styles.section} >
                        <Text style={styles.subHeader}>Course in hospital</Text>
                        <Text>{data?.course_details}</Text>
                        {data?.treatment_point?.length > 0 && (
                            <View style={{ marginTop: 8 }} >
                                {data?.treatment_point?.map((treatment, index) => (
                                    <Text key={treatment?.treatment_id} style={styles.bulletPoint}>
                                        • {treatment?.treatment_point}
                                    </Text>
                                ))}
                            </View>
                        )}
                    </View>
                </View>
            </Page>

            {/* Second Page - Advice and Prescription */}
            <Page size="A4" style={styles.page} wrap>
                <Image src={toBase64(Airavat)} style={styles.watermark} />

                <View style={styles.section} wrap>
                    <Text style={styles.subHeader}>Advice on Discharge</Text>
                    <View>
                        <Text>{data?.discharge_advice}</Text>
                    </View>
                </View>

                <View style={styles.section} wrap>
                    <Text style={styles.subHeader}>Further Follow-up</Text>
                    <View>
                        <Text>ALL INVESTIGATION REPORTS AND IMAGES OF RADIOLOGICAL INVESTIGATIONS HAVE BEEN HANDED OVER TO THE PATIENT/PATIENT ATTENDANT.</Text>
                    </View>
                </View>

                <View style={styles.section} wrap>
                    <Text style={[styles.subHeader, { borderBottom: 'none' }]}>Follow-up Date:
                        <Text style={{ fontWeight: "normal" }}> {followUpDate}</Text>
                    </Text>
                </View>

                {prescriptionChunks?.map((chunk, chunkIndex) => (
                    <View key={`chunk-${chunkIndex}`} style={styles.section} wrap>
                        <Text style={styles.subHeader}>
                            {chunkIndex === 0 ? 'Prescription' : 'Prescription (continued)'}
                        </Text>
                        <View style={styles.table} wrap>
                            <View style={[styles.tableRow, { backgroundColor: "#F9FAFB" }]}>
                                <Text style={[styles.tableHeader, styles.noCol]}>No</Text>
                                <Text style={[styles.tableHeader, styles.medicineNameCol]}>Medicine Name</Text>
                                <Text style={[styles.tableHeader, styles.doseCol]}>Dose</Text>
                                <Text style={[styles.tableHeader, styles.typeCol]}>Type</Text>
                                <Text style={[styles.tableHeader, styles.frequencyCol]}>Frequency</Text>
                                <Text style={[styles.tableHeader, styles.daysCol]}>Days</Text>
                                <Text style={[styles.tableHeader, styles.quantityCol]}>Quantity</Text>
                                <Text style={[styles.tableHeader, styles.remarksCol]}>Remarks</Text>
                            </View>

                            {chunk?.map((prescription, index) => (
                                <View style={styles.tableRow} key={prescription?.Prescription_Id}>
                                    <Text style={[styles.tableCol, styles.noCol]}>{chunkIndex * 15 + index + 1}</Text>
                                    <Text style={[styles.tableCol, styles.medicineNameCol]}>{prescription?.medicine_name}</Text>
                                    <Text style={[styles.tableCol, styles.doseCol]}>{prescription?.dosage}</Text>
                                    <Text style={[styles.tableCol, styles.typeCol]}>{prescription?.medicine_type}</Text>
                                    <Text style={[styles.tableCol, styles.frequencyCol]}>{prescription?.frequency}</Text>
                                    <Text style={[styles.tableCol, styles.daysCol]}>{prescription?.days}</Text>
                                    <Text style={[styles.tableCol, styles.quantityCol]}>{prescription?.quantity}</Text>
                                    <Text style={[styles.tableCol, styles.remarksCol]}>{prescription?.common_note}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                ))}

                <View style={styles.signatureSection} wrap>
                    <View>
                        <Text>Prepared by: {data?.doctor_name}</Text>
                    </View>
                    <View>
                        <Text>Checked by: {data?.doctor_name}</Text>
                    </View>
                </View>

                <View style={styles.section} wrap>
                    <Text>Summary issued date / time: {data?.discharge_date}, {data?.discharge_time}</Text>
                </View>

                <View style={styles.footer} wrap>
                    <View style={styles.hospitalInfo}>
                        <Text style={[styles.header, styles.margin_t]}>
                            Airavat-{data?.department}-Team
                        </Text>
                        <Text style={styles.header}>Airavat Clinic, near Amrut Enterprises</Text>
                        <Text style={styles.header}>Badlapur, Maharashtra 421503</Text>
                    </View>
                    <View style={styles.patientSignature}>
                        <Text>{data?.patient_name}</Text>
                        <Text>(Patient / Relative signature)</Text>
                    </View>
                </View>
            </Page>

            {/* <Page size="A4" style={styles.page} wrap>
                {prescriptionChunks?.map((chunk, chunkIndex) => (
                    <View key={`chunk-${chunkIndex}`} style={styles.section} wrap>
                        <Text style={styles.subHeader}>
                            {chunkIndex === 0 ? 'Prescription' : 'Prescription (continued)'}
                        </Text>
                        <View style={styles.table} wrap>
                            <View style={[styles.tableRow, { backgroundColor: "#F9FAFB" }]}>
                                <Text style={[styles.tableHeader, styles.noCol]}>No</Text>
                                <Text style={[styles.tableHeader, styles.medicineNameCol]}>Medicine Name</Text>
                                <Text style={[styles.tableHeader, styles.doseCol]}>Dose</Text>
                                <Text style={[styles.tableHeader, styles.typeCol]}>Type</Text>
                                <Text style={[styles.tableHeader, styles.frequencyCol]}>Frequency</Text>
                                <Text style={[styles.tableHeader, styles.daysCol]}>Days</Text>
                                <Text style={[styles.tableHeader, styles.quantityCol]}>Quantity</Text>
                                <Text style={[styles.tableHeader, styles.remarksCol]}>Remarks</Text>
                            </View>

                            {chunk?.map((prescription, index) => (
                                <View style={styles.tableRow} key={prescription.Prescription_Id}>
                                    <Text style={[styles.tableCol, styles.noCol]}>{chunkIndex * 15 + index + 1}</Text>
                                    <Text style={[styles.tableCol, styles.medicineNameCol]}>{prescription?.medicine_name}</Text>
                                    <Text style={[styles.tableCol, styles.doseCol]}>{prescription?.dosage}</Text>
                                    <Text style={[styles.tableCol, styles.typeCol]}>{prescription?.medicine_type}</Text>
                                    <Text style={[styles.tableCol, styles.frequencyCol]}>{prescription?.frequency}</Text>
                                    <Text style={[styles.tableCol, styles.daysCol]}>{prescription?.days}</Text>
                                    <Text style={[styles.tableCol, styles.quantityCol]}>{prescription?.quantity}</Text>
                                    <Text style={[styles.tableCol, styles.remarksCol]}>{prescription?.common_note}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                ))}
            </Page> */}

        </Document>
    );
};

export default DischargeSheetPDF;
