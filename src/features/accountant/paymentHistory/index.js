// import { useEffect, useState } from "react";
// import axios from "axios";
// import CommonTable from "../../../components/table/CommonTable";
// import NewCommonPagination from "../../../components/pagination/NewCommonPagination";
// import { MdAssignment } from "react-icons/md";
// import { useSelector } from "react-redux";
// import SelectBox from "../../../components/common/form/selectBox/SelectBox";

// function PaymentHistory() {
//     const [payments, setPayments] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalRecords, setTotalRecords] = useState(0);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [patients, setPatients] = useState([]);
//     const limitPerPage = 5;
//     const token = useSelector((state) => state.auth.currentUserToken);
//     const config = {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     };

//     const fetchPayments = async () => {
//         try {
//             const params = new URLSearchParams({
//                 page: currentPage,
//                 limit: limitPerPage,
//                 ...(searchQuery && { patient_id: searchQuery }),
//             }).toString();

//             const response = await axios.get(
//                 `${process.env.REACT_APP_API_URL}/accountant/paymenthistory?${params}`,
//                 config
//             );

//             const data = response?.data?.data[0] || [];
//             const total = response?.data?.data[1][0]?.total_record || 0;
//             setPayments(data);
//             setTotalRecords(total);
//         } catch (err) {
//             console.log("Error fetching payment history => ", err);
//         }
//     };

//     // Fetch patients
//     async function getPatients() {
//         try {
//             const response = await axios.get(
//                 `${process.env.REACT_APP_API_URL}/patient/getAll`,
//                 config
//             );
//             setPatients(response?.data?.data?.data || []);
//         } catch (err) {
//             console.log("Error fetching patients:", err);
//         }
//     }

//     useEffect(() => {
//         getPatients();
//     }, []);

//     // Trigger fetchPayments when currentPage or searchQuery changes
//     useEffect(() => {
//         fetchPayments();
//     }, [currentPage, searchQuery]);

//     const handleInputChange = (value) => {
//         setSearchQuery(value);
//         setCurrentPage(1); // Reset to first page on search
//     };

//     const columns = [
//         { name: "Patient Name", accessor: "patient_name", class: "py-3 px-4 text-left" },
//         { name: "Receipt Number", accessor: "receipt_number", class: "text-center px-1" },
//         { name: "Bill Amount", accessor: "bill_total_amount", class: "text-center px-1" },
//         { name: "Payment Method", accessor: "payment_method", class: "text-center px-1" },
//         { name: "Bill Date", accessor: "bill_date", class: "text-center px-1" },
//         { name: "Bill Report", accessor: "bill_report", class: "text-center px-1" },
//     ];

//     const renderRow = (item, index) => {
//         return (
//             <tr key={item.ipd_bill_id || index} className="border-bottom text-center">
//                 <td className="px-2 text-start">
//                     <div className="d-flex align-items-center">
//                         <img
//                             src={item.patient_image ? `${process.env.REACT_APP_API_URL}/${item.patient_image}` : ""}
//                             alt={item.patient_name}
//                             style={{
//                                 width: "40px",
//                                 height: "40px",
//                                 borderRadius: "50%",
//                                 objectFit: "cover",
//                             }}
//                             className="me-2"
//                         />
//                         <span>{item.patient_name}</span>
//                     </div>
//                 </td>
//                 <td className="py-3 px-2">{item.uh_id}</td>
//                 <td className="py-3 px-2">{item.bill_total_amount}</td>
//                 <td className="py-3 px-2">{item.payment_method}</td>
//                 <td className="py-3 px-2">
//                     {item.bill_date
//                         ? new Date(item.bill_date * 1000).toLocaleDateString()
//                         : "-"}
//                 </td>
//                 <td className="py-3 px-2">
//                     {item.bill_report ? (
//                         <MdAssignment
//                             style={{ width: "25px", height: "25px", cursor: "pointer" }}
//                             onClick={() =>
//                                 window.open(
//                                     `${process.env.REACT_APP_API_URL}/Uploads/${item.bill_report}`,
//                                     "_blank",
//                                     "noopener,noreferrer"
//                                 )
//                             }
//                         />
//                     ) : (
//                         <MdAssignment
//                             style={{ width: "25px", height: "25px", opacity: 0.5 }}
//                         />
//                     )}
//                 </td>
//             </tr>
//         );
//     };

//     return (
//         <div className="px-3">
//             <div className="fw-bold py-4 fs-4">
//                 <span>Payment History</span>
//             </div>

//             <div className="mb-4">
//                 <SelectBox
//                     name="patientId"
//                     defaultValue="Select Patient"
//                     options={patients?.map((patient) => ({
//                         label: patient.Name,
//                         option: patient.uh_id,
//                     }))}
//                     onChange={(e) => handleInputChange(e.target.value)} // Simplified onChange
//                 />
//             </div>

//             <div>
//                 <CommonTable
//                     minimumWidth={"700px"}
//                     headers={columns}
//                     bodyData={payments}
//                     renderRow={renderRow}
//                     title={"Payment History"}
//                 />
//             </div>

