import BarGraph from "../../features/commonfeature/Graphs/barGraph";
import ThreeLayeredChart from "../../features/commonfeature/Graphs/circleGraph";
import React, { useEffect, useState } from "react";
import { Table, Pagination } from "react-bootstrap";
import { FaArrowDown } from "react-icons/fa";
import vijay from "../../assets/images/avatars/vijay.jpg";
import CommonTable from "../../components/table/CommonTable";

function Nurse() {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

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
            uhId: "UH12345",
            patientSex: "Male",
            patientAge: 35,
            testName: "Hypertension",
            price: 6000,
            consultantDoctor: "Dr. Smith",
        },
        {
            patientName: "Jane Smith",
            uhId: "UH67890",
            patientSex: "Female",
            patientAge: 29,
            testName: "Diabetes",
            price: 4000,
            consultantDoctor: "Dr. Brown",
        },
    ];

    // Calculate pagination data
    const totalItems = patients.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPatients = patients.slice(startIndex, endIndex);
    const handlePageChange = (page) => setCurrentPage(page);

    const columns = [
        { name: "Patients Name", accessor: "patientName", class: "py-3 w-25 text-left px-2" },
        { name: "Test Name", accessor: "testName", class: "text-center px-1" },
        { name: "Age", accessor: "patientAge", class: "text-center px-1" },
        { name: "Sex", accessor: "patientSex", class: "text-center px-1" },
        { name: "Consultant Doctor", accessor: "consultantDoctor", class: "text-center px-1" },
        { name: "Price", accessor: "price", class: "text-center px-1" },
    ];

    const renderRow = (item, index) => (
        <tr key={item.patientId} className="border-bottom text-center">
            <td className="py-3 px-2 text-start">{item.patientName}</td>
            <td className="py-3 px-2">{item.testName}</td>
            <td className="py-3 px-2">{item.patientAge}</td>
            <td className="py-3 px-2">{item.patientSex}</td>
            <td className="py-3 px-2">{item.consultantDoctor}</td>
            <td className="py-3 px-2">{item.price}</td>
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
                <CommonTable minimumWidth={"700px"} headers={columns} bodyData={patients} renderRow={renderRow} title={"Patients List"} />
            </div>
        </>
    )
}

export default Nurse;