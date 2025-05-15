import { PDFViewer } from "@react-pdf/renderer";
import {Modal} from "react-bootstrap";
import BillPDF from "../../doctor/appointement/OPDBill";


const ViewOPDBill = ({ show, setShow, data }) => {
    // Define the custom file name dynamically
    return (
        <Modal show={show} onHide={() => setShow(false)} fullscreen>
            <Modal.Header closeButton>
                <Modal.Title>OPD Bill Receipt</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <PDFViewer width="100%" height="100%" showToolbar={true}>
                    <BillPDF billData={data} />
                </PDFViewer>
            </Modal.Body>
        </Modal>
    );
};

export default ViewOPDBill;