// import React from "react";
// import { Document, Page, Text, View, StyleSheet, Font, Image } from "@react-pdf/renderer";
// // import Airavat from "../../../assets/images/Airavat.png";
// import Airavat from "../../assets/images/Airavat.png";
 
// Font.register({
//     family: 'Times New Roman',  // Define font family name
//     fonts: [
//         {
//             src: '/fonts/Times New Roman.ttf',  // Path to the regular font file
//             fontWeight: 'normal',  // Regular weight
//         },
//         {
//             src: '/fonts/Times New Roman Bold.ttf',  // Path to the bold font file
//             fontWeight: 'bold',  // Bold weight
//         },
//     ],
// });
 
// // Define styles for the PDF document
// const styles = StyleSheet.create({
//     page: {
//         fontFamily: 'Times New Roman',
//         padding: 30,
//         fontSize: 12,
//     },
//     section: {
//         margin: 20,
//     },
//     headerName: {
//         fontFamily: 'Times New Roman',
//         fontSize: 20,
//         marginBottom: 10,
//         fontWeight: 'bold',
//     },
//     subHeader: {
//         fontFamily: 'Times New Roman',
//         fontSize: 16,
//         marginBottom: 10,
//         fontWeight: 'bold',
//     },
//     header: {
//         fontFamily: 'Times New Roman',
//         fontSize: 12,
//         marginBottom: 10,
//         fontWeight: 'bold',
//     },
//     margin_t: {
//         marginTop: 10
//     },
//     custom_header: {
//         // fontWeight:"bold",
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: "space-between",
//         marginBottom: 15
//     },
//     table: {
//         display: "table",
//         width: "100%",
//         borderCollapse: "collapse",
//     },
//     tableRow: {
//         flexDirection: "row",
//         borderBottom: "1px solid #EAECF0",
//     },
//     tableHeader: {
//         backgroundColor: "#F9FAFB",
//         fontSize: 12,
//         fontWeight: "bold",
//         padding: 8,
//         textAlign: "center",
//     },
//     tableCol: {
//         width: "10%", // Divide equally among 8 columns
//         padding: 6,
//         textAlign: "center",
//     },
//     medicineNameCol: {
//         width: "17%",
//         fontWeight: "bold",
//         padding: 6,
//         textAlign: "center",
//     },
//     remarksCol: {
//         width: "20%",
//         padding: 6,
//         textAlign: "center",
//     },
//     semiBoldText: {
//         fontFamily: 'Times New Roman',
//         fontSize: 11, // Slightly larger than normal
//         fontWeight: 'bold', // Use bold to mimic semi-bold
//         letterSpacing: 0.3, // Adjust letter spacing for better readability
//     },
//     bulletPoint: {
//         fontSize: 12,
//         marginLeft: 10,
//     },
// });
 
// // PDF Component
// const DischargeSheetPDF = ({ data, prescription }) => {


 
//     return (
//         <Document>
//             <Page size="A4" style={styles.page}>
//                 <View style={{ textAlign: 'center' }}>
//                     <Image
//                         src={Airavat}
//                         style={{ width: 150, height: 100, margin: 'auto', marginBottom: 5 }}
//                     />
//                 </View>
//                 <View style={styles.custom_header}>
//                     <View>
//                         <Text style={styles.margin_t}><Text style={styles.header}>NAME : </Text>{data?.patient_name}</Text>
//                         <Text style={styles.margin_t}><Text style={styles.header}>AGE : </Text>{data?.patient_age} YEARS</Text>
//                         <Text style={styles.margin_t}><Text style={styles.header}>CONSULTANT. : </Text>{data?.doctor_name}</Text>
//                         <Text style={styles.margin_t}><Text style={styles.header}>DATE OF ADMISSION : </Text>{data?.admitted_date}</Text>
 
