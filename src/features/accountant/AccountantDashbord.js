import  { useEffect, useState } from "react";
import { Table,  Row, Col } from "react-bootstrap";
import vijay from "../../assets/images/avatars/vijay.jpg";
import BarGraph from "../commonfeature/Graphs/barGraph";
import ThreeLayeredChart from "../commonfeature/Graphs/circleGraph";
import CommonTable from "../../components/table/CommonTable";
import axios from "axios";
import { useSelector } from "react-redux";
import { epochTimeToDate } from "../../utils/epochToDate";

function AccountantDashboard() {
    const { user } = useSelector(state => state?.auth);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [currentPage, setCurrentPage] = useState(1);
    const [limitPerPage, setLimitPerPage] = useState(10);
    const [reportData, setReportData] = useState()
    const totalRecords = 200;
    const [todaysDate, setTodaysDate] = useState(new Date().toISOString().split("T")[0]);
    const [todaysAppintments, setTodaysAppointments] = useState([]);

    const [discharge, setDischarge] = useState()
    const token = useSelector((state) => state.auth.currentUserToken);
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const fetchTodaysAppointments = async () => {
        try {

            const response = await axios.get(`${process.env.REACT_APP_API_URL}/accountant/getadmtedpatientbill`, config)
            setTodaysAppointments(response?.data?.data);
        } catch (err) {
            console.log("Error fetching appointments => ", err)
        }
    }


    const fetchTodayDischargepatients = async () => {
        try {
            const today = new Date().toISOString().slice(0, 10);
            const dateTimestamp = Math.floor(new Date(today).getTime() / 1000);
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/accountant/todaydischarge?date=${dateTimestamp}`, config);
            setDischarge(response?.data?.data[0]);
        } catch (err) {
            console.log("Error fetching doctors => ", err);
        }
    };



    const fetchReport = async () => {
        const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"

        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/accountant/getcollection?date=${today}&page=${1}&limit=${5}`,
                config
            );
            console.log(response?.data?.data)
            setReportData(response?.data?.data[0] || []);
        } catch (err) {
            console.error("Error fetching report:", err);
        }
    };


    useEffect(() => {
        fetchTodaysAppointments();
        fetchReport()
        fetchTodayDischargepatients()
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


    const columns = [
        { name: "Patient Name", accessor: "doctorName", class: "py-3 w-50 ps-5 text-left" },
        { name: "Amited Date", accessor: "uhId", class: "text-center px-1" },
        { name: "Discharge Date", accessor: "age", class: "py-3 text-center px-1" },
        { name: "Doctor Name", accessor: "sex", class: "py-3 text-center px-1" },
    ];

    const renderRow = (item, index) => (
        <tr key={item.id} className="border-bottom text-center">
            <td className="px-2 text-start lh-1">
                <div className="d-flex align-items-center">
                    <div className="ps-2">
                    </div>
                    <img
                        src={
                            item.Photo
                                ? `${process.env.REACT_APP_API_URL}/${item.Photo}`
                                : vijay
                        }
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
                        <p className="fw-semibold">{item.Name}</p>
                        <p style={{ marginTop: "-10px", "color": "#475467", fontSize: "14px" }}> {item.ipd_id}</p>
                    </div>
                </div>
            </td>
            <td className="py-3 px-2">{epochTimeToDate(item.admitted_date)}</td>
            <td className="py-3 px-2">{epochTimeToDate(item.discharge_date)}</td>
            <td className="py-3 px-2">{item.doctor_name}</td>
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
                    <Col xl={6} className="mt-4 mt-xl-0">
                        <h5 className="mb-3">Today Payment Report</h5>
                        <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                            <Table className="custom-table border">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reportData?.map((patient) => (
                                        <tr key={patient.ipd_id}>
                                            <td >
                                                <div className="d-flex align-items-center">
                                                    <img
                                                        src={
                                                            patient.patient_image
                                                                ? `${process.env.REACT_APP_API_URL}/${patient.patient_image}`
                                                                : vijay
                                                        }
                                                        alt={patient?.patient_name}
                                                        style={{
                                                            width: "40px",
                                                            height: "40px",
                                                            borderRadius: "50%",
                                                            objectFit: "cover",
                                                        }}
                                                    />
                                                    <div className="d-flex flex-column ms-2" style={{ height: "40px" }}>
                                                        <p style={nameStyle}>{patient.patient_name}</p>
                                                        <p style={{ marginTop: "-20px", color: "#475467", fontSize: "14px" }}>
                                                            UH_ID: {patient.uh_id}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td >
                                                <span className="py-1 px-3 fw-semibold rounded-5">
                                                    ₹{patient.amount}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </Col>

                    <Col xl={6} className="mt-4 mt-xl-0">
                        <h5 className="mb-3">Admitted Patients</h5>
                        <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                            <Table className="custom-table border">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Doctor Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {todaysAppintments?.map((patient) => (
                                        <tr key={patient.Patient_Id}>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <img
                                                        src={patient.Photo ? `${process.env.REACT_APP_API_URL}/${patient.Photo}` : vijay}
                                                        alt={patient.name}
                                                        style={{
                                                            width: "40px",
                                                            height: "40px",
                                                            borderRadius: "50%",
                                                            objectFit: "cover",
                                                        }}
                                                    />
                                                    <div className="d-flex flex-column ms-2">
                                                        <span className="fw-semibold">{patient.Name}</span>
                                                        <span style={{ marginTop: "-4px", color: "#475467", fontSize: "14px" }}>
                                                            Disease: {patient.Disease}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="fw-semibold align-middle">{patient.doctor_name}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>

                <div className="mt-4 pb-4">
                    <div>
                        <CommonTable minimumWidth={"800px"} headers={columns} bodyData={discharge} renderRow={renderRow} title={"Discharge Patient"} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AccountantDashboard;