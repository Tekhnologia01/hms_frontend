import { Row, Col } from "react-bootstrap";
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import CommonTable from "../../../components/common/table/CommonTable";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AddCharges from "../../commonfeature/AddCharges";
import DeleteConfirmationModal from "../../../components/common/DeleteModal";
import AddVisit from "../../commonfeature/AddVisite";
import { epochTimeToDate } from "../../../utils/epochToDate";
import CourseDetails from "./CourseDetails";
import CommanButton from "../../../components/common/form/commonButtton";
import Setdicharge from "../../commonfeature/Setdischarge";
import { useSelector } from "react-redux";
import AddLabTest from "./AddlabTest";
function AdmitedPatientDetails() {
    const { admitedId } = useParams()
    const [patient, setPatient] = useState();
    const [charge, setCharges] = useState([]);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [selectedcharges, setSelectedCharges] = useState({});
    const [doctorVisit, setDoctorVisits] = useState([]);
    const [selectedvisit, setSelectedvisit] = useState([]);
    const [status, setStatus] = useState()

    const [showDischagredateModal, setShowDichagredateModal] = useState(false);
    const handledischargedateModal = () => setShowDichagredateModal(true);
    const handledischargedateCloseModal = () => setShowDichagredateModal(false);
    const [showAddChargesModal, setShowAddChargesModal] = useState(false);
    const handleAddChargesModal = () => setShowAddChargesModal(true);
    const handleAddChargesCloseModal = () => setShowAddChargesModal(false);
    const [showDoctorVisitModal, setShowDoctorVisitModal] = useState(false);
    const handleDoctorVisitModal = () => setShowDoctorVisitModal(true);
    const handleDoctorVisitCloseModal = () => setShowDoctorVisitModal(false);

    const token = useSelector((state) => state.auth.currentUserToken);
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const fetchpatient = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/patient/get_admit_patient_particular?admited_id=${admitedId}`, config)
            setPatient(response?.data[0][0])
        } catch (error) {

        }
    }
    const fetchCharges = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/fees/getipdpatientcharges?admited_id=${admitedId}`, config)
            setCharges(response?.data?.data[0])
        } catch (error) {

        }
    }
    const fetchvisits = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/doctor/getipddoctorvisits?admited_id=${admitedId}`, config)
            setDoctorVisits(response?.data?.data[0])
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchpatient();
        fetchCharges();
        fetchvisits()
    }, [])

    // Table columns
    const columns = [
        { name: "Charge Name", accessor: "uh_id", class: "text-center" },
        { name: "Date", accessor: "date", class: "text-center px-1" },
        { name: "Action", accessor: "action", class: "py-3 text-center px-1" },
    ];


    const columnsdoctors = [
        { name: "Doctor Name", accessor: "uh_id", class: "text-center" },
        { name: "Date", accessor: "date", class: "text-center px-1" },
        { name: "Action", accessor: "action", class: "py-3 text-center px-1" },
    ];

    const renderRow = (item) => (
        <tr key={item.id} className="border-bottom text-center">
            <td className="py-3 px-2">{item?.fees_name}</td>
            <td className="py-3 px-2">{epochTimeToDate(item?.date)}</td>
            <td>
                <span className="ps-3"></span>
                <RiDeleteBinLine
                    style={{ height: "25px", width: "25px", cursor: "pointer", color: "#DC3545" }}
                    onClick={() => {
                        setStatus(1)
                        setSelectedCharges(item)
                        setShowDeleteConfirmation(true);
                    }}
                />
            </td>
        </tr>
    );

    const renderRowdoctorvisit = (item) => (
        <tr key={item.id} className="border-bottom text-center">
            <td className="py-3 px-2">{item?.user_name}</td>
            <td className="py-3 px-2">{epochTimeToDate(item?.ipd_doctor_date)}</td>
            <td>
                <span className="ps-3"></span>
                <RiDeleteBinLine
                    style={{ height: "25px", width: "25px", cursor: "pointer", color: "#DC3545" }}
                    onClick={() => {
                        setStatus(0)
                        setSelectedvisit(item)
                        setShowDeleteConfirmation(true);
                    }}
                />
            </td>
        </tr>
    );

    const handleDelete = async () => {
        try {

            if (status == 1) {
                const response = await axios.delete(`${process.env.REACT_APP_API_URL}/fees/deletecharge?ipd_charge_id=${selectedcharges?.ipd_charge_id}`, config)
                fetchCharges();
            } else {
                const response = await axios.delete(`${process.env.REACT_APP_API_URL}/doctor/deleteoctorvisit?IpdDoctorVisitId=${selectedvisit?.ipd_doctor_visit_id}`, config)
                fetchvisits();
            }
            setShowDeleteConfirmation(false)

        } catch (error) {
            setShowDeleteConfirmation(false)

        }
    }

    return (
        <div className="pt-4 px-4" style={{ backgroundColor: "#F8F9FA", minHeight: "100vh" }}>
            {/* Header */}
            <div className="fw-semibold fs-4 mb-4" style={{ color: "#1D949A" }}>
                Patient Details
            </div>

            <Row className="m-0 mt-4">
                {/* Profile Picture */}
                <Col lg={12} md={12} className="mb-4">
                    <div
                        className="p-4"
                        style={{
                            border: "1px solid #E4E9EF",
                            borderRadius: "10px",
                            backgroundColor: "#fff",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                        }}
                    >
                        <div className="d-flex align-items-center gap-3">
                            <img
                                src={`${process.env.REACT_APP_API_URL}/${patient?.Photo}`}
                                alt="Profile"
                                className="rounded-circle"
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    objectFit: "cover",
                                    border: "3px solid #1D949A",
                                }}
                            />
                            <div>
                                <h5 className="mb-1 fw-bold" style={{ color: "#333" }}>{patient?.Name}</h5>
                                <p className="mb-0 text-muted" style={{ fontSize: "14px" }}>
                                    Patient ID: {patient?.uh_id}
                                </p>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>


            <div className="d-flex justify-content-end pe-3">
                <span className="pe-3 pt-2">{epochTimeToDate(patient?.discharge_date)} </span>
                <CommanButton
                    onClick={() => handledischargedateModal()}
                    label="Discharge Date"
                    className="me-3 p-2 px-3 fw-semibold fs-6"
                    style={{ borderRadius: "5px" }}
                />
            </div>


            <Row className="m-0 mt-4">
                <Col lg={6} md={12} className="mb-4">
                    <div
                        className="p-4"
                        style={{
                            border: "1px solid #E4E9EF",
                            borderRadius: "10px",
                            backgroundColor: "#fff",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                        }}
                    >
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <div>
                                <p className="fw-semibold mb-0" style={{ color: "#1D949A", fontSize: "18px" }}>
                                    Charges
                                </p>
                            </div>
                            <div>
                                <IoMdAdd

                                    onClick={() => {
                                        handleAddChargesModal()
                                    }}

                                    style={{
                                        height: "23px",
                                        width: "23px",
                                        cursor: "pointer",
                                        color: "#1D949A",
                                    }}
                                />
                            </div>
                        </div>

                        {charge.length > 0 ?
                            <div>
                                <CommonTable
                                    minimumWidth={"100%"}
                                    headers={columns}
                                    bodyData={charge}
                                    renderRow={renderRow}
                                    title={"Charges List"}
                                />
                            </div> : <div className="text-center">No charges data</div>
                        }


                    </div>
                </Col>

                {/* Personal Information */}
                <Col lg={6} md={12} className="mb-4">
                    <div
                        className="p-4"
                        style={{
                            border: "1px solid #E4E9EF",
                            borderRadius: "10px",
                            backgroundColor: "#fff",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                        }}
                    >
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <div>
                                <p className="fw-semibold mb-0" style={{ color: "#1D949A", fontSize: "18px" }}>
                                    Doctor Visits
                                </p>
                            </div>
                            <div>
                                <IoMdAdd

                                    onClick={() => {

                                        handleDoctorVisitModal()
                                    }}
                                    style={{
                                        height: "23px",
                                        width: "23px",
                                        cursor: "pointer",
                                        color: "#1D949A",
                                    }}
                                // Add onClick handler here if needed
                                />
                            </div>
                        </div>
                        {doctorVisit.length > 0 ?
                            <div>
                                <CommonTable
                                    minimumWidth={"100%"}
                                    headers={columnsdoctors}
                                    bodyData={doctorVisit}
                                    renderRow={renderRowdoctorvisit}
                                    title={"Doctor Visited List"}
                                />
                            </div> : <div className="text-center">No doctor visits data</div>
                        }
                    </div>
                </Col>
            </Row>


            <AddLabTest />
            <CourseDetails />

            <AddCharges
                admited={patient}
                show={showAddChargesModal}
                handleClose={() => {
                    handleAddChargesCloseModal();
                    fetchCharges()
                }}
            />
            <Setdicharge
                admited={patient}
                show={showDischagredateModal}
                handleClose={() => {
                    handledischargedateCloseModal();
                    fetchpatient()
                }}
            />

            <AddVisit
                admited={patient}
                show={showDoctorVisitModal}
                handleClose={() => {
                    handleDoctorVisitCloseModal();
                    fetchvisits()
                }}
            />

            <DeleteConfirmationModal
                show={showDeleteConfirmation}
                handleClose={() => setShowDeleteConfirmation(false)}
                handleConfirm={handleDelete}
            />



        </div>
    );
}

export default AdmitedPatientDetails;
