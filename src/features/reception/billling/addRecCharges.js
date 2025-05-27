import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import vijay from "../../../assets/images/avatars/vijay1.jpg";
import CommonTable from "../../../components/common/table/CommonTable";
import NewCommonPagination from "../../../components/common/pagination/NewCommonPagination";
import axios from "axios";
import { useSelector } from "react-redux";
import UpdatePatient from "../patientList/UpdatePatient";
import { NavLink, useNavigate } from "react-router-dom";
import { MdOutlineBedroomChild } from "react-icons/md";
import ChangeRoom from "../../commonfeature/ChangeRoom";
import { FaPlusSquare } from "react-icons/fa";
import AddCharges from "../../commonfeature/AddCharges";
import { CiMedicalClipboard } from "react-icons/ci";
import { toast } from "react-toastify";




function PatientAppointmentList() {
    const [showModal, setShowModal] = useState(false);
    const [showChangeRoomModal, setShowChangeRoomModal] = useState(false);
    const [showAddChargesModal, setShowAddChargesModal] = useState(false);
    const [showUpdteModal, setShowUpdateModal] = useState(false);
    const [patientCounts, setPatientCounts] = useState({
        totalCount: 0,
        appointmentCount: 0,
        admittedCount: 0
    });
    const handleUpdateCloseModal = () => setShowUpdateModal(false);
    const handleCloseModal = () => {
        getIPDPatients();
        getPatientsCount();
        setShowModal(false);
    };

    const token = useSelector((state) => state.auth.currentUserToken);
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const navigate = useNavigate()
    const handleAddChargesCloseModal = () => setShowAddChargesModal(false);
    const handleChangeRoomModal = () => setShowChangeRoomModal(true);
    const handleChangeRoomCloseModal = () => setShowChangeRoomModal(false);
    const { user } = useSelector(state => state?.auth)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const limitPerPage = 10;
    const [patients, setPatients] = useState([]);
    const [cardState, setCardState] = useState("ipd");
    const [patient, setPatient] = useState();
    const [admited, setAdmited] = useState();

    async function getPatients() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/patient/getAll?page=${currentPage}&limit=${limitPerPage}`, config);
            setPatients(response?.data?.data);
            setTotalPages(response?.data?.data?.pagination?.TotalPages);
        } catch (err) {
            console.log("Error fetching departments:", err);
        }
    }

    async function getIPDPatients() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/patient/get_admit_patients?page=${currentPage}&limit=${limitPerPage}`, config);
            setPatients(response?.data?.data);
            setTotalPages(response?.data?.data?.pagination?.TotalPages);
        } catch (err) {
            console.log("Error fetching departments:", err);
        }
    }

    async function getOPDPatients() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/patient/get_opd?page=${currentPage}&limit=${limitPerPage}`, config);
            setPatients(response?.data?.data);
            setTotalPages(response?.data?.data?.pagination?.TotalPages);
        } catch (err) {
            console.log("Error fetching departments:", err);
        }
    }

    async function getDoctorsOPDPatients() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/patient/get_opd?page=${currentPage}&limit=${limitPerPage}`, config);
            setPatients(response?.data?.data);
            setTotalPages(response?.data?.data?.pagination?.TotalPages);
        } catch (err) {
            console.log("Error fetching departments:", err);
        }
    }

    useEffect(() => {
        if (cardState === "opd") {
            getOPDPatients();
        } else if (cardState === "ipd") {
            getIPDPatients();
        } else {
            getPatients();
        }
    }, [cardState, currentPage]);

    useEffect(() => {
        if (cardState === "opd" && user.role === "Admin") {
            getOPDPatients();
        }
        else if (cardState === "opd" && user.role === "Doctor") {
            getDoctorsOPDPatients();
        }
        else if (cardState === "ipd") {
            getIPDPatients();
        } else {
            getPatients();
        }
        setCurrentPage(1);
    }, [cardState]);

    const getPatientsCount = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/patient/get_patient_count?role=${user.role}&doctor_id=${user?.userId}`, config);
            setPatientCounts(response?.data?.data);
        } catch (err) {
            console.log("Error fetching departments:", err);
        }
    }

    useEffect(() => {
        getPatientsCount();
    }, [user.role])

    const ipdColumns = [
        { name: "Patient Name", accessor: "patientName", class: "py-3 px-5 text-left", width: "250px" },
        { name: "IPD ID", accessor: "uhId", class: "text-center px-1" },
        { name: "Admit Date", accessor: "date", class: "text-center px-1" },
        { name: "Sex", accessor: "sex", class: "py-3 text-center px-1" },
        { name: "Age", accessor: "age", class: "py-3 text-center px-1", width: "30px" },
        { name: "Doctor name", accessor: "doctorName", class: "py-3 text-center px-1", },
        { name: "Department", accessor: "department", class: "py-3 text-center px-1", },
        ...(user.RoleId == 4 ? [{ name: "Action", accessor: "action", class: " text-center", }] : [])

    ];
    const renderIPDRow = (item, index) => (
        <tr key={item.id} className="border-bottom text-center">
            <td className="px-2 text-start lh-1">

                <div className="d-flex align-items-center">

                    <img
                        src={item?.Photo ? `${process.env.REACT_APP_API_URL}/${item?.Photo}` : vijay}
                        alt={item?.Name}
                        style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            objectFit: "cover",
                        }}
                        className="ms-3"
                    />
                    <div className="ms-2">
                        <p className="fw-semibold m-auto">{item?.Name}</p>
                    </div>
                </div>
            </td>
            <td className="py-3 px-2">{item?.ipd_id}</td>
            <td className="py-3 px-2">{item?.admitted_date} {item?.admit_time}</td>
            <td className="py-3 px-2">{item?.patient_sex}</td>
            <td className="py-3 px-2">{item?.patient_age}</td>
            <td className="py-3 px-2">{item?.doctor_name}</td>
            <td className="py-3 px-2">{item?.department}</td>
            {
                user.RoleId == 4 &&
                <td>
                    <MdOutlineBedroomChild style={{ height: "23px", width: "23px" }}
                        onClick={() => {
                            setAdmited(item)
                            handleChangeRoomModal()
                        }} />
                    <span className="ps-2"></span>

                    <FaPlusSquare style={{ height: "23px", width: "23px" }}
                        onClick={() => {
                            navigate(`/doctor/patient_list/ipd/${item.admitted_patient_id}`)
                        }} />
                    {user?.userId == item?.doctor_id && <NavLink to={`/doctor/discharge_patient/${item?.admitted_patient_id}`} state={item?.ipd_id}>
                        <CiMedicalClipboard style={{ height: "30px", width: "30px" }} />
                    </NavLink>}
                </td>
            }
        </tr>
    );

    const patientUpdate = async (data) => {
        try {
            const patientData = {
                patient_name: data.patient_name,
                patient_phone_no: data.patient_phone_no,
                patient_age: data.patient_age,
                patient_address: data.patient_address,
                patientId: patient.Patient_ID
            };
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/patient/update`, patientData, config)
            toast.success(response?.data?.message);
            getPatients()
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }

    return (

        <div className="py-4 px-3 ">
{/* 
            <div>
                <Row className="align-items-center m-0">
                    <Col md={6}>
                        <div className="fw-bold fs-3">Patient List</div>
                    </Col>
                </Row>
            </div> */}

            {patientCounts &&
                <div className="cards-container d-flex align-items-center justify-content-start  ms-3  flex-wrap">

                </div>}

            <div className="mt-3">
                {cardState === "ipd" && <div>
                    <CommonTable minimumWidth={"1000px"} headers={ipdColumns} bodyData={patients?.data} renderRow={renderIPDRow} title={"Patients List"} />
                </div>}

                {
                    totalPages > 1 &&
                    <NewCommonPagination currentPage={currentPage} limitPerPage={limitPerPage} totalRecords={patients?.pagination?.TotalRecords} setCurrentPage={setCurrentPage} />
                }
            </div>

            <UpdatePatient
                patient={patient}
                patientUpdate={patientUpdate}
                show={showUpdteModal}
                handleClose={handleUpdateCloseModal}
            />

            <ChangeRoom
                admited={admited}
                patientUpdate={patientUpdate}
                show={showChangeRoomModal}
                handleClose={handleChangeRoomCloseModal}
            />

            <AddCharges
                admited={admited}
                patientUpdate={patientUpdate}
                show={showAddChargesModal}
                handleClose={handleAddChargesCloseModal}
            />

        </div>
    );
}

export default PatientAppointmentList;
