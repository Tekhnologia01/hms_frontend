import { Col, Modal, Row } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import CommanButton from "../../../components/common/form/commonButtton";
import InputBox from "../../../components/common/form/inputbox";
import { useEffect, useState } from "react";

const UpdatePatient = ({ show = false, handleClose, patient,patientUpdate }) => {
  const [formData, setFormData] = useState({
    patient_name: "",
    patient_phone_no: "",
    patient_age: "",
    patient_address: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (patient) {
      setFormData({
        patient_name: patient?.Name || "",
        patient_phone_no: patient?.patient_phone_no || "",  // Corrected field
        patient_age: patient?.patient_age || "",
        patient_address: patient?.patient_address || "",  // Added missing value
      });
    }
  }, [patient]);  // Added dependency to avoid infinite re-renders

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate form before submission
  const validateForm = () => {
    let newErrors = {};
    if (!formData.patient_name.trim()) newErrors.patient_name = "Patient name is required";
    if (!formData.patient_phone_no.trim()) newErrors.patient_phone_no = "Phone number is required";
    if (!formData.patient_age || isNaN(formData.patient_age)) newErrors.patient_age = "Valid age is required";
    if (!formData.patient_address.trim()) newErrors.patient_address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
     patientUpdate(formData);
     handleClose();
    } catch (error) {
      console.error("Error updating patient:", error);
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
        <div className="fw-bold" style={{ fontSize: "1.3rem" }}>Update Patient</div>
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
              value={formData?.patient_name}
              onChange={handleInputChange}
            />
            {errors.patient_name && <p className="text-danger">{errors.patient_name}</p>}
          </Col>

          <Col md={6} className="gy-3">
            <InputBox
              label="Phone No."
              placeholder="Phone no here..."
              isRequired={true}
              name="patient_phone_no"
              value={formData?.patient_phone_no}
              onChange={handleInputChange}
            />
            {errors.patient_phone_no && <p className="text-danger">{errors.patient_phone_no}</p>}
          </Col>

          <Col md={6} className="gy-3">
            <InputBox
              label="Age"
              placeholder="Age here..."
              isRequired={true}
              name="patient_age"
              value={formData?.patient_age}
              onChange={handleInputChange}
            />
            {errors.patient_age && <p className="text-danger">{errors.patient_age}</p>}
          </Col>

          <Col md={6} className="gy-3">
            <InputBox
              label="Address"
              placeholder="Address here..."
              isRequired={true}
              name="patient_address"
              value={formData.patient_address}
              onChange={handleInputChange}
            />
            {errors.patient_address && <p className="text-danger">{errors.patient_address}</p>}
          </Col>
        </Row>

        <div className="d-flex justify-content-end pt-lg-4">

          <CommanButton label="Update" className="mb-3 ps-3 pe-3 p-2 fw-semibold" style={{ borderRadius: "5px",}} onClick={handleSubmit} />

        </div>
      </div>
    </Modal>
  );
};

export default UpdatePatient;