//                     </View>
//                     <View>
//                         <Text style={styles.margin_t}><Text style={styles.header}>UHID : </Text>{data?.uh_id}</Text>
//                         <Text style={styles.margin_t}><Text style={styles.header}>IP NO. : </Text>{data?.ipd_id}</Text>
//                         <Text style={styles.margin_t}><Text style={styles.header}>DEPARTMENT </Text>{data?.department}</Text>
//                         <Text style={styles.margin_t}><Text style={styles.header}>DATE OF DISCHARGE : </Text>{data?.discharge_date}</Text>
//                     </View>
//                 </View>
//                 <View style={{ width: '100%', borderTop: '1px solid #475467', marginTop: 8 }}>
//                 </View>
//                 <View style={{ marginBottom: 10, marginTop: 10 }}>
//                     <Text style={[styles.subHeader, styles.margin_t]}>Diagnosis</Text>
//                     <Text>
//                         {data?.diagnosis}
//                     </Text>
//                 </View>
 
//                 <View style={{ marginBottom: 10, marginTop: 10 }}>
//                     <Text style={[styles.subHeader, styles.margin_t]}>Chief complaints</Text>
//                     <Text>
//                         {data?.chief_complaints}
//                     </Text>
//                 </View>
 
//                 <View style={{ marginTop: 10 }}>
//                     <Text style={[styles.subHeader, styles.margin_t]}>Physical examination</Text>
//                     <View style={{ marginBottom: 10, marginTop: 10 }}>
//                         <Text style={styles.header}>Signs </Text>
//                         {
//                             data?.signs?.split(',')?.map((item, index) => (
//                                 <Text key={index} style={styles.bulletPoint}>
//                                     • {item}
//                                 </Text>
//                             ))
//                         }
//                     </View>
//                     <View style={styles.custom_header}>
//                         <View>
//                             <Text style={styles.margin_t}><Text style={styles.header}>Temperature : </Text>{data?.temprature}</Text>
//                             <Text style={styles.margin_t}><Text style={styles.header}>Pulse : </Text>{data?.pulse}</Text>
 
//                         </View>
//                         <View>
//                             <Text style={styles.margin_t}><Text style={styles.header}>Blood Pressure : </Text>{data?.blood_pressure}</Text>
//                             <Text style={styles.margin_t}><Text style={styles.header}>Respiratory Rate : </Text>{data?.respiratory_rate}</Text>
//                         </View>
//                     </View>
 
//                     <View style={{ marginBottom: 10, marginTop: 10 }}>
//                         <Text style={styles.margin_t}><Text style={styles.header}>Cardiovascular System (CVS) : </Text>{data?.cvs}</Text>
//                         <Text style={styles.margin_t}><Text style={styles.header}>Respiratory System (RS) : </Text>{data?.rs}</Text>
//                         <Text style={styles.margin_t}><Text style={styles.header}>Per Abdomen(PA) : </Text>{data?.pa}</Text>
//                         <Text style={styles.margin_t}><Text style={styles.header}>Central Nervous System (CNS) : </Text>{data?.cns}</Text>
//                     </View>
//                     <View style={{ marginBottom: 10, marginTop: 10 }}>
//                         <Text style={styles.header}>Local Examination </Text>
//                         <Text >
//                             {data?.local_examination}
//                         </Text>
//                     </View>
//                 </View>
//             </Page>
//             <Page size="A4" style={styles.page}>
//                 <View style={{ marginBottom: 10, marginTop: 10 }}>
//                     <Text style={[styles.subHeader, styles.margin_t]}>Advice on discharge</Text>
//                     <Text>
//                         {data?.discharge_advice}
//                     </Text>
//                 </View>
 
