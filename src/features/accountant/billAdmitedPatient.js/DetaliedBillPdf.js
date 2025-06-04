import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// Define styles for the PDF
const styles = StyleSheet.create({
    page: {
        padding: 20,
        fontFamily: 'Helvetica',
        fontSize: 10,
        color: '#333',
        backgroundColor: '#fff',
        position: 'relative',
    },
    watermark: {
        position: 'absolute',
        top: '40%',
        left: '20%',
        opacity: 0.1,
        width: 300,
        height: 300,
        transform: 'rotate(-45deg)',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        borderBottom: '1px solid #e0e0e0',
        paddingBottom: 10,
    },
    logo: {
        width: 100,
        height: 60,
    },
    hospitalInfo: {
        textAlign: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
        color: '#2c3e50',
    },
    patientInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
        padding: 10,
        backgroundColor: '#f8f9fa',
        borderRadius: 5,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#2c3e50',
    },
    table: {
        width: '100%',
        marginBottom: 15,
        border: '1px solid #e0e0e0',
        borderRadius: 5,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#e9ecef',
        padding: 8,
        fontWeight: 'bold',
        borderBottom: '1px solid #e0e0e0',
    },
    tableRow: {
        flexDirection: 'row',
        padding: 8,
        borderBottom: '1px solid #e0e0e0',
        borderTop: '1px solid #e0e0e0',
        alignItems: 'center',
    },
    tableCol: {
        paddingHorizontal: 5,
    },
    colNo: { width: '5%', textAlign: 'left' },
    colDesc: { width: '35%', textAlign: 'left' },
    colDate: { width: '20%', textAlign: 'left' },
    colQty: { width: '10%', textAlign: 'right' },
    colAmount: { width: '15%', textAlign: 'right', fontWeight: 'bold' }, // Emphasize amount
    colDoctorAmount: { width: '25%', textAlign: 'right', fontWeight: 'bold' }, // Emphasize doctor amount
    breakdownTable: {
        width: '80%',
        marginLeft: 3,
        marginTop: 10, // Added marginTop for spacing
        marginBottom: 5,
        border: '1px solid #e0e0e0',
        borderRadius: 5,
        opacity: "0.6"
    },
    breakdownHeader: {
        flexDirection: 'row',
        backgroundColor: '#f1f3f5',
        padding: 6,
        fontWeight: 'bold',
        borderBottom: '1px solid #e0e0e0',
    },
    breakdownRow: {
        flexDirection: 'row',
        padding: 6,
        borderBottom: '1px solid #e0e0e0',
        alignItems: 'center',
    },
    breakdownColItem: { width: '40%', textAlign: 'left' },
    breakdownColUnit: { width: '20%', textAlign: 'right' },
    breakdownColDays: { width: '15%', textAlign: 'right' },
    breakdownColTotal: { width: '25%', textAlign: 'right', fontWeight: 'bold' },
    totals: {
        marginTop: 15,
        alignSelf: 'flex-end',
        width: '35%',
        padding: 10,
        backgroundColor: '#f8f9fa',
        borderRadius: 5,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    totalLabel: { fontWeight: 'bold' },
    grandTotal: {
        borderTop: '1px solid #2c3e50',
        paddingTop: 5,
        marginTop: 5,
        fontWeight: 'bold',
    },
    footer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTop: '1px solid #e0e0e0',
        paddingTop: 10,
    },
    terms: {
        marginTop: 15,
        fontSize: 8,
        color: '#555',
    },
});

