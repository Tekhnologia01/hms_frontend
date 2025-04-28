// import React, { useEffect, useState } from "react";
// import { Col, Form, Modal, Row } from "react-bootstrap";
// import { FaTimes } from "react-icons/fa";
// import CommanButton from "../../components/common/form/commonButtton";
// import Note from "../../components/common/form/textarea";
// import axios from "axios";
// import SelectBox from "../../components/common/form/selectBox/SelectBox";
// import { useSelector } from "react-redux";
// import { validateAppointmentForm } from '../../validation/BookAppiotmentValidattion';
// import CommonToast, { showToast } from "../../components/common/Toaster";

// const BookAppointment = ({ show, handleClose }) => {
//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
//   const [selectedDay, setSelectedDay] = useState(() => {
//     const today = new Date().getDay();
//     return today === 0 ? 7 : today;
//   });

//   const [departments, setDepartments] = useState([]);
//   const [patients, setPatients] = useState([]);
//   const [doctors, setDoctors] = useState([]);
//   const [slots, setSlots] = useState([]);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const { user } = useSelector(state => state?.auth);
//   const token = useSelector((state) => state.auth.currentUserToken);
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   }
//   const [errors, setErrors] = useState({});
//   const initialState = {
//     patientId: "",
//     disease: "",
//     departmentId: "",
//     doctorId: "",
//     slotId: "",
//     consultationReason: "",
//     patientSource: "",
//     visitType: "New",
//   };
//   const [formData, setFormData] = useState(initialState);

//   // Fetch departments
//   async function getDepartments() {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_API_URL}/department/get`,config);
//       setDepartments(response?.data?.data);
//     } catch (err) {
//       console.log("Error fetching departments:", err);
//     }
//   }



//   // Fetch patients
//   async function getPatients() {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_API_URL}/patient/getAll`,config);
//       setPatients(response?.data?.data?.data);
//     } catch (err) {
//       console.log("Error fetching patients:", err);
//     }
//   }

//   // Fetch doctors based on department
//   async function getDoctors(departmentId) {
//     try {
//       if (!departmentId) return;
//       const response = await axios.get(`${process.env.REACT_APP_API_URL}/doctor/getDoctorsDepartmentwise?dep_id=${departmentId}`,config);
//       setDoctors(response?.data?.data?.data);
//     } catch (err) {
//       console.log("Error fetching doctors:", err);
//     }
//   }

//   // Fetch slots based on doctor and selected day
//   async function getSlots(doctorId, selectedDay) {
//     try {
//       if (!doctorId || !selectedDay) return;
//       const response = await axios.get(`${process.env.REACT_APP_API_URL}/slots/getDoctorSlots?doctor_id=${doctorId}&appointment_date=${selectedDate}`,config);
//       setSlots(response?.data?.data);
//     } catch (err) {
//       console.log("Error fetching slots:", err);
//     }
//   }

//   // Handle input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({ ...prev, [name]: value }));

//     if (name === "departmentId") {
//       if (!value) {
//         setDoctors([]);
//         setSlots([]);
//         setFormData((prev) => ({ ...prev, doctorId: "", slotId: "" }));
//       } else {
//         getDoctors(value);
//         setFormData((prev) => ({ ...prev, doctorId: "", slotId: "" }));
//       }
//     }

//     if (name === "doctorId") {
//       if (!value) {
//         setSlots([]);
//         setFormData((prev) => ({ ...prev, slotId: "" }));
//       } else {
//         getSlots(value, selectedDay);
//         setFormData((prev) => ({ ...prev, slotId: "" }));
//       }
//     }
//   };

//   // Handle visit type change
//   const handleVisitTypeChange = (e) => {
//     setFormData((prev) => ({ ...prev, visitType: e.target.value }));
//   };

//   // Handle date change
//   const handleDateChange = (e) => {
//     const newDate = e.target.value;
//     setSelectedDate(newDate);

//     const newDayIndex = new Date(newDate).getDay();
//     const newDayId = newDayIndex === 0 ? 7 : newDayIndex;
//     setSelectedDay(newDayId);

