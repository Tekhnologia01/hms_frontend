// import { PDFViewer } from "@react-pdf/renderer";
// import { Modal } from "react-bootstrap";
// import DischargeSheetPDF from "./dischargeSheetPDF";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import CommonToast, { showToast } from "../../components/common/Toaster";
 
// const ViewDischargeSheet = ({ show, setShow, prescriptionData, ipd_id }) => {
 
//     const [details, setDetails] = useState();
//     const getAllDetails = async () => {
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_API_URL}/patient/get_ipd_details`, {
//                 params: {
//                     ipd_id: ipd_id
//                 }
//             });

            
//           console.log("response",response)
//             if (response?.data?.status) {
//                 setDetails(response.data?.data)
//             }
//         } catch (error) {
//             // showToast("Error while retrieving data", "error");
//         }
//     }



//     useEffect(() => {
//         getAllDetails();
//     }, [])





//     console.log("prescriptionData",prescriptionData)

//     // Define the custom file name dynamically
//     return (
//         <Modal show={show} onHide={() => setShow(false)} fullscreen>
//             <CommonToast />
//             <Modal.Header closeButton>
//                 <Modal.Title>Discharge Sheet</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <PDFViewer width="100%" height="100%" showToolbar={true}>
//                     <DischargeSheetPDF data={details} prescription={prescriptionData} />
//                 </PDFViewer>
//             </Modal.Body>
//         </Modal>
//     );
// };
 
// export default ViewDischargeSheet;


import { PDFViewer } from "@react-pdf/renderer";
import { Modal } from "react-bootstrap";
import DischargeSheetPDF from "./dischargeSheetPDF";
import { useEffect, useState } from "react";
import axios from "axios";
import CommonToast, { showToast } from "../../components/common/Toaster";

const ViewDischargeSheet = ({ show, setShow, prescriptionData, ipd_id }) => {
    const [details, setDetails] = useState();

    const getAllDetails = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/patient/get_ipd_details`,
                {
                    params: {
                        ipd_id: ipd_id,
                    },
                }
            );

            if (response?.data?.status) {
                setDetails(response.data?.data);
            } else {
                showToast("Failed to fetch discharge details", "error");
            }
        } catch (error) {
            showToast("Error while retrieving data", "error");
            console.error("API Error:", error);
        }
    };

    useEffect(() => {
        if (show && ipd_id) {
            getAllDetails();
        }
    }, [show, ipd_id]);

    return (
        <Modal show={show} onHide={() => setShow(false)} fullscreen>
            <CommonToast />
            <Modal.Header closeButton>
                <Modal.Title>Discharge Sheet</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {!details ? (
                    <div className="text-center py-5">Loading Discharge Details...</div>
                ) : (
                    <PDFViewer width="100%" height="100%" showToolbar={true}>
                        <DischargeSheetPDF data={details[0]} prescription={prescriptionData} />
                    </PDFViewer>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default ViewDischargeSheet;
