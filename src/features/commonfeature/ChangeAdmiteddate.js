// import { Col, Form, Modal, Row } from "react-bootstrap";
// import { FaTimes } from "react-icons/fa";
// import CommanButton from "../../components/common/form/commonButtton";
// import InputBox from "../../components/common/form/inputbox";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import AddCharges from "./AddCharges";

// const ChangeAdmiteDate = ({ show = false, handleClose, admited, patientUpdate }) => {
//   const token = useSelector((state) => state.auth.currentUserToken);
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//  ,admited.admitted_date=1749803760

//   const getCurrentDate = () => {
//     const today = new Date();
//     const year = today.getFullYear();
//     const month = String(today.getMonth() + 1).padStart(2, '0');
//     const day = String(today.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   };

//   const getCurrentTime = () => {
//     const now = new Date();
//     const hours = String(now.getHours()).padStart(2, '0');
//     const minutes = String(now.getMinutes()).padStart(2, '0');
//     return `${hours}:${minutes}`;
//   };

//   const [formData, setFormData] = useState({
//     patient_name: "",
//     admit_date: getCurrentDate(),
//     admit_time: getCurrentTime()
//   });

//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (admited) {
//       // Parse the admit_date from epoch time to YYYY-MM-DD format
//       const admitDate = admited?.admit_date ? 
//         new Date(admited.admit_date * 1000).toISOString().split('T')[0] : 
//         getCurrentDate();

//       // Parse the admit_time from epoch time to HH:MM format
//       let admitTime = getCurrentTime();
//       if (admited?.admit_date) {
//         const dateObj = new Date(admited.admit_date * 1000);
//         const hours = String(dateObj.getHours()).padStart(2, '0');
//         const minutes = String(dateObj.getMinutes()).padStart(2, '0');
//         admitTime = `${hours}:${minutes}`;
//       }

//       setFormData({
//         patient_name: admited?.Name || "",
//         admit_date: admitDate,
//         admit_time: admitTime
//       });
//     }
//   }, [admited]);


//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));

//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: "" }));
//     }
//   };

//   const validateForm = () => {
//     let newErrors = {};
//     if (!formData.patient_name.trim()) newErrors.patient_name = "Patient name is required";
//     if (!formData.admit_date) newErrors.admit_date = "Admit date is required";
//     if (!formData.admit_time) newErrors.admit_time = "Admit time is required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

// console.log("AddCharges",admited.admitted_date)1749803760


//   const handleSubmit = async () => {
//     if (!validateForm()) return;

//     try {
//       // Combine admit date and time into a single Date object
//       const combinedDateTime = new Date(`${formData.admit_date}T${formData.admit_time}`);

//       // Convert to epoch time in seconds
//       const epochTime = Math.floor(combinedDateTime.getTime() / 1000);




//       const submitData = {
//         admited_id: admited?.admitted_patient_id,
//         admited_date: epochTime
//       };
//       const response = await axios.put(
//         `${process.env.REACT_APP_API_URL}/appointment/updateadmiteddate`,
//         submitData,
//         config
//       );

//     } catch (error) {
//       console.error("Error updating admit date:", error);

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
//         <div className="fw-bold" style={{ fontSize: "1.3rem" }}>Update Admit Date</div>
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
//               disabled
//             />
//           </Col>
//            <Col md={6} className="gy-3">
//             <label className="fw-semibold pb-1 pt-1">
//               Admit Date <span style={{ color: "red" }}>*</span>
//             </label>
//             <Form.Control
//               style={{ height: "45.5px" }}
//               name="admit_date"
//               type="date"
//               value={formData.admit_date}
//               onChange={handleInputChange}
//             />
//             {errors.admit_date && <div className="text-danger">{errors.admit_date}</div>}
//           </Col>
//         </Row>

//         <Row className="m-0 pb-3">


//           <Col md={6} className="gy-3">
//             <label className="fw-semibold pb-1 pt-1">
//               Admit Time <span style={{ color: "red" }}>*</span>
//             </label>
//             <Form.Control
//               name="admit_time"
//               type="time"
//               value={formData.admit_time}
//               onChange={handleInputChange}
//               style={{ height: "45.5px" }}
//             />
//             {errors.admit_time && <div className="text-danger">{errors.admit_time}</div>}
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

// export default ChangeAdmiteDate;
import { Col, Form, Modal, Row } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import CommanButton from "../../components/common/form/commonButtton";
import InputBox from "../../components/common/form/inputbox";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const ChangeAdmiteDate = ({ show = false, handleClose, admited, patientUpdate }) => {
    const token = useSelector((state) => state.auth.currentUserToken);
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    // Function to convert epoch time to date string (YYYY-MM-DD)
    const epochToDateString = (epoch) => {
        const date = new Date(epoch * 1000);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Function to convert epoch time to time string (HH:MM)
    const epochToTimeString = (epoch) => {
        const date = new Date(epoch * 1000);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const [formData, setFormData] = useState({
        patient_name: "",
        admit_date: "",
        admit_time: ""
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (admited) {
            // Set default values from admited.admitted_date (epoch time)
            const defaultDate = admited.admitted_date ?
                epochToDateString(admited.admitted_date) :
                epochToDateString(Math.floor(Date.now() / 1000));

            const defaultTime = admited.admitted_date ?
                epochToTimeString(admited.admitted_date) :
                epochToTimeString(Math.floor(Date.now() / 1000));

            setFormData({
                patient_name: admited?.Name || "",
                admit_date: defaultDate,
                admit_time: defaultTime
            });
        }
    }, [admited]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        let newErrors = {};
        if (!formData.patient_name.trim()) newErrors.patient_name = "Patient name is required";
        if (!formData.admit_date) newErrors.admit_date = "Admit date is required";
        if (!formData.admit_time) newErrors.admit_time = "Admit time is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        try {
            // Combine admit date and time into a single Date object
            const combinedDateTime = new Date(`${formData.admit_date}T${formData.admit_time}`);

            // Convert to epoch time in seconds
            const epochTime = Math.floor(combinedDateTime.getTime() / 1000);

            const submitData = {
                admited_id: admited?.admitted_patient_id,
                admited_date: epochTime
            };

            const response = await axios.put(
                `${process.env.REACT_APP_API_URL}/appointment/updateadmiteddate`,
                submitData,
                config
            );
            
            handleClose()
        } catch (error) {
            console.error("Error updating admit date:", error);
            handleClose()
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
                <div className="fw-bold" style={{ fontSize: "1.3rem" }}>Update Admit Date</div>
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
                            disabled
                        />
                    </Col>
                    <Col md={6} className="gy-3">
                        <label className="fw-semibold pb-1 pt-1">
                            Admit Date <span style={{ color: "red" }}>*</span>
                        </label>
                        <Form.Control
                            style={{ height: "45.5px" }}
                            name="admit_date"
                            type="date"
                            value={formData.admit_date}
                            onChange={handleInputChange}
                        />
                        {errors.admit_date && <div className="text-danger">{errors.admit_date}</div>}
                    </Col>
                </Row>

                <Row className="m-0 pb-3">
                    <Col md={6} className="gy-3">
                        <label className="fw-semibold pb-1 pt-1">
                            Admit Time <span style={{ color: "red" }}>*</span>
                        </label>
                        <Form.Control
                            name="admit_time"
                            type="time"
                            value={formData.admit_time}
                            onChange={handleInputChange}
                            style={{ height: "45.5px" }}
                        />
                        {errors.admit_time && <div className="text-danger">{errors.admit_time}</div>}
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

export default ChangeAdmiteDate;