//     if (formData.doctorId) {
//       getSlots(formData.doctorId, newDate);
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async () => {

//     const validationErrors = validateAppointmentForm(formData);
//     setErrors(validationErrors); // Set errors in state

//     // If errors exist, stop form submission
//     if (Object.keys(validationErrors).length > 0) {
//       return;
//     }

//     setIsSubmitted(true);

//     try {
//       const payload = {
//         patient_id: +formData.patientId,
//         disease: formData.disease,
//         appo_department_id: +formData.departmentId,
//         doctor_id: +formData.doctorId,
//         slot_no: +formData.slotId,
//         review: formData.consultationReason,
//         date: selectedDate,
//         patient_source: formData.patientSource,
//         visited_type: formData.visitType,
//       };

//       const response = await axios.post(`${process.env.REACT_APP_API_URL}/appointment/add/${user?.userId}`, payload,config);
//       // alert(response?.data?.message);
//       showToast(response?.data?.message);
//       setFormData(initialState);
//       handleClose();
//     } catch (error) {
//       showToast(error?.response?.data?.message);

//       // alert("Error booking appointment");
//     }
//   };

//   useEffect(() => {
//     getPatients();
//     getDepartments();
//   }, []);

//   return (
//     <Modal show={show} onHide={handleClose} size="lg" dialogClassName="custom-modal">
//       <div className="pe-5 ps-5 pt-4 pb-2">
//         <FaTimes style={{ position: "absolute", top: "20px", right: "30px", fontSize: "20px", cursor: "pointer", color: "#999", zIndex: 10 }} onClick={handleClose} />
//         <div className="fw-bold fs-4">Add Appointment</div>
//       </div>

//       <hr />

//       <div className="pe-5 ps-5 pb-5 pt-3">
//         <Col>
//           <Form.Group controlId="doctorSelect">
//             <Form.Label className="fw-semibold">Select Patient <span style={{ color: "red" }}>*</span></Form.Label>
//             <SelectBox
//               name="patientId"
//               defaultValue="Select Patient"
//               value={formData.patientId}
//               options={patients?.map((patient) => ({
//                 label: patient.Name,
//                 option: patient.Patient_ID,
//               }))}
//               onChange={(e) => handleInputChange({ target: { name: "patientId", value: e.target.value } })}
//             />
//           </Form.Group>
//           {errors.patientId && <p className="text-danger">{errors.patientId}</p>}

//         </Col>
//         <div className="fs-5 fw-semibold pt-4 pb-3">About Patient</div>

//         <Row>
//           <Col lg={6}>
//             <Form.Group controlId="disease">
//               <Form.Label className="fw-semibold">Disease Name <span style={{ color: "red" }}>*</span></Form.Label>
//               <Form.Control style={{ height: "45.5px" }} type="text" placeholder="Enter disease name..." name="disease" value={formData.disease} onChange={handleInputChange} />
//             </Form.Group>
//             {errors.disease && <p className="text-danger">{errors.disease}</p>}

//           </Col>

//           <Col lg={6} className="mt-3 mt-lg-0">
//             <Form.Group controlId="departmentSelect">
//               <Form.Label className="fw-semibold">Select Department <span style={{ color: "red" }}>*</span></Form.Label>
//               <Form.Select style={{ height: "45.5px" }} name="departmentId" value={formData.departmentId} onChange={handleInputChange} isRequired={true}>
//                 <option value="">Select Department</option>
//                 {departments?.map((dept) => (
//                   <option key={dept.department_id} value={dept.department_id}>
//                     {dept.department_name}
//                   </option>
//                 ))}
//               </Form.Select>
//             </Form.Group>

//             {errors.departmentId && <p className="text-danger">{errors.departmentId}</p>}

//           </Col>
//         </Row>

//         <Row className="mt-3 m-0">
//           <Col lg={6}>
//             <Form.Group controlId="patientSource">
//               <Form.Label className="fw-semibold">Patient Source <span style={{ color: "red" }}>*</span></Form.Label>
//               <Form.Control type="text" style={{ height: "45.5px" }} placeholder="Enter patient source..." name="patientSource" value={formData.patientSource} onChange={handleInputChange} />
//             </Form.Group>
//             {errors.patientSource && <p className="text-danger">{errors.patientSource}</p>}

//           </Col>

//           <Col lg={6} className="mt-3 mt-lg-0">
//             <Form.Label className="fw-semibold">Select Visit Type</Form.Label>
//             <div className="d-flex align-items-center" style={{ height: "45.5px" }}>
//               <Form.Check inline type="radio" label="First-Time Visit" name="visitType" id="firstVisit" value="New" checked={formData.visitType === "New"} onChange={handleVisitTypeChange} />
//               <Form.Check inline type="radio" label="Re-Visit" name="visitType" id="reVisit" value="Follow-up" checked={formData.visitType === "Follow-up"} onChange={handleVisitTypeChange} />
//             </div>
//             {errors.visitType && <p className="text-danger">{errors.visitType}</p>}

//           </Col>
//         </Row>

//         <div className="fs-5 fw-semibold pt-4 pb-3">About Doctor</div>

//         <Row>
//           <Col lg={4}>
//             <Form.Group controlId="doctorSelect">
//               <Form.Label className="fw-semibold">Select Doctor <span style={{ color: "red" }}>*</span></Form.Label>
//               <SelectBox
//                 name="doctorId"
//                 defaultValue="Select Doctor"
//                 value={formData?.doctorId}
//                 options={doctors?.map((doc) => ({
//                   label: doc.Name,
//                   option: doc.User_ID,
//                 }))}
//                 onChange={(e) => handleInputChange({ target: { name: "doctorId", value: e.target.value } })}
//               />
//             </Form.Group>
//             {errors.doctorId && <p className="text-danger">{errors.doctorId}</p>}

//           </Col>

//           <Col lg={4} className="mt-4 mt-lg-0">
//             <Form.Group controlId="dateSelect">
//               <Form.Label className="fw-semibold">Select Date <span style={{ color: "red" }}>*</span></Form.Label>
//               <Form.Control style={{ height: "45.5px" }} type="date" value={selectedDate} onChange={handleDateChange} />
//             </Form.Group>

//           </Col>

//           <Col lg={4} className="mt-4 mt-lg-0">
//             <Form.Group controlId="slotSelect">
//               <Form.Label className="fw-semibold">Select Slot <span style={{ color: "red" }}>*</span></Form.Label>
//               <Form.Select style={{ height: "45.5px" }} size="4" name="slotId" value={formData.slotId} onChange={handleInputChange} isRequired={true}>
//                 <option value="">Select Slot</option>
//                 {slots?.map((slot) => (
//                   <option key={slot.SlotId} value={slot.Doc_ava_id}>
//                     {slot.SlotName}
//                   </option>
//                 ))}
//               </Form.Select>
//             </Form.Group>
//             {errors.slotId && <p className="text-danger">{errors.slotId}</p>}
//           </Col>
//         </Row>
//         <Note label="Consultation Reason" placeholder="Enter reason..." name="consultationReason" value={formData.consultationReason} onChange={handleInputChange} className="fs-6 mt-4" isRequired={true} />
//         {errors.consultationReason && <p className="text-danger">{errors.consultationReason}</p>}

//         <div className="d-flex justify-content-end pt-lg-4">
//           <CommanButton disabled={isSubmitted} label="Book Appointment" variant="#7B3F0080" className="mb-3 ps-3 pe-3 p-2 fw-semibold" style={{ borderRadius: "5px" }} onClick={handleSubmit} />
//         </div>
//       </div>
//       <CommonToast />
//     </Modal>
//   );
// };

// export default BookAppointment;


import React, { useEffect, useState } from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import CommanButton from "../../components/common/form/commonButtton";
import Note from "../../components/common/form/textarea";
import axios from "axios";
import SelectBox from "../../components/common/form/selectBox/SelectBox";
import { useSelector } from "react-redux";
import { validateAppointmentForm } from '../../validation/BookAppiotmentValidattion';
import CommonToast, { showToast } from "../../components/common/Toaster";

const BookAppointment = ({ show, handleClose }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [departments, setDepartments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { user } = useSelector(state => state?.auth);
  const token = useSelector((state) => state.auth.currentUserToken);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const [errors, setErrors] = useState({});
  const initialState = {
    patientId: "",
    disease: "",
    departmentId: "",
    doctorId: "",
    appointmentTime: "",
    consultationReason: "",
    patientSource: "",
    visitType: "New",
  };
  const [formData, setFormData] = useState(initialState);

  // Fetch departments
  async function getDepartments() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/department/get`,config);
      setDepartments(response?.data?.data);
    } catch (err) {
      console.log("Error fetching departments:", err);
    }
  }

  // Fetch patients
  async function getPatients() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/patient/getAll`,config);
      setPatients(response?.data?.data?.data);
    } catch (err) {
      console.log("Error fetching patients:", err);
    }
  }

  // Fetch doctors based on department
  async function getDoctors(departmentId) {
    try {
      if (!departmentId) return;
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/doctor/getDoctorsDepartmentwise?dep_id=${departmentId}`,config);
      setDoctors(response?.data?.data?.data);
    } catch (err) {
      console.log("Error fetching doctors:", err);
    }
  }

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "departmentId") {
      if (!value) {
        setDoctors([]);
        setFormData((prev) => ({ ...prev, doctorId: "", appointmentTime: "" }));
      } else {
        getDoctors(value);
        setFormData((prev) => ({ ...prev, doctorId: "", appointmentTime: "" }));
      }
    }
  };

  // Handle visit type change
  const handleVisitTypeChange = (e) => {
    setFormData((prev) => ({ ...prev, visitType: e.target.value }));
  };

  // Handle date change
  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
  };

  // Handle form submission
  const handleSubmit = async () => {
    const validationErrors = validateAppointmentForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }


    setIsSubmitted(true);

    try {
      const payload = {
        patient_id: +formData.patientId,
        disease: formData.disease,
        appo_department_id: +formData.departmentId,
        doctor_id: +formData.doctorId,
        appointment_time: formData.appointmentTime,
        review: formData.consultationReason,
        date: selectedDate,
        patient_source: formData.patientSource,
        visited_type: formData.visitType,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/appointment/add/${user?.userId}`, 
        payload,
        config
      );
      
      showToast(response?.data?.message);
      setFormData(initialState);
      handleClose();

    } catch (error) {
      showToast(error?.response?.data?.message,"error");
    } finally {
      setIsSubmitted(false);
    }
  };

  useEffect(() => {
    getPatients();
    getDepartments();
  }, []);

  return (
    <Modal show={show} onHide={handleClose} size="lg" dialogClassName="custom-modal">
      <div className="pe-5 ps-5 pt-4 pb-2">
        <FaTimes 
          style={{ 
            position: "absolute", 
            top: "20px", 
            right: "30px", 
            fontSize: "20px", 
            cursor: "pointer", 
            color: "#999", 
            zIndex: 10 
          }} 
          onClick={handleClose} 
        />
        <div className="fw-bold fs-4">Add Appointment</div>
      </div>

      <hr />

      <div className="pe-5 ps-5 pb-5 pt-3">
        <Col>
          <Form.Group controlId="doctorSelect">
            <Form.Label className="fw-semibold">Select Patient <span style={{ color: "red" }}>*</span></Form.Label>
            <SelectBox
              name="patientId"
              defaultValue="Select Patient"
              value={formData.patientId}
              options={patients?.map((patient) => ({
                label: patient.Name,
                option: patient.Patient_ID,
              }))}
              onChange={(e) => handleInputChange({ target: { name: "patientId", value: e.target.value } })}
            />
          </Form.Group>
          {errors.patientId && <p className="text-danger">{errors.patientId}</p>}
        </Col>

        <div className="fs-5 fw-semibold pt-4 pb-3">About Patient</div>

        <Row>
          <Col lg={6}>
            <Form.Group controlId="disease">
              <Form.Label className="fw-semibold">Disease Name <span style={{ color: "red" }}>*</span></Form.Label>
              <Form.Control 
                style={{ height: "45.5px" }} 
                type="text" 
                placeholder="Enter disease name..." 
                name="disease" 
                value={formData.disease} 
                onChange={handleInputChange} 
              />
            </Form.Group>
            {errors.disease && <p className="text-danger">{errors.disease}</p>}
          </Col>

          <Col lg={6} className="mt-3 mt-lg-0">
            <Form.Group controlId="departmentSelect">
              <Form.Label className="fw-semibold">Select Department <span style={{ color: "red" }}>*</span></Form.Label>
              <Form.Select 
                style={{ height: "45.5px" }} 
                name="departmentId" 
                value={formData.departmentId} 
                onChange={handleInputChange} 
                isRequired={true}
              >
                <option value="">Select Department</option>
                {departments?.map((dept) => (
                  <option key={dept.department_id} value={dept.department_id}>
                    {dept.department_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            {errors.departmentId && <p className="text-danger">{errors.departmentId}</p>}
          </Col>
        </Row>

        <Row className="mt-3 m-0">
          <Col lg={6}>
            <Form.Group controlId="patientSource">
              <Form.Label className="fw-semibold">Patient Source <span style={{ color: "red" }}>*</span></Form.Label>
              <Form.Control 
                type="text" 
                style={{ height: "45.5px" }} 
                placeholder="Enter patient source..." 
                name="patientSource" 
                value={formData.patientSource} 
                onChange={handleInputChange} 
              />
            </Form.Group>
            {errors.patientSource && <p className="text-danger">{errors.patientSource}</p>}
          </Col>

          <Col lg={6} className="mt-3 mt-lg-0">
            <Form.Label className="fw-semibold">Select Visit Type</Form.Label>
            <div className="d-flex align-items-center" style={{ height: "45.5px" }}>
              <Form.Check 
                inline 
                type="radio" 
                label="First-Time Visit" 
                name="visitType" 
                id="firstVisit" 
                value="New" 
                checked={formData.visitType === "New"} 
                onChange={handleVisitTypeChange} 
              />
              <Form.Check 
                inline 
                type="radio" 
                label="Re-Visit" 
                name="visitType" 
                id="reVisit" 
                value="Follow-up" 
                checked={formData.visitType === "Follow-up"} 
                onChange={handleVisitTypeChange} 
              />
            </div>
            {errors.visitType && <p className="text-danger">{errors.visitType}</p>}
          </Col>
        </Row>

        <div className="fs-5 fw-semibold pt-4 pb-3">About Doctor</div>

        <Row>
          <Col lg={4}>
            <Form.Group controlId="doctorSelect">
              <Form.Label className="fw-semibold">Select Doctor <span style={{ color: "red" }}>*</span></Form.Label>
              <SelectBox
                name="doctorId"
                defaultValue="Select Doctor"
                value={formData?.doctorId}
                options={doctors?.map((doc) => ({
                  label: doc.Name,
                  option: doc.User_ID,
                }))}
                onChange={(e) => handleInputChange({ target: { name: "doctorId", value: e.target.value } })}
              />
            </Form.Group>
            {errors.doctorId && <p className="text-danger">{errors.doctorId}</p>}
          </Col>

          <Col lg={4} className="mt-4 mt-lg-0">
            <Form.Group controlId="dateSelect">
              <Form.Label className="fw-semibold">Select Date <span style={{ color: "red" }}>*</span></Form.Label>
              <Form.Control 
                style={{ height: "45.5px" }} 
                type="date" 
                value={selectedDate} 
                onChange={handleDateChange} 
              />
            </Form.Group>
          </Col>

          <Col lg={4} className="mt-4 mt-lg-0">
            <Form.Group controlId="timeSelect">
              <Form.Label className="fw-semibold">Select Time <span style={{ color: "red" }}>*</span></Form.Label>
              <Form.Control
                style={{ height: "45.5px" }}
                type="time"
                name="appointmentTime"
                value={formData.appointmentTime}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            {errors.appointmentTime && <p className="text-danger">{errors.appointmentTime}</p>}
          </Col>
        </Row>

        <Note 
          label="Consultation Reason" 
          placeholder="Enter reason..." 
          name="consultationReason" 
          value={formData.consultationReason} 
          onChange={handleInputChange} 
          className="fs-6 mt-4" 
          isRequired={true} 
        />
        {errors.consultationReason && <p className="text-danger">{errors.consultationReason}</p>}

        <div className="d-flex justify-content-end pt-lg-4">
          <CommanButton 
            disabled={isSubmitted} 
            label="Book Appointment" 
            variant="#7B3F0080" 
            className="mb-3 ps-3 pe-3 p-2 fw-semibold" 
            style={{ borderRadius: "5px" }} 
            onClick={handleSubmit} 
          />
        </div>
      </div>
      <CommonToast />
    </Modal>
  );
};

export default BookAppointment;