//                 {prescription?.length > 0 &&
//                     <View style={{ marginBottom: 10, marginTop: 10 }}>
//                         <Text style={[styles.subHeader, styles.margin_t]}>Prescription</Text>
//                         <View style={styles.table}>
//                             <View style={[styles.tableRow, { backgroundColor: "#F9FAFB" }]}>
//                                 <Text style={[styles.tableCol, { fontWeight: "bold" }]}>No</Text>
//                                 <Text style={styles.medicineNameCol}>Medicine Name</Text>
//                                 <Text style={[styles.tableCol, { fontWeight: "bold" }]}>Dose</Text>
//                                 <Text style={[styles.tableCol, { fontWeight: "bold" }]}>Type</Text>
//                                 <Text style={[styles.tableCol, { fontWeight: "bold", width: "12%" }]}>Frequency</Text>
//                                 <Text style={[styles.tableCol, { fontWeight: "bold" }]}>Days</Text>
//                                 <Text style={[styles.tableCol, { fontWeight: "bold", width: "11%" }]}>Quantity</Text>
//                                 <Text style={[styles.remarksCol, { fontWeight: "bold" }]}>Remarks</Text>
//                             </View>
 
//                             {/* Table Rows */}
//                             {prescription?.map((prescription, index) => (
//                                 <View style={styles.tableRow} key={prescription.Prescription_Id}>
//                                     <Text style={[styles.tableCol, { fontSize: '12px' }]}>{index + 1}</Text>
//                                     <Text style={[styles.medicineNameCol, { fontSize: '12px' }]}>{prescription?.medicine_name}</Text>
//                                     <Text style={[styles.tableCol, { fontSize: '12px' }]}>{prescription?.dosage}</Text>
//                                     <Text style={[styles.tableCol, { fontSize: '12px' }]}>{prescription?.medicine_type}</Text>
//                                     <Text style={[styles.tableCol, { width: "12%", fontSize: '12px' }]}>{prescription?.frequency}</Text>
//                                     <Text style={[styles.tableCol, { fontSize: '12px' }]}>{prescription?.days}</Text>
//                                     <Text style={[styles.tableCol, { width: "11%", fontSize: '12px' }]}>{prescription?.quantity}</Text>
//                                     <Text style={[styles.remarksCol, { fontSize: '12px' }]}>{prescription?.common_note}</Text>
//                                 </View>
//                             ))}
//                         </View>
//                     </View>}
 
//                 <View style={{ marginBottom: 10, marginTop: 10 }}>
//                     <Text style={[styles.subHeader, styles.margin_t]}>Further Follow-up</Text>
 
//                     <Text>
//                         ALL INVESTIGATION REPORTS AND IMAGES OF RADIOLOGICAL INVESTIGATIONS HAVE BEEN HANDED OVER TOTHE PATIENT/PATIENT ATTENDANT.
//                     </Text>
//                 </View>
//                 <View style={{ marginBottom: 10, marginTop: 10, display: "flex", flexDirection: 'row', gap: 20 }}>
//                     <Text style={styles.margin_t}>Prepared by :{data?.doctor_name}</Text>
//                     <Text style={styles.margin_t}>Checked by :{data?.doctor_name}</Text>
//                 </View>
//                 <View style={{ marginBottom: 10, marginTop: 10 }}>
//                     <Text>Summary issued date / time  : {data?.discharge_date}, {data?.discharge_time}</Text>
//                 </View>
//                 <View style={styles.custom_header}>
//                     <View>
//                         <Text style={[styles.header, styles.margin_t]}>Airavat-{data?.department}-Team </Text>
//                         <Text style={styles.header}>Airavat Clinic, near Amrut Enterprises</Text>
//                         <Text style={styles.header}>Badlapur Maharashtra 421503</Text>
//                     </View>
//                     <View>
//                         <Text style={{marginTop: 20}}></Text>
//                         <Text style={{marginTop: 20}}></Text>
//                         <Text style={styles.margin_t}>{data?.patient_name}</Text>
//                         <Text>(Patient / Relative signature)</Text>
//                     </View>
//                 </View>
 
