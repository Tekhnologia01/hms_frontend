// import React, { useState } from "react";
// import { Modal, Button, Form } from "react-bootstrap"; // Using react-bootstrap
// import { MdPayments } from "react-icons/md";
// import axios from "axios";

// function PaymentModal({ show, handleClose, patient }) {
//   const [amount, setAmount] = useState("");
//   const [paymentDate, setPaymentDate] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handlePaymentSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const paymentData = {
//         patientId: patient?.id, // Assuming patient has an 'id' field
//         amount: parseFloat(amount),
//         date: paymentDate,
//       };

//       // Replace with your actual API endpoint for submitting payments
//       await axios.post(`${process.env.REACT_APP_API_URL}/accountant/addpayment`, paymentData);

//       alert("Payment added successfully!");
//       setAmount("");
//       setPaymentDate("");
//       handleClose(); // Close modal on success
//     } catch (err) {
//       setError("Error adding payment: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Modal show={show} onHide={handleClose} centered size="lg">
//       <Modal.Header closeButton>
//         <Modal.Title>
//           <MdPayments className="me-2" style={{ height: "25px", width: "25px" }} />
//           Add Payment for {patient?.Name}
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         {/* <Form onSubmit={handlePaymentSubmit}>
//           <Form.Group className="mb-3">
//             <Form.Label>Amount</Form.Label>
//             <Form.Control
//               type="number"
//               step="0.01"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               placeholder="Enter payment amount"
//               required
//             />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>Payment Date</Form.Label>
//             <Form.Control
//               type="date"
//               value={paymentDate}
//               onChange={(e) => setPaymentDate(e.target.value)}
//               required
//             />
//           </Form.Group>
//           {error && <p className="text-danger">{error}</p>}
//           <Button variant="primary" type="submit" disabled={loading}>
//             {loading ? "Submitting..." : "Submit Payment"}
//           </Button>
//         </Form> */}

//                <Row className="m-0 pb-3">
//                                     <Col md={6} className="gy-3">
//                                         <InputBox
//                                             label={`${user} ${user === "Lab" ? "Assistant" : ""} Name`}
//                                             placeholder={`${user} ${user === "Lab" ? "Assistant" : ""} Name here...`}
//                                             isRequired={true}
//                                             value={formData.name}
//                                             onChange={handleInputChange}
//                                             name="name"
//                                         />
//                                         {errors.name && <p className="text-danger">{errors.name}</p>}
//                                     </Col>
//                                     <Col md={6} className="gy-3">
//                                         <InputBox
//                                             label={"Phone No."}
//                                             placeholder="Phone no here..."
//                                             isRequired={true}
//                                             type="number"
//                                             value={formData.phoneno}
//                                             onChange={handleInputChange}
//                                             name="phoneno"
//                                         />
//                                         {errors.phoneno && <p className="text-danger">{errors.phoneno}</p>}
//                                     </Col>
        
//                                     <Col md={6} className="gy-3">
//                                         <InputBox
//                                             label={"Email I'd"}
//                                             placeholder="Email I'd here..."
//                                             isRequired={true}
//                                             type="email"
//                                             value={formData.email_id}
//                                             onChange={handleInputChange}
//                                             name="email_id"
//                                         />
//                                         {errors.email_id && <p className="text-danger">{errors.email_id}</p>}
        
//                                     </Col>
//                                     <Col md={6} className="gy-3">
//                                         <Form.Group controlId="sexSelect">
//                                             <Form.Label className="fw-semibold" style={{ fontSize: "1rem" }}>Sex <span className="text-danger fw-bold">*</span></Form.Label>
//                                             <Form.Select
//                                                 value={formData.sex}
//                                                 name="sex"
//                                                 onChange={handleInputChange}
//                                                 isRequired={true}
//                                               style={{padding: "10px"}}
//                                             >
//                                                 <option value="">Select sex</option>
//                                                 <option value="male">Male</option>
//                                                 <option value="female">Female</option>
//                                                 <option value="other">Other</option>
//                                             </Form.Select>
//                                         </Form.Group>
//                                         {errors.sex && <p className="text-danger">{errors.sex}</p>}
//                                     </Col>
        
//                                     <Col md={6} className="gy-3">
//                                         <InputBox
//                                             label={"Age"}
//                                             placeholder="Age here..."
//                                             isRequired={true}
//                                             type="number"
//                                             value={formData.age}
//                                             onChange={handleInputChange}
//                                             name="age"
//                                         />
//                                         {errors.age && <p className="text-danger">{errors.age}</p>}
//                                     </Col>
        
//                                     <Col md={6} className="gy-3">
//                                         <InputBox
//                                             label={"Address"}
//                                             placeholder="Address here..."
//                                             isRequired={true}
//                                             value={formData.address}
//                                             onChange={handleInputChange}
//                                             name="address"
//                                         />
//                                         {errors.address && <p className="text-danger">{errors.address}</p>}
        
//                                     </Col>
        
//                                     <Col md={6} className="gy-3">
//                                         <InputBox
//                                             label={"City"}
//                                             placeholder="City here..."
//                                             isRequired={true}
//                                             value={formData.city}
//                                             onChange={handleInputChange}
//                                             name="city"
//                                         />
//                                         {errors.city && <p className="text-danger">{errors.city}</p>}
//                                     </Col>
        
                                 
                    
//                                     <Col md={6} className="gy-3">
//                                         <Form.Group controlId="idSelect">
//                                             <Form.Label className="fw-semibold" style={{ fontSize: "1rem" }}>Select I'd Proof <span className="text-danger fw-bold">*</span></Form.Label>
//                                             <Form.Select
//                                                 value={formData.id_proof}
//                                                 name="id_proof"
//                                                 onChange={handleInputChange}
//                                                 isRequired={true}
//                                             >
//                                                 <option value="">Select I'd Proof</option>
//                                                 <option value={"aadhar"}>Aadhar card</option>
//                                                 <option value={"pan"}>Pan card</option>
//                                                 <option value={"licence"}>Driving license</option>
//                                                 <option value={"other"}>Other</option>
//                                             </Form.Select>
//                                         </Form.Group>
//                                         {errors.id_proof && <p className="text-danger">{errors.id_proof}</p>}
        
//                                     </Col>
//                                 </Row>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={handleClose} disabled={loading}>
//           Close
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }

// export default PaymentModal;






import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { MdPayments } from "react-icons/md";
import axios from "axios";
import CommanButton from "../../../components/common/form/commonButtton";

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
        paymentData
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