


import { Col, Modal, Row } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import CommanButton from "../../../components/common/form/commonButtton";
import InputBox from "../../../components/common/form/inputbox";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UpdateDoctor = ({ show = false, handleClose, user, patientUpdate, status }) => {

  const [formData, setFormData] = useState({
    name: "",
    phone_no: "",
    age: "",
    email_id: "",
    user_id: "",
    fees: "",    // fees added
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        name: user?.Name || "",
        phone_no: user?.mobile || "",
        age: user?.age || "",
        email_id: user?.user_email || "",
        user_id: user?.User_ID || "",
        fees: user?.consultancy_fee || "",  // populate existing fees if available
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Patient name is required";

    if (!formData.phone_no) {
      newErrors.phone_no = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone_no)) {
      newErrors.phone_no = "Phone number must be 10 digits";
    }

    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (isNaN(formData.age) || formData.age <= 0 || formData.age > 120) {
      newErrors.age = "Enter a valid age between 1 and 120";
    }

    if (!formData.email_id.trim()) {
      newErrors.email_id = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email_id)) {
      newErrors.email_id = "Enter a valid email address";
    }

    if (!formData.fees) {
      newErrors.fees = "Doctor fees is required";
    } else if (isNaN(formData.fees) || formData.fees < 0) {
      newErrors.fees = "Enter a valid amount for fees";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {

      patientUpdate(formData);
      setFormData({
        name: "",
        phone_no: "",
        age: "",
        email_id: "",
        user_id: "",
        fees: "",   // reset fees
      });
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
        <div className="fw-bold" style={{ fontSize: "1.3rem" }}>
          Update {status === "add_doctor" ? "Doctor" : status === "add_labassistant" ? "Lab Assistant" : status === "add_receptionist" ? "Receptionist" : ""}
        </div>
      </div>
      <hr />

      <div className="pe-5 ps-5 pb-5 pt-3">
        <Row className="m-0 pb-3">
          <Col md={6} className="gy-3">
            <InputBox
              label="Name"
              placeholder="Name"
              isRequired={true}
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && <p className="text-danger">{errors.name}</p>}
          </Col>

          <Col md={6} className="gy-3">
            <InputBox
              label="Phone No."
              placeholder="Phone no"
              isRequired={true}
              name="phone_no"
              value={formData.phone_no}
              onChange={handleInputChange}
            />
            {errors.phone_no && <p className="text-danger">{errors.phone_no}</p>}
          </Col>

          <Col md={6} className="gy-3">
            <InputBox
              label="Age"
              placeholder="Age here..."
              isRequired={true}
              name="age"
              value={formData.age}
              onChange={handleInputChange}
            />
            {errors.age && <p className="text-danger">{errors.age}</p>}
          </Col>

          <Col md={6} className="gy-3">
            <InputBox
              label="Email Id"
              placeholder="Email Id"
              isRequired={true}
              name="email_id"
              value={formData.email_id}
              onChange={handleInputChange}
            />
            {errors.email_id && <p className="text-danger">{errors.email_id}</p>}
          </Col>

          {/* Doctor Fees Field */}
          <Col md={6} className="gy-3">
            <InputBox
              label="Doctor Fees"
              placeholder="Enter Doctor Fees"
              isRequired={true}
              name="fees"
              value={formData.fees}
              onChange={handleInputChange}
            />
            {errors.fees && <p className="text-danger">{errors.fees}</p>}
          </Col>

        </Row>

        <div className="d-flex justify-content-end pt-lg-4">
          <CommanButton
            label="Update"
            className="mb-3 ps-3 pe-3 p-2 fw-semibold"
            style={{ borderRadius: "5px" }}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </Modal>
  );
};

export default UpdateDoctor;
