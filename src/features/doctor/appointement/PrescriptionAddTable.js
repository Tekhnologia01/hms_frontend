import { useState, useRef } from "react";
import { Form, Modal } from "react-bootstrap";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { TiTickOutline } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import './prescription.css'
import axios from "axios";
import { FaFilePrescription } from "react-icons/fa";
import PrescriptionPDF from "./PrescriptionPDF";
import { PDFViewer } from "@react-pdf/renderer";
import { showToast } from "../../../components/common/Toaster";

const AddPrescriptionTable = ({ appointmentId, ipd_id, rows, setRows, role, appointmentData, isIPD }) => {
    const inputRefs = useRef([]);
    const [editableRowIndex, setEditableRowIndex] = useState(); // Default to last row being editable
    const [prevRowValues, setPrevRowValues] = useState();
    const [showPrescription, setShowPrescription] = useState(false);
    const userId = useSelector(state => state?.auth?.user?.userId);
    const token = useSelector((state) => state.auth.currentUserToken);
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

    const addRow = () => {
        if (isIPD) {
            setRows([
                ...rows,
                { srNo: rows.length + 1, medicine_name: "", medicine_type: "", frequency: "", dosage: "", quantity: "", days: "", common_note: "", created_by: userId, },
            ]);
            setEditableRowIndex(rows.length);
        } else {
            setRows([
                ...rows,
                { srNo: rows.length + 1, appointment_id: appointmentId, medicine_name: "", medicine_type: "", frequency: "", dosage: "", quantity: "", days: "", common_note: "", created_by: userId, },
            ]);
            setEditableRowIndex(rows.length + 1);
        }

        // setEditableRowIndex(rows.length); // Make the newly added row editable
    };

    const handleChange = (index, field, value) => {
        const newRows = [...rows];
        newRows[index][field] = value;
        if (field === "frequency" || field === "days") {
            newRows[index].quantity = newRows[index].frequency * newRows[index].days;
        }
        setRows(newRows);
    };

    const handleEditRow = (index, row) => {
        setEditableRowIndex(index); // Set the clicked row as editable
        setPrevRowValues({ ...row }); // Store a deep copy of the previous row values
    };

    const handleKeyPress = (e, index, row) => {
        if (e.key === 'Enter' && index === rows.length - 1) {
            e.preventDefault();
            handleEditPrescription(index, row)
            addRow();
        }
    }


    async function getPrescriptionTest() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/appointment/getprescriptiontest?appo_id=${appointmentId}`,config);
            if (response?.data?.data?.prescription?.length !== 0) { setRows(response?.data?.data?.prescription); }
        } catch (error) {
            showToast(error?.response?.data?.error || "Failed to fetch prescription data", "error");
        }
    }

    async function getPrescription() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/prescription/getipdprescription?ipd_id=${ipd_id}`,config);
            if (response?.data?.data !== 0) {
                setRows(response?.data?.data);
            }
        } catch (error) {
            showToast(error?.response?.data?.error || "Failed to fetch prescription data", "error");
        }
    }

    const handleEditPrescription = async (index, row) => {
        if (isIPD && ipd_id) {
            try {
                if (row?.Prescription_Id) {
                    const response = await axios.put(`${process.env.REACT_APP_API_URL}/prescription/update_ipd_prescription?prescription_id=${row?.Prescription_Id}`, row, config);
                    if (!response?.data?.status) {
                        showToast("Failed to update prescription", "error");
                        setRows(rows.filter((_, rowIndex) => rowIndex !== index));
                        setEditableRowIndex(-1);
                    } else {
                        showToast("Prescription updated successfully", "success");
                        // getPrescription();
                    }
                } else {
                    const response = await axios.post(`${process.env.REACT_APP_API_URL}/prescription/ipd_add?ipd_id=${ipd_id}&&created_by=${userId}`, row,config);
                    if (!response?.data?.status) {
                        showToast("Failed to add prescription", "error");
                        setRows(rows.filter((_, rowIndex) => rowIndex !== index));
                        setEditableRowIndex(-1);
                    } else {
                        showToast("Prescription added successfully", "success");
                        getPrescription();
                    }
                }
            } catch (error) {
                showToast(error?.response?.data?.message || "Failed to save prescription", "error");
            }
        } else {
            try {
                if (row?.Prescription_Id) {
                    const response = await axios.put(`${process.env.REACT_APP_API_URL}/prescription/update_prescription?prescription_id=${row?.Prescription_Id}`, row,config);
                    if (!response?.data?.status) {
                        showToast("Failed to update prescription", "error");
                    } else {
                        showToast("Prescription updated successfully", "success");
                    }
                } else {
                    const response = await axios.post(`${process.env.REACT_APP_API_URL}/prescription/add?appointment_id=${appointmentId}&&created_by=${userId}`,row,config);
                    if (!response.data?.status) {
                        showToast("Failed to add prescription", "error");
                        setRows(rows.filter((_, rowIndex) => rowIndex !== index));
                        setEditableRowIndex(-1);
                    } else {
                        showToast("Prescription added successfully", "success");
                        getPrescriptionTest();
                    }
                }
            } catch (error) {
                showToast(error?.response?.data?.error || "Failed to save prescription", "error");
            }
        }

        setPrevRowValues(undefined); // Reset the previous row values
    }

    const cancelEditRow = (index) => {
        if (prevRowValues?.Prescription_Id) {
            if (!prevRowValues) return; // Prevent errors if there's no previous value

            setRows(prevRows => {
                const updatedRows = [...prevRows]; // Create a shallow copy of the rows array
                updatedRows[index] = { ...prevRowValues }; // Restore previous values for the row
                return updatedRows;
            });
        } else {
            setRows(rows.filter((_, rowIndex) => rowIndex !== index)); // Remove the row from the rows array
        }
        setEditableRowIndex(-1); // Reset the editable row index
        setPrevRowValues(undefined); // Reset the previous row values
    };

    const handleDeleteRow = async (index, row) => {
        try {
            if (isIPD && ipd_id) {
                if (row?.Prescription_Id) {
                    const response = await axios.delete(`${process.env.REACT_APP_API_URL}/prescription/delete_ipd?prescription_id=${row?.Prescription_Id}` ,config);
                    if (response.status) {
                        setRows(rows.filter((_, rowIndex) => rowIndex !== index));
                        showToast("Prescription deleted successfully", "success");
                    }
                } else {
                    setRows(rows.filter((_, rowIndex) => rowIndex !== index));
                    showToast("Prescription removed successfully", "success");
                }
            } else {
                if (row?.Prescription_Id) {
                    const response = await axios.delete(`${process.env.REACT_APP_API_URL}/prescription/delete?prescription_id=${row?.Prescription_Id}`,config);
                    if (response.status) {
                        setRows(rows.filter((_, rowIndex) => rowIndex !== index));
                        showToast("Prescription deleted successfully", "success");
                    }
                } else {
                    setRows(rows.filter((_, rowIndex) => rowIndex !== index));
                    showToast("Prescription removed successfully", "success");
                }
            }
        } catch (error) {
            showToast(error?.response?.data?.error || "Failed to delete prescription", "error");
        }
    };

    return (
        <>
            <div className="row p-2 pt-0 m-0">
                <div className="fw-bold fs-5 col-md-6 mt-2 px-0">Add Prescription</div>
                <div className="col-md-6 text-end">
                    {role === 2 && <span
                        className="fw-semibold fs-6 pl-2 cursor-pointer me-3"
                        style={{ color: "#1d949a", cursor: 'pointer' }}
                        onClick={addRow}
                    >+ Add Prescription</span>}
                    <button className="border-0 bg-transparent" onClick={() => {
                        setShowPrescription(true)
                    }}>
                        <FaFilePrescription fontSize={"20px"} color="1D949A" />
                    </button>
                </div>
            </div>

            <div className="mt-2">
                <div className="border rounded-2">
                    <div style={{ overflowX: "auto" }}>
                        {rows && (
                            <table className="bordered w-100 prescription_tbl" style={{ tableLayout: "fixed", minWidth: "800px" }}>
                                <thead>
                                    <tr className="border-bottom" style={{ backgroundColor: "#eef1f5", color: "#5c5f61" }}>
                                        <th style={{ width: "70px" }} className="text-center">Sr No</th>
                                        <th style={{ width: "15%" }} className="text-center">Medicine Name</th>
                                        <th className="text-center">Dose</th>
                                        <th className="text-center">Type</th>
                                        <th className="text-center">Frequency</th>
                                        <th className="text-center">Days</th>
                                        <th className="text-center">Quantity</th>
                                        <th style={{ width: "15%" }} className="text-center">Remarks</th>
                                        {role === 2 && <th className="text-center">Action</th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.map((row, index) => (
                                        <tr key={index}>
                                            <td className="text-center">{index + 1}</td>
                                            <td >
                                                <Form.Control
                                                    type="text"
                                                    value={row.medicine_name}
                                                    onChange={(e) => handleChange(index, "medicine_name", e.target.value)}
                                                    ref={(el) => (inputRefs.current[index] = el)}
                                                    placeholder="Medicine Name"
                                                    disabled={index !== editableRowIndex}

                                                />
                                            </td>
                                            <td>
                                                <Form.Control
                                                    type="text"
                                                    value={row.dosage}
                                                    onChange={(e) => handleChange(index, "dosage", e.target.value)}
                                                    placeholder="Dose"
                                                    disabled={index !== editableRowIndex}
                                                />
                                            </td>
                                            <td>
                                                <Form.Control
                                                    type="text"
                                                    value={row.medicine_type}
                                                    onChange={(e) => handleChange(index, "medicine_type", e.target.value)}
                                                    placeholder="Type"
                                                    disabled={index !== editableRowIndex}
                                                />
                                            </td>
                                            <td>
                                                <Form.Control
                                                    type="number"
                                                    value={row.frequency}
                                                    onChange={(e) => handleChange(index, "frequency", e.target.value)}
                                                    placeholder="Frequency"
                                                    disabled={index !== editableRowIndex}
                                                />
                                            </td>
                                            <td>
                                                <Form.Control
                                                    type="number"
                                                    value={row.days}
                                                    onChange={(e) => handleChange(index, "days", e.target.value)}
                                                    placeholder="Days"
                                                    disabled={index !== editableRowIndex}
                                                />
                                            </td>
                                            <td className="text-center">{row.quantity}</td>
                                            <td>
                                                <Form.Control
                                                    type="text"
                                                    value={row.common_note}
                                                    onChange={(e) => handleChange(index, "common_note", e.target.value)}
                                                    placeholder="Enter Remarks"
                                                    disabled={index !== editableRowIndex}
                                                    onKeyDown={(e) => handleKeyPress(e, index, row)}
                                                />
                                            </td>
                                            {role === 2 && <td className="text-center">
                                                {index === editableRowIndex ?
                                                    <>
                                                        <TiTickOutline
                                                            style={{ height: "23px", width: "23px", cursor: "pointer", color: 'green' }}
                                                            onClick={() => { handleEditPrescription(index, row) }}
                                                        />
                                                        <span className="ps-2"></span>
                                                        <RxCross2
                                                            style={{ height: "23px", width: "23px", cursor: "pointer", color: 'red' }}
                                                            onClick={() => cancelEditRow(index)}
                                                        />
                                                    </>
                                                    : <FiEdit2
                                                        style={{ height: "23px", width: "23px", cursor: "pointer" }}
                                                        onClick={() => handleEditRow(index, row)}
                                                    />}
                                                <span className="ps-3"></span>
                                                <RiDeleteBinLine
                                                    style={{ height: "25px", width: "25px", cursor: "pointer" }}
                                                    onClick={() => { handleDeleteRow(index, row) }} />
                                            </td>}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
            <Modal show={showPrescription} onHide={() => setShowPrescription(false)} fullscreen>
                <Modal.Header closeButton>
                    <Modal.Title>Prescription</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PDFViewer width="100%" height="100%" showToolbar={true}>
                        <PrescriptionPDF prescriptionData={rows} patientDetails={appointmentData} />
                    </PDFViewer>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default AddPrescriptionTable;