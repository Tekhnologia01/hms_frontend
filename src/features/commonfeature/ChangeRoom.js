// import { Col, Form, Modal, Row } from "react-bootstrap";
// import { FaTimes } from "react-icons/fa";
// import CommanButton from "../../components/common/form/commonButtton";
// import InputBox from "../../components/common/form/inputbox";
// import { useEffect, useState } from "react";

// const ChangeRoom = ({ show = false, handleClose, patient,patientUpdate }) => {
//   const [formData, setFormData] = useState({
//     patient_name: "",
//     patient_phone_no: "",
//     patient_age: "",
//     patient_address: "",
//   });

//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (patient) {
//       setFormData({
//         patient_name: patient?.Name || "",
//         patient_phone_no: patient?.patient_phone_no || "",  // Corrected field
//         patient_age: patient?.patient_age || "",
//         patient_address: patient?.patient_address || "",  // Added missing value
//       });
//     }
//   }, [patient]);  // Added dependency to avoid infinite re-renders

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Validate form before submission
//   const validateForm = () => {
//     let newErrors = {};
//     if (!formData.patient_name.trim()) newErrors.patient_name = "Patient name is required";
//     if (!formData.patient_phone_no.trim()) newErrors.patient_phone_no = "Phone number is required";
//     if (!formData.patient_age || isNaN(formData.patient_age)) newErrors.patient_age = "Valid age is required";
//     if (!formData.patient_address.trim()) newErrors.patient_address = "Address is required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handle form submission
//   const handleSubmit = async () => {
//     if (!validateForm()) return;
//     try {
//       console.log("Updating patient with data:", formData);
//      patientUpdate(formData);
//      handleClose();
//     } catch (error) {
//       console.error("Error updating patient:", error);
//     }
//   };

//   return (
//     <Modal show={show} onHide={handleClose} size="lg" dialogClassName="custom-modal">
//       <div className="pe-5 ps-5 pt-2">
//         <FaTimes
//           style={{
//             position: "absolute",
//             top: "20px",
//             right: "30px",
//             fontSize: "20px",
//             cursor: "pointer",
//             color: "#999",
//             zIndex: 10,
//           }}
//           onClick={handleClose}
//         />
//         <div className="fw-bold" style={{ fontSize: "1.3rem" }}>Change Room</div>
//       </div>
//       <hr />

//       <div className="pe-5 ps-5 pb-5 pt-3">
//         <Row className="m-0 pb-3">
//           <Col md={6} className="gy-3">
//             <InputBox
//               label="Patient Name"
//               placeholder="Patient Name here..."
//               isRequired={true}
//               name="patient_name"
//               value={formData.patient_name}
//               onChange={handleInputChange}
//             />
//             {errors.patient_name && <p className="text-danger">{errors.patient_name}</p>}
//           </Col>

      
//                                 <Col lg={6}>
//                                     <label className="fw-semibold pb-1 pt-1">
//                                         Room Type <span style={{ color: "red" }}>*</span>
//                                     </label>
//                                     <SelectBox
//                                         name="roomTypeId"
//                                         defaultValue="Select Room Type"
//                                         options={[
//                                             { label: "Select Room Type", option: "" }, // Placeholder option
//                                             ...roomType.map((type) => ({
//                                                 label: type.room_type,
//                                                 option: type.room_type_id,
//                                             })),
//                                         ]}
//                                         onChange={(e) => {
//                                             handleChange(e);
//                                             // setFieldValue("roomId", "");
//                                             fetchRoom(e.target.value);
//                                         }}
//                                     />
//                                     {errors.roomTypeId && touched.roomTypeId && (
//                                         <div className="text-danger">{errors.roomTypeId}</div>
//                                     )}
//                                 </Col>
//                                 <Col lg={6}>
//                                     <label className="fw-semibold pb-1 pt-1">
//                                         Select Room <span style={{ color: "red" }}>*</span>
//                                     </label>
//                                     <SelectBox
//                                         name="roomId"
//                                         defaultValue="Select Room"
//                                         value={values.roomId}
//                                         options={rooms.map((room) => ({
//                                             label: room.room_name,
//                                             option: room.room_id,
//                                         }))}
//                                         onChange={handleChange}
//                                     />
//                                     {errors.roomId && touched.roomId && (
//                                         <div className="text-danger">{errors.roomId}</div>
//                                     )}
//                                 </Col>
//                             </Row>
//                             <Row className="pt-3 m-0">
//                                 <Col lg={6}>
//                                     <InputBox
//                                         placeholder="Bed Name"
//                                         isRequired={true}
//                                         label="Bed Name"
//                                         value={values.bedName}
//                                         onChange={handleChange}
//                                         name="bedName"
//                                     />
//                                     {errors.bedName && touched.bedName && (
//                                         <div className="text-danger">{errors.bedName}</div>
//                                     )}
//                                 </Col>
                     
