// import React, { useEffect, useState } from "react";
// import BarGraph from "../commonfeature/Graphs/barGraph";
// import ThreeLayeredChart from "../commonfeature/Graphs/circleGraph";
// import CommonTable from "../../components/table/CommonTable";
// import NewCommonPagination from "../../components/pagination/NewCommonPagination";
// import { useSelector } from "react-redux";
// import axios from "axios";

// function HospitalDashboard() {
//     const [screenWidth, setScreenWidth] = useState(window.innerWidth);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [limitPerPage, setLimitPerPage] = useState(5);
//     const [patient,setPatient]=useState([])
//     const [totalRecords,setTotalRecord]=useState();


//     const token = useSelector((state) => state.auth.currentUserToken);

//     const config = {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     };


//     useEffect(() => {
//         const handleResize = () => {
//             setScreenWidth(window.innerWidth);
//         };

//         window.addEventListener('resize', handleResize);

//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);

//     const dataForBargraph = {

//         labels: ["January", "February", "March", "April", "May"], // Months
//         datasets: [
//             {
//                 label: "Active Doctors",
//                 data: [100, 400, 600, 800, 1000], // Active doctor counts
//                 backgroundColor: "#1D949A", // Bar color
//                 borderColor: "#1D949A", // Border color
//                 barPercentage: 1.0, // Maximize bar width relative to category
//                 categoryPercentage: 1.0, // Remove extra category spacing
//                 maxBarThickness: 40, // Limit the maximum thickness of each bar
//                 borderRadius: {
//                     topLeft: 5,
//                     topRight: 5,
//                     bottomLeft: 0,
//                     bottomRight: 0,
//                 },
//             },
//         ],

//     };



//     const columns = [
//         // { name: "", accessor: "checkbox", class: "w-auto" },
//         { name: "Patients Name", accessor: "patientName", class: "py-3 w-50 px-5 text-left" },
//         { name: "UH ID", accessor: "uhId", class: "text-center px-1" },
//         { name: "Age", accessor: "age", class: "py-3 text-center px-1" },
//         { name: "Sex", accessor: "sex", class: "py-3 text-center px-1" },
//         // { name: "Price", accessor: "price", class: "py-3 text-center px-1", },
//     ];




//     const fetchPatients = async () => {
//         try {
//             const respose = await axios.get(`${process.env.REACT_APP_API_URL}/patient/getAll?page=${currentPage}&limit=${limitPerPage}`, config);
//             setPatient(respose?.data?.data?.data)

//         } catch (error) {

//         }
//     }


//     useEffect(() => {
//         fetchPatients()
//     }, [])

//     const renderRow = (item, index) => (
//         <tr key={item.id} className="border-bottom text-center">
//             <td className="px-2 text-start lh-1">
//                 <div className="d-flex align-items-center">
      
//                     <img
//                         src={`${process.env.REACT_APP_API_URL}/${item.Photo}`}
//                         alt={item.Name}
//                         style={{
//                             width: "40px",
//                             height: "40px",
//                             borderRadius: "50%",
//                             objectFit: "cover",
//                         }}
//                         className="ms-3"
//                     />
//                     <div className="d-flex flex-column ms-2" style={{ height: "40px" ,alignItems:"center"}}>
//                         <p className="fw-semibold pt-2">{item.Name}</p>
//                         {/* <p style={{ marginTop: "-10px", "color": "#475467", fontSize: "14px" }}>Appointment for {item.appointmentFor}</p> */}
//                     </div>
//                 </div>
//             </td>
//             <td className="py-3 px-2">{item.uh_id}</td>
//             <td className="py-3 px-2">{item.patient_age}</td>
//             <td className="py-3 px-2">{item.patient_sex}</td>
//         </tr>
//     );

//     return (
//         <>
//             {/* <div className="line-graph-container mx-4 m-3">
//                 <GraphSlider slides={lineGraphs} heading={"Billing Overview"} />
//             </div> */}
//             <div className="graph-container d-flex flex-md-row flex-column gap-3 p-4 m-0 mt-2 justify-content-center align-items-center">
//                 <div style={{
//                     // maxWidth: "550px",
//                     width: screenWidth > 768 ? "60%" : "100%",
//                     height: "100%",
//                     border: "1px solid #F2F4F7",
//                     borderRadius: "10px",
//                     "box-shadow": "0px 1px 2px 0px #1018280F",
//                     "box-shadow": "0px 1px 3px 0px #1018281A",
//                 }}
//                     className="overflow-auto border px-3 py-2">
//                     <div style={{ minWidth: "400px" }}>
//                         <BarGraph data={dataForBargraph} />
//                     </div>
//                 </div>
//                 <div style={{
//                     // maxWidth: "400px", 
//                     width: screenWidth > 768 ? "40%" : "100%",
//                     height: "100%", border: "1px solid #F2F4F7",
//                     borderRadius: "10px",
//                     "box-shadow": "0px 1px 2px 0px #1018280F",
//                     "box-shadow": "0px 1px 3px 0px #1018281A",
//                 }} className="border h-100 p-2 py-4 overflow-auto">
//                     <div style={{ minWidth: "250px" }}>
//                         <ThreeLayeredChart />
//                     </div>
//                 </div>
//             </div >
//             <div className="mx-lg-4 m-3 pb-4">
//                 <div>
//                     <CommonTable minimumWidth={"700px"} headers={columns} bodyData={patient} renderRow={renderRow} title={"Patients List"} />
//                 </div>
//                 {
//                     patient.length > 0 &&
//                     <NewCommonPagination currentPage={currentPage} limitPerPage={limitPerPage} totalRecords={totalRecords} setCurrentPage={setCurrentPage} />
//                 }
//             </div>
//         </>
//     )
// }

// export default HospitalDashboard;





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
    const [loading, setLoading] = useState(false);

    const token = useSelector((state) => state.auth.currentUserToken);

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

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
        labels: ["January", "February", "March", "April", "May"],
        datasets: [
            {
                label: "Active Doctors",
                data: [100, 400, 600, 800, 1000],
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
        { name: "Patients Name", accessor: "patientName", class: "py-3 w-50 px-5 text-left" },
        { name: "UH ID", accessor: "uhId", class: "text-center px-1" },
        { name: "Age", accessor: "age", class: "py-3 text-center px-1" },
        { name: "Sex", accessor: "sex", class: "py-3 text-center px-1" },
    ];

    const fetchPatients = async (page = currentPage, limit = limitPerPage) => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/patient/getAll?page=${page}&limit=${limit}`,
                config
            );
            setPatient(response?.data?.data?.data || []);




            console.log("pagination",response?.data?.data?.pagination)
            setTotalRecords(response?.data?.data?.pagination?.TotalRecords || 0);
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
                        src={`${process.env.REACT_APP_API_URL}/${item.Photo}`}
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
                        <p className="fw-semibold pt-2">{item.Name}</p>
                    </div>
                </div>
            </td>
            <td className="py-3 px-2">{item.uh_id}</td>
            <td className="py-3 px-2">{item.patient_age}</td>
            <td className="py-3 px-2">{item.patient_sex}</td>
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
                        title={"Patients List"}
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