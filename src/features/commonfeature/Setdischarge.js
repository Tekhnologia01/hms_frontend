import { Col, Form, Modal, Row } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import CommanButton from "../../components/common/form/commonButtton";
import InputBox from "../../components/common/form/inputbox";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const SetDischarge = ({ show = false, handleClose, admited, patientUpdate }) => {
    const [formData, setFormData] = useState({
        patient_name: "",
        discharge_date: "",
        discharge_time: "",
    });
    const [errors, setErrors] = useState({});
    const user = useSelector((state) => state?.auth?.user?.userId);

    useEffect(() => {
        if (admited) {
            setFormData((prev) => ({
                ...prev,
                patient_name: admited?.Name || "",
            }));
        }
    }, [admited]);

    // Convert date and time to epoch
    const convertToEpoch = (date, time) => {
        if (!date) return null;
        const dateTimeString = time ? `${date}T${time}:00` : `${date}T00:00:00`;
        return new Date(dateTimeString).getTime() / 1000; // Convert to seconds if API expects it
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    // Validate form before submission
    const validateForm = () => {
        let newErrors = {};
        if (!formData.patient_name.trim()) newErrors.patient_name = "Patient name is required";
        if (!formData.discharge_date) newErrors.discharge_date = "Discharge date is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async () => {
        if (!validateForm()) return;

        try {
            const submitData = {
                admited_id: +admited?.admitted_patient_id,
                // Assuming charge_id is not needed for discharge; adjust if required
                date: convertToEpoch(formData.discharge_date, formData.discharge_time),
                created_by: user,
            };


            console.log("submitData", submitData)

            const response = await axios.put(
                `${process.env.REACT_APP_API_URL}/patient/setdischargedate`, // Adjust endpoint if needed
                submitData
            );
            console.log("Discharge date set:", response);

            if (patientUpdate) patientUpdate();
            handleClose();
        } catch (error) {
            console.error("Error setting discharge date:", error);
            setErrors({ submit: "Failed to set discharge date" });
        }
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg" dialogClassName="custom-modal">
            <div className="pe-5 ps-5 pt-2">
                <FaTimes
                    style={{
                        position: "absolute",
                        top: "20px",
                        right: "30px",
                        fontSize: "20px",
                        cursor: "pointer",
                        color: "#999",
                        zIndex: 10,
                    }}
                    onClick={handleClose}
                />
                <div className="fw-bold" style={{ fontSize: "1.3rem" }}>Set Discharge Date</div>
            </div>
            <hr />

            <div className="pe-5 ps-5 pb-5 pt-3">
                <Row className="m-0 pb-3">
                    <Col md={6} className="gy-3">
                        <InputBox
                            label="Patient Name"
                            placeholder="Patient Name here..."
                            isRequired={true}
                            name="patient_name"
                            value={formData.patient_name}
                            onChange={handleInputChange}
                        />
                        {errors.patient_name && <p className="text-danger">{errors.patient_name}</p>}
                    </Col>
                    <Col md={6} className="gy-3">
                        <label className="fw-semibold pb-1 pt-1">
                            Discharge Date <span style={{ color: "red" }}>*</span>
                        </label>
                        <Form.Control
                            style={{ height: "45.5px" }}
                            name="discharge_date"
                            type="date"
                            value={formData.discharge_date}
                            min={new Date().toISOString().split("T")[0]} // Set today as min date
                            onChange={handleInputChange}
                        />
                        {errors.discharge_date && (
                            <div className="text-danger">{errors.discharge_date}</div>
                        )}
                    </Col>


                    <Col md={6} className="gy-3">
                        <label className="fw-semibold pb-1 pt-1">Discharge Time</label>
                        <Form.Control
                            name="discharge_time"
                            type="time"
                            value={formData.discharge_time}
                            onChange={handleInputChange}
                            style={{ height: "45.5px" }}
                        />
                    </Col>
                </Row>

                {errors.submit && <div className="text-danger text-center mb-3">{errors.submit}</div>}

                <div className="d-flex justify-content-end pt-lg-4">
                    <CommanButton
                        label="Set Discharge"
                        className="mb-3 ps-3 pe-3 p-2 fw-semibold"
                        style={{ borderRadius: "5px" }}
                        onClick={handleSubmit}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default SetDischarge;