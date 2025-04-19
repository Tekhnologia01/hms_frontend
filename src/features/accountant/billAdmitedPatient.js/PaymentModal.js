


import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { MdPayments } from "react-icons/md";
import axios from "axios";
import CommanButton from "../../../components/common/form/commonButtton";
import { useSelector } from "react-redux";

// Mock InputBox component; replace with your actual import if different
const InputBox = ({ label, placeholder, isRequired, type = "text", value, onChange, name, disabled }) => (
  
  <Form.Group>
    <Form.Label className="fw-semibold" style={{ fontSize: "1rem" }}>
      {label} {isRequired && <span className="text-danger fw-bold">*</span>}
    </Form.Label>
    <Form.Control
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      required={isRequired}
      disabled={disabled}
      style={{ padding: "10px" }}
    />
  </Form.Group>
);

function PaymentModal({ show, handleClose, patient, onPaymentAdded }) {


  const [formData, setFormData] = useState({
    name: patient?.Name || "",
    amount: "",
    date: "",
  });
  const token = useSelector((state) => state.auth.currentUserToken);
  const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    

//   console.log("patient data in the payment page",patient);
  useEffect(() => {
    setFormData({
      name: patient?.Name || "",
      amount: "",
      date: "",
    });
  }, [patient]); 


//   const useEffect= useState({
//     name: patient?.Name || "",
//     amount: "",
//     date: "",
//   });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Patient name is required";
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = "A valid amount greater than 0 is required";
    }
    if (!formData.date) newErrors.date = "Payment date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);    
    setError(null);

    try {
      const paymentData = {
        admitedId: patient.admitted_patient_id,
        amount: parseFloat(formData.amount),
        date: formData.date,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/accountant/addpayment`,
        paymentData,config
      );

      alert("Payment added successfully!");

      setFormData({
        name: patient?.Name || "",
        amount: "",
        date: "",
      });

      handleClose();
    } catch (err) {
      setError("Error adding payment: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          <MdPayments className="me-2" style={{ height: "25px", width: "25px" }} />
          Add Payment for {patient?.Name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handlePaymentSubmit}>
          <Row className="m-0 pb-3">
            <Col md={4} className="gy-3">
              <InputBox
                label="Admitted Patient Name"
                placeholder="Patient Name here..."
                isRequired={true}
                value={formData.name}
                onChange={handleInputChange}
                name="name"
                disabled={true}
              />
              {errors.name && <p className="text-danger">{errors.name}</p>}
            </Col>
            <Col md={4} className="gy-3">
              <InputBox
                label="Amount"
                placeholder="Enter payment amount"
                isRequired={true}
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={handleInputChange}
                name="amount"
              />
              {errors.amount && <p className="text-danger">{errors.amount}</p>}
            </Col>
            <Col md={4} className="gy-3">
              <InputBox
                label="Payment Date"
                placeholder="Select date"
                isRequired={true}
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                name="date"
              />
              {errors.date && <p className="text-danger">{errors.date}</p>}
            </Col>
          </Row>
          {error && <p className="text-danger">{error}</p>}
          <div>



          {/* <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Payment"}
          </Button> */}


            <CommanButton
                                          label="Submit Payment"
                                          className="mb-3 ps-4 pe-4 p-2 fw-bold fs-6 "
                                          type="submit"
                                          disabled={loading}
                                    
                                      />
          </div>
        </Form>
      </Modal.Body>
    
    </Modal>
  );
}

export default PaymentModal;