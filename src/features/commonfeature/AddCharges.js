import { Col, Form, Modal, Row } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import CommanButton from "../../components/common/form/commonButtton";
import InputBox from "../../components/common/form/inputbox";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const AddCharges = ({ show = false, handleClose, admited, patientUpdate }) => {
    const [formData, setFormData] = useState({
        patient_name: "",
        treatmentId: "",
        treatment_date: "",
        treatment_time: "",
    });
    const [treatmentOptions, setTreatmentOptions] = useState([]);
    const [errors, setErrors] = useState({});
    const token = useSelector((state) => state.auth.currentUserToken);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const user = useSelector(state => state?.auth?.user?.userId);
    // Populate form with admitted patient data and fetch treatments
    useEffect(() => {
        if (admited) {
            setFormData((prev) => ({
                ...prev,
                patient_name: admited?.Name || "",
            }));
        }
        fetchTreatmentOptions();
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

    // Fetch available treatments
    const fetchTreatmentOptions = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/fees/getcharges`,config);
            setTreatmentOptions(response?.data?.data || []);
        } catch (err) {
            console.log("Error fetching treatments:", err);
            setErrors({ treatmentId: "Failed to load treatments" });
        }
    };

    // Validate form before submission
    const validateForm = () => {
        let newErrors = {};
        if (!formData.patient_name.trim()) newErrors.patient_name = "Patient name is required";
        if (!formData.treatmentId) newErrors.treatmentId = "Treatment is required";
        if (!formData.treatment_date) newErrors.treatment_date = "Treatment date is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };




    // Handle form submission
    const handleSubmit = async () => {
        if (!validateForm()) return;

        try {
            const submitData = {
                admited_id: +admited?.admitted_patient_id,
                charge_id: +formData.treatmentId, 
                date: convertToEpoch(formData.treatment_date, formData.treatment_time),
                created_by:user
            };

            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/fees/addipdcharges`, 
                submitData,config
            );
            console.log("Charge added:", submitData);

            if (patientUpdate) patientUpdate();
            handleClose();
        } catch (error) {
            console.error("Error adding charge:", error);
            setErrors({ submit: "Failed to add charge" });
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
                <div className="fw-bold" style={{ fontSize: "1.3rem" }}>Add Charges</div>
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

                    <Col lg={6} className="gy-3">
                        <label className="fw-semibold pb-1 pt-1">
                            Treatment <span style={{ color: "red" }}>*</span>
                        </label>
                        <Form.Select
                            name="treatmentId"
                            value={formData.treatmentId}
                            onChange={handleInputChange}
                        >
                            <option value="">Select Treatment</option>
                            {treatmentOptions.map((type) => (
                                <option key={type.fees_id} value={type.fees_id}>
                                    {type.fees_name}
                                </option>
                            ))}
                        </Form.Select>
                        {errors.treatmentId && <div className="text-danger">{errors.treatmentId}</div>}
                    </Col>
                </Row>

                <Row className="m-0 pb-3">
                    <Col md={6} className="gy-3">
                        <label className="fw-semibold pb-1 pt-1">
                            Treatment Date <span style={{ color: "red" }}>*</span>
                        </label>
                        <Form.Control
                            style={{ height: "45.5px" }}
                            name="treatment_date"
                            type="date"
                            value={formData.treatment_date}
                            onChange={handleInputChange}
                        />
                        {errors.treatment_date && <div className="text-danger">{errors.treatment_date}</div>}
                    </Col>

                    <Col md={6} className="gy-3">
                        <label className="fw-semibold pb-1 pt-1">Treatment Time</label>
                        <Form.Control
                            name="treatment_time"
                            type="time"
                            value={formData.treatment_time}
                            onChange={handleInputChange}
                            style={{ height: "45.5px" }}
                        />
                    </Col>
                </Row>

                {errors.submit && <div className="text-danger text-center mb-3">{errors.submit}</div>}

                <div className="d-flex justify-content-end pt-lg-4">
                    <CommanButton
                        label="Add Charge"
                        className="mb-3 ps-3 pe-3 p-2 fw-semibold"
                        style={{ borderRadius: "5px" }}
                        onClick={handleSubmit}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default AddCharges;