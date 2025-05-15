import { useEffect, useState } from "react";
import Covid from "../../../assets/images/labs/Covid.png";
import { Col, Row } from "react-bootstrap";
import { TbFileDescription } from "react-icons/tb";
import { FaArrowLeft, FaCalendarCheck } from "react-icons/fa";
import { FiEdit2, FiEye } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import CommonTable from "../../../components/table/CommonTable";
import axios from "axios";
import { MdOutlineOpenWith } from "react-icons/md";
import { useSelector } from "react-redux";

function LabAppointmentDetail({ appointmenttype }) {
    const navigate = useNavigate();
    const params = useParams();
    const token = useSelector((state) => state.auth.currentUserToken);
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const labData = {
        labName: "Covid RT-PCR",
        description: "Infectious Diseases Hub aims to provide up-to-date, essential research and on aspects of microbiology, virology, and parasitology.",
        noOfAppointments: 165,
        newAdmitted: 102,
        image: Covid,

    }

    const [patientList, setPatientList] = useState([]);
    const [testData, setTestData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const columns = [
        { name: "Patients Name", accessor: "patient_name", class: "py-3 w-25 text-left px-2" },
        { name: "Age", accessor: "patient_age", class: "py-3 text-center px-1" },
        { name: "Sex", accessor: "sex", class: "py-3 text-center px-1" },
        { name: "Status", accessor: "status", class: "py-3 text-center px-1" },
        { name: "Action", accessor: "action", class: "py-3 text-center px-1" }
    ];

    const renderRow = (item, index) => (
        <tr key={item.id} className="border-bottom text-center cursor-pointer">
            <td className="px-2 text-start lh-1">
                <div className="d-flex align-items-center"
                    onClick={() => navigate(`${item?.appo_id}`)}
                    style={{ width: "200px" }}
                >
                    <img
                        src={`${process.env.REACT_APP_API_URL}/${item?.patient_image}`}
                        alt={item?.patient_name}
                        style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            objectFit: "cover",
                        }}
                    />
                    <div className="d-flex flex-column ms-2" style={{ height: "40px" }}>
                        <p>{item.patient_name}</p>
                        <p style={{ marginTop: "-10px", "color": "#475467", fontSize: "14px" }}>{item.uh_id}</p>
                    </div>
                </div>
            </td>
            <td className="py-3 px-2">{item.patient_age}</td>
            <td className="py-3 px-2">{item.patient_sex}</td>
            <td className="py-3 px-2">{item.lab_test_status}</td>
            <td>
                {item.lab_test_status == "Completed" ?
                    <>
                        <FiEye style={{ "margin-top": "-8px", height: "20px", width: "20px" }}
                            onClick={() => window.open(
                                `${process.env.REACT_APP_API_URL}/${item.report_photo}`,
                                "_blank",
                                "noopener,noreferrer"
                            )}
                        /> <span className="ps-3"></span>
                        <FiEdit2 style={{ "margin-top": "-8px", height: "20px", width: "20px" }} onClick={() => navigate(`${item?.appo_id}/${item?.lab_id}/update`)} /></> :
                    <MdOutlineOpenWith style={{ "margin-top": "-8px", height: "20px", width: "20px" }} onClick={() => navigate(`${item?.appo_id}/${item?.lab_id}/add`)} />
                }
            </td>
        </tr>
    );

    const renderRowIpd = (item, index) => (
        <tr key={item.id} className="border-bottom text-center cursor-pointer "
        >
            <td className="px-2 text-start lh-1">
                <div className="d-flex align-items-center"
                    style={{ width: "200px" }}
                >
                    <img
                        src={`${process.env.REACT_APP_API_URL}/${item?.patient_image}`}
                        alt={item?.patient_name}
                        style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            objectFit: "cover",
                        }}
                    />
                    <div className="d-flex flex-column ms-2" style={{ height: "40px" }}>
                        <p>{item.patient_name}</p>
                        <p style={{ marginTop: "-10px", "color": "#475467", fontSize: "14px" }}>{item.uh_id}</p>
                    </div>
                </div>
            </td>
            <td className="py-3 px-2">{item.patient_age}</td>
            <td className="py-3 px-2">{item.patient_sex}</td>
            <td className="py-3 px-2">{item.status}</td>
            <td>
                {item.status == "Completed" ?
                    <>
                        <FiEye style={{ "margin-top": "-8px", height: "20px", width: "20px" }}
                            onClick={() => window.open(
                                `${process.env.REACT_APP_API_URL}/${item.report_photo}`,
                                "_blank",
                                "noopener,noreferrer"
                            )}
                        />

                        <span className="ps-3"></span>
                        <FiEdit2 style={{ "margin-top": "-8px", height: "20px", width: "20px" }} onClick={() => navigate(`${item?.admitted_patient_id}/${item?.ipd_lab_id}/update`)} /></> :
                    <MdOutlineOpenWith style={{ "margin-top": "-8px", height: "20px", width: "20px" }} onClick={() => navigate(`${item?.admitted_patient_id}/${item?.ipd_lab_id}/add`)} />
                }
            </td>
        </tr>
    );


    async function getPatientsData() {
        try {
            let url = `${process.env.REACT_APP_API_URL}/lab/getlabtest?test_id=${params?.labId}`;

            if (appointmenttype !== "Opd") {
                url = `${process.env.REACT_APP_API_URL}/lab/getipdlabtest?test_id=${params?.labId}`;
            }

            const response = await axios.get(url, config);
            setPatientList(response?.data?.data?.data);
            setTestData(response?.data?.data?.test[0]);
        } catch (error) {
            console.error("Error fetching lab test data:", error);
        }
    }

    useEffect(() => {
        getPatientsData();
    }, [])


    return (
        <>
            <div className="px-lg-4 pt-3 p-3">
                <div className="d-flex align-items-center justify-content-between flex-wrap">
                    <div
                        className="fw-semibold fs-6 pb-lg-3 mt-4"
                        style={{ color: "#1D949A" }}
                        onClick={() => navigate(-1)}
                    >
                        <FaArrowLeft />
                        <span className="pt-1 px-2">Lab Appointments/{testData?.test_name}</span>
                    </div>
                    {/* <div className="d-flex mt-4 m-lg-0 gap-2 justify-content-end">
                        <InputBox
                            style={{ height: "40px" }}
                            placeholder="olivia@untitledui.com"
                            // value={values.cafeName}
                            // onChange={handleChange}
                            name="cafeName"
                        />
                        <CommanButton
                            label="Filter "
                            className="p-1 px-4 fw-semibold"
                            style={{ borderRadius: "7px", height: "40px", fontSize: "14px", backgroundColor: "#fff", color: "black", border: "1px solid lightgray" }}
                        />
                        <CommanButton
                            label="+ Add Lab"
                            className="p-1 px-4 fw-semibold"
                            style={{ borderRadius: "7px", fontSize: "14px", height: "40px", }}
                        />
                    </div> */}
                </div>

                <div>
                    <Row className="m-0 py-4 d-flex flex-wrap">
                        <Col lg={2} className="d-flex align-items-center justify-content-start py-2">
                            <div className="text-center bg-info" style={{ height: "100px", width: "100px", borderRadius: "10px" }}>
                                <img src={`${process.env.REACT_APP_API_URL}/${testData?.test_photo}`} alt={labData.labName} style={{ height: "100%", width: "100%", objectFit: "cover" }} />
                            </div>
                        </Col>

                        <Col lg={5}>
                            <div className="h-100 d-flex flex-column justify-content-start pt-md-3">
                                <div className="row m-0">
                                    <div className="col">
                                        <span className="fw-bold" style={{ fontSize: "20px", color: "#101828" }}>
                                            {testData?.test_name}
                                        </span>
                                    </div>
                                </div>

                                <div className="row m-0">
                                    <div className="col gy-2 mt-1">
                                        <TbFileDescription style={{ height: "20px", width: "20px" }} />
                                        <span className="ps-2" style={{ fontSize: "15px", color: "#667085" }}>
                                            {testData?.test_description}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Col>

                        <Col className="d-flex gap-2 justify-content-lg-end mt-3 m-lg-0 justify-content-start" lg={5}>
                            <div style={{ width: "150px", minHeight: "120px", borderRadius: "6px", border: "1px soild #1E959B33", backgroundColor: "#1E959B33" }} className="d-flex border flex-column justify-content-center align-items-center h-100">
                                <div>
                                    <FaCalendarCheck size={26} color="#1E959B" />
                                </div>
                                <p className="m-0 mt-1 fw-semibold fs-4">{patientList?.length}</p>
                                <p className="m-0 fw-semibold">Appointment</p>
                            </div>
                            {/* <div style={{ width: "150px", minHeight: "120px", borderRadius: "6px", border: "1px soild #1E959B33", backgroundColor: "#1E959B33" }} className="d-flex border flex-column justify-content-center align-items-center h-100">
                                <div>
                                    <FaBedPulse size={26} color="#1E959B" />
                                </div>
                                <p className="m-0 mt-1 fw-semibold fs-4">{labData.newAdmitted}</p>
                                <p className="m-0 fw-semibold">New Admitted</p>
                            </div> */}
                        </Col>
                    </Row>
                </div>

                <div>
                    <Row>
                        <Col lg={12}>
                            <div className="py-4">
                                {
                                    appointmenttype == "Ipd" ? <CommonTable headers={columns} minimumWidth={"550px"} bodyData={patientList} renderRow={renderRowIpd} title={"Patients List"} /> : <CommonTable headers={columns} minimumWidth={"550px"} bodyData={patientList} renderRow={renderRow} title={"Patients List"} />
                                }
                            </div>
                        </Col>




                        {/* <Col lg={6}>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="p-3 px-2 fs-5 fw-semibold">Patients Details</div>
                                <div>
                                    <CommanButton
                                        label="View Details"
                                        className="p-1 px-4 fw-semibold"
                                        onClick={() => navigate(`${patientList[0]?.appo_id}`)}
                                        style={{ borderRadius: "7px", fontSize: "14px", height: "40px", }}
                                    />
                                </div>
                            </div>
                            <div className="py-2 border p-3 py-3" style={{ borderRadius: "5px", color: "#46494C" }}>
                                <div className="border-bottom pb-2 mb-2" >
                                    <div className="d-flex gap-2 justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <img
                                                src={`${process.env.REACT_APP_API_URL}/${patientList[0]?.patient_image}`}
                                                alt={patientList[0]?.patient_name}
                                                style={{
                                                    width: "40px",
                                                    height: "40px",
                                                    borderRadius: "50%",
                                                    objectFit: "cover",
                                                }}
                                            />
                                            <div className="d-flex flex-column ms-2" style={{ height: "40px" }}>
                                                <p>{patientList[0]?.patientName}</p>
                                                <p style={{ marginTop: "-20px", "color": "#475467", fontSize: "12px" }}>{patientList[0]?.age + " Years " + patientList[0]?.sex}</p>
                                            </div>
                                        </div>
                                        <div className="d-flex border-start ps-4 flex-column ms-2" style={{ height: "40px" }}>
                                            <p>Email</p>
                                            <p style={{ marginTop: "-20px", "color": "#475467", fontSize: "13px" }}>{patientList[0]?.email}</p>
                                        </div>
                                        <div className="d-flex border-start ps-4  flex-column ms-2" style={{ height: "40px" }}>
                                            <p>Phone</p>
                                            <p style={{ marginTop: "-20px", "color": "#475467", fontSize: "13px" }}>+91 {patientList[0]?.phone}</p>
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
                            <Slider slides={patientList[0]?.reports} />
                        </Col> */}
                    </Row>
                </div>
            </div>
        </>
    )
}

export default LabAppointmentDetail;