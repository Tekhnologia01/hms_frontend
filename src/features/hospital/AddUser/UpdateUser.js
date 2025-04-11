import { Col, Modal, Row } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import CommanButton from "../../../components/common/form/commonButtton";
import InputBox from "../../../components/common/form/inputbox";
import { useEffect, useState } from "react";

const UpdateUser = ({ show = false, handleClose, user, patientUpdate,status }) => {

  const [formData, setFormData] = useState({
    name: "",
    phone_no: "",
    age: "",
    email_id: "",
    user_id: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        name: user?.Name || "",
        phone_no: user?.mobile || "",
        age: user?.age || "",
        email_id: user?.user_email || "",
        user_id: user?.User_ID ||"",

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
    
      // Age validation (Required, must be a number, reasonable age range)
      if (!formData.age) {
        newErrors.age = "Age is required";
      } else if (isNaN(formData.age) || formData.age <= 0 || formData.age > 120) {
        newErrors.age = "Enter a valid age between 1 and 120";
      }
    
      // Email validation (Required, valid format)
      if (!formData.email_id.trim()) {
        newErrors.email_id = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email_id)) {
        newErrors.email_id = "Enter a valid email address";
      }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
      console.log("Updating patient with data:", formData);
      patientUpdate(formData);
     setFormData( {
        name: "",
        phone_no: "",
        age: "",
        email_id: "",
        user_id: "",
      })
      handleClose();
    } catch (error) {
      console.error("Error updating patient:", error);
    }
  };

  return (
    <Modal show={show} onHide={()=>{  
    // setFormData( {
    //     name: "",
    //     phone_no: "",
    //     age: "",
    //     email_id: "",
    //     user_id: "",
    //   })
      handleClose()}} size="lg" dialogClassName="custom-modal">
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
        <div className="fw-bold" style={{ fontSize: "1.3rem" }}>  Update {status === "add_doctor" ? "Doctor" : status === "add_labassistant" ? "Lab Assistant" : status === "add_receptionist" ? "Receptionist" : ""}
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

export default UpdateUser;
