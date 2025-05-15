import React, { useEffect, useState } from "react";
import BarGraph from "../commonfeature/Graphs/barGraph";
import ThreeLayeredChart from "../commonfeature/Graphs/circleGraph";
import CommonTable from "../../components/table/CommonTable";
import NewCommonPagination from "../../components/pagination/NewCommonPagination";
import { useSelector } from "react-redux";
import axios from "axios";

function HospitalDashboard() {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [currentPage, setCurrentPage] = useState(1);
    const [limitPerPage, setLimitPerPage] = useState(5);
    const [patient, setPatient] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [adminCount, setAdmincount] = useState(0)
    console.log(adminCount)
    const [loading, setLoading] = useState(false);
    const token = useSelector((state) => state.auth.currentUserToken);
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const fetchadmincount = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/patient/get_appointment_count_admin`, config)
            setAdmincount(response?.data?.data);
        } catch (err) {
            console.log("Error fetching appointments => ", err)
        }
    }

     useEffect(() => {
         fetchadmincount()
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
        labels: adminCount?.month,
        datasets: [
            {
                label: "Total Patients",
                data: adminCount?.count,
                backgroundColor: "#1D949A",
                borderColor: "#1D949A",
                barPercentage: 1.0,
                categoryPercentage: 1.0,
                maxBarThickness: 40,
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
        { name: "Name", accessor: "name", class: "py-3  px-5 text-left" },
        { name: "Email", accessor: "uhId", class: "text-center px-1" },
        { name: "Role", accessor: "sex", class: "py-3 text-center px-1" },
    ];

    const fetchPatients = async (page = currentPage, limit = limitPerPage) => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/department/getallstaff?page=${page}&limit=${limit}`,
                config
            );
            setPatient(response?.data?.data[0] || []);
            const pages = response?.data?.data[1]
            const setTotal = pages.map((item) => item.total_records).toString()
            setTotalRecords(setTotal || 0);

        } catch (error) {
            console.error("Error fetching patients:", error);
            setPatient([]);
            setTotalRecords(0);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPatients();
    }, [currentPage, limitPerPage]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleLimitChange = (newLimit) => {
        setLimitPerPage(newLimit);
        setCurrentPage(1); // Reset to first page when changing limit
    };

    const renderRow = (item, index) => (
        <tr key={item.id} className="border-bottom text-center">
            <td className="px-2 text-start lh-1">
                <div className="d-flex align-items-center">
                    <img
                        src={`${process.env.REACT_APP_API_URL}/${item.user_photo}`}
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
                        <p className="fw-semibold pt-2">{item.user_name}</p>
                    </div>
                </div>
            </td>
            <td className="py-3 px-2">{item.user_email}</td>
            <td className="py-3 px-2">{item.role_name}</td>
        </tr>
    );

    return (
        <>
            <div className="graph-container d-flex flex-md-row flex-column gap-3 p-4 m-0 mt-2 justify-content-center align-items-center">
                <div style={{
                    width: screenWidth > 768 ? "60%" : "100%",
                    height: "100%",
                    border: "1px solid #F2F4F7",
                    borderRadius: "10px",
                    boxShadow: "0px 1px 2px 0px #1018280F, 0px 1px 3px 0px #1018281A",
                }}
                    className="overflow-auto border px-3 py-2">
                    <div style={{ minWidth: "400px" }}>
                        <BarGraph data={dataForBargraph} />
                    </div>
                </div>
                <div style={{
                    width: screenWidth > 768 ? "40%" : "100%",
                    height: "100%",
                    border: "1px solid #F2F4F7",
                    borderRadius: "10px",
                    boxShadow: "0px 1px 2px 0px #1018280F, 0px 1px 3px 0px #1018281A",
                }} className="border h-100 p-2 py-4 overflow-auto">
                    <div style={{ minWidth: "250px" }}>
                        <ThreeLayeredChart />
                    </div>
                </div>
            </div>
            <div className="mx-lg-4 m-3 pb-4">
                <div>
                    <CommonTable
                        minimumWidth={"700px"}
                        headers={columns}
                        bodyData={patient}
                        renderRow={renderRow}
                        title={"Staff List"}
                        loading={loading}
                    />
                </div>
                {totalRecords > 0 && (
                    <NewCommonPagination
                        currentPage={currentPage}
                        limitPerPage={limitPerPage}
                        totalRecords={totalRecords}

                        setCurrentPage={setCurrentPage}
                    />
                )}
            </div>
        </>
    )
}

export default HospitalDashboard;