import { PDFViewer } from "@react-pdf/renderer";
import { Modal } from "react-bootstrap";
import DischargeSheetPDF from "./dischargeSheetPDF";
import { useEffect, useState } from "react";
import axios from "axios";
import CommonToast from "../../components/common/Toaster";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ViewDischargeSheet = ({ show, setShow, ipd_id }) => {
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [prescriptionData,setPrescriptionData]=useState([])
    const token = useSelector((state) => state.auth.currentUserToken);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const getAllDetails = async () => {
        if (!ipd_id) return; // Add this check
        
        setLoading(true);
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/patient/get_ipd_details?ipd_id=${ipd_id}`,config);

            setDetails(response?.data?.data)
        } catch (error) {
            toast.error("Error while retrieving data")
    
       
        } finally {
            setLoading(false);
        }
    };

    const fetchPrescription= async()=>{
       try {
         const response = await axios.get(`${process.env.REACT_APP_API_URL}/prescription/getipdprescription?ipd_id=${ipd_id}`,config);
             setPrescriptionData(response?.data?.data)
       } catch (error) {
        
       }
    }

    useEffect(() => {
        if (show && ipd_id) { // Only fetch when modal is shown and ipd_id exists
            getAllDetails();
            fetchPrescription()
        }
    }, [show, ipd_id]); // Add show to dependencies


    return (
        <Modal show={show} onHide={() => setShow(false)} fullscreen>
            <CommonToast />
            <Modal.Header closeButton>
                <Modal.Title>Discharge Sheet</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading ? (
                    <div className="text-center py-5">Loading Discharge Details...</div>
                ) : details ? (
                    <PDFViewer width="100%" height="100%" showToolbar={true}>
                        <DischargeSheetPDF data={details[0]} prescription={prescriptionData} />
                    </PDFViewer>
                ) : (
                    <div className="text-center py-5">No discharge details found</div>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default ViewDischargeSheet;