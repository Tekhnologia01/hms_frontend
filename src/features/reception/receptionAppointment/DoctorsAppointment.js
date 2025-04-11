import { useLocation, useNavigate, useParams } from "react-router-dom";
import vijay from "../../../assets/images/avatars/vijay.jpg";
import { LuStethoscope } from "react-icons/lu";
import { MdAccessTime } from "react-icons/md";
import { Col, Pagination, Row, Table } from "react-bootstrap";
import { FaArrowLeft, FaCalendarCheck } from "react-icons/fa";
import { TbFileDescription } from "react-icons/tb";
import { FiEdit2 } from "react-icons/fi";
import { useEffect, useState } from "react";
import document from "../../../assets/images/avatars/document.png"
import Slider from "../../commonfeature/Slider";
import CommanButton from "../../../components/common/form/commonButtton";
import DateSlider from "../../../components/common/DateSlider";
import { format } from "date-fns";
import CommonTable from "../../../components/table/CommonTable";
import axios from "axios";
import NewCommonPagination from "../../../components/pagination/NewCommonPagination";

function DoctorsAppointment() {

    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);

    const params = useParams();
    const doctorId = params.doctorId;

    // const [displayedPatient, setDisplayedPatient] = useState(patients[0]);

    const [currentPage, setCurrentPage] = useState(1);
    const limitPerPage = 10;

    const [currentDate, setCurrentDate] = useState(location.state ? new Date(location.state) : new Date());
    const [formattedDate, setFormattedDate] = useState(new Date(currentDate).toISOString().split("T")[0]);

    useEffect(() => {
        setFormattedDate(format(currentDate, "yyyy-MM-dd"));
    }, [currentDate])

    const [appointmentData, setAppointmentData] = useState([]);

    async function getAppointmentsData() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/doctor/getDoctorsAppointmentByDate?doctor_id=${doctorId}&appointment_date=${formattedDate}&page=${currentPage}&page_size=${limitPerPage}`);
            // console.log("appooijofdng => ", response?.data?.data);
            setAppointmentData(response?.data?.data);
        } catch (err) {
            console.log("Error fetching departments:", err);
        }
    }

    useEffect(() => {
        getAppointmentsData();
    }, [formattedDate, currentPage]);

    const confirmedStyle = {
        backgroundColor: "#EFFBE7",
        color: "#095512",
        fontSize: "14px"
    }

    const pendingStyle = {
        backgroundColor: "#FDF8E4",
        color: "#905900",
        fontSize: "14px"
    }

    const declinedStyle = {
        backgroundColor: "#FDE4E4",
        color: "#905900",
        fontSize: "14px"
    }

    const columns = [
        // { name: "", accessor: "checkbox", class: "w-auto" },
        { name: "Patients Name", accessor: "patientName", class: "py-3 px-5 text-left w-50", },
        { name: "Sex", accessor: "sex", class: "py-3 text-center px-1" },
        { name: "Age", accessor: "age", class: "py-3 text-center px-1" },
        { name: "Status", accessor: "status", class: "py-3 text-center px-1", width: "120px" },
        { name: "", accessor: "action", class: "py-3 text-center px-1" }
    ];

    const renderRow = (item, index) => (
        <tr key={item.id} className="border-bottom text-center">
            <td className="px-2 text-start lh-1">
                <div className="d-flex align-items-center">
                    <div className="ps-2">
                        <input
                            type="checkbox"
                            onClick={() => navigate(`${item?.appointment_id}`)}
                            style={{ transform: "scale(1.5)", cursor: "pointer" }}
                        />
                    </div>
                    <img
                        src={`${process.env.REACT_APP_API_URL}/${item?.patient_image}`}
                        alt={item.patient_name}
                        style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            objectFit: "cover",
                        }}
                        className="ms-3"
                    />
                    <div className="d-flex flex-column ms-2" style={{ height: "40px" }}>
                        <p className="fw-semibold">{item.patient_name}</p>
                        <p style={{ marginTop: "-10px", "color": "#475467", fontSize: "14px" }}>Appointment for {item.reason}</p>
                    </div>
                </div>
            </td>
            <td className="py-3 px-2">{item.sex}</td>
            <td className="py-3 px-2">{item.age}</td>
            <td><span className="py-1 px-3 fw-semibold rounded-5"
                style={
                    item.status === "Waiting"
                        ? pendingStyle
                        : item.status === "Cancelled"
                            ? declinedStyle
                            : confirmedStyle
                }
            >
                &#x2022; {item.status}
            </span></td>
            <td>
                <FiEdit2 style={{ height: "23px", width: "23px" }} />
            </td>
        </tr>
    );

    return (
        <>
            <div className="m-3 pb-3">
                <div className="d-flex align-items-end justify-content-between pt-1 flex-wrap">
                    <div
                        className="fw-semibold pb-3"
                        style={{ color: "#1D949A", fontSize: "18px" }}
                        onClick={() => navigate("/reception/doctors_appointments")}
                    >
                        <FaArrowLeft />
                        <span className="pt-1 px-2">Doctor Appointments</span>
                    </div>
                    <div className="d-flex mt-4 m-lg-0 gap-2 justify-content-end">
                        <CommanButton
                            label="Book Appointment"
                            className="p-1 px-4 fw-semibold"
                            style={{ borderRadius: "7px", fontSize: "14px", height: "40px", }}
                        />
                    </div>
                </div>

                <div>
                    <Row className="mt-1 py-4 d-flex flex-wrap m-0">
                        <Col lg={1} className="d-flex align-items-center justify-content-start py-2">
                            <div className="text-center" style={{ height: "64px", width: "64px" }}>
                                <img src={appointmentData?.doctor_details?.doctor_photo ? `${process.env.REACT_APP_API_URL}/${appointmentData?.doctor_details?.doctor_photo}` : vijay} alt={appointmentData?.doctor_details?.doctor_name} style={{ height: "64px", width: "64px", borderRadius: "100px", objectFit: "cover" }} />
                            </div>
                        </Col>

                        <Col lg={7}>
                            <div className="h-100 d-flex flex-column justify-content-start pt-md-3">
                                <div className="row m-0">
                                    <div className="col">
                                        <span className="fw-bold" style={{ fontSize: "18px", color: "#101828" }}>
                                            {appointmentData?.doctor_details?.doctor_name}
                                        </span>
                                    </div>
                                </div>

                                <div className="row m-0 flex flex-column">
                                    <div className="col gy-2 d-flex gap-3 mt-1 fw-semibold">
                                        <div>

                                            <LuStethoscope style={{ height: "20px", width: "20px" }} />
                                            <span className="ps-2" style={{ fontSize: "15px", color: "#667085" }}>
                                                {appointmentData?.doctor_details?.specialization}
                                            </span>
                                        </div>
                                        <div>
                                            <MdAccessTime style={{ height: "20px", width: "20px" }} />
                                            <span className="ps-2" style={{ fontSize: "15px", color: "#667085" }}>
                                                {appointmentData?.doctor_details?.doctor_time}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col gy-2 mt-1">
                                        <TbFileDescription style={{ height: "20px", width: "20px" }} />
                                        <span className="ps-2" style={{ fontSize: "15px", color: "#667085" }}>
                                            {"Description"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Col>

                        <Col className="d-flex gap-2 justify-content-lg-end mt-3 m-lg-0 justify-content-start" lg={4}>
                            <div style={{ width: "150px", minHeight: "120px", borderRadius: "6px", border: "1px soild #1E959B33", backgroundColor: "#1E959B33" }} className="d-flex border flex-column justify-content-center align-items-center h-100">
                                <div>
                                    <FaCalendarCheck size={26} color="#1E959B" />
                                </div>
                                <p className="m-0 mt-1 fw-semibold fs-4">{appointmentData?.doctor_details?.appointments_count}</p>
                                <p className="m-0 fw-semibold">Appointment</p>
                            </div>
                        </Col>
                    </Row>
                </div>

                <div className="mt-3 mb-4">
                    <DateSlider currentDate={currentDate} setCurrentDate={setCurrentDate} />
                </div>

                <div>
                    <div className="py-4">
                        <div style={{ borderRadius: "5px", overflowX: "auto" }}>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="p-3 px-4 fs-6 fw-semibold">{appointmentData?.patients?.length > 0 ? "Appointments for " : "No appointents for "} {format(currentDate, "PPPP")}</div>
                            </div>

                            {
                                appointmentData?.patients?.length > 0 && <div>
                                    <CommonTable minimumWidth={"550px"} headers={columns} bodyData={appointmentData?.patients} renderRow={renderRow} title={"Patients List"} />
                                </div>
                            }
                        </div>

                        {
                            appointmentData?.patients?.length > 0 &&
                            <NewCommonPagination currentPage={currentPage} limitPerPage={limitPerPage} totalRecords={appointmentData?.doctor_details?.appointments_count} setCurrentPage={setCurrentPage} />
                        }
                    </div>

                    {/* <Col lg={6}>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="p-3 px-2 fs-5 fw-semibold">Prescription</div>
                                <div>
                                    <CommanButton
                                        label="Prescription"
                                        className="p-1 px-4 fw-semibold"
                                        style={{ borderRadius: "7px", fontSize: "14px", height: "40px", }}
                                    />
                                </div>
                            </div>
                            <div className="py-2 border p-3 py-3" style={{ borderRadius: "5px", color: "#46494C" }}>
                                <div className="border-bottom pb-2 mb-2" >
                                    <div className="d-flex gap-2 justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <img
                                                src={displayedPatient.image}
                                                alt={displayedPatient.name}
                                                style={{
                                                    width: "40px",
                                                    height: "40px",
                                                    borderRadius: "50%",
                                                    objectFit: "cover",
                                                }}
                                            />
                                            <div className="d-flex flex-column ms-2" style={{ height: "40px" }}>
                                                <p>{displayedPatient.patientName}</p>
                                                <p style={{ marginTop: "-20px", "color": "#475467", fontSize: "12px" }}>{displayedPatient.age + " " + displayedPatient.sex}</p>
                                            </div>
                                        </div>
                                        <div className="d-flex border-start ps-4 flex-column ms-2" style={{ height: "40px" }}>
                                            <p>UH Id</p>
                                            <p style={{ marginTop: "-20px", "color": "#475467", fontSize: "13px" }}>{displayedPatient.uhId}</p>
                                        </div>
                                        <div className="d-flex border-start ps-4  flex-column ms-2" style={{ height: "40px" }}>
                                            <p>Contact No.</p>
                                            <p style={{ marginTop: "-20px", "color": "#475467", fontSize: "13px" }}>+91 {displayedPatient.phone}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex" style={{ lineHeight: "17px" }}>
                                    <div style={{ width: "25%" }}>
                                        <div>
                                            <p>BP: 120/80</p>
                                            <p>Pulse: 801m</p>
                                            <p>Weight: 62 Kg</p>
                                        </div>
                                        <div className="mt-4">
                                            <p className="fw-semibold text-dark">Test:</p>
                                            <p>X-Ray</p>
                                            <p>Blood Test</p>
                                            <p>Urine Test</p>
                                            <p>Endoscopy</p>
                                        </div>
                                    </div>
                                    <div className="border-start ps-3">
                                        <div>
                                            <p className="fw-semibold text-dark">
                                                Last Checked:
                                            </p>
                                            <p>Dr-Everly on 20 November 2022</p>
                                            <p>Presciption - #20112022P0PS</p>

                                        </div>
                                        <div className="mt-4">
                                            <p className="fw-semibold text-dark">
                                                Observation:
                                            </p>
                                            <p>High Fever and cough at normal</p>
                                        </div>
                                        <div className="mt-4">
                                            <p className="fw-semibold text-dark">
                                                Prescription:
                                            </p>
                                            <p>Cap CALPOL 500mg 1 + 1 + 1 - X 5 Days</p>
                                            <p>Cap CALPOL 500mg 1 + 1 + 1 - X 5 Days</p>
                                            <p>Cap CALPOL 500mg 1 + 1 + 1 - X 5 Days</p>
                                            <p>Cap CALPOL 500mg 1 + 1 + 1 - X 5 Days</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Slider slides={displayedPatient.reports} />
                        </Col> */}

                </div>
            </div>
        </>
    )
}

export default DoctorsAppointment;