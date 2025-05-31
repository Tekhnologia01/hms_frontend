import { PDFDownloadLink } from "@react-pdf/renderer";
import { Modal, Button, Spinner } from "react-bootstrap";
import DischargeSheetPDF from "./dischargeSheetPDF";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ViewDischargeSheet = ({ show, setShow, ipd_id }) => {
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [prescriptionData, setPrescriptionData] = useState([])
    const token = useSelector((state) => state.auth.currentUserToken);
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const getAllDetails = async () => {
        if (!ipd_id) return;

        setLoading(true);
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/patient/get_ipd_details?ipd_id=${ipd_id}`, config);

            setDetails(response?.data?.data)
        } catch (error) {
            toast.error("Error while retrieving data")


        } finally {
            setLoading(false);
        }
    };

    const fetchPrescription = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/prescription/getipdprescription?ipd_id=${ipd_id}`, config);
            setPrescriptionData(response?.data?.data)
        } catch (error) {

        }
    }

    useEffect(() => {
        if (show && ipd_id) {
            getAllDetails();
            fetchPrescription()
        }
    }, [show, ipd_id]);


    return (
        <Modal show={show} onHide={() => setShow(false)} size="md" centered>
            <Modal.Header closeButton>
                <Modal.Title>Discharge Sheet</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
                {loading ? (
                    <div className="py-5">
                        <Spinner animation="border" role="status" variant="primary" />
                        <div className="mt-3">Loading Discharge Details...</div>
                    </div>
                ) : details && details.length > 0 ? (
                    <>
                        <p className="mb-4">Click below to download the discharge sheet.</p>
                        <PDFDownloadLink
                            document={
                                <DischargeSheetPDF
                                    data={details[0]}
                                    prescription={prescriptionData}
                                />
                            }
                            fileName={`${details[0]?.patient_name}_Discharge.pdf`}
                            className="btn btn-primary"
                        >
                            {({ loading }) =>
                                loading ? "Preparing document..." : "Download PDF"
                            }
                        </PDFDownloadLink>
                    </>
                ) : (
                    <div className="py-5">No discharge details found</div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ViewDischargeSheet;
