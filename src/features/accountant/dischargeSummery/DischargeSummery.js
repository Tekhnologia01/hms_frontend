import { useEffect, useState } from "react";
import vijay from "../../../assets/images/avatars/vijay1.jpg";
import axios from "axios";
import CommonTable from "../../../components/common/table/CommonTable";
import { MdAssignment } from "react-icons/md";
import { Form, OverlayTrigger } from "react-bootstrap";
import ViewDischargeSheet from "../../dischargePatient/ViewDischargeSheet";
import { Tooltip } from 'react-bootstrap';
import { useSelector } from "react-redux";
import { CiReceipt } from "react-icons/ci";
function DischargeSummery() {
    const [doctors, setDoctors] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showDischargeSheet, setShowDischargeSheet] = useState(false);
    const [ipdid, setIpdId] = useState()
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
    const token = useSelector((state) => state.auth.currentUserToken);
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    // Function to fetch discharged patients based on selected date
    const fetchDoctors = async () => {
        try {
            // Convert selected date to Unix timestamp (seconds)
            const dateTimestamp = Math.floor(new Date(selectedDate).getTime() / 1000);
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/accountant/todaydischarge?date=${dateTimestamp}`, config);

            setDoctors(response?.data?.data[0]);
        } catch (err) {
            console.log("Error fetching doctors => ", err);
        }
    };

    // Fetch data when component mounts or when currentPage/selectedDate changes
    useEffect(() => {
        fetchDoctors();
    }, [currentPage, selectedDate]);

    // Handle date change from date picker
    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
        setCurrentPage(1); // Reset to first page when date changes
    };

    const columns = [
        { name: "Patient Name", accessor: "Name", class: "py-3 px-4 text-left" },
        // { name: "Sex", accessor: "patient_sex", class: "text-center px-1" },
        { name: "Admit Date", accessor: "admitted_date", class: "text-center px-1" },
        { name: "Discharge D", accessor: "actions", class: "py-3 text-center px-1" },
        { name: "Bill Status", accessor: "department", class: "py-3 text-center px-1" },
        { name: "Discharge Summery", accessor: "actions", class: "py-3 text-center px-1" },
        { name: "Bill Reciept", accessor: "actions", class: "py-3 text-center px-1" },

    ];

    const handledischarge = (ipd_id) => {
        setIpdId(ipd_id)
        setShowDischargeSheet(true)
    }

    const renderRow = (item, index) => {
        return (
            <tr key={item.id || index} className="border-bottom text-center">
                {/* Patient Information */}
                <td className="px-2 text-start">
                    <div className="d-flex flex-lg-row flex-column align-items-center align-items-lg-start">
                        <img
                            src={item.Photo ? `${process.env.REACT_APP_API_URL}/${item.Photo}` : vijay}
                            alt={item.uh_id}
                            style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                objectFit: "cover",
                            }}
                            className="ms-lg-3 mb-2 mb-lg-0"
                        />
                        <div className="d-flex flex-column ms-lg-2 text-center">
                            <p className="fw-semibold mb-0">{item.Name}</p>
                            <p className="mb-0" style={{ color: "#475467", fontSize: "14px" }}>
                                {item.uh_id}
                            </p>
                        </div>
                    </div>
                </td>

                {/* Admitted Date */}
                <td className="py-3 px-2">
                    {item.admitted_date
                        ? new Date(item.admitted_date * 1000).toLocaleDateString()
                        : "-"}
                </td>

                <td className="py-3 px-2">{item.discharge_date
                    ? new Date(item.discharge_date * 1000).toLocaleDateString()
                    : "-"}</td>
                {/* Department */}

                <td className="py-3 px-2">{item.bill_status == 1 ? "Done" : "Not Done"}</td>

                <td className="py-3 px-2">
                    {item.bill_status == 1 ? (
                        <MdAssignment
                            style={{ width: "25px", height: "25px", cursor: "pointer" }}
                            onClick={() => handledischarge(item?.ipd_id)}
                        />
                    ) : (
                        <MdAssignment
                            style={{ width: "25px", height: "25px", opacity: 0.5 }}
                        />
                    )}
                </td>

                {/* <td className="py-3 px-2">{item.discharge_status == 2 ? "Done" : "Not Done"}</td> */}
                <td className="py-3 px-2  gap-2">
                    {item.bill_report ? (
                        <CiReceipt
                            style={{ width: "25px", height: "25px", cursor: "pointer" }}
                            onClick={() => window.open(`${process.env.REACT_APP_API_URL}/Uploads/${item.bill_report}`, "_blank", "noopener,noreferrer")}
                        />
                    ) : (
                        <>
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip>Bill Status Not Compeleted</Tooltip>}
                            >
                                <CiReceipt
                                    style={{ width: "25px", height: "25px", opacity: 0.5 }}
                                />

                            </OverlayTrigger>
                        </>
                    )}

                </td>
            </tr>
        );
    };

    return (
        <div className="px-3">
            <div className="fw-bold py-4 fs-4">
                <span>Discharged Patients</span>
            </div>

            <div className="mb-4 " style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                <Form>
                    <Form.Control
                        type="date"
                        id="datePicker"
                        value={selectedDate}
                        onChange={handleDateChange}
                    />
                </Form>
            </div>

            <div>
                <CommonTable
                    minimumWidth={"700px"}
                    headers={columns}
                    bodyData={doctors}
                    renderRow={renderRow}
                    title={"Patient List"}
                />
            </div>

            <ViewDischargeSheet
                ipd_id={ipdid}
                show={showDischargeSheet}
                setShow={setShowDischargeSheet}

            />
        </div>
    );
}

export default DischargeSummery;