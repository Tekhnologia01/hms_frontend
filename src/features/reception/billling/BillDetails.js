
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import ViewOPDBill from "./ViewOPDBill";
import { Button, Card, Col, Container, Form, Modal, Row, Table } from "react-bootstrap";
import CommanButton from "../../../components/common/form/commonButtton";
import Airavat from "../../../assets/images/Airavat.png";
import BillPDF from "../../doctor/appointement/OPDBill";
import { useSelector } from "react-redux";
import { showToast } from "../../../components/common/Toaster";
import { pdf } from "@react-pdf/renderer";
import { useState } from "react";
import { useEffect } from "react";

function BillDetails() {
    const navigate = useNavigate();
    const params = useParams();
    const [details, setDetails] = useState([]);
    const [paymentMode, setPaymentMode] = useState("Cash");
    const { user } = useSelector((state) => state?.auth);
    const [showBill, setShowBill] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);


    const token = useSelector((state) => state.auth.currentUserToken);
  const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const fetchDetails = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/appointment/getbBillDetails?appointment_id=${ params.appointmentId}`, 
              config
            );
            setDetails(response?.data?.data);
        } catch (err) {
            console.log("Error fetching doctors => ", err);
        }
    };


    const handelViewBill = () => {
        if (details?.bill_report) {
            const pdfUrl = `${process.env.REACT_APP_API_URL}/uploads/${details?.bill_report}`;
            window.open(pdfUrl, "_blank");
        } else {
            setShowBill(true);
        }
    }

    useEffect(() => {
        if (params?.appointmentId) {
            fetchDetails();
        }
    }, [params?.appointmentId]);

    const handlePayment = async () => {
        if (paymentMode === "Cash") {
            try {
                // Calculate total amount including lab charges
                const labChargesTotal = details?.LabchargesList?.reduce((sum, item) => sum + parseFloat(item.amount), 0) || 0;
                const otherChargesTotal = details?.chargesList?.reduce((sum, item) => sum + parseFloat(item.amount), 0) || 0;
                const consultationFee = parseFloat(details?.consultancy_fee) || 0;
                const totalAmount = labChargesTotal + otherChargesTotal + consultationFee;

                // Prepare bill data with all charges for PDF
                const billDataForPDF = {
                    ...details,
                    allCharges: [
                        ...(details?.chargesList || []),
                        ...(details?.LabchargesList || [])
                    ],
                    calculatedTotal: totalAmount.toFixed(2)
                };

                const pdfBlob = await pdf(<BillPDF billData={billDataForPDF} />).toBlob();
                const fileName = `${details?.receipt_number}.pdf`;
                const pdfFile = new File([pdfBlob], fileName, { type: "application/pdf" });
                
                const formData = new FormData();
                formData.append("bill_report", pdfFile);
                formData.append("user_id", user?.userId);
                formData.append("payment_status", "Paid");
                formData.append("payment_method", "Cash");
                formData.append("bill_total_amount", totalAmount.toFixed(2));

                const response = await axios.put(`${process.env.REACT_APP_API_URL}/bill/completebill`, formData, {
                    params: {
                        bill_id: details?.bill_id,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    }
                });

                if (response.data?.status) {
                    fetchDetails();
                    setShowPaymentModal(true);
                } else {
                    showToast("Error while completing payment!", "error");
                }
            } catch (e) {
                console.log(e);
                showToast(e.response?.data.message ? e.response?.data.message : "Error while completing payment!", "error");
            }
        }
    }

    // Combine both chargesList and LabchargesList for display
    const allCharges = [
        ...(details?.chargesList || []),
        // ...(details?.LabchargesList || [])
    ];




    console.log("allCharges", allCharges);
    // Calculate total amount including lab charges
    // const labChargesTotal = details?.LabchargesList?.reduce((sum, item) => sum + parseFloat(item.amount), 0) || 0;
    const otherChargesTotal = details?.chargesList?.reduce((sum, item) => sum + parseFloat(item.quantity*item.amount), 0) || 0;
    const consultationFee = parseFloat(details?.consultancy_fee) || 0;
    // const totalAmount = labChargesTotal + otherChargesTotal + consultationFee;
    const totalAmount =  otherChargesTotal + consultationFee;


    return (
        <div className="mx-lg-4 m-3 pb-3">
            <div className="pt-1">
                <div
                    className="fw-semibold pb-lg-3"
                    style={{ color: "#1D949A", fontSize: "18px" }}
                    onClick={() => navigate(-1)}
                >
                    <FaArrowLeft />
                    <span className="pt-1 px-2">Billing / OPD Bills / Bill Details </span>
                </div>
            </div>
            {details &&
                <Container className="p-2 p-lg-4">
                    <Card style={{ border: '1px solid #EAECF0' }}>
                        <Card.Body className="p-0">
                            <Row className="mb-2 p-3">
                                <Col className="text-center">
                                    <img src={Airavat} alt="Airavat" height={"105px"} width={"150px"} />
                                </Col>
                            </Row>
                            <Row className="my-2 p-3">
                                <Col md={6}>
                                    <p><strong>Patient Name : </strong> {details?.patient_name}</p>
                                    <p><strong>Disease : </strong> {details?.disease}</p>
                                    <p><strong>Consulting Dr. : </strong> {details?.doctor_name}</p>
                                </Col>
                                <Col md={6} className="text-end">
                                    <p><strong>UH I'd Number : </strong> {details?.uh_id}</p>
                                    <p><strong>Receipt No. : </strong> {details?.receipt_number}</p>
                                    <p><strong>Receipt Date : </strong> {details?.bill_date?.split("T")[0]}</p>
                                </Col>
                            </Row>
                            <hr color="#475467" className="mx-3" />

                            <h4 className="m-4">Billing</h4>

                            <Table bordered style={{ borderColor: '#EAECF0' }} className="mb-0">
                                <thead>
                                    <tr>
                                        <th className="text-center p-3" style={{ background: '#F9FAFB' }}>No</th>
                                        <th className="text-center p-3" style={{ background: '#F9FAFB' }}>Summary</th>
                                        <th className="text-center p-3" style={{ background: '#F9FAFB' }}>Quantity</th>
                                        <th className="text-center p-3" style={{ background: '#F9FAFB' }}>Amount</th>
                                    </tr>
                                </thead>
                                {allCharges.length > 0 || details?.consultancy_fee
                                    ? <tbody>
                                        <tr>
                                            <td className="text-center p-md-3 p-2">1</td>
                                            <td className="p-md-3 p-2" style={{ fontWeight: 500 }}>Consultation Fee</td>
                                            <td className="text-center p-md-3 p-2">-</td>
                                            <td className="text-center p-md-3 p-2">{details?.consultancy_fee}</td>
                                        </tr>
                                        {allCharges.map((charge, index) => (
                                            <tr key={index}>
                                                <td className="text-center p-md-3 p-2">{index + 2}</td>
                                                <td className="p-md-3 p-2" style={{ fontWeight: 500 }}>{charge?.billingType}</td>
                                                <td className="text-center p-md-3 p-2">{charge?.quantity}</td>
                                                <td className="text-center p-md-3 p-2">{charge?.quantity*charge?.amount}</td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td colSpan={3} className="text-end p-md-3 p-2" style={{ fontWeight: 500 }}>Grand Total</td>
                                            <td className="text-center p-md-3 p-2">{totalAmount.toFixed(2)}</td>
                                        </tr>
                                    </tbody>
                                    : <tbody>
                                        <tr>
                                            <td colSpan={4} className="text-center">No Data</td>
                                        </tr>
                                    </tbody>}
                            </Table>
                        </Card.Body>
                    </Card>

                    {details?.appo_biil_status === "Pending" && <Card style={{ border: '1px solid #EAECF0' }} className="mt-3 mt-lg-5">
                        <Card.Body>
                            <h4 className="my-4">Payment Mode</h4>
                            <Form>
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
                                    disabled
                                />
                            </Form>
                        </Card.Body>
                    </Card>}
                    <div className="d-flex justify-content-end mt-4">
                        <Button variant="outline-secondary" className="me-3" onClick={handelViewBill}>Print</Button>
                        {details?.appo_biil_status === "Pending" &&
                            <CommanButton
                                label="Pay Now"
                                className="p-1 px-4 fw-semibold me-2"
                                style={{ borderRadius: "7px", fontSize: "14px", height: "40px" }}
                                onClick={handlePayment}
                            />}
                    </div>
                </Container>
            }
            <ViewOPDBill show={showBill} setShow={setShowBill} data={{
                ...details,
                allCharges: allCharges,
                bill_total_amount: totalAmount.toFixed(2)
            }} />

            <Modal show={showPaymentModal} onHide={() => setShowPaymentModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className="text-center" style={{ color: '#1E959B' }}>Payment Successful!</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center p-4">
                    <p>Thank You! Your Payment of Rs. {totalAmount.toFixed(2)} has been received.</p>
                    <CommanButton
                        label="Ok"
                        className="p-1 px-4 fw-semibold me-2"
                        style={{ borderRadius: "7px", fontSize: "14px", height: "40px" }}
                        onClick={() => { setShowPaymentModal(false) }}
                    />
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default BillDetails;