//         </Row>

//         <div className="d-flex justify-content-end pt-lg-4">

//                   <CommanButton label="Update" className="mb-3 ps-3 pe-3 p-2 fw-semibold" style={{ borderRadius: "5px",}} onClick={handleSubmit} />

//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default ChangeRoom;



// import { Col, Form, Modal, Row } from "react-bootstrap";
// import { FaTimes } from "react-icons/fa";
// import CommanButton from "../../components/common/form/commonButtton";
// import InputBox from "../../components/common/form/inputbox";
// import { useEffect, useState } from "react";

// const ChangeRoom = ({ show = false, handleClose, patient, patientUpdate, roomType = [], fetchRoom, rooms = [] }) => {
//   const [formData, setFormData] = useState({
//     patient_name: "",
//     roomTypeId: "",
//     roomId: "",
//     bedName: ""
//   });

//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (patient) {
//       setFormData(prev => ({
//         ...prev,
//         patient_name: patient?.Name || "",
//       }));
//     }
//   }, [patient]);

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
    
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: "" }));
//     }
//   };

//   const fetchRoomTypes = async () => {
//     try {
//         const response = await axios.get(`${process.env.REACT_APP_API_URL}/roombed/getroomtype`);
//         setRoomType(response?.data?.data || []);
//     } catch (err) {
//         console.log(err);
//     }
// };

// const fetchRoom = async (roomTypeId) => {
//     try {
//         const response = await axios.get(`${process.env.REACT_APP_API_URL}/roombed/getroomtypewise?id=${roomTypeId}`);
//         setRooms(response?.data?.data || []);
//     } catch (err) {
//         console.log(err);
//     }
// };

//   // Validate form before submission
//   const validateForm = () => {
//     let newErrors = {};
//     if (!formData.patient_name.trim()) newErrors.patient_name = "Patient name is required";
//     if (!formData.roomTypeId) newErrors.roomTypeId = "Room type is required";
//     if (!formData.roomId) newErrors.roomId = "Room selection is required";
//     if (!formData.bedName.trim()) newErrors.bedName = "Bed name is required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handle form submission
//   const handleSubmit = async () => {
//     if (!validateForm()) return;
//     try {
//       console.log("Updating patient with data:", formData);
//       await patientUpdate(formData);
//       handleClose();
//     } catch (error) {
//       console.error("Error updating patient:", error);
//       setErrors({ submit: "Failed to update patient" });
//     }
//   };

//   return (
//     <Modal show={show} onHide={handleClose} size="lg" dialogClassName="custom-modal">
//       <div className="pe-5 ps-5 pt-2">
//         <FaTimes
//           style={{
//             position: "absolute",
//             top: "20px",
//             right: "30px",
//             fontSize: "20px",
//             cursor: "pointer",
//             color: "#999",
//             zIndex: 10,
//           }}
//           onClick={handleClose}
//         />
//         <div className="fw-bold" style={{ fontSize: "1.3rem" }}>Change Room</div>
//       </div>
//       <hr />

