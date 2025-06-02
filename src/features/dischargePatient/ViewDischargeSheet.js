import { Modal, Button, Spinner, ListGroup } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import GenerateDischargePDF from "../../utils/pdfService";

const ViewDischargeSheet = ({ show, setShow, ipd_id }) => {
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [prescriptionData, setPrescriptionData] = useState()
    const [downloadLoading, setDownloadLoading] = useState(false);
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


    const handleDownloadPDF = async () => {
        if (!details || !prescriptionData) {
            toast.error('Missing required data for PDF generation');
            return;
        }

        setDownloadLoading(true);
        console.log("before try")
        try {
            console.log("after try")
            const pdfBlob = await GenerateDischargePDF(details?.[0], prescriptionData);

            const url = window.URL.createObjectURL(new Blob([pdfBlob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute(
                'download',
                `${details[0]?.patient_name || 'discharge'}_summary.pdf`
            );

            document.body.appendChild(link);
            link.click();

            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            toast.error('Failed to generate PDF');
        } finally {
            setDownloadLoading(false);
        }
    };


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
                ) : details && details?.length > 0 ? (
                    <>
                        <p className="mb-4">Click below to download the discharge sheet.</p>

                        {/* <PDFDownloadLink
                            document={
                                <DischargeSheetPDF
                                    data={details[0]}
                                    prescription={prescriptionData}
                                />
                            }
                            fileName={`${details[0]?.patient_name}_Discharge.pdf`}
                            className="btn btn-primary"
                        // style={{backgroundColor:"#7B3F0080"}}
                        >
                            {({ loading }) =>
                                loading ? "Preparing document..." : "Download PDF"
                            }
                        </PDFDownloadLink> */}

                        <Button
                            onClick={handleDownloadPDF}
                            disabled={downloadLoading}
                            className="btn btn-primary"
                        >
                            {downloadLoading ? (
                                <>
                                    <Spinner as="span" size="sm" animation="border" role="status" />
                                    <span className="ms-2">Generating PDF...</span>
                                </>
                            ) : "Download PDF"}
                        </Button>

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