//                 <View style={{ marginBottom: 10, marginTop: 10 }}>
//                     <Text>
//                         I have understood the instructions given about the medication dosage and post discharge care.</Text>
//                 </View>
//             </Page>
//         </Document>
//     )
// };
 
// export default DischargeSheetPDF;


import React from "react";
import { Document, Page, Text, View, StyleSheet, Font, Image } from "@react-pdf/renderer";
import Airavat from "../../assets/images/Airavat.png";

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
    subHeader: {
        fontFamily: 'Times New Roman',
        fontSize: 16,
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
        width: "10%",
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
    semiBoldText: {
        fontFamily: 'Times New Roman',
        fontSize: 11,
        fontWeight: 'bold',
        letterSpacing: 0.3,
    },
    bulletPoint: {
        fontSize: 12,
        marginLeft: 10,
    },
});

const DischargeSheetPDF = ({ data, prescription }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={{ textAlign: 'center' }}>
                    <Image
                        src={Airavat}
                        style={{ width: 150, height: 100, margin: 'auto', marginBottom: 5 }}
                    />
                </View>
                <View style={styles.custom_header}>
                    <View>
                        <Text style={styles.margin_t}><Text style={styles.header}>NAME : </Text>{data?.patient_name}</Text>
                        <Text style={styles.margin_t}><Text style={styles.header}>AGE : </Text>{data?.patient_age} YEARS</Text>
                        <Text style={styles.margin_t}><Text style={styles.header}>CONSULTANT : </Text>{data?.doctor_name}</Text>
                        <Text style={styles.margin_t}><Text style={styles.header}>DATE OF ADMISSION : </Text>{data?.admitted_date}</Text>
                    </View>
                    <View>
                        <Text style={styles.margin_t}><Text style={styles.header}>UHID : </Text>{data?.uh_id}</Text>
                        <Text style={styles.margin_t}><Text style={styles.header}>IP NO. : </Text>{data?.ipd_id}</Text>
                        <Text style={styles.margin_t}><Text style={styles.header}>DEPARTMENT : </Text>{data?.department}</Text>
                        <Text style={styles.margin_t}><Text style={styles.header}>DATE OF DISCHARGE : </Text>{data?.discharge_date}</Text>
                    </View>
                </View>
                <View style={{ width: '100%', borderTop: '1px solid #475467', marginTop: 8 }}></View>
                <View style={{ marginBottom: 10, marginTop: 10 }}>
                    <Text style={[styles.subHeader, styles.margin_t]}>Diagnosis</Text>
                    <Text>{data?.diagnosis}</Text>
                </View>
                <View style={{ marginBottom: 10, marginTop: 10 }}>
                    <Text style={[styles.subHeader, styles.margin_t]}>Chief Complaints</Text>
                    <Text>{data?.chief_complaints}</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={[styles.subHeader, styles.margin_t]}>Physical Examination</Text>
                    <View style={{ marginBottom: 10, marginTop: 10 }}>
                        <Text style={styles.header}>Signs</Text>
                        {data?.signs?.split(',')?.map((item, index) => (
                            <Text key={index} style={styles.bulletPoint}>• {item}</Text>
                        ))}
                    </View>
                    <View style={styles.custom_header}>
                        <View>
                            <Text style={styles.margin_t}><Text style={styles.header}>Temperature : </Text>{data?.temprature}</Text>
                            <Text style={styles.margin_t}><Text style={styles.header}>Pulse : </Text>{data?.pulse}</Text>
                        </View>
                        <View>
                            <Text style={styles.margin_t}><Text style={styles.header}>Blood Pressure : </Text>{data?.blood_pressure}</Text>
                            <Text style={styles.margin_t}><Text style={styles.header}>Respiratory Rate : </Text>{data?.respiratory_rate}</Text>
                        </View>
                    </View>
                    <View style={{ marginBottom: 10, marginTop: 10 }}>
                        <Text style={styles.margin_t}><Text style={styles.header}>Cardiovascular System (CVS) : </Text>{data?.cvs}</Text>
                        <Text style={styles.margin_t}><Text style={styles.header}>Respiratory System (RS) : </Text>{data?.rs}</Text>
                        <Text style={styles.margin_t}><Text style={styles.header}>Per Abdomen (PA) : </Text>{data?.pa}</Text>
                        <Text style={styles.margin_t}><Text style={styles.header}>Central Nervous System (CNS) : </Text>{data?.cns}</Text>
                    </View>
                    <View style={{ marginBottom: 10, marginTop: 10 }}>
                        <Text style={styles.header}>Local Examination</Text>
                        <Text>{data?.local_examination}</Text>
                    </View>
                    <View style={{ marginBottom: 10, marginTop: 10 }}>
                        <Text style={styles.header}>Past History</Text>
                        <Text>{data?.past_history || "None provided"}</Text>
                    </View>
                    <View style={{ marginBottom: 10, marginTop: 10 }}>
                        <Text style={[styles.subHeader, styles.margin_t]}>Course Treatment</Text>
                        <Text>{data?.course_details}</Text>
                        {data?.treatment_point?.length > 0 && (
                            <View style={{ marginTop: 5 }}>
                                {data.treatment_point.map((treatment, index) => (
                                    <Text key={treatment.treatment_id} style={styles.bulletPoint}>
                                        • {treatment.treatment_point}
                                    </Text>
                                ))}
                            </View>
                        )}
                    </View>
                </View>
            </Page>
            <Page size="A4" style={styles.page}>
                <View style={{ marginBottom: 10, marginTop: 10 }}>
                    <Text style={[styles.subHeader, styles.margin_t]}>Advice on Discharge</Text>
                    <Text>{data?.discharge_advice}</Text>
                </View>
                {prescription?.length > 0 && (
                    <View style={{ marginBottom: 10, marginTop: 10 }}>
                        <Text style={[styles.subHeader, styles.margin_t]}>Prescription</Text>
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
                            {prescription?.map((prescription, index) => (
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
                    </View>
                )}
                <View style={{ marginBottom: 10, marginTop: 10 }}>
                    <Text style={[styles.subHeader, styles.margin_t]}>Further Follow-up</Text>
                    <Text>ALL INVESTIGATION REPORTS AND IMAGES OF RADIOLOGICAL INVESTIGATIONS HAVE BEEN HANDED OVER TO THE PATIENT/PATIENT ATTENDANT.</Text>
                </View>
                <View style={{ marginBottom: 10, marginTop: 10, display: "flex", flexDirection: 'row', gap: 20 }}>
                    <Text style={styles.margin_t}>Prepared by: {data?.doctor_name}</Text>
                    <Text style={styles.margin_t}>Checked by: {data?.doctor_name}</Text>
                </View>
                <View style={{ marginBottom: 10, marginTop: 10 }}>
                    <Text>Summary issued date / time: {data?.discharge_date}, {data?.discharge_time}</Text>
                </View>
                <View style={styles.custom_header}>
                    <View>
                        <Text style={[styles.header, styles.margin_t]}>
                            Airavat-{data?.department}-Team
                        </Text>
                        <Text style={styles.header}>Airavat Clinic, near Amrut Enterprises</Text>
                        <Text style={styles.header}>Badlapur, Maharashtra 421503</Text>
                    </View>
                    <View>
                        <Text style={{ marginTop: 20 }}></Text>
                        <Text style={{ marginTop: 20 }}></Text>
                        <Text style={styles.margin_t}>{data?.patient_name}</Text>
                        <Text>(Patient / Relative signature)</Text>
                    </View>
                </View>
                <View style={{ marginBottom: 10, marginTop: 10 }}>
                    <Text>I have understood the instructions given about the medication dosage and post-discharge care.</Text>
                </View>
            </Page>
        </Document>
    );
};

export default DischargeSheetPDF;