const DetailedBillPDF = ({ billData, discount, roomChargeDetails }) => {
    const formatDate = (timestamp) => {
        if (!timestamp) return 'N/A';
        return new Date(timestamp * 1000).toLocaleDateString('en-IN');
    };

    const formatCurrency = (amount) => {
        if (amount === null || amount === undefined) return '-';
        return `${amount.toLocaleString('en-IN')}`;
    };

    // Consolidate room charges by room type
    const consolidatedRooms = billData.room1?.reduce((acc, room) => {
        const roomType = room.room_type_name || `Type ${room.room_type}`;
        const days = Math.ceil((room.end_date - room.start_date) / (24 * 60 * 60)) || 1;
        const existing = acc.find((r) => r.room_type_name === roomType);

        if (existing) {
            existing.days += days;
            existing.total += room.total * days;
            existing.start_date = Math.min(existing.start_date, room.start_date);
            existing.end_date = Math.max(existing.end_date, room.end_date);
        } else {
            acc.push({
                room_type_name: roomType,
                days,
                total: room.total * days,
                start_date: room.start_date,
                end_date: room.end_date,
            });
        }
        return acc;
    }, []) || [];

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Watermark */}
                {/* <Image style={styles.watermark} src="/path/to/watermark.png" /> */}

                {/* Hospital Header */}
                <View style={styles.hospitalInfo}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: "#1E959B", marginTop: "5px" }}>AIRAVAT HOSPITAL</Text>
                    <Text>Airavat Clinic, near Amrut Enterprises</Text>
                    <Text>Badlapur, Maharashtra 421503</Text>
                </View>

                {/* Bill Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={{ fontSize: 12, fontWeight: 'bold' }}>DETAILED BILL STATEMENT</Text>
                        <Text>Receipt No: {billData.receipt_number || `IPD-${billData.ipd_id}`}</Text>
                        <Text>Date: {new Date().toLocaleDateString('en-IN')}</Text>
                    </View>
                    {/* <Image style={styles.logo} src="/path/to/logo.png" /> */}
                </View>

                {/* Patient Information */}
                <View style={styles.patientInfo}>
                    <View>
                        <Text>Patient Name: {billData.Name}</Text>
                        <Text>Patient ID: {billData.Patient_ID}</Text>
                        <Text>Age/Sex: {billData.patient_age} / {billData.patient_sex}</Text>
                    </View>
                    <View style={{ textAlign: 'right' }}>
                        <Text>IPD No: {billData.ipd_id}</Text>
                        <Text>Admitted: {formatDate(billData.admitted_date)}</Text>
                        {billData.discharge_date && (
                            <Text>Discharged: {formatDate(billData.discharge_date)}</Text>
                        )}
                    </View>
                </View>

                {/* Room Charges */}
                {consolidatedRooms.length > 0 && (
                    <>
                        <Text style={styles.sectionTitle}>Room Charges</Text>
                        <View style={styles.table}>
                            <View style={styles.tableHeader}>
                                <Text style={[styles.tableCol, styles.colNo]}>No</Text>
                                <Text style={[styles.tableCol, styles.colDesc]}>Room Type</Text>
                                <Text style={[styles.tableCol, styles.colDate]}>Date Range</Text>
                                <Text style={[styles.tableCol, styles.colQty]}>Days</Text>
                                <Text style={[styles.tableCol, styles.colAmount]}>Amount</Text>
                            </View>
                            {consolidatedRooms.map((room, index) => {
                                const details = roomChargeDetails(room.room_type_name);
                                const hasBreakdown = details && details.length > 0;
                                const breakdownTotal = details.reduce((sum, item) => sum + (item.amount || 0), 0);

                                return (
                                    <View key={`room-${index}`}>
                                        <View style={styles.tableRow}>
                                            <Text style={[styles.tableCol, styles.colNo]}>{index + 1}</Text>
                                            <Text style={[styles.tableCol, styles.colDesc]}>
                                                {room.room_type_name}
                                            </Text>
                                            <Text style={[styles.tableCol, styles.colDate]}>
                                                {formatDate(room.start_date)} - {formatDate(room.end_date)}
                                            </Text>
                                            <Text style={[styles.tableCol, styles.colQty]}>{room.days}</Text>
                                            <Text style={[styles.tableCol, styles.colAmount]}>
                                                {formatCurrency(room.total)}
                                            </Text>
                                        </View>
                                        {hasBreakdown && (
                                            <View style={styles.breakdownTable}>
                                                <View style={styles.breakdownHeader}>
                                                    <Text style={[styles.tableCol, styles.breakdownColItem]}>Item</Text>
                                                    <Text style={[styles.tableCol, styles.breakdownColUnit]}>Unit Charge</Text>
                                                    <Text style={[styles.tableCol, styles.breakdownColDays]}>Days</Text>
                                                    <Text style={[styles.tableCol, styles.breakdownColTotal]}>Total</Text>
                                                </View>
                                                {details.map((item, detailIndex) => (
                                                    <View key={`detail-${detailIndex}`} style={styles.breakdownRow}>
                                                        <Text style={[styles.tableCol, styles.breakdownColItem]}>
                                                            {item.name}
                                                        </Text>
                                                        <Text style={[styles.tableCol, styles.breakdownColUnit]}>
                                                            {formatCurrency(item.amount)}
                                                        </Text>
                                                        <Text style={[styles.tableCol, styles.breakdownColDays]}>
                                                            {room.days}
                                                        </Text>
                                                        <Text style={[styles.tableCol, styles.breakdownColTotal]}>
                                                            {formatCurrency(item.amount * room.days)}
                                                        </Text>
                                                    </View>
                                                ))}
                                                <View style={[styles.breakdownRow, { backgroundColor: '#f8f9fa' }]}>
                                                    <Text style={[styles.tableCol, styles.breakdownColItem, { fontWeight: 'bold' }]}>
                                                        Total
                                                    </Text>
                                                    <Text style={[styles.tableCol, styles.breakdownColUnit, { fontWeight: 'bold' }]}>
                                                        {formatCurrency(breakdownTotal)}
                                                    </Text>
                                                    <Text style={[styles.tableCol, styles.breakdownColDays, { fontWeight: 'bold' }]}>
                                                        {room.days}
                                                    </Text>
                                                    <Text style={[styles.tableCol, styles.breakdownColTotal, { fontWeight: 'bold' }]}>
                                                        {formatCurrency(breakdownTotal * room.days)}
                                                    </Text>
                                                </View>
                                            </View>
                                        )}
                                    </View>
                                );
                            })}
                        </View>
                    </>
                )}

                {/* Other Charges */}
                {billData?.othercharges && (
                    <>
                        <Text style={styles.sectionTitle}>Other Charges</Text>
                        <View style={styles.table}>
                            <View style={styles.tableHeader}>
                                <Text style={[styles.tableCol, styles.colNo]}>No</Text>
                                <Text style={[styles.tableCol, styles.colDesc]}>Description</Text>
                                <Text style={[styles.tableCol, styles.colDate]}>Date</Text>
                                <Text style={[styles.tableCol, styles.colQty]}>Qty</Text>
                                <Text style={[styles.tableCol, styles.colAmount]}>Amount</Text>
                            </View>
                            {billData.othercharges?.map((charge, index) => (
                                <View key={`charge-${index}`} style={styles.tableRow}>
                                    <Text style={[styles.tableCol, styles.colNo]}>{index + 1}</Text>
                                    <Text style={[styles.tableCol, styles.colDesc]}>{charge.charge_name}</Text>
                                    <Text style={[styles.tableCol, styles.colDate]}>{formatDate(charge.charge_date)}</Text>
                                    <Text style={[styles.tableCol, styles.colQty]}>{charge.quantity || 1}</Text>
                                    <Text style={[styles.tableCol, styles.colAmount]}>
                                        {formatCurrency(charge.amount * (charge.quantity || 1))}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </>
                )}

                {/* Doctor Visits */}
                {billData.doctorvisiting && (
                    <>
                        <Text style={styles.sectionTitle}>Doctor Visits</Text>
                        <View style={styles.table}>
                            <View style={styles.tableHeader}>
                                <Text style={[styles.tableCol, styles.colNo]}>No</Text>
                                <Text style={[styles.tableCol, styles.colDesc]}>Doctor Name</Text>
                                <Text style={[styles.tableCol, styles.colDate]}>Date</Text>
                                <Text style={[styles.tableCol, styles.colDoctorAmount]}>Amount</Text>
                            </View>
                            {billData.doctorvisiting?.map((visit, index) => (
                                <View key={`visit-${index}`} style={styles.tableRow}>
                                    <Text style={[styles.tableCol, styles.colNo]}>{index + 1}</Text>
                                    <Text style={[styles.tableCol, styles.colDesc]}>{visit.doctor_name}</Text>
                                    <Text style={[styles.tableCol, styles.colDate]}>{formatDate(visit.visit_date)}</Text>
                                    <Text style={[styles.tableCol, styles.colDoctorAmount]}>
                                        {formatCurrency(visit.amount)}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </>
                )}

                {/* Payment Summary */}
                <View style={styles.totals}>
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Subtotal:</Text>
                        <Text>{formatCurrency(billData.calculatedTotal + discount)}</Text>
                    </View>
                    {discount > 0 && (
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Discount:</Text>
                            <Text>- {formatCurrency(discount)}</Text>
                        </View>
                    )}
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total Charges:</Text>
                        <Text>{formatCurrency(billData.calculatedTotal)}</Text>
                    </View>
                    {billData.deposits?.length > 0 && (
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Paid Amount:</Text>
                            <Text>{formatCurrency(billData.deposits.reduce((sum, d) => sum + d.amount, 0))}</Text>
                        </View>
                    )}
                    <View style={[styles.totalRow, styles.grandTotal]}>
                        <Text style={styles.totalLabel}>Balance Amount:</Text>
                        <Text>
                            {formatCurrency(
                                billData.calculatedTotal -
                                (billData.deposits?.reduce((sum, d) => sum + d.amount, 0) || 0)
                            )}
                        </Text>
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <View>
                        <Text>Date: {new Date().toLocaleDateString('en-IN')}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text>Authorized Signature</Text>
                        <Text>____________________</Text>
                    </View>
                </View>

            </Page>
        </Document>
    );
};


export default DetailedBillPDF;
