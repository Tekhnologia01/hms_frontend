import React, { useEffect, useState } from "react";
import { Table, Pagination, Row, Col } from "react-bootstrap";
import { FaArrowDown } from "react-icons/fa";
import vijay from "../../assets/images/avatars/vijay.jpg";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import ThreeLayeredChart from "../commonfeature/Graphs/circleGraph";
import BarGraph from "../commonfeature/Graphs/barGraph";
import AppointmentSlider from "../commonfeature/AppointmentSlider";
import CommonTable from "../../components/table/CommonTable";
import NewCommonPagination from "../../components/pagination/NewCommonPagination";
import { addYears } from "date-fns";
import axios from "axios";

function ReceptionDashboard() {
    const [currentPage, setCurrentPage] = useState(1);
    const [limitPerPage, setLimitPerPage] = useState(1);
    const[patients,setPatients] =useState([])
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [doctorsData,setDoctorsData]=useState([])
    const [totalPages,setTotalPages]=useState()
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
    // const patients = [
    //     {
    //         patientName: "John Doe",
    //         uhId: "UH12345",
    //         sex: "Male",
    //         appointmentFor: "Consultation",
    //         age: 35,
    //         status: "Schedule",
    //         price: 6000,
    //     },
    //     {
    //         patientName: "Jane Smith",
    //         uhId: "UH67890",
    //         sex: "Female",
    //         appointmentFor: "Checkup",
    //         age: 29,
    //         status: "Pending",
    //         price: 4000,
    //     },
    // ];







    const fetchPatient=async()=>{
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/patient/get_opd?page=${currentPage}&limit=${limitPerPage}`);
            setPatients(response?.data?.data);
            setTotalPages(response?.data?.data?.pagination?.TotalPages);
          } catch (err) {
            console.log("Error fetching departments:", err);
          }
    }



    const fetchDoctor=async()=>{
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/doctor/getDoctorsWithTodayAppointment?appo_date=2025-04-08`);
            console.log("appooijofdng => ", response?.data?.data);
            setDoctorsData(response?.data?.data);
            setTotalPages(response?.data?.data?.pagination?.TotalPages);
          } catch (err) {
            console.log("Error fetching departments:", err);
          }
    }


   


    useEffect(()=>{
        fetchPatient();
        fetchDoctor();
    },[])




    


    const upcomingAppointment = [
        {
            id: 1,
            doctorName: "Doctor Name",
            image: vijay,
            speciality: "Nuerosurgen",
            scheduleDate: "Date",
            appointmentTime: "Time",
            onCancelAppointment: () => console.log("Cancel Appointment clicked"),
            onReschedule: () => console.log("Reschedule Appoinement clicked")
        },
        {
            id: 2,
            doctorName: "Doctor Name",
            image: vijay,
            speciality: "Homeopathe",
            scheduleDate: "Date",
            appointmentTime: "Time",
            onCancelAppointment: () => console.log("Cancel Appointment clicked"),
            onReschedule: () => console.log("Reschedule Appoinement clicked")
        },
        {
            id: 3,
            doctorName: "Doctor Name",
            image: vijay,
            speciality: "Nuerosurgen",
            scheduleDate: "Date",
            appointmentTime: "Time",
            onCancelAppointment: () => console.log("Cancel Appointment clicked"),
            onReschedule: () => console.log("Reschedule Appoinement clicked")
        },
        {
            id: 4,
            doctorName: "Doctor Name",
            image: vijay,
            speciality: "Cancer",
            scheduleDate: "Date",
            appointmentTime: "Time",
            onCancelAppointment: () => console.log("Cancel Appointment clicked"),
            onReschedule: () => console.log("Reschedule Appoinement clicked")
        },
    ]

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
        { name: "Patient Name", accessor: "patientName", class: "py-3 px-5 text-left", width: "350px" },
        { name: "UH ID", accessor: "uhId", class: "text-center px-1" },
        { name: "Age", accessor: "age", class: "py-3 text-center px-1" },
        { name: "Sex", accessor: "sex", class: "py-3 text-center px-1" },
        { name: "Status", accessor: "status", class: "py-3 text-center px-1", width: "140px" },
        // { name: "Price", accessor: "price", class: "py-3 text-center px-1", },
        // { name: "Action", accessor: "action", class: "py-3 text-center px-1" }
    ];

    const renderRow = (item, index) => (
        <tr key={item.id} className="border-bottom text-center">
            <td className="px-2 text-start lh-1">
                <div className="d-flex align-items-center">
                    {/* <div className="ps-2">
                        <input
                            type="checkbox"
                            style={{ transform: "scale(1.5)", cursor: "pointer" }}
                        />
                    </div> */}
                    <img
                        src={`${process.env.REACT_APP_API_URL}/${item?.patient_image}`}
                        alt={item.patientName}
                        style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            objectFit: "cover",
                        }}
                        className="ms-3"
                    />
                    <div className="d-flex flex-column ms-2" style={{ height: "40px" }}>
                        <p className="fw-semibold">{item.patientName}</p>
                        <p style={{ marginTop: "-10px", "color": "#475467", fontSize: "14px" }}>Appointment for {item.user_name}</p>
                    </div>
                </div>
            </td>
            <td className="py-3 px-2">{item.uh_id}</td>
            <td className="py-3 px-2">{item.patient_age}</td>
            <td className="py-3 px-2">{item.patient_sex}</td>
            <td><span className="py-1 px-3 fw-semibold rounded-5"
                style={
                    item.status === "appo_status"
                        ? pendingStyle
                        : item.status === "Canceled"
                            ? declinedStyle
                            : confirmedStyle
                }
            >
                &#x2022; {item.appo_status}
            </span></td>
            {/* <td className="py-3 px-2">{item.price}</td> */}
            {/* <td>
                <FiEdit2 style={{ height: "23px", width: "23px" }} />
                <span className="ps-3"></span>
                <RiDeleteBinLine style={{ height: "25px", width: "25px" }} />
            </td> */}
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
            <div className="mx-lg-4 m-3 pb-4">
                <div>
                    <CommonTable minimumWidth={"900px"} headers={columns} bodyData={patients.data} renderRow={renderRow} title={"Patients List"} />
                </div>
                {
                    totalPages > 1 &&
                    <NewCommonPagination currentPage={currentPage} limitPerPage={limitPerPage} totalRecords={patients?.pagination?.TotalRecords} setCurrentPage={setCurrentPage} />
                }
            </div>
            <div className="mx-lg-4 m-3 pb-4">
                <AppointmentSlider heading={"Upcoming Appointments"} slides={doctorsData} />
            </div>
        </>
    )
}

export default ReceptionDashboard;