import BarGraph from "../../features/commonfeature/Graphs/barGraph";
import ThreeLayeredChart from "../../features/commonfeature/Graphs/circleGraph";
import React, { useEffect, useState } from "react";
import { Table, Pagination } from "react-bootstrap";
import { FaArrowDown } from "react-icons/fa";
import vijay from "../../assets/images/avatars/vijay.jpg";
import CommonTable from "../../components/table/CommonTable";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Nurse() {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const params = useParams();
    const token = useSelector((state) => state.auth.currentUserToken);
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const [ipdPatients, setIpdPatients] = useState([]);
    const [opdPatients, setOpdPatients] = useState([]);


    async function getPatientsData() {
        try {
            const opdResponse = await axios.get(`${process.env.REACT_APP_API_URL}/lab/getopdappointment`, config);
            setOpdPatients(opdResponse?.data?.data[0] || []);

            const ipdResponse = await axios.get(`${process.env.REACT_APP_API_URL}/lab/getipdappointment`, config);
            setIpdPatients(ipdResponse?.data?.data[0] || []);
        } catch (error) {
            console.error("Error fetching lab test data:", error);
        }
    }

    useEffect(() => {
        getPatientsData();
    }, [])

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

    const columns = [
        { name: "Patients Name", accessor: "patientName", class: "py-3 w-35 text-left px-1" },
        { name: "Test Name", accessor: "testName", class: "text-center px-1" },
        { name: "Doctor", accessor: "consultantDoctor", class: "text-center px-1" },
    ];

    const currentOpdPatients = opdPatients
    const currentIpdPatients = ipdPatients;

    const renderRow = (item, index) => (
        <tr key={item.patientId || index} className="border-bottom text-center">
            <td className="py-3 px-2 text-start">

                <div className="d-flex align-items-center">
                    <img
                        src={`${process.env.REACT_APP_API_URL}/${item.patient_image}`}
                        alt={item.Name}
                        style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            objectFit: "cover",
                        }}
                        className="ms-3"
                    />
                    <div className="d-flex flex-column ms-2" style={{ height: "40px", alignItems: "center" }}>
                        <p className="fw-semibold  pt-2">{item.patient_name}</p>
                    </div>
                </div>

            </td>
            <td className="py-3 px-2">{item.testName || item.test_name}</td>
            <td className="py-3 px-2">{item.DoctorName || item.Doctor_name}</td>
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

            <div className="d-flex">
                <div className="mx-lg-4 m-3 pb-4" style={{ overflowY: "auto" , maxHeight:'250px', overflowX:'auto'}}>
                    <CommonTable
                        minimumWidth={"400px"}
                        headers={columns}
                        bodyData={currentIpdPatients}
                        renderRow={renderRow}
                        title={"IPD Tests"}
                    />
                </div>
                <div className="mx-lg-4 m-3 pb-4" style={{ overflowY: "auto", maxHeight: '300px', overflowX: 'auto' }}>
                    <CommonTable
                        minimumWidth={"400px"}
                        headers={columns}
                        bodyData={currentOpdPatients}
                        renderRow={renderRow}
                        title={"OPD Tests"}
                    />
                </div>
            </div>
        </>
    )
}

export default Nurse;