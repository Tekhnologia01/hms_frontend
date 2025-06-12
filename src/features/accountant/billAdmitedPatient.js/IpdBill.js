import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Button, Card, Col, Container, Form, ListGroup, Modal, Row, Table } from "react-bootstrap";
import CommanButton from "../../../components/common/form/commonButtton";
import Airavat from "../../../assets/images/Airavat.png";
import { useSelector } from "react-redux";
import { pdf } from "@react-pdf/renderer";
import { useState, useEffect } from "react";
import BillPDF from "./BillPdf";
import { toast } from "react-toastify";
import DetailedBillPDF from "./DetaliedBillPdf";
import axios from "axios";
import { processPatientData } from "../../../utils/billig";
import { LuGalleryHorizontal } from "react-icons/lu";

function IpdBill() {
    const navigate = useNavigate();
    const params = useParams();
    const [details, setDetails] = useState(null);
    const [paymentMode, setPaymentMode] = useState("Cash");
    const [discountAmount, setDiscountAmount] = useState(0);
    const { user } = useSelector((state) => state?.auth);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [billingCharges, setBillingCharges] = useState([]);
    const [pdfUrl, setPdfUrl] = useState(null);
    const token = useSelector((state) => state.auth.currentUserToken);
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const fetchReceipt = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/accountant/getadmtedpatientreceipt?admited_id=${params?.admitedId}`,
                config
            );
            const data = processPatientData(response?.data?.data)
            setDetails(data[0]);
        } catch (error) {
            console.error('Error fetching receipt:', error);
            throw error;
        }
    };

    const fetchBillingCharges = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/bill/GetAllBillingAndCharges`,
                config
            );
            setBillingCharges(response?.data?.data[0] || []);
        } catch (error) {
            console.error('Error fetching billing charges:', error);
        }
    };

    const getRoomChargeDetails = (roomType) => {
        const chargeDetails = billingCharges?.find(
            charge => charge?.room_type === roomType

        );

        if (!chargeDetails) {
            return null;
        }
        return [
            { name: 'Bed', amount: chargeDetails.bed },
            { name: 'Nursing', amount: chargeDetails.nursing },
            { name: 'Doctor', amount: chargeDetails.doctor },
            { name: 'RMO', amount: chargeDetails.rmo },
            { name: 'BMW', amount: chargeDetails.bmw },
            // Add other charge types as needed
        ].filter(item => item.amount > 0); // Only show items with actual charges
    };

    useEffect(() => {
        fetchReceipt();
        fetchBillingCharges();
    }, []);

    const calculateRoomDays = (startDate, endDate) => {
        if (!endDate) {
            const now = new Date().getTime() / 1000;
            return Math.ceil((now - startDate) / (24 * 60 * 60));
        }
        return Math.ceil((endDate - startDate) / (24 * 60 * 60));
    };

    // const calculateTotal = () => {
    //     const roomCharges = details?.room1?.reduce((sum, item) => {
    //         const days = calculateRoomDays(item.start_date, item.end_date);
    //         return sum + (item.total * days);
    //     }, 0) || 0;

    //     const otherCharges = details?.othercharges?.reduce((sum, item) =>
    //         sum + (item.amount * (item.quantity || 1)), 0) || 0;

    //     const doctorVisits = details?.doctorvisiting?.reduce((sum, item) => sum + item.amount, 0) || 0;
    //     const totalBeforeDiscount = roomCharges + otherCharges + doctorVisits;
    //     return totalBeforeDiscount - discountAmount;
    // };

   const calculateTotal = () => {
        const roomCharges =combineRoomEntries(details?.room1)?.reduce((sum, item) => {
            const days = calculateRoomDays(item.start_date, item.end_date);
            return sum + (item.total * item.days);
        }, 0) || 0;
 
        const otherCharges = details?.othercharges?.reduce((sum, item) =>
            sum + (item.amount * (item.quantity || 1)), 0) || 0;
 
        const doctorVisits = details?.doctorvisiting?.reduce((sum, item) => sum + item.amount, 0) || 0;
        const totalBeforeDiscount = roomCharges + otherCharges + doctorVisits;
        return totalBeforeDiscount - discountAmount;
    };



    const handleSaveAndGeneratePDF = async () => {
        try {
            const totalAmount = calculateTotal();
            const billDataForPDF = {
                ...details,
                calculatedTotal: totalAmount,
                receipt_number: `IPD-${details.ipd_id}`,
                bill_date: new Date().toISOString(),
                payment_method: paymentMode,
                discountAmount: discountAmount
            };

            const pdfBlob = await pdf(<BillPDF billData={billDataForPDF} discount={discountAmount} />).toBlob();
            const pdfPreviewUrl = URL.createObjectURL(pdfBlob);
            setPdfUrl(pdfPreviewUrl);

            const fileName = `IPD-Bill-${details.ipd_id}.pdf`;
            const pdfFile = new File([pdfBlob], fileName, { type: "application/pdf" });

            const formData = new FormData();
            formData.append("bill_report", pdfFile);
            formData.append("user_id", user?.userId);
            formData.append("admitedId", params.admitedId);
            formData.append("payment_method", paymentMode);
            formData.append("amount", totalAmount);
            formData.append("receipt_number", details.ipd_id);
            formData.append("discount_amount", discountAmount);

            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/accountant/ipdbill`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": ""
                    }
                }
            );

            if (response.data?.status) {
                setDetails(prev => ({
                    ...prev,
                    bill_report: response.data.filePath,
                    payment_status: "Paid"
                }));
                fetchReceipt();
                setShowPaymentModal(true);
                toast.success("Bill generated and uploaded successfully!");
            }
        } catch (e) {
            toast.error("Error generating bill");
        }
    };

    const handlePrint = () => {
        if (pdfUrl) {
            window.open(pdfUrl, "_blank");
        } else if (details?.bill_report) {
            const pdfUrl = `${process.env.REACT_APP_API_URL}/Uploads/${details.bill_report}`;
            window.open(pdfUrl, "_blank");
        } else {
            toast.error("Please save the bill first");
        }
    };

    const handleDetailedBill = async () => {
        try {
            const totalAmount = calculateTotal();
            const billDataForPDF = {
                ...details,
                calculatedTotal: totalAmount,
                receipt_number: `IPD-${details.ipd_id}`,
                bill_date: new Date().toISOString(),
                payment_method: paymentMode,
                discountAmount: discountAmount,
                generated_by: user?.name || 'System'
            };

            const pdfBlob = await pdf(<DetailedBillPDF billData={billDataForPDF} discount={discountAmount} roomChargeDetails={getRoomChargeDetails} />).toBlob();
            const pdfPreviewUrl = URL.createObjectURL(pdfBlob);

            // Open the PDF in a new tab
            window.open(pdfPreviewUrl, "_blank");

        } catch (error) {
            toast.error("Error generating detailed bill");
            console.error(error);
        }
    };

    // Combine room entries
    // const combineRoomEntries = (rooms = []) => {
    //     console.log("first")
    //     if (!rooms?.length) return [];
    //     const combined = [];
    //     let current = { ...rooms[0], days: 0, start_date: rooms[0]?.start_date, end_date: rooms[0]?.end_date };
    //     current.days = Math.ceil((rooms[0].end_date - rooms[0]?.start_date) / (24 * 60 * 60));
    //     for (let i = 1; i < rooms?.length; i++) {
    //         const prev = current;
    //         const curr = rooms[i];
    //         const isSameType = prev.room_type === curr.room_type && prev.total === curr.total && prev.room_type_name === curr.room_type_name;
    //         const isConsecutive = prev.end_date === curr.start_date;
    //         if (isSameType && isConsecutive) {
    //             current.end_date = curr.end_date;
    //             current.days += Math.ceil((curr.end_date - curr.start_date) / (24 * 60 * 60));
    //         } else {
    //             combined.push({ ...current });
    //             current = { ...curr, days: Math.ceil((curr.end_date - curr.start_date) / (24 * 60 * 60)), start_date: curr.start_date, end_date: curr.end_date };
    //         }
    //     }
    //     combined.push({ ...current });

    //     console.log("sssssssa______________________",combined)

    //     return combined;
    // };

// const combineRoomEntries = (rooms = []) => {
//     if (!rooms?.length) return [];

//     const combined = [];
//     let current = { ...rooms[0] };
//     current.days = 1;

//     for (let i = 1; i < rooms.length; i++) {
//         const prev = current;
//         const curr = rooms[i];

//         const isSameGroup =
//             prev.bed_id === curr.bed_id &&
//             prev.room_type === curr.room_type;

//         const isConsecutive = prev.end_date === curr.start_date;

//         if (isSameGroup && isConsecutive) {
//             current.end_date = curr.end_date;
//             current.days += 1;
//         } else {
//             combined.push({ ...current });
//             current = { ...curr, days: 1 };
//         }
//     }

//     combined.push({ ...current });

//     return combined;
// };



const combineRoomEntries = (rooms = []) => {
    if (!rooms?.length) return [];

    const combined = [];
    let currentGroup = [rooms[0]];

    for (let i = 1; i < rooms.length; i++) {
        const prev = currentGroup[currentGroup.length - 1];
        const curr = rooms[i];

        const isSameGroup =
            prev.bed_id === curr.bed_id &&
            prev.room_type === curr.room_type &&
            prev.total === curr.total &&
            prev.room_type_name === curr.room_type_name;

        const isConsecutive = prev.end_date === curr.start_date;

        if (isSameGroup && isConsecutive) {
            currentGroup.push(curr);
        } else {
            const merged = {
                ...currentGroup[0],
                start_date: currentGroup[0].start_date,
                end_date: currentGroup[currentGroup.length - 1].end_date,
                days: currentGroup.length,
            };
            combined.push(merged);
            currentGroup = [curr];
        }
    }

    // Push the last group
    if (currentGroup.length) {
        const merged = {
            ...currentGroup[0],
            start_date: currentGroup[0].start_date,
            end_date: currentGroup[currentGroup.length - 1].end_date,
            days: currentGroup.length,
        };
        combined.push(merged);
    }

    return combined;
};







    // Combine othercharges entries into a single row per charge_name and amount
    const combineOtherCharges = (charges = []) => {
        if (!charges?.length) return [];
        const chargeMap = {};

        charges.forEach(charge => {
            const key = `${charge.charge_name}_${charge.amount}`;
            if (chargeMap[key]) {
                chargeMap[key].quantity = (chargeMap[key].quantity || 1) + (charge.quantity || 1);
                chargeMap[key].start_date = Math.min(chargeMap[key].start_date, charge.charge_date);
                chargeMap[key].end_date = Math.max(chargeMap[key].end_date, charge.charge_date);
            } else {
                chargeMap[key] = {
                    charge_name: charge.charge_name,
                    amount: charge.amount,
                    quantity: charge.quantity || 1,
                    start_date: charge.charge_date,
                    end_date: charge.charge_date
                };
            }
        });

        return Object.values(chargeMap);
    };

    // Combine doctorvisiting entries into a single row per doctor_name and amount
    const combineDoctorVisits = (visits = []) => {
        if (!visits?.length) return [];
        const visitMap = {};

        visits.forEach(visit => {
            const key = `${visit.doctor_name}_${visit.amount}`;
            if (visitMap[key]) {
                visitMap[key].quantity = (visitMap[key].quantity || 1) + 1;
                visitMap[key].start_date = Math.min(visitMap[key].start_date, visit.visit_date);
                visitMap[key].end_date = Math.max(visitMap[key].end_date, visit.visit_date);
            } else {
                visitMap[key] = {
                    doctor_name: visit.doctor_name,
                    amount: visit.amount,
                    quantity: 1,
                    start_date: visit.visit_date,
                    end_date: visit.visit_date
                };
            }
        });

        return Object.values(visitMap);
    };

    const totalAmount = calculateTotal();
    const totalDeposit = details?.deposits?.reduce((sum, index) => sum + index.amount, 0) || 0;
    const isAmountEqual = totalAmount == totalDeposit;
    const isBillNotPaid = details?.bill_status == 0;
    const isDischared = details?.discharge_status == 1;

    const shouldEnableButton = isAmountEqual && isBillNotPaid && isDischared;

    return (
        <div className="mx-lg-4 m-3 pb-3">
            <div className="pt-1">
                <div className="fw-semibold pb-lg-3" style={{ color: "#1D949A", fontSize: "18px", cursor: "pointer", width: "fit-content" }} onClick={() => navigate(-1)}>
                    <FaArrowLeft />
                    <span className="pt-1 px-2">Billing / IPD Bills / Bill Details</span>
                </div>
            </div>
            {details && (
                <Container className="p-2 p-lg-4">
                    <Card style={{ border: '1px solid #EAECF0' }}>
                        <Card.Body className="p-0">
                            <Row className="mb-2 p-3">
                                <Col className="text-center">
                                    <img src={Airavat} alt="Airavat" height={"105px"} width={"150px"} />
                                </Col>
                            </Row>
                            <Row className="p-3">
                                <Col md={6}>
                                    <p><strong>Patient Name: </strong> {details.Name}</p>
                                    <p><strong>Department: </strong> {details.department}</p>
                                    <p><strong>Consulting Dr.: </strong> {details.doctor_name}</p>
                                </Col>
                                <Col md={6} className="text-end">
                                    <p><strong>IPD ID: </strong> {details.ipd_id}</p>
                                    <p><strong>Receipt No.: </strong> IPD-{details.ipd_id}</p>
                                    <p><strong>Admitted Date: </strong> {new Date(details.admitted_date * 1000).toLocaleDateString()}</p>
                                </Col>
                            </Row>
                            <hr color="#475467" className="mx-3" />
                            <h4 className="m-4">Billing Details</h4>
                            <Table bordered style={{ borderColor: '#EAECF0' }}>
                                <thead>
                                    <tr>
                                        <th className="text-center p-3" style={{ background: '#F9FAFB' }}>No</th>
                                        <th className="text-center p-3" style={{ background: '#F9FAFB' }}>Description</th>
                                        <th className="text-center p-3" style={{ background: '#F9FAFB' }}>Date</th>
                                        <th className="text-center p-3" style={{ background: '#F9FAFB' }}>Quantity</th>
                                        <th className="text-center p-3" style={{ background: '#F9FAFB' }}>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Render combined room entries */}
                                    {combineRoomEntries(details.room1)?.map((room, index) => (
                                        <tr key={`room-${index}`}>
                                            <td className="text-center">{index + 1}</td>
                                            <td className="text-center">Room Charges {room?.room_type_name ? `For ${room?.room_type_name}` : `(Type ${room?.room_type})`}</td>
                                            <td className="text-center">
                                                {new Date(room.start_date * 1000).toLocaleDateString()}
                                                {room.days > 1 ? ` - ${new Date(room.end_date * 1000).toLocaleDateString()}` : ""}
                                            </td>




                                            <td className="text-center">{room.days} {room.days === 1 ? 'day' : 'days'}</td>


                                            <td className="text-center">{room.total * room.days}</td>
                                        </tr>
                                    ))}
                                    {/* Render combined othercharges */}
                                    {combineOtherCharges(details.othercharges)?.map((charge, index) => (
                                        <tr key={`charge-${index}`}>
                                            <td className="text-center">{index + combineRoomEntries(details.room1)?.length + 1}</td>
                                            <td className="text-center">{charge.charge_name}</td>
                                            <td className="text-center">
                                                {new Date(charge.start_date * 1000).toLocaleDateString()}
                                                {charge.start_date !== charge.end_date ? ` - ${new Date(charge.end_date * 1000).toLocaleDateString()}` : ""}
                                            </td>
                                            <td className="text-center">{charge.quantity}</td>
                                            <td className="text-center">{charge.amount * charge.quantity}</td>
                                        </tr>
                                    ))}
                                    {/* Render combined doctorvisiting */}
                                    {combineDoctorVisits(details.doctorvisiting)?.map((visit, index) => (
                                        <tr key={`visit-${index}`}>
                                            <td className="text-center">{index + combineRoomEntries(details.room1)?.length + (combineOtherCharges(details.othercharges)?.length || 0) + 1}</td>
                                            <td className="text-center">Doctor Visit - {visit.doctor_name}</td>
                                            <td className="text-center">
                                                {new Date(visit.start_date * 1000).toLocaleDateString()}
                                                {visit.start_date !== visit.end_date ? ` - ${new Date(visit.end_date * 1000).toLocaleDateString()}` : ""}
                                            </td>
                                            <td className="text-center">{visit.quantity}</td>
                                            <td className="text-center">{visit.amount * visit.quantity}</td>
                                        </tr>
                                    ))}
                                    {discountAmount > 0 && (
                                        <tr>
                                            <td colSpan={4} className="text-end p-md-3 p-2" style={{ fontWeight: 500 }}>Discount</td>
                                            <td className="text-center">{discountAmount}</td>
                                        </tr>
                                    )}
                                    {totalDeposit > 0 && (
                                        <tr>
                                            <td colSpan={4} className="text-end p-md-3 p-2" style={{ fontWeight: 500 }}>Paid Amount</td>
                                            <td className="text-center">{totalDeposit}</td>
                                        </tr>
                                    )}
                                    <tr>
                                        <td colSpan={4} className="text-end p-md-3 p-2" style={{ fontWeight: 500 }}>Balance Amount</td>
                                        <td className="text-center">{totalAmount - totalDeposit}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={4} className="text-end p-md-3 p-2" style={{ fontWeight: 500 }}>Grand Total</td>
                                        <td className="text-center">{totalAmount + discountAmount}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>

                    <Card style={{ border: '1px solid #EAECF0' }} className="mt-3 mt-lg-5">
                        <Card.Body>
                            <Form>
                                <div className="row m-0 ">
                                    <div className="col-md-6">
                                        <h4 className="my-4">Payment Mode</h4>
                                        <Form.Check
                                            type="radio"
                                            label="Cash"
                                            name="paymentMode"
                                            value="Cash"
                                            checked={paymentMode === "Cash"}
                                            className="fw-bold py-2"
                                            onChange={(e) => setPaymentMode(e.target.value)}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Online Mode"
                                            name="paymentMode"
                                            value="Online Mode"
                                            className="fw-bold py-2"
                                            checked={paymentMode === "Online Mode"}
                                            onChange={(e) => setPaymentMode(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="mt-3">
                                            <Form.Label>Discount Amount (₹)</Form.Label>
                                            <Form.Control
                                                type="number"
                                                value={discountAmount}
                                                onChange={(e) => setDiscountAmount(Number(e.target.value))}
                                                min="0"
                                                placeholder="Enter discount amount"
                                            />
                                        </Form.Group>
                                    </div>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>

                    <div className="d-flex justify-content-end mt-4">
                        <Button
                            variant="outline-secondary"
                            className="me-3"
                            onClick={handleDetailedBill}
                            disabled={details?.bill_status == 0}
                        >
                            Detailed Bill
                        </Button>
                        <Button
                            variant="outline-secondary"
                            className="me-3"
                            onClick={handlePrint}
                            disabled={details?.bill_status == 0}
                        >
                            View/Print Bill
                        </Button>
                        <CommanButton
                            label="Save & Generate Bill"
                            className="p-1 px-4 fw-semibold me-2"
                            style={{ borderRadius: "7px", fontSize: "14px", height: "40px" }}
                            onClick={handleSaveAndGeneratePDF}
                            disabled={!shouldEnableButton}
                        />
                    </div>
                </Container>
            )}

            <Modal show={showPaymentModal} onHide={() => setShowPaymentModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className="text-center" style={{ color: '#1E959B' }}>Bill Generated Successfully!</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center p-4">
                    <p>Total Amount: Rs. {totalAmount}</p>
                    {discountAmount > 0 && <p>Discount Applied: Rs. {discountAmount}</p>}
                    <p>PDF has been generated and uploaded successfully.</p>
                    <CommanButton
                        label="Ok"
                        className="p-1 px-4 fw-semibold me-2"
                        style={{ borderRadius: "7px", fontSize: "14px", height: "40px" }}
                        onClick={() => setShowPaymentModal(false)}
                    />
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default IpdBill;
