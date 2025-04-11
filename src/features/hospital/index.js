import React, { useEffect, useState } from "react";
import { Table, Pagination, Row, Col } from "react-bootstrap";
import { FaArrowDown } from "react-icons/fa";
import vijay from "../../assets/images/avatars/vijay.jpg";
import BarGraph from "../commonfeature/Graphs/barGraph";
import ThreeLayeredChart from "../commonfeature/Graphs/circleGraph";
import GraphSlider from "../../components/common/GraphSlider";
import CommonTable from "../../components/table/CommonTable";
import NewCommonPagination from "../../components/pagination/NewCommonPagination";

function HospitalDashboard() {

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const [currentPage, setCurrentPage] = useState(1);
    const [limitPerPage, setLimitPerPage] = useState(10);
    const totalRecords = 200;

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
    const patients = [
        {
            patientName: "John Doe",
            appointmentFor: "Consultation",
            uhId: "UH12345",
            sex: "Male",
            age: 35,
            price: 6000,
        },
        {
            patientName: "Jane Smith",
            appointmentFor: "Checkup",
            uhId: "UH67890",
            sex: "Female",
            age: 29,
            price: 4000,
        },
    ];

    const lineChartData = {
        labels: [
            "04 PM", "05 PM", "06 PM ", "07 PM",
            "08 PM", "09 PM"
        ],
        datasets: [
            {
                label: "Amount", // Label for the line
                data: [
                    100, 400, 350, 300, 250, 500
                ], // Hourly data points
                borderColor: "rgba(75, 192, 192, 1)", // Line color
                backgroundColor: "rgba(75, 192, 192, 0.2)", // Area under the line
                pointBackgroundColor: "rgba(75, 192, 192, 1)", // Points color
                pointBorderColor: "#fff", // Border around points
                tension: 0.5, // Smoothness of the line
            },
        ],
    };

    // const lineGraphs = [
    //     { id: 1, component: <LineGraph data={lineChartData} heading="Hospital Billings" /> },
    //     { id: 2, component: <LineGraph data={lineChartData} heading="Doctor Billings" /> },
    //     { id: 3, component: <LineGraph data={lineChartData} heading="Lab Billings" /> },
    // ];

    const columns = [
        // { name: "", accessor: "checkbox", class: "w-auto" },
        { name: "Patients Name", accessor: "patientName", class: "py-3 w-50 px-5 text-left" },
        { name: "UH ID", accessor: "uhId", class: "text-center px-1" },
        { name: "Age", accessor: "age", class: "py-3 text-center px-1" },
        { name: "Sex", accessor: "sex", class: "py-3 text-center px-1" },
        { name: "Price", accessor: "price", class: "py-3 text-center px-1", },
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
                        <p style={{ marginTop: "-10px", "color": "#475467", fontSize: "14px" }}>Appointment for {item.appointmentFor}</p>
                    </div>
                </div>
            </td>
            <td className="py-3 px-2">{item.uhId}</td>
            <td className="py-3 px-2">{item.age}</td>
            <td className="py-3 px-2">{item.sex}</td>
            <td className="py-3 px-2">{item.price}</td>
        </tr>
    );

    return (
        <>
            {/* <div className="line-graph-container mx-4 m-3">
                <GraphSlider slides={lineGraphs} heading={"Billing Overview"} />
            </div> */}
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
                    <CommonTable minimumWidth={"700px"} headers={columns} bodyData={patients} renderRow={renderRow} title={"Patients List"} />
                </div>
                {
                    patients.length > 0 &&
                    <NewCommonPagination currentPage={currentPage} limitPerPage={limitPerPage} totalRecords={totalRecords} setCurrentPage={setCurrentPage} />
                }
            </div>
        </>
    )
}

export default HospitalDashboard;