//       <div className="pe-5 ps-5 pb-5 pt-3">
//         <Row className="m-0 pb-3">
//           <Col md={6} className="gy-3">
//             <InputBox
//               label="Patient Name"
//               placeholder="Patient Name here..."
//               isRequired={true}
//               name="patient_name"
//               value={formData.patient_name}
//               onChange={handleInputChange}
//             />
//             {errors.patient_name && <p className="text-danger">{errors.patient_name}</p>}
//           </Col>

//           <Col lg={6} className="gy-3">
//             <label className="fw-semibold pb-1 pt-1">
//               Room Type <span style={{ color: "red" }}>*</span>
//             </label>
//             <Form.Select
//               name="roomTypeId"
//               value={formData.roomTypeId}
//               onChange={(e) => {
//                 handleInputChange(e);
//                 fetchRoom(e.target.value);
//               }}
//             >
//               <option value="">Select Room Type</option>
//               {roomType.map((type) => (
//                 <option key={type.room_type_id} value={type.room_type_id}>
//                   {type.room_type}
//                 </option>
//               ))}
//             </Form.Select>
//             {errors.roomTypeId && <div className="text-danger">{errors.roomTypeId}</div>}
//           </Col>

//           <Col lg={6} className="gy-3">
//             <label className="fw-semibold pb-1 pt-1">
//               Select Room <span style={{ color: "red" }}>*</span>
//             </label>
//             <Form.Select
//               name="roomId"
//               value={formData.roomId}
//               onChange={handleInputChange}
//             >
//               <option value="">Select Room</option>
//               {rooms.map((room) => (
//                 <option key={room.room_id} value={room.room_id}>
//                   {room.room_name}
//                 </option>
//               ))}
//             </Form.Select>
//             {errors.roomId && <div className="text-danger">{errors.roomId}</div>}
//           </Col>

//           <Col lg={6} className="gy-3">
//             <InputBox
//               placeholder="Bed Name"
//               isRequired={true}
//               label="Bed Name"
//               value={formData.bedName}
//               onChange={handleInputChange}
//               name="bedName"
//             />
//             {errors.bedName && <div className="text-danger">{errors.bedName}</div>}
//           </Col>
//         </Row>

//         {errors.submit && <div className="text-danger text-center mb-3">{errors.submit}</div>}

//         <div className="d-flex justify-content-end pt-lg-4">
//           <CommanButton
//             label="Update"
//             className="mb-3 ps-3 pe-3 p-2 fw-semibold"
//             style={{ borderRadius: "5px" }}
//             onClick={handleSubmit}
//           />
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default ChangeRoom;
// import { Col, Form, Modal, Row } from "react-bootstrap";
// import { FaTimes } from "react-icons/fa";
// import CommanButton from "../../components/common/form/commonButtton";
// import InputBox from "../../components/common/form/inputbox";
// import { useEffect, useState } from "react";
// import axios from "axios";

// const ChangeRoom = ({ show = false, handleClose, patient, patientUpdate }) => {
//   const [formData, setFormData] = useState({
//     patient_name: "",
//     roomTypeId: "",
//     roomId: "",
//     bedName: ""
//   });
//   const [roomType, setRoomType] = useState([]);
//   const [rooms, setRooms] = useState([]);
//   const [beds, setBeds] = useState([]);
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (patient) {
//       setFormData(prev => ({
//         ...prev,
//         patient_name: patient?.Name || "",
//       }));
//     }
//     fetchRoomTypes();
//   }, [patient]);

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => {
//       const newFormData = { ...prev, [name]: value };
//       if (name === "roomTypeId") {
//         newFormData.roomId = "";
//         newFormData.bedName = "";
//         setRooms([]);
//         setBeds([]);
//         if (value) {
//           fetchRoom(value);
//         }
//       } else if (name === "roomId") {
//         newFormData.bedName = "";
//         setBeds([]);
//         if (value) {
//           fetchBeds(value);
//         }
//       }
//       return newFormData;
//     });

//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: "" }));
//     }
//   };

//   const fetchRoomTypes = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_API_URL}/roombed/getroomtype`);
//       setRoomType(response?.data?.data || []);
//     } catch (err) {
//       console.log("Error fetching room types:", err);
//       setErrors({ roomType: "Failed to load room types" });
//     }
//   };

//   const fetchRoom = async (roomTypeId) => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_API_URL}/roombed/getroomtypewise?id=${roomTypeId}`);
//       setRooms(response?.data?.data || []);
//     } catch (err) {
//       console.log("Error fetching rooms:", err);
//       setErrors(prev => ({ ...prev, room: "Failed to load rooms" }));
//     }
//   };




//       async function getBeds(id) {
//           try {
  
//               const response = await axios.get(`${process.env.REACT_APP_API_URL}/roombed/get_available_beds`, {
//                   params: {
//                       room_type: parseInt(formData.room_type),
//                       admit_date: convertDateTimeToEpoch(formData.admit_date, formData.admit_time)
//                   }
//               });
//               if (response.data?.status) {
//                   setBeds(response?.data?.data);
//               }
//           } catch (err) {
//               console.log("Error fetching departments:", err);
//               showToast(err?.response?.data?.message ? err.response?.data?.message : "Bed not available", "info")
//               setBeds([]);
//           }
//       }
  

//   // Validate form before submission
//   const validateForm = () => {
//     let newErrors = {};
//     if (!formData.patient_name.trim()) newErrors.patient_name = "Patient name is required";
//     if (!formData.roomTypeId) newErrors.roomTypeId = "Room type is required";
//     if (!formData.roomId) newErrors.roomId = "Room selection is required";
//     if (!formData.bedName.trim()) newErrors.bedName = "Bed selection is required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handle form submission
//   const handleSubmit = async () => {
//     if (!validateForm()) return;
//     try {
//       console.log("Updating patient with data:", formData);
//       await patientUpdate(formData);
//       handleClose();
//     } catch (error) {
//       console.error("Error updating patient:", error);
//       setErrors({ submit: "Failed to update patient" });
//     }
//   };

//   return (
//     <Modal show={show} onHide={handleClose} size="lg" dialogClassName="custom-modal">
//       <div className="pe-5 ps-5 pt-2">
//         <FaTimes
//           style={{
//             position: "absolute",
//             top: "20px",
//             right: "30px",
//             fontSize: "20px",
//             cursor: "pointer",
//             color: "#999",
//             zIndex: 10,
//           }}
//           onClick={handleClose}
//         />
//         <div className="fw-bold" style={{ fontSize: "1.3rem" }}>Change Room</div>
//       </div>
//       <hr />

//       <div className="pe-5 ps-5 pb-5 pt-3">
//         <Row className="m-0 pb-3">
//           <Col md={6} className="gy-3">
//             <InputBox
//               label="Patient Name"
//               placeholder="Patient Name here..."
//               isRequired={true}
//               name="patient_name"
//               value={formData.patient_name}
//               onChange={handleInputChange}
//             />
//             {errors.patient_name && <p className="text-danger">{errors.patient_name}</p>}
//           </Col>

//           <Col lg={6} className="gy-3">
//             <label className="fw-semibold pb-1 pt-1">
//               Room Type <span style={{ color: "red" }}>*</span>
//             </label>
//             <Form.Select
//               name="roomTypeId"
//               value={formData.roomTypeId}
//               onChange={handleInputChange}
//             >
//               <option value="">Select Room Type</option>
//               {roomType.map((type) => (
//                 <option key={type.room_type_id} value={type.room_type_id}>
//                   {type.room_type}
//                 </option>
//               ))}
//             </Form.Select>
//             {errors.roomTypeId && <div className="text-danger">{errors.roomTypeId}</div>}
//           </Col>

//           <Col lg={6} className="gy-3">
//             <label className="fw-semibold pb-1 pt-1">
//               Select Room <span style={{ color: "red" }}>*</span>
//             </label>
//             <Form.Select
//               name="roomId"
//               value={formData.roomId}
//               onChange={handleInputChange}
//             >
//               <option value="">Select Room</option>
//               {rooms.map((room) => (
//                 <option key={room.room_id} value={room.room_id}>
//                   {room.room_name}
//                 </option>
//               ))}
//             </Form.Select>
//             {errors.roomId && <div className="text-danger">{errors.roomId}</div>}
//           </Col>

//           <Col lg={6} className="gy-3">
//             <label className="fw-semibold pb-1 pt-1">
//               Select Bed <span style={{ color: "red" }}>*</span>
//             </label>
//             <Form.Select
//               name="bedName"
//               value={formData.bedName}
//               onChange={handleInputChange}
//             >
//               <option value="">Select Bed</option>
//               {beds.map((bed) => (
//                 <option key={bed.bed_id} value={bed.bed_name}>
//                   {bed.bed_name}
//                 </option>
//               ))}
//             </Form.Select>
//             {errors.bedName && <div className="text-danger">{errors.bedName}</div>}
//           </Col>
//         </Row>

//         {errors.submit && <div className="text-danger text-center mb-3">{errors.submit}</div>}

//         <div className="d-flex justify-content-end pt-lg-4">
//           <CommanButton
//             label="Update"
//             className="mb-3 ps-3 pe-3 p-2 fw-semibold"
//             style={{ borderRadius: "5px" }}
//             onClick={handleSubmit}
//           />
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default ChangeRoom;


// import { Col, Form, Modal, Row } from "react-bootstrap";
// import { FaTimes } from "react-icons/fa";
// import CommanButton from "../../components/common/form/commonButtton";
// import InputBox from "../../components/common/form/inputbox";
// import { useEffect, useState } from "react";
// import axios from "axios";

// const ChangeRoom = ({ show = false, handleClose, admited, patientUpdate }) => {
//   const [formData, setFormData] = useState({
//     patient_name: "",
//     roomTypeId: "",
//     roomId: "",
//     bedName: "",
//     admit_date: Date.now() // Adding default admit date as epoch
//   });
//   const [roomType, setRoomType] = useState([]);
//   const [rooms, setRooms] = useState([]);
//   const [beds, setBeds] = useState([]);
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (admited) {
//       setFormData(prev => ({
//         ...prev,
//         patient_name: admited?.Name || "",
//       }));
//     }
//     fetchRoomTypes();
//   }, [admited]);

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => {
//       const newFormData = { ...prev, [name]: value };
//       if (name === "roomTypeId") {
//         newFormData.roomId = "";
//         newFormData.bedName = "";
//         setRooms([]);
//         setBeds([]);
//         if (value) {
//           fetchRoom(value);
//         }
//       } else if (name === "roomId") {
//         newFormData.bedName = "";
//         setBeds([]);
//         if (value) {
//           fetchBeds(value);
//         }
//       }
//       return newFormData;
//     });

//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: "" }));
//     }
//   };

//   const fetchRoomTypes = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_API_URL}/roombed/getroomtype`);
//       setRoomType(response?.data?.data || []);
//     } catch (err) {
//       console.log("Error fetching room types:", err);
//       setErrors({ roomType: "Failed to load room types" });
//     }
//   };

//   const fetchRoom = async (roomTypeId) => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_API_URL}/roombed/getroomtypewise?id=${roomTypeId}`);
//       setRooms(response?.data?.data || []);
//     } catch (err) {
//       console.log("Error fetching rooms:", err);
//       setErrors(prev => ({ ...prev, room: "Failed to load rooms" }));
//     }
//   };

//   const fetchBeds = async (roomId) => {
//     try {


//       const response = await axios.get(`${process.env.REACT_APP_API_URL}/roombed/get_available_beds_roomwise`, {
//         params: {
//           roomId: parseInt(roomId),
//         }
//       });
//       if (response.data?.status) {
//         setBeds(response.data.data || []);
//       } else {
//         setBeds([]);
//         setErrors(prev => ({ ...prev, bedName: "No available beds" }));
//       }
//     } catch (err) {
//       console.log("Error fetching beds:", err);
//       setErrors(prev => ({ 
//         ...prev, 
//         bedName: err.response?.data?.message || "Beds not available" 
//       }));
//       setBeds([]);
//     }
//   };

//   // Validate form before submission
//   const validateForm = () => {
//     let newErrors = {};
//     if (!formData.patient_name.trim()) newErrors.patient_name = "Patient name is required";
//     if (!formData.roomTypeId) newErrors.roomTypeId = "Room type is required";
//     if (!formData.roomId) newErrors.roomId = "Room selection is required";
//     if (!formData.bedName.trim()) newErrors.bedName = "Bed selection is required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handle form submission
//   const handleSubmit = async () => {
//     if (!validateForm()) return;
//     try {
//       console.log("Updating patient with data:", formData);
//       await patientUpdate(formData);
//       handleClose();
//     } catch (error) {
//       console.error("Error updating patient:", error);
//       setErrors({ submit: "Failed to update patient" });
//     }
//   };

//   return (
//     <Modal show={show} onHide={handleClose} size="lg" dialogClassName="custom-modal">
//       <div className="pe-5 ps-5 pt-2">
//         <FaTimes
//           style={{
//             position: "absolute",
//             top: "20px",
//             right: "30px",
//             fontSize: "20px",
//             cursor: "pointer",
//             color: "#999",
//             zIndex: 10,
//           }}
//           onClick={handleClose}
//         />
//         <div className="fw-bold" style={{ fontSize: "1.3rem" }}>Change Room</div>
//       </div>
//       <hr />

//       <div className="pe-5 ps-5 pb-5 pt-3">
//         <Row className="m-0 pb-3">
//           <Col md={6} className="gy-3">
//             <InputBox
//               label="Patient Name"
//               placeholder="Patient Name here..."
//               isRequired={true}
//               name="patient_name"
//               value={formData.patient_name}
//               onChange={handleInputChange}
//             />
//             {errors.patient_name && <p className="text-danger">{errors.patient_name}</p>}
//           </Col>

//           <Col lg={6} className="gy-3">
//             <label className="fw-semibold pb-1 pt-1">
//               Room Type <span style={{ color: "red" }}>*</span>
//             </label>
//             <Form.Select
//               name="roomTypeId"
//               value={formData.roomTypeId}
//               onChange={handleInputChange}
//             >
//               <option value="">Select Room Type</option>
//               {roomType.map((type) => (
//                 <option key={type.room_type_id} value={type.room_type_id}>
//                   {type.room_type}
//                 </option>
//               ))}
//             </Form.Select>
//             {errors.roomTypeId && <div className="text-danger">{errors.roomTypeId}</div>}
//           </Col>

//           <Col lg={6} className="gy-3">
//             <label className="fw-semibold pb-1 pt-1">
//               Select Room <span style={{ color: "red" }}>*</span>
//             </label>
//             <Form.Select
//               name="roomId"
//               value={formData.roomId}
//               onChange={handleInputChange}
//             >
//               <option value="">Select Room</option>
//               {rooms.map((room) => (
//                 <option key={room.room_id} value={room.room_id}>
//                   {room.room_name}
//                 </option>
//               ))}
//             </Form.Select>
//             {errors.roomId && <div className="text-danger">{errors.roomId}</div>}
//           </Col>

//           <Col lg={6} className="gy-3">
//             <label className="fw-semibold pb-1 pt-1">
//               Select Bed <span style={{ color: "red" }}>*</span>
//             </label>
//             <Form.Select
//               name="bedName"
//               value={formData.bedName}
//               onChange={handleInputChange}
//             >
//               <option value="">Select Bed</option>
//               {beds.map((bed) => (
//                 <option key={bed.bed_id} value={bed.bed_id}>
//                   {bed.bed_name}
//                 </option>
//               ))}
//             </Form.Select>
//             {errors.bedName && <div className="text-danger">{errors.bedName}</div>}

//           </Col>


         
//         </Row>


//         <Row>
          
//                                       <Col md={6}>
//                                           <Form.Group controlId="shift date">
//                                               <Form.Control
//                                                   min={formData.admit_date}
//                                                   style={{ height: "45.5px" }} name="discharge_date" type="date" value={formData.discharge_date} onChange={handleInputChange} />
//                                           </Form.Group>
//                                       </Col>
//                                       <Col md={6}>
//                                           <Form.Group className="">
//                                               <Form.Control
//                                                   name="shift_time "
//                                                   type="time"
//                                                   value={formData.discharge_time}
//                                                   // onChange={handleDischargeTimeChange}
//                                                   style={{ height: "45.5px" }}
//                                               />
//                                           </Form.Group>
//                                       </Col>
//         </Row>

//         {errors.submit && <div className="text-danger text-center mb-3">{errors.submit}</div>}

//         <div className="d-flex justify-content-end pt-lg-4">
//           <CommanButton
//             label="Update"
//             className="mb-3 ps-3 pe-3 p-2 fw-semibold"
//             style={{ borderRadius: "5px" }}
//             onClick={handleSubmit}
//           />
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default ChangeRoom;



import { Col, Form, Modal, Row } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import CommanButton from "../../components/common/form/commonButtton";
import InputBox from "../../components/common/form/inputbox";
import { useEffect, useState } from "react";
import axios from "axios";

const ChangeRoom = ({ show = false, handleClose, admited, patientUpdate }) => {
  const [formData, setFormData] = useState({
    patient_name: "",
    roomTypeId: "",
    roomId: "",
    bedName: "",
    admit_date: Date.now(),
    discharge_date: "",
    discharge_time: ""
  });
  const [roomType, setRoomType] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [beds, setBeds] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (admited) {
      setFormData(prev => ({
        ...prev,
        patient_name: admited?.Name || "",
        admit_date: admited?.admit_date || Date.now()
      }));
    }
    fetchRoomTypes();
  }, [admited]);

  // Convert date and time to epoch
  const convertToEpoch = (date, time) => {
    if (!date) return null;
    const dateTimeString = time ? `${date}T${time}:00` : `${date}T00:00:00`;
    return new Date(dateTimeString).getTime();
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newFormData = { ...prev, [name]: value };

      if (name === "roomTypeId") {
        newFormData.roomId = "";
        newFormData.bedName = "";
        setRooms([]);
        setBeds([]);
        if (value) {
          fetchRoom(value);
        }
      } else if (name === "roomId") {
        newFormData.bedName = "";
        setBeds([]);
        if (value) {
          fetchBeds(value);
        }
      }

      return newFormData;
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const fetchRoomTypes = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/roombed/getroomtype`);
      setRoomType(response?.data?.data || []);
    } catch (err) {
      console.log("Error fetching room types:", err);
      setErrors({ roomType: "Failed to load room types" });
    }
  };

  const fetchRoom = async (roomTypeId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/roombed/getroomtypewise?id=${roomTypeId}`);
      setRooms(response?.data?.data || []);
    } catch (err) {
      console.log("Error fetching rooms:", err);
      setErrors(prev => ({ ...prev, room: "Failed to load rooms" }));
    }
  };

  const fetchBeds = async (roomId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/roombed/get_available_beds_roomwise`, {
        params: {
          roomId: parseInt(roomId),
        }
      });
      if (response.data?.status) {
        setBeds(response.data.data || []);
      } else {
        setBeds([]);
        setErrors(prev => ({ ...prev, bedName: "No available beds" }));
      }
    } catch (err) {
      console.log("Error fetching beds:", err);
      setErrors(prev => ({ 
        ...prev, 
        bedName: err.response?.data?.message || "Beds not available" 
      }));
      setBeds([]);
    }
  };

  // Validate form before submission
  const validateForm = () => {
    let newErrors = {};
    if (!formData.patient_name.trim()) newErrors.patient_name = "Patient name is required";
    if (!formData.roomTypeId) newErrors.roomTypeId = "Room type is required";
    if (!formData.roomId) newErrors.roomId = "Room selection is required";
    if (!formData.bedName.trim()) newErrors.bedName = "Bed selection is required";
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
        ipd_id:admited.ipd_id,
        bed_id:+formData?.bedName,
        start_date: convertToEpoch(formData.discharge_date, formData.discharge_time)
      };
      

    const response= await axios.post(`${process.env.REACT_APP_API_URL}/roombed/changebed`,submitData)
console.log(response)

      handleClose();
    } catch (error) {
      console.error("Error updating patient:", error);
      setErrors({ submit: "Failed to update patient" });
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
        <div className="fw-bold" style={{ fontSize: "1.3rem" }}>Change Room</div>
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
              Room Type <span style={{ color: "red" }}>*</span>
            </label>
            <Form.Select
              name="roomTypeId"
              value={formData.roomTypeId}
              onChange={handleInputChange}
            >
              <option value="">Select Room Type</option>
              {roomType.map((type) => (
                <option key={type.room_type_id} value={type.room_type_id}>
                  {type.room_type}
                </option>
              ))}
            </Form.Select>
            {errors.roomTypeId && <div className="text-danger">{errors.roomTypeId}</div>}
          </Col>

          <Col lg={6} className="gy-3">
            <label className="fw-semibold pb-1 pt-1">
              Select Room <span style={{ color: "red" }}>*</span>
            </label>
            <Form.Select
              name="roomId"
              value={formData.roomId}
              onChange={handleInputChange}
            >
              <option value="">Select Room</option>
              {rooms.map((room) => (
                <option key={room.room_id} value={room.room_id}>
                  {room.room_name}
                </option>
              ))}
            </Form.Select>
            {errors.roomId && <div className="text-danger">{errors.roomId}</div>}
          </Col>

          <Col lg={6} className="gy-3">
            <label className="fw-semibold pb-1 pt-1">
              Select Bed <span style={{ color: "red" }}>*</span>
            </label>
            <Form.Select
              name="bedName"
              value={formData.bedName}
              onChange={handleInputChange}
            >

              <option value="">Select Bed</option>
              {beds.filter((bed)=>bed.bed_status=="available").map((bed) => (
                <option key={bed.bed_id} value={bed.bed_id}>
                  {bed.bed_name}
                </option>
              ))}
            </Form.Select>
            {errors.bedName && <div className="text-danger">{errors.bedName}</div>}
          </Col>
        </Row>

        <Row className="m-0 pb-3">
          <Col md={6} className="gy-3">
            <label className="fw-semibold pb-1 pt-1">
              Discharge Date <span style={{ color: "red" }}>*</span>
            </label>
            <Form.Control
              min={new Date(formData.admit_date).toISOString().split("T")[0]}
              style={{ height: "45.5px" }}
              name="discharge_date"
              type="date"
              value={formData.discharge_date}
              onChange={handleInputChange}
            />
            {errors.discharge_date && <div className="text-danger">{errors.discharge_date}</div>}
          </Col>
          
          <Col md={6} className="gy-3">
            <label className="fw-semibold pb-1 pt-1">
              Discharge Time
            </label>
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

export default ChangeRoom;