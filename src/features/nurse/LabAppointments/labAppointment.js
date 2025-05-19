import { useEffect, useState } from "react";
import Covid from "../../../assets/images/labs/Covid.png";
import { Col, Row } from "react-bootstrap";
import { TbFileDescription } from "react-icons/tb";
import { FaArrowLeft, FaCalendarCheck } from "react-icons/fa";
import { FiEdit2, FiEye } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import CommonTable from "../../../components/common/table/CommonTable";
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
                    </Row>
                </div>
            </div>
        </>
    )
}

export default LabAppointmentDetail;