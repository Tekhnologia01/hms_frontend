import { useState, useRef, useCallback, useEffect } from "react";
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
import { toast } from "react-toastify";

const AddPrescriptionTable = ({ appointmentId, ipd_id, rows, setRows, role, appointmentData, isIPD }) => {
    const inputRefs = useRef([]);
    const [editableRowIndex, setEditableRowIndex] = useState();
    const [prevRowValues, setPrevRowValues] = useState();
    const [showPrescription, setShowPrescription] = useState(false);
    const [medicineList, setMedicineList] = useState([]);
    const [medicineSearch, setMedicineSearch] = useState("");
    const [showMedicineDropdown, setShowMedicineDropdown] = useState(false);
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
        setEditableRowIndex(index);
        setPrevRowValues({ ...row });
    };

    const handleKeyPress = (e, index, row) => {
        if (e.key === 'Enter' && index === rows.length - 1) {
            e.preventDefault();
            handleEditPrescription(index, row)
            addRow();
        }
    }

    const fetchMedicines = useCallback(async () => {
        if (medicineList.length === 0) {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/prescription/getmedicine`,
                    config
                );
                setMedicineList(response.data?.data || []);
            } catch (error) {
                setMedicineList([]);
            }
        }
    }, [medicineList.length, config]);

    const handleEditPrescription = async (index, row) => {
        if (isIPD && ipd_id) {
            try {
                if (row?.Prescription_Id) {
                    const response = await axios.put(`${process.env.REACT_APP_API_URL}/prescription/update_ipd_prescription?prescription_id=${row?.Prescription_Id}`, row, config);
                    if (!response?.data?.status) {
                        toast.error("Failed to update prescription");
                        setRows(rows.filter((_, rowIndex) => rowIndex !== index));
                        setEditableRowIndex(-1);
                    } else {
                        toast.success("Prescription updated successfully");
                        setRows(prevRows => {
                            const updatedRows = [...prevRows];
                            updatedRows[index] = { ...row };
                            return updatedRows;
                        });
                        setEditableRowIndex(-1);
                    }
                } else {
                    const response = await axios.post(`${process.env.REACT_APP_API_URL}/prescription/ipd_add?ipd_id=${ipd_id}&&created_by=${userId}`, row, config);
                    if (!response?.data?.status) {
                        toast.error("Failed to add prescription");
                        setRows(rows.filter((_, rowIndex) => rowIndex !== index));
                        setEditableRowIndex(-1);
                    } else {
                        toast.success("Prescription added successfully");
                        if (response.data?.data) {
                            setRows(prevRows => {
                                const updatedRows = [...prevRows];
                                updatedRows[index] = { ...response.data.data };
                                return updatedRows;
                            });
                        }
                        setEditableRowIndex(-1);
                    }
                }
            } catch (error) {
                toast.error(error?.response?.data?.message || "Failed to save prescription");
            }
        } else {
            try {
                if (row?.Prescription_Id) {
                    const response = await axios.put(`${process.env.REACT_APP_API_URL}/prescription/update_prescription?prescription_id=${row?.Prescription_Id}`, row, config);
                    if (!response?.data?.status) {
                        toast.error("Failed to update prescription");
                    } else {
                        toast.success("Prescription updated successfully");
                        setRows(prevRows => {
                            const updatedRows = [...prevRows];
                            updatedRows[index] = { ...row };
                            return updatedRows;
                        });
                        setEditableRowIndex(-1);
                    }
                } else {
                    const response = await axios.post(`${process.env.REACT_APP_API_URL}/prescription/add?appointment_id=${appointmentId}&&created_by=${userId}`, row, config);
                    if (!response?.data?.status) {
                        toast.error("Failed to add prescription");
                        setRows(rows.filter((_, rowIndex) => rowIndex !== index));
                        setEditableRowIndex(-1);
                    } else {
                        toast.success("Prescription added successfully");
                        // Set the returned prescription (with id) in the row
                        if (response?.data?.data) {
                            setRows(prevRows => {
                                const updatedRows = [...prevRows];
                                updatedRows[index] = { ...response.data.data };
                                return updatedRows;
                            });
                        }
                        setEditableRowIndex(-1);
                    }
                }
            } catch (error) {
                toast.error(error?.response?.data?.error || "Failed to save prescription");
            }
        }

        setPrevRowValues(undefined);
    }

    const cancelEditRow = (index) => {
        if (prevRowValues?.Prescription_Id) {
            if (!prevRowValues) return;

            setRows(prevRows => {
                const updatedRows = [...prevRows]; 
                updatedRows[index] = { ...prevRowValues }; 
                return updatedRows;
            });
        } else {
            setRows(rows.filter((_, rowIndex) => rowIndex !== index)); 
        }
        setEditableRowIndex(-1); 
        setPrevRowValues(undefined);
    };

    const handleDeleteRow = async (index, row) => {
        try {
            if (isIPD && ipd_id) {
                if (row?.Prescription_Id) {
                    const response = await axios.delete(`${process.env.REACT_APP_API_URL}/prescription/delete_ipd?prescription_id=${row?.Prescription_Id}`, config);
                    if (response?.status) {
                        setRows(rows.filter((_, rowIndex) => rowIndex !== index));
                        toast.success("Prescription deleted successfully");
                    }
                } else {
                    setRows(rows.filter((_, rowIndex) => rowIndex !== index));
                    toast.success("Prescription removed successfully");
                }
            } else {
                if (row?.Prescription_Id) {
                    const response = await axios.delete(`${process.env.REACT_APP_API_URL}/prescription/delete?prescription_id=${row?.Prescription_Id}`, config);
                    if (response.status) {
                        setRows(rows.filter((_, rowIndex) => rowIndex !== index));
                        toast.success("Prescription deleted successfully", "success");
                    }
                } else {
                    setRows(rows.filter((_, rowIndex) => rowIndex !== index));
                    toast.success("Prescription removed successfully");
                }
            }
        } catch (error) {
            toast.error(error?.response?.data?.error || "Failed to delete prescription");
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
                    <div >
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
                                            <td style={{ position: "relative" }}>
                                                {index === editableRowIndex ? (
                                                    <>
                                                        <Form.Control
                                                            type="text"
                                                            value={row.medicine_name}
                                                            onFocus={() => {
                                                                fetchMedicines();
                                                                setShowMedicineDropdown(true);
                                                            }}
                                                            onChange={(e) => {
                                                                handleChange(index, "medicine_name", e.target.value);
                                                                setMedicineSearch(e.target.value);
                                                                setShowMedicineDropdown(true);
                                                            }}
                                                            onBlur={() => setTimeout(() => setShowMedicineDropdown(false), 200)}
                                                            placeholder="Search Medicine"
                                                            autoComplete="off"
                                                            className="modern-input"
                                                        />
                                                        {showMedicineDropdown && (
                                                            <div className="modern-dropdown">
                                                                {medicineList
                                                                    .filter((med) =>
                                                                        (medicineSearch || row.medicine_name || "")
                                                                            .toLowerCase()
                                                                            .trim() === ""
                                                                            ? true
                                                                            : med.medicine_name
                                                                                .toLowerCase()
                                                                                .includes(
                                                                                    (medicineSearch || row.medicine_name || "").toLowerCase()
                                                                                )
                                                                    )
                                                                    .slice(0, 20)
                                                                    .map((med, i) => (
                                                                        <div
                                                                            key={med.medicine_id || med.medicine_name + i}
                                                                            className={`dropdown-item ${row.medicine_name === med.medicine_name ? "selected" : ""
                                                                                }`}
                                                                            onMouseDown={() => {
                                                                                handleChange(index, "medicine_name", med.medicine_name);
                                                                                setMedicineSearch(med.medicine_name);
                                                                                setShowMedicineDropdown(false);
                                                                            }}
                                                                        >
                                                                            {med.medicine_name}
                                                                        </div>
                                                                    ))}
                                                            </div>
                                                        )}
                                                    </>
                                                ) : (
                                                    <Form.Control
                                                        type="text"
                                                        value={row.medicine_name}
                                                        disabled
                                                        placeholder="Medicine Name"
                                                        className="modern-input"
                                                    />
                                                )}
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
                                                <Form.Select
                                                    value={row.medicine_type}
                                                    onChange={(e) => handleChange(index, "medicine_type", e.target.value)}
                                                    disabled={index !== editableRowIndex}
                                                    style={{ width: "90%", marginLeft: "10px" }}
                                                >
                                                    <option value="">Select</option>
                                                    <option value="Tablet">Tablet</option>
                                                    <option value="Capsule">Capsule</option>
                                                    <option value="Liquid">Liquid</option>
                                                    <option value="Injection">Injection</option>
                                                    <option value="Powder">Powder</option>
                                                    <option value="Other">Other</option>
                                                </Form.Select>
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
                                            <td className="text-center">
                                                {["Liquid", "Powder"].includes(row.medicine_type) && index === editableRowIndex ? (
                                                    <Form.Control
                                                        type="number"
                                                        value={row.quantity}
                                                        onChange={(e) => handleChange(index, "quantity", e.target.value)}
                                                        placeholder="Quantity"
                                                        min={1}
                                                    />
                                                ) : (
                                                    row.quantity
                                                )}
                                            </td>
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