//             <div className="mt-4">
//                 <NewCommonPagination
//                     currentPage={currentPage}
//                     setCurrentPage={setCurrentPage}
//                     limitPerPage={limitPerPage}
//                     totalRecords={totalRecords}
//                 />
//             </div>
//         </div>
//     );
// }

// export default PaymentHistory;
import { useEffect, useState } from "react";
import axios from "axios";
import CommonTable from "../../../components/table/CommonTable";
import NewCommonPagination from "../../../components/pagination/NewCommonPagination";
import { MdAssignment } from "react-icons/md";
import { useSelector } from "react-redux";
import SelectBox from "../../../components/common/form/selectBox/SelectBox";

function PaymentHistory() {
    const [payments, setPayments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [searchQuery, setSearchQuery] = useState(""); // Initialize as empty string
    const [patients, setPatients] = useState([]);
    const limitPerPage = 5;
    const token = useSelector((state) => state.auth.currentUserToken);
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const fetchPayments = async () => {
        try {
            const params = new URLSearchParams({
                page: currentPage,
                limit: limitPerPage,
                ...(searchQuery && { patient_id: searchQuery }), // Only add patient_id if searchQuery exists
            }).toString();

            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/accountant/paymenthistory?${params}`,
                config
            );

            const data = response?.data?.data[0] || [];
            const total = response?.data?.data[1][0]?.total_record || 0;
            setPayments(data);
            setTotalRecords(total);
        } catch (err) {
            console.log("Error fetching payment history => ", err);
        }
    };

    // Fetch patients
    async function getPatients() {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/patient/getAll`,
                config
            );
            setPatients(response?.data?.data?.data || []);
        } catch (err) {
            console.log("Error fetching patients:", err);
        }
    }

    useEffect(() => {
        getPatients();
    }, []);

    // Trigger fetchPayments when currentPage or searchQuery changes
    useEffect(() => {
        fetchPayments();
    }, [currentPage, searchQuery]);

    const handleInputChange = (value) => {
        setSearchQuery(value || ""); // Set to empty string if value is falsy (e.g., "All Patients")
        setCurrentPage(1); // Reset to first page on search change
    };

    const columns = [
        { name: "Patient Name", accessor: "patient_name", class: "py-3 px-4 text-left" },
        { name: "Receipt Number", accessor: "receipt_number", class: "text-center px-1" },
        { name: "Bill Amount", accessor: "bill_total_amount", class: "text-center px-1" },
        { name: "Payment Method", accessor: "payment_method", class: "text-center px-1" },
        { name: "Bill Date", accessor: "bill_date", class: "text-center px-1" },
        { name: "Bill Report", accessor: "bill_report", class: "text-center px-1" },
    ];

    const renderRow = (item, index) => {
        return (
            <tr key={item.ipd_bill_id || index} className="border-bottom text-center">
                <td className="px-2 text-start">
                    <div className="d-flex align-items-center">
                        <img
                            src={item.patient_image ? `${process.env.REACT_APP_API_URL}/${item.patient_image}` : ""}
                            alt={item.patient_name}
                            style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                objectFit: "cover",
                            }}
                            className="me-2"
                        />
                        <span>{item.patient_name}</span>
                    </div>
                </td>
                <td className="py-3 px-2">{item.uh_id}</td>
                <td className="py-3 px-2">{item.bill_total_amount}</td>
                <td className="py-3 px-2">{item.payment_method}</td>
                <td className="py-3 px-2">
                    {item.bill_date
                        ? new Date(item.bill_date * 1000).toLocaleDateString()
                        : "-"}
                </td>
                <td className="py-3 px-2">
                    {item.bill_report ? (
                        <MdAssignment
                            style={{ width: "25px", height: "25px", cursor: "pointer" }}
                            onClick={() =>
                                window.open(
                                    `${process.env.REACT_APP_API_URL}/Uploads/${item.bill_report}`,
                                    "_blank",
                                    "noopener,noreferrer"
                                )
                            }
                        />
                    ) : (
                        <MdAssignment
                            style={{ width: "25px", height: "25px", opacity: 0.5 }}
                        />
                    )}
                </td>
            </tr>
        );
    };

    return (
        <div className="px-3">
            <div className="fw-bold py-4 fs-4">
                <span>Payment History</span>
            </div>

            <div className="mb-4">
                <SelectBox
                    name="patientId"
                    defaultValue="Select Patient"
                    options={[
                        { label: "All Patients", option: "" }, // Add "All Patients" option
                        ...patients?.map((patient) => ({
                            label: patient.Name,
                            option: patient.uh_id,
                        })),
                    ]}
                    onChange={(e) => handleInputChange(e.target.value)}
                />
            </div>

            <div>
                <CommonTable
                    minimumWidth={"700px"}
                    headers={columns}
                    bodyData={payments}
                    renderRow={renderRow}
                    title={"Payment History"}
                />
            </div>

            <div className="mt-4">
                <NewCommonPagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    limitPerPage={limitPerPage}
                    totalRecords={totalRecords}
                />
            </div>
        </div>
    );
}

export default PaymentHistory;