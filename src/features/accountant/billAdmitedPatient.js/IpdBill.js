import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { Button, Card, Col, Container, Form, Modal, Row, Table } from "react-bootstrap";
import CommanButton from "../../../components/common/form/commonButtton";
import Airavat from "../../../assets/images/Airavat.png";
import { useSelector } from "react-redux";
import { pdf } from "@react-pdf/renderer";
import { useState, useEffect } from "react";
import BillPDF from "./BillPdf";
import { toast } from "react-toastify";

function IpdBill() {
    const navigate = useNavigate();
    const params = useParams();
    const [details, setDetails] = useState(null);
    const [paymentMode, setPaymentMode] = useState("Cash");
    const [discountAmount, setDiscountAmount] = useState(0);
    const { user } = useSelector((state) => state?.auth);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
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
            setDetails(response?.data?.data[0][0]);
        } catch (error) {
            console.error('Error fetching receipt:', error);
            throw error;
        }
    };

    useEffect(() => {
        fetchReceipt();
    }, []);

    const calculateRoomDays = (startDate, endDate) => {
        if (!endDate) {
            const now = new Date().getTime() / 1000;
            return Math.ceil((now - startDate) / (24 * 60 * 60));
        }
        return Math.ceil((endDate - startDate) / (24 * 60 * 60));
    };

    const calculateTotal = () => {
        const roomCharges = details?.room1?.reduce((sum, item) => {
            const days = calculateRoomDays(item.start_date, item.end_date);
            return sum + (item.total * days);
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

            // Generate PDF blob
            const pdfBlob = await pdf(<BillPDF billData={billDataForPDF} discount={discountAmount} />).toBlob();

            // Create object URL for preview
            const pdfPreviewUrl = URL.createObjectURL(pdfBlob);
            setPdfUrl(pdfPreviewUrl);

            // Prepare file for upload
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
                fetchReceipt()
                setShowPaymentModal(true);
                toast.success("Bill generated and uploaded successfully!")
            }
        } catch (e) {

            toast.error("Error generating bill")

        }
    };

    const handlePrint = () => {
        if (pdfUrl) {
            window.open(pdfUrl, "_blank");
        } else if (details?.bill_report) {
            const pdfUrl = `${process.env.REACT_APP_API_URL}/uploads/${details.bill_report}`;
            window.open(pdfUrl, "_blank");
        } else {
            toast.error("Please save the bill first")
        }
    };

    const totalAmount = calculateTotal();
    const totalDeposit = details?.deposits?.reduce((sum, index) => sum + index.amount, 0) || 0;
    const isAmountEqual = totalAmount == totalDeposit;



    const isBillNotPaid = details?.bill_status == 0;
    const isDischared = details?.discharge_status == 1;

    // Enable button only if both conditions are true
    const shouldEnableButton = isAmountEqual && isBillNotPaid && isDischared;

    return (
        <div className="mx-lg-4 m-3 pb-3">
            <div className="pt-1">
                <div className="fw-semibold pb-lg-3" style={{ color: "#1D949A", fontSize: "18px" }} onClick={() => navigate(-1)}>
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
                                    {details.room1?.map((room, index) => {
                                        const days = calculateRoomDays(room.start_date, room.end_date);
                                        return (
                                            <tr key={`room-${index}`}>
                                                <td className="text-center">{index + 1}</td>
                                                <td className="text-center">Room Charge {room?.room_type_name ? `For ${room?.room_type_name}` : `(Type ${room?.room_type})`} </td>
                                                <td className="text-center">{new Date(room.start_date * 1000).toLocaleDateString()}</td>
                                                <td className="text-center">{days} {days === 1 ? 'day' : 'days'}</td>
                                                <td className="text-center">{room.total * days}</td>
                                            </tr>
                                        );
                                    })}
                                    {details.othercharges?.map((charge, index) => (
                                        <tr key={`charge-${index}`}>
                                            <td className="text-center">{index + details.room1.length + 1}</td>
                                            <td className="text-center">{charge.charge_name}</td>
                                            <td className="text-center">{new Date(charge.charge_date * 1000).toLocaleDateString()}</td>
                                            <td className="text-center">{charge.quantity || 1}</td>
                                            <td className="text-center">{charge.amount * (charge.quantity || 1)}</td>
                                        </tr>
                                    ))}
                                    {details.doctorvisiting?.map((visit, index) => (
                                        <tr key={`visit-${index}`} >
                                            <td className="text-center">{index + details.room1.length + details.othercharges.length + 1}</td>
                                            <td className="text-center">Doctor Visit - {visit.doctor_name}</td>
                                            <td className="text-center">{new Date(visit.visit_date * 1000).toLocaleDateString()}</td>
                                            <td className="text-center">1</td>
                                            <td className="text-center">{visit.amount}</td>
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