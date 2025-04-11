import React, { useEffect, useState } from "react";
import { Table, Pagination, Row, Col } from "react-bootstrap";
// import { FaArrowDown } from "react-icons/fa";
import vijay from "../../assets/images/avatars/vijay.jpg";
import BarGraph from "../commonfeature/Graphs/barGraph";
import ThreeLayeredChart from "../commonfeature/Graphs/circleGraph";
import CommonTable from "../../components/table/CommonTable";
import NewCommonPagination from "../../components/pagination/NewCommonPagination";
import axios from "axios";
import { useSelector } from "react-redux";

function DoctorDashboard() {
   const [admitedPatient,setAdmitedPatient]=useState([])
    const { user } = useSelector(state => state?.auth);

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const [currentPage, setCurrentPage] = useState(1);
    const [limitPerPage, setLimitPerPage] = useState(10);
    const totalRecords = 200;

    const [todaysDate, setTodaysDate] = useState(new Date().toISOString().split("T")[0]);
    const [todaysAppintments, setTodaysAppointments] = useState([]);

    const fetchTodaysAppointments = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/appointment/doctordaywise?doctor_id=${user?.userId}&appointment_date=${todaysDate}`)
            // console.log("Appointments data => ", response?.data?.data);
            setTodaysAppointments(response?.data?.data);
        } catch (err) {
            console.log("Error fetching appointments => ", err)
        }
    }



    const fetchIpdPatient = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/patient/get_admit_patients`)
            console.log("Appointments data => ", response?.data?.data.data);
            setAdmitedPatient(response?.data?.data.data);
        } catch (err) {
            console.log("Error fetching appointments => ", err)
        }
    }
    useEffect(() => {
        fetchTodaysAppointments();
        fetchIpdPatient();
    }, []);



    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);





    const dataForBargraph = {

        labels: ["January", "February", "March", "April", "May"], // Months
        datasets: [
            {
                label: "Active Doctors",
                data: [100, 400, 600, 800, 1000], // Active doctor counts
                backgroundColor: "#1D949A", // Bar color
                borderColor: "#1D949A", // Border color
                barPercentage: 1.0, // Maximize bar width relative to category
                categoryPercentage: 1.0, // Remove extra category spacing
                maxBarThickness: 40, // Limit the maximum thickness of each bar
                borderRadius: {
                    topLeft: 5,
                    topRight: 5,
                    bottomLeft: 0,
                    bottomRight: 0,
                },
            },
        ],

    };

    // Example data for the table

    const data = {
        appointmentRequests: [
            {
                uhId: 1212,
                name: "Patient Name",
                age: 23,
                date: "Date",
                time: "Time",
                status: "Confirmed"
            },
            {
                uhId: 2342,
                name: "Patient Name",
                age: 23,
                date: "Date",
                time: "Time",
                status: "Pending"
            },
            {
                uhId: 3432,
                name: "Patient Name",
                age: 23,
                date: "Date",
                time: "Time",
                status: "Declined"
            },
            {
                name: "Patient Name",
                age: 23,
                date: "Date",
                time: "Time",
                status: "Pending"
            },
        ],
        todayAppointments: [
            {
                name: "Patient Name",
                disease: "Disease",
                time: "12:30"
            },
            {
                name: "Patient Name",
                disease: "Disease",
                time: "01:30"
            },
            {
                name: "Patient Name",
                disease: "Disease",
                time: "02:30"
            },
            {
                name: "Patient Name",
                disease: "Disease",
                time: "03:30"
            },
        ],
        recentPatients: [
            {
                name: "John Doe",
                uhId: "UH12345",
                sex: "Male",
                age: 35,
                appointmentFor: "Cancer"
            },
            {
                name: "Jane Smith",
                uhId: "UH67890",
                sex: "Female",
                age: 29,
                appointmentFor: "Consultation"
            },
        ],

    }


    const nameStyle = {
        fontWeight: "500",
        color: "#101828"
    }

    const bodystyle = {
        textAlign: "center",
        verticalAlign: "middle",
        fontSize: "1rem",
        color: "#475467"
    };

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
        { name: "Patient Name", accessor: "doctorName", class: "py-3 w-50 ps-5 text-left" },
        { name: "UH ID", accessor: "uhId", class: "text-center px-1" },
        { name: "Age", accessor: "age", class: "py-3 text-center px-1" },
        { name: "Sex", accessor: "sex", class: "py-3 text-center px-1" },
    ];

    const renderRow = (item, index) => (
        <tr key={item.id} className="border-bottom text-center">
            <td className="px-2 text-start lh-1">
                <div className="d-flex align-items-center">
                    <div className="ps-2">
                        <input
                            type="checkbox"
                            style={{ transform: "scale(1.5)", cursor: "pointer" }}
                        />
                    </div>
                    <img
                        src={vijay}
                        alt={item.name}
                        style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            objectFit: "cover",
                        }}
                        className="ms-3"
                    />
                    <div className="d-flex flex-column ms-2" style={{ height: "40px" }}>
                        <p className="fw-semibold">{item.name}</p>
                        <p style={{ marginTop: "-10px", "color": "#475467", fontSize: "14px" }}>Appoinement for {item.appointmentFor}</p>
                    </div>
                </div>
            </td>
            <td className="py-3 px-2">{item.uhId}</td>
            <td className="py-3 px-2">{item.age}</td>
            <td className="py-3 px-2">{item.sex}</td>
        </tr>
    );


    return (
        <>
            <div className="graph-container d-flex flex-md-row flex-column gap-3 p-4 m-0 mt-2 justify-content-center align-items-center">
                <div style={{
                    // maxWidth: "550px",
                    width: screenWidth > 768 ? "60%" : "100%",
                    height: "100%",
                    border: "1px solid #F2F4F7",
                    borderRadius: "10px",
                    "box-shadow": "0px 1px 2px 0px #1018280F",
                    "box-shadow": "0px 1px 3px 0px #1018281A",
                }}
                    className="overflow-auto border px-3 py-2">
                    <div style={{ minWidth: "400px" }}>
                        <BarGraph data={dataForBargraph} />
                    </div>
                </div>
                <div style={{
                    // maxWidth: "400px", 
                    width: screenWidth > 768 ? "40%" : "100%",
                    height: "100%", border: "1px solid #F2F4F7",
                    borderRadius: "10px",
                    "box-shadow": "0px 1px 2px 0px #1018280F",
                    "box-shadow": "0px 1px 3px 0px #1018281A",
                }} className="border h-100 p-2 py-4 overflow-auto">
                    <div style={{ minWidth: "250px" }}>
                        <ThreeLayeredChart />
                    </div>
                </div>
            </div >

            <div className="mx-4">
                <Row>
                    <Col xl={6}>
                        <div className="border" style={{ borderRadius: "5px", overflowX: "auto" }}>
                            <div className="border-bottom d-flex justify-content-between align-items-center">
                                <div className="p-3 px-4 fs-5 fw-semibold">Ipd Patient</div>
                            </div>
                            <Table className="bordered">
                                <tbody>
                                    {admitedPatient.map((patient) => (
                                        <tr key={patient.uhId}>
                                            <td style={{ bodystyle }}>
                                                <div className="d-flex align-items-center">
                                                    <img
                                                        src={`${process.env.REACT_APP_API_URL}/${patient?.Photo}`}
                                                        alt={patient.Name}
                                                        style={{
                                                            width: "40px",
                                                            height: "40px",
                                                            borderRadius: "50%",
                                                            objectFit: "cover",
                                                        }}
                                                    />
                                                    <div className="d-flex flex-column ms-2" style={{ height: "40px" }}>
                                                        <p style={nameStyle}>{patient.Name}</p>
                                                        <p style={{ marginTop: "-20px", "color": "#475467", fontSize: "14px" }}>{patient.uh_id}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            {/* <td style={bodystyle}><span className="py-1 px-3 fw-semibold rounded-5"
                                                style={
                                                    patient.status === "Pending"
                                                        ? pendingStyle
                                                        : patient.status === "Declined"
                                                            ? declinedStyle
                                                            : confirmedStyle
                                                }
                                            >
                                                &#x2022; {patient.status}
                                            </span></td> */}
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>

                        </div>
                    </Col>
                    <Col xl={6} className="mt-4 mt-xl-0">
                        <div className="border" style={{ borderRadius: "5px", overflowX: "auto" }}>
                            <div className="border-bottom d-flex justify-content-between align-items-center">
                                <div className="p-3 px-4 fs-5 fw-semibold">Todays Appointments</div>
                            </div>
                            <Table className="bordered">
                                <tbody>
                                    {todaysAppintments?.map((patient) => (
                                        <tr key={patient.Patient_Id}>
                                            <td style={{ bodystyle }}>
                                                <div className="d-flex align-items-center">
                                                    <img
                                                        src={patient.Patient_Photo ? `${process.env.REACT_APP_API_URL}/${patient.Patient_Photo}` : vijay}
                                                        alt={patient.name}
                                                        style={{
                                                            width: "40px",
                                                            height: "40px",
                                                            borderRadius: "50%",
                                                            objectFit: "cover",
                                                        }}
                                                    />
                                                    <div className="d-flex flex-column ms-2" style={{ height: "40px" }}>
                                                        <p style={nameStyle}>{patient.Patient_Name}</p>
                                                        <p style={{ marginTop: "-20px", "color": "#475467", fontSize: "14px" }}>Disease: {patient.Disease}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td style={bodystyle} className="fw-semibold">{patient.slot_time}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>

                <div className="mt-4">
                    <div>
                        <CommonTable minimumWidth={"800px"} headers={columns} bodyData={data.recentPatients} renderRow={renderRow} title={"Recent Patients List"} />
                    </div>
                    {
                        data.recentPatients.length > 0 &&
                        <NewCommonPagination currentPage={currentPage} limitPerPage={limitPerPage} totalRecords={totalRecords} setCurrentPage={setCurrentPage} />
                    }
                </div>
            </div>
        </>
    )
}

export default DoctorDashboard;