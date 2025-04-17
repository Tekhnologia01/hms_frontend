// import React, { useEffect, useState } from "react";
// import { Col, Form, Modal, Row } from "react-bootstrap";
// import { FaArrowLeft } from "react-icons/fa";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { Formik, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import CommanButton from "../../components/common/form/commonButtton";
// import Note from "../../components/common/form/textarea";
// import { useLocation, useNavigate } from "react-router-dom";
// import AddPrescriptionTable from "../doctor/appointement/PrescriptionAddTable";
// import { convertDateTimeToEpoch } from "../../utils/epochToDate";
// import CommonToast, { showToast } from "../../components/common/Toaster";
// import ViewDischargeSheet from "./ViewDischargeSheet";

// const DischargePatient = () => {
//     const [prescriptionData, setPrescriptionData] = useState();
//     const [dischargeDetails, setDischargeDetails] = useState({
//         diagnosisDetails: "",
//         chiefComplaints: "",
//         discharge_date: "",
//         discharge_time: "",
//         signs: "",
//         temperature: "",
//         pulse: "",
//         blood_pressure: "",
//         respiratory_rate: "",
//         cvs: "",
//         rs: "",
//         pa: "",
//         cns: "",
//         local_examination: "",
//         past_history: "",
//         discharge_advice: "",
//     });
//     const [showDischargeSheet, setShowDischargeSheet] = useState(false);

//     const location = useLocation();
//     const { user } = useSelector(state => state?.auth);
//     const navigate = useNavigate();

//     const validationSchema = Yup.object({
//         diagnosisDetails: Yup.string().required("Diagnosis is required"),
//         chiefComplaints: Yup.string().required("Chief Complaints are required"),
//         discharge_date: Yup.date().required("Discharge date is required"),
//         discharge_time: Yup.string().required("Admit time is required"),
//         temperature: Yup.string().required("Temperature is required"),
//         pulse: Yup.number().required("Pulse is required"),
//         blood_pressure: Yup.string().required("Blood Pressure is required"),
//         respiratory_rate: Yup.number().required("Respiratory Rate is required"),
//         local_examination: Yup.string().required("Local Examination is required"),
//         discharge_advice: Yup.string().required("Discharge Advice is required"),
//     });

//     async function getPrescription() {
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_API_URL}/prescription/getipdprescription?ipd_id=${location.state}`);
//             setPrescriptionData(response?.data?.data || [
//                 {
//                     srNo: 1,
//                     ipd_id: location.state,
//                     medicine_name: "",
//                     medicine_type: "",
//                     frequency: "",
//                     quantity: "",
//                     dosage: "",
//                     days: "",
//                     common_note: "",
//                     created_by: user?.userId
//                 }
//             ]);
//         } catch (error) {
//             // showToast("Error while retrieving data", "error");
//         }
//     }

//     async function getDischargeDetails() {
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_API_URL}/patient/get_discahrge_details`, {
//                 params: {
//                     ipd_id: location.state
//                 }
//             });
//             if (response?.data?.status) {
//                 setDischargeDetails({
//                     discharge_details_id: response.data.data.discharge_details_id,
//                     diagnosisDetails: response.data.data.diagnosis,
//                     chiefComplaints: response.data.data.chief_complaints,
//                     discharge_date: new Date(response.data.data.discharge_date),
//                     discharge_time: response.data.data.discharge_time,
//                     signs: response.data.data.signs,
//                     temperature: response.data.data.temprature,
//                     pulse: response.data.data.pulse,
//                     blood_pressure: response.data.data.blood_pressure,
//                     respiratory_rate: response.data.data.respiratory_rate,
//                     cvs: response.data.data.cvs,
//                     rs: response.data.data.rs,
//                     pa: response.data.data.pa,
//                     cns: response.data.data.cns,
//                     local_examination: response.data.data.local_examination,
//                     past_history: response.data.data.past_history,
//                     discharge_advice: response.data.data.discharge_advice,
//                 });
//             }
//         } catch (error) {
//             // showToast("Error while retrieving data", "error");
//         }
//     }

//     useEffect(() => {
//         getDischargeDetails();
//         getPrescription();
//     }, [location.state]);

//     const handleSubmit = async (values) => {
//         if (!values?.discharge_details_id) {
//             try {
//                 if (location.state) {
//                     const payload = {
//                         "ipd_id": location.state,
//                         "chief_complaints": values?.chiefComplaints,
//                         "diagnosis": values?.diagnosisDetails,
//                         "signs": values?.signs,
//                         "temperature": values?.temperature,
//                         "pulse": values?.pulse,
//                         "blood_pressure": values?.blood_pressure,
//                         "respiratory_rate": values?.respiratory_rate,
//                         "cvs": values?.cvs,
//                         "rs": values?.rs,
//                         "pa": values?.pa,
//                         "cns": values?.cns,
//                         "local_examination": values?.local_examination,
//                         "past_history": values?.past_history,
//                         "discharge_advice": values?.discharge_advice,
//                         "discharge_date": convertDateTimeToEpoch(values?.discharge_date, values?.discharge_time)
//                     }
//                     const response = await axios.post(`${process.env.REACT_APP_API_URL}/patient/discharge`, payload, {
//                         params: {
//                             userId: user?.userId
//                         }
//                     });
//                     if (response?.data?.status) {
//                         showToast("Discharge details saved successfully", "success");
//                         setShowDischargeSheet(true)
//                         // navigate(-1);
//                     } else {
//                         showToast("Failed to save discharge details", "error");
//                     }

//                 } else {
//                     showToast("IPD ID not found", "error");
//                 }
//             } catch (error) {
//                 // showToast(error?.response?.data?.error ? error?.response?.data?.error : "Failed to save discharge details", "error");
//             }
//         } else {
//             setDischargeDetails(values);
//         }

//         // show discharge sheet
//     }

//     return (
//         <>
//             <CommonToast />

//             <div className="mx-lg-4 m-3 pb-3">
//                 <div className="d-flex align-items-end justify-content-between pt-1 flex-wrap">
//                     <div className="fw-semibold pb-lg-3" style={{ color: "#1D949A", fontSize: "18px" }} onClick={() => navigate(-1)}>
//                         <FaArrowLeft />
//                         <span className="pt-1 px-2">IPD Patients / Discharge Details</span>
//                     </div>
//                 </div>
//                 <Formik
//                     initialValues={dischargeDetails}
//                     validationSchema={validationSchema}
//                     onSubmit={handleSubmit}
//                     enableReinitialize
//                 >
//                     {({ handleSubmit, handleChange, values, setFieldValue }) => {
//                         const handleCheckboxChange = (event) => {
//                             const { value, checked } = event.target;
//                             let selectedSigns = values.signs ? values.signs.split(",") : [];

//                             if (checked) {
//                                 selectedSigns.push(value);
//                             } else {
//                                 selectedSigns = selectedSigns.filter(sign => sign !== value);
//                             }

//                             setFieldValue("signs", selectedSigns.join(","));
//                         };
//                         return (
//                             <Form onSubmit={handleSubmit} className="pe-5 ps-5 pb-5 pt-3">
//                                 <Row>
//                                     <Col md={6}>
//                                         <Note
//                                             label="Diagnosis"
//                                             placeholder="Enter diagnosis details..."
//                                             name="diagnosisDetails"
//                                             className="fs-6 mt-4"
//                                             isRequired
//                                             value={values.diagnosisDetails}
//                                             onChange={handleChange}
//                                             disabled={!!values.discharge_details_id}
//                                         />
//                                         <ErrorMessage name="diagnosisDetails" component="div" className="text-danger" />
//                                     </Col>
//                                     <Col md={6}>
//                                         <Note
//                                             label="Chief Complaints"
//                                             placeholder="Enter complaints details..."
//                                             name="chiefComplaints"
//                                             className="fs-6 mt-4"
//                                             isRequired
//                                             value={values.chiefComplaints}
//                                             onChange={handleChange}
//                                             disabled={!!values.discharge_details_id}
//                                         />
//                                         <ErrorMessage name="chiefComplaints" component="div" className="text-danger" />
//                                     </Col>
//                                 </Row>
//                                 <h5 className="mb-4">Physical Examination</h5>
//                                 <Row className="mb-4">
//                                     <Form.Label className="fw-semibold mb-2">Signs</Form.Label>
//                                     <Col md={2}>
//                                         <Form.Check
//                                             type="checkbox"
//                                             label="Pallor"
//                                             className="me-3"
//                                             value={"Pallor"}
//                                             onChange={handleCheckboxChange}
//                                             checked={values.signs?.includes("Pallor")}
//                                             disabled={!!values.discharge_details_id} />
//                                     </Col>
//                                     <Col md={2}>
//                                         <Form.Check
//                                             type="checkbox"
//                                             label="Cyanosis"
//                                             value={"Cyanosis"}
//                                             onChange={handleCheckboxChange}
//                                             checked={values.signs?.includes("Cyanosis")}
//                                             className="me-3"
//                                             disabled={!!values.discharge_details_id} />
//                                     </Col>
//                                     <Col md={2}>
//                                         <Form.Check
//                                             type="checkbox"
//                                             label="Clubbing"
//                                             value={"Clubbing"}
//                                             className="me-3"
//                                             onChange={handleCheckboxChange}
//                                             checked={values.signs?.includes("Clubbing")}
//                                             disabled={!!values.discharge_details_id}
//                                         />
//                                     </Col>
//                                     <Col md={2}>
//                                         <Form.Check
//                                             type="checkbox"
//                                             label="Icterus"
//                                             value={"Icterus"}
//                                             className="me-3"
//                                             onChange={handleCheckboxChange}
//                                             checked={values.signs?.includes("Icterus")}
//                                             disabled={!!values.discharge_details_id}
//                                         />
//                                     </Col>
//                                     <Col md={2}>
//                                         <Form.Check
//                                             type="checkbox"
//                                             label="Pedal Oedema"
//                                             value={"Pedal Oedema"}
//                                             onChange={handleCheckboxChange}
//                                             checked={values.signs?.includes("Pedal Oedema")}
//                                             disabled={!!values.discharge_details_id}
//                                         />
//                                     </Col>
//                                 </Row>
//                                 <Row className="mb-4">
//                                     <Col md={3}>
//                                         <Form.Label className="fw-semibold">Temperature  <span className="text-danger fw-bold">*</span></Form.Label>
//                                         <Field disabled={!!values.discharge_details_id} name="temperature" type="text" className="form-control" placeholder="Enter temperature" />
//                                         <ErrorMessage name="temperature" component="div" className="text-danger" />
//                                     </Col>
//                                     <Col md={3}>
//                                         <Form.Label className="fw-semibold">Pulse (P)  <span className="text-danger fw-bold">*</span></Form.Label>
//                                         <Field disabled={!!values.discharge_details_id} name="pulse" type="number" className="form-control" placeholder="Enter pulse" />
//                                         <ErrorMessage name="pulse" component="div" className="text-danger" />
//                                     </Col>
//                                     <Col md={3}>
//                                         <Form.Label className="fw-semibold">Blood Pressure (BP)  <span className="text-danger fw-bold">*</span></Form.Label>
//                                         <Field disabled={!!values.discharge_details_id} name="blood_pressure" type="text" className="form-control" placeholder="Enter BP" />
//                                         <ErrorMessage name="blood_pressure" component="div" className="text-danger" />
//                                     </Col>
//                                     <Col md={3}>
//                                         <Form.Label className="fw-semibold">Respiratory Rate (RR)  <span className="text-danger fw-bold">*</span></Form.Label>
//                                         <Field disabled={!!values.discharge_details_id} name="respiratory_rate" type="number" className="form-control" placeholder="Enter RR" />
//                                         <ErrorMessage name="respiratory_rate" component="div" className="text-danger" />
//                                     </Col>
//                                 </Row>

//                                 <Row className="mb-4">
//                                     <Col md={4} lg={6} className="mb-2">
//                                         <Form.Group controlId="cvs">
//                                             <Form.Label className="fw-semibold">CVS</Form.Label>
//                                             <Form.Control
//                                                 type="text"
//                                                 placeholder="Enter CVS"
//                                                 className="rounded-3"
//                                                 disabled={!!values.discharge_details_id}
//                                                 name='cvs' />
//                                         </Form.Group>
//                                     </Col>
//                                     <Col md={4} lg={6} className="mb-2">
//                                         <Form.Group controlId="rs">
//                                             <Form.Label className="fw-semibold">RS</Form.Label>
//                                             <Form.Control
//                                                 type="text"
//                                                 placeholder="Enter RS"
//                                                 className="rounded-3"
//                                                 disabled={!!values.discharge_details_id}
//                                                 name='rs' />
//                                         </Form.Group>
//                                     </Col>
//                                     <Col md={4} lg={6} className="mb-2">
//                                         <Form.Group controlId="pa">
//                                             <Form.Label className="fw-semibold">PA</Form.Label>
//                                             <Form.Control
//                                                 type="text"
//                                                 placeholder="Enter PA"
//                                                 className="rounded-3"
//                                                 disabled={!!values.discharge_details_id}
//                                                 name='pa' />
//                                         </Form.Group>
//                                     </Col>
//                                     <Col md={4} lg={6} className="mb-2">
//                                         <Form.Group controlId="cns">
//                                             <Form.Label className="fw-semibold">CNS</Form.Label>
//                                             <Form.Control
//                                                 type="text"
//                                                 placeholder="Enter CNS"
//                                                 className="rounded-3"
//                                                 disabled={!!values.discharge_details_id}
//                                                 name='cns' />
//                                         </Form.Group>
//                                     </Col>
//                                 </Row>
//                                 <Row>
//                                     <Col md={6}>
//                                         <Note label="Local Examination" name="local_examination" disabled={!!values.discharge_details_id} placeholder="Enter details..." isRequired onChange={handleChange} value={values.local_examination} />
//                                         <ErrorMessage name="local_examination" component="div" className="text-danger" />
//                                     </Col>
//                                     <Col md={6}>
//                                         <Note label="Past History" name="past_history" disabled={!!values.discharge_details_id} placeholder="Enter history..." onChange={handleChange} value={values.past_history} />
//                                         <ErrorMessage name="past_history" component="div" className="text-danger" />
//                                     </Col>
//                                     <Col md={6}>
//                                         <Note label="Advice On Discharge" name="discharge_advice" disabled={!!values.discharge_details_id} placeholder="Enter advice..." isRequired onChange={handleChange} value={values.discharge_advice} />
//                                         <ErrorMessage name="discharge_advice" component="div" className="text-danger" />
//                                     </Col>
//                                     <Col md={6}>
//                                         <Row className="gy-4">
//                                             <Form.Label className="fw-semibold">Select Discharge Date & Time <span className="text-danger fw-bold">*</span></Form.Label>
//                                             <Col md={6}>
//                                                 <Form.Group controlId="discharge_date">
//                                                     <Field
//                                                         as={Form.Control}
//                                                         style={{ height: "45.5px" }}
//                                                         name="discharge_date"
//                                                         type="date"
//                                                         disabled={!!values.discharge_details_id}
//                                                         min={new Date().toISOString().split("T")[0]}
//                                                     />
//                                                     <ErrorMessage name="discharge_date" component="div" className="text-danger" />
//                                                 </Form.Group>
//                                             </Col>

//                                             <Col md={6}>
//                                                 <Form.Group>
//                                                     <Field
//                                                         as={Form.Control}
//                                                         name="discharge_time"
//                                                         type="time"
//                                                         disabled={!!values.discharge_details_id}
//                                                         style={{ height: "45.5px" }}
//                                                     />
//                                                     <ErrorMessage name="discharge_time" component="div" className="text-danger" />
//                                                 </Form.Group>
//                                             </Col>
//                                         </Row>
//                                     </Col>
//                                 </Row>
//                                 <Row className="">
//                                     <Col >
//                                         {(prescriptionData) && <AddPrescriptionTable isIPD={true} ipd_id={location.state} rows={prescriptionData} setRows={setPrescriptionData} role={user?.RoleId} />}
//                                     </Col>
//                                 </Row>
//                                 <div className="d-flex justify-content-end pt-lg-4">
//                                     <CommanButton label="Discharge" variant="#7B3F0080" className="mb-3 ps-3 pe-3 p-2 fw-semibold" style={{ borderRadius: "5px" }} type="submit" />
//                                 </div>
//                             </Form>
//                         )
//                     }}
//                 </Formik>
//                 <ViewDischargeSheet prescriptionData={prescriptionData} ipd_id={location.state} show={showDischargeSheet} setShow={setShowDischargeSheet} data={dischargeDetails} />
//             </div>
//         </>

//     );
// };

// export default DischargePatient;

// import React, { useEffect, useState } from "react";
// import { Col, Form, Modal, Row } from "react-bootstrap";
// import { FaArrowLeft } from "react-icons/fa";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { Formik, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import CommanButton from "../../components/common/form/commonButtton";
// import Note from "../../components/common/form/textarea";
// import { useLocation, useNavigate } from "react-router-dom";
// import AddPrescriptionTable from "../doctor/appointement/PrescriptionAddTable";
// import { convertDateTimeToEpoch } from "../../utils/epochToDate";
// import CommonToast, { showToast } from "../../components/common/Toaster";
// import ViewDischargeSheet from "./ViewDischargeSheet";

// const DischargePatient = () => {
//     const [prescriptionData, setPrescriptionData] = useState();
//     const [dischargeDetails, setDischargeDetails] = useState({
//         diagnosisDetails: "",
//         chiefComplaints: "",
//         discharge_date: "",
//         discharge_time: "",
//         signs: "",
//         temperature: "",
//         pulse: "",
//         blood_pressure: "",
//         respiratory_rate: "",
//         cvs: "",
//         rs: "",
//         pa: "",
//         cns: "",
//         local_examination: "",
//         past_history: "",
//         discharge_advice: "",
//     });
//     const [showDischargeSheet, setShowDischargeSheet] = useState(false);

//     const location = useLocation();
//     const { user } = useSelector(state => state?.auth);
//     const navigate = useNavigate();

//     const validationSchema = Yup.object({
//         diagnosisDetails: Yup.string().required("Diagnosis is required"),
//         chiefComplaints: Yup.string().required("Chief Complaints are required"),
//         discharge_date: Yup.date().required("Discharge date is required"),
//         discharge_time: Yup.string().required("Admit time is required"),
//         temperature: Yup.string().required("Temperature is required"),
//         pulse: Yup.number().required("Pulse is required"),
//         blood_pressure: Yup.string().required("Blood Pressure is required"),
//         respiratory_rate: Yup.number().required("Respiratory Rate is required"),
//         local_examination: Yup.string().required("Local Examination is required"),
//         discharge_advice: Yup.string().required("Discharge Advice is required"),
//     });

//     async function getPrescription() {
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_API_URL}/prescription/getipdprescription?ipd_id=${location.state}`);
//             setPrescriptionData(response?.data?.data || [
//                 {
//                     srNo: 1,
//                     ipd_id: location.state,
//                     medicine_name: "",
//                     medicine_type: "",
//                     frequency: "",
//                     quantity: "",
//                     dosage: "",
//                     days: "",
//                     common_note: "",
//                     created_by: user?.userId
//                 }
//             ]);
//         } catch (error) {
//             showToast("Error while retrieving prescription data", "error");
//         }
//     }

//     async function getDischargeDetails() {
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_API_URL}/patient/get_discahrge_details`, {
//                 params: {
//                     ipd_id: location.state
//                 }
//             });
//             if (response?.data?.status) {
//                 const dischargeDate = new Date(response.data.data.discharge_date);
//                 setDischargeDetails({
//                     discharge_details_id: response.data.data.discharge_details_id,
//                     diagnosisDetails: response.data.data.diagnosis,
//                     chiefComplaints: response.data.data.chief_complaints,
//                     discharge_date: dischargeDate.toISOString().split('T')[0],
//                     discharge_time: response.data.data.discharge_time,
//                     signs: response.data.data.signs,
//                     temperature: response.data.data.temprature,
//                     pulse: response.data.data.pulse,
//                     blood_pressure: response.data.data.blood_pressure,
//                     respiratory_rate: response.data.data.respiratory_rate,
//                     cvs: response.data.data.cvs,
//                     rs: response.data.data.rs,
//                     pa: response.data.data.pa,
//                     cns: response.data.data.cns,
//                     local_examination: response.data.data.local_examination,
//                     past_history: response.data.data.past_history,
//                     discharge_advice: response.data.data.discharge_advice,
//                 });
//             }
//         } catch (error) {
//             showToast("Error while retrieving discharge details", "error");
//         }
//     }

//     useEffect(() => {
//         getDischargeDetails();
//         getPrescription();
//     }, [location.state]);

//     const handleSubmit = async (values) => {
//         try {
//             const payload = {
//                 "ipd_id": location.state,
//                 "chief_complaints": values?.chiefComplaints,
//                 "diagnosis": values?.diagnosisDetails,
//                 "signs": values?.signs,
//                 "temperature": values?.temperature,
//                 "pulse": values?.pulse,
//                 "blood_pressure": values?.blood_pressure,
//                 "respiratory_rate": values?.respiratory_rate,
//                 "cvs": values?.cvs,
//                 "rs": values?.rs,
//                 "pa": values?.pa,
//                 "cns": values?.cns,
//                 "local_examination": values?.local_examination,
//                 "past_history": values?.past_history,
//                 "discharge_advice": values?.discharge_advice,
//                 "discharge_date": convertDateTimeToEpoch(values?.discharge_date, values?.discharge_time)
//             };

//             let response;

//             if (values?.discharge_details_id) {
//                 // Update existing discharge details
//                 response = await axios.put(
//                     `${process.env.REACT_APP_API_URL}/patient/update_discharge_details`,
//                     {
//                         ...payload,
//                         discharge_details_id: values.discharge_details_id
//                     },
//                     {
//                         params: {
//                             userId: user?.userId
//                         }
//                     }
//                 );
//             } else {
//                 // Create new discharge details
//                 response = await axios.post(
//                     `${process.env.REACT_APP_API_URL}/patient/discharge`, 
//                     payload,
//                     {
//                         params: {
//                             userId: user?.userId
//                         }
//                     }
//                 );
//             }

//             if (response?.data?.status) {
//                 showToast(
//                     values?.discharge_details_id 
//                         ? "Discharge details updated successfully" 
//                         : "Discharge details saved successfully", 
//                     "success"
//                 );
//                 getDischargeDetails(); // Refresh the data
//                 setShowDischargeSheet(true);
//             } else {
//                 showToast("Failed to save discharge details", "error");
//             }
//         } catch (error) {
//             showToast(
//                 error?.response?.data?.error 
//                     ? error?.response?.data?.error 
//                     : "Failed to save discharge details", 
//                 "error"
//             );
//         }
//     };

//     return (
//         <>
//             <CommonToast />

//             <div className="mx-lg-4 m-3 pb-3">
//                 <div className="d-flex align-items-end justify-content-between pt-1 flex-wrap">
//                     <div className="fw-semibold pb-lg-3" style={{ color: "#1D949A", fontSize: "18px" }} onClick={() => navigate(-1)}>
//                         <FaArrowLeft />
//                         <span className="pt-1 px-2">IPD Patients / Discharge Details</span>
//                     </div>
//                 </div>
//                 <Formik
//                     initialValues={dischargeDetails}
//                     validationSchema={validationSchema}
//                     onSubmit={handleSubmit}
//                     enableReinitialize
//                 >
//                     {({ handleSubmit, handleChange, values, setFieldValue }) => {
//                         const handleCheckboxChange = (event) => {
//                             const { value, checked } = event.target;
//                             let selectedSigns = values.signs ? values.signs.split(",") : [];

//                             if (checked) {
//                                 selectedSigns.push(value);
//                             } else {
//                                 selectedSigns = selectedSigns.filter(sign => sign !== value);
//                             }

//                             setFieldValue("signs", selectedSigns.join(","));
//                         };

//                         const isEditMode = !!values.discharge_details_id;

//                         return (
//                             <Form onSubmit={handleSubmit} className="pe-5 ps-5 pb-5 pt-3">
//                                 <Row>
//                                     <Col md={6}>
//                                         <Note
//                                             label="Diagnosis"
//                                             placeholder="Enter diagnosis details..."
//                                             name="diagnosisDetails"
//                                             className="fs-6 mt-4"
//                                             isRequired
//                                             value={values.diagnosisDetails}
//                                             onChange={handleChange}
//                                             disabled={isEditMode}
//                                         />
//                                         <ErrorMessage name="diagnosisDetails" component="div" className="text-danger" />
//                                     </Col>
//                                     <Col md={6}>
//                                         <Note
//                                             label="Chief Complaints"
//                                             placeholder="Enter complaints details..."
//                                             name="chiefComplaints"
//                                             className="fs-6 mt-4"
//                                             isRequired
//                                             value={values.chiefComplaints}
//                                             onChange={handleChange}
//                                             disabled={isEditMode}
//                                         />
//                                         <ErrorMessage name="chiefComplaints" component="div" className="text-danger" />
//                                     </Col>
//                                 </Row>
//                                 <h5 className="mb-4">Physical Examination</h5>
//                                 <Row className="mb-4">
//                                     <Form.Label className="fw-semibold mb-2">Signs</Form.Label>
//                                     <Col md={2}>
//                                         <Form.Check
//                                             type="checkbox"
//                                             label="Pallor"
//                                             className="me-3"
//                                             value={"Pallor"}
//                                             onChange={handleCheckboxChange}
//                                             checked={values.signs?.includes("Pallor")}
//                                             disabled={isEditMode} />
//                                     </Col>
//                                     <Col md={2}>
//                                         <Form.Check
//                                             type="checkbox"
//                                             label="Cyanosis"
//                                             value={"Cyanosis"}
//                                             onChange={handleCheckboxChange}
//                                             checked={values.signs?.includes("Cyanosis")}
//                                             className="me-3"
//                                             disabled={isEditMode} />
//                                     </Col>
//                                     <Col md={2}>
//                                         <Form.Check
//                                             type="checkbox"
//                                             label="Clubbing"
//                                             value={"Clubbing"}
//                                             className="me-3"
//                                             onChange={handleCheckboxChange}
//                                             checked={values.signs?.includes("Clubbing")}
//                                             disabled={isEditMode}
//                                         />
//                                     </Col>
//                                     <Col md={2}>
//                                         <Form.Check
//                                             type="checkbox"
//                                             label="Icterus"
//                                             value={"Icterus"}
//                                             className="me-3"
//                                             onChange={handleCheckboxChange}
//                                             checked={values.signs?.includes("Icterus")}
//                                             disabled={isEditMode}
//                                         />
//                                     </Col>
//                                     <Col md={2}>
//                                         <Form.Check
//                                             type="checkbox"
//                                             label="Pedal Oedema"
//                                             value={"Pedal Oedema"}
//                                             onChange={handleCheckboxChange}
//                                             checked={values.signs?.includes("Pedal Oedema")}
//                                             disabled={isEditMode}
//                                         />
//                                     </Col>
//                                 </Row>
//                                 <Row className="mb-4">
//                                     <Col md={3}>
//                                         <Form.Label className="fw-semibold">Temperature  <span className="text-danger fw-bold">*</span></Form.Label>
//                                         <Field disabled={isEditMode} name="temperature" type="text" className="form-control" placeholder="Enter temperature" />
//                                         <ErrorMessage name="temperature" component="div" className="text-danger" />
//                                     </Col>
//                                     <Col md={3}>
//                                         <Form.Label className="fw-semibold">Pulse (P)  <span className="text-danger fw-bold">*</span></Form.Label>
//                                         <Field disabled={isEditMode} name="pulse" type="number" className="form-control" placeholder="Enter pulse" />
//                                         <ErrorMessage name="pulse" component="div" className="text-danger" />
//                                     </Col>
//                                     <Col md={3}>
//                                         <Form.Label className="fw-semibold">Blood Pressure (BP)  <span className="text-danger fw-bold">*</span></Form.Label>
//                                         <Field disabled={isEditMode} name="blood_pressure" type="text" className="form-control" placeholder="Enter BP" />
//                                         <ErrorMessage name="blood_pressure" component="div" className="text-danger" />
//                                     </Col>
//                                     <Col md={3}>
//                                         <Form.Label className="fw-semibold">Respiratory Rate (RR)  <span className="text-danger fw-bold">*</span></Form.Label>
//                                         <Field disabled={isEditMode} name="respiratory_rate" type="number" className="form-control" placeholder="Enter RR" />
//                                         <ErrorMessage name="respiratory_rate" component="div" className="text-danger" />
//                                     </Col>
//                                 </Row>

//                                 <Row className="mb-4">
//                                     <Col md={4} lg={6} className="mb-2">
//                                         <Form.Group controlId="cvs">
//                                             <Form.Label className="fw-semibold">CVS</Form.Label>
//                                             <Form.Control
//                                                 type="text"
//                                                 placeholder="Enter CVS"
//                                                 className="rounded-3"
//                                                 disabled={isEditMode}
//                                                 name='cvs'
//                                                 value={values.cvs}
//                                                 onChange={handleChange} />
//                                         </Form.Group>
//                                     </Col>
//                                     <Col md={4} lg={6} className="mb-2">
//                                         <Form.Group controlId="rs">
//                                             <Form.Label className="fw-semibold">RS</Form.Label>
//                                             <Form.Control
//                                                 type="text"
//                                                 placeholder="Enter RS"
//                                                 className="rounded-3"
//                                                 disabled={isEditMode}
//                                                 name='rs'
//                                                 value={values.rs}
//                                                 onChange={handleChange} />
//                                         </Form.Group>
//                                     </Col>
//                                     <Col md={4} lg={6} className="mb-2">
//                                         <Form.Group controlId="pa">
//                                             <Form.Label className="fw-semibold">PA</Form.Label>
//                                             <Form.Control
//                                                 type="text"
//                                                 placeholder="Enter PA"
//                                                 className="rounded-3"
//                                                 disabled={isEditMode}
//                                                 name='pa'
//                                                 value={values.pa}
//                                                 onChange={handleChange} />
//                                         </Form.Group>
//                                     </Col>
//                                     <Col md={4} lg={6} className="mb-2">
//                                         <Form.Group controlId="cns">
//                                             <Form.Label className="fw-semibold">CNS</Form.Label>
//                                             <Form.Control
//                                                 type="text"
//                                                 placeholder="Enter CNS"
//                                                 className="rounded-3"
//                                                 disabled={isEditMode}
//                                                 name='cns'
//                                                 value={values.cns}
//                                                 onChange={handleChange} />
//                                         </Form.Group>
//                                     </Col>
//                                 </Row>
//                                 <Row>
//                                     <Col md={6}>
//                                         <Note 
//                                             label="Local Examination" 
//                                             name="local_examination" 
//                                             disabled={isEditMode} 
//                                             placeholder="Enter details..." 
//                                             isRequired 
//                                             onChange={handleChange} 
//                                             value={values.local_examination} 
//                                         />
//                                         <ErrorMessage name="local_examination" component="div" className="text-danger" />
//                                     </Col>
//                                     <Col md={6}>
//                                         <Note 
//                                             label="Past History" 
//                                             name="past_history" 
//                                             disabled={isEditMode} 
//                                             placeholder="Enter history..." 
//                                             onChange={handleChange} 
//                                             value={values.past_history} 
//                                         />
//                                         <ErrorMessage name="past_history" component="div" className="text-danger" />
//                                     </Col>
//                                     <Col md={6}>
//                                         <Note 
//                                             label="Advice On Discharge" 
//                                             name="discharge_advice" 
//                                             disabled={isEditMode} 
//                                             placeholder="Enter advice..." 
//                                             isRequired 
//                                             onChange={handleChange} 
//                                             value={values.discharge_advice} 
//                                         />
//                                         <ErrorMessage name="discharge_advice" component="div" className="text-danger" />
//                                     </Col>
//                                     <Col md={6}>
//                                         <Row className="gy-4">
//                                             <Form.Label className="fw-semibold">Select Discharge Date & Time <span className="text-danger fw-bold">*</span></Form.Label>
//                                             <Col md={6}>
//                                                 <Form.Group controlId="discharge_date">
//                                                     <Field
//                                                         as={Form.Control}
//                                                         style={{ height: "45.5px" }}
//                                                         name="discharge_date"
//                                                         type="date"
//                                                         disabled={isEditMode}
//                                                         min={new Date().toISOString().split("T")[0]}
//                                                     />
//                                                     <ErrorMessage name="discharge_date" component="div" className="text-danger" />
//                                                 </Form.Group>
//                                             </Col>

//                                             <Col md={6}>
//                                                 <Form.Group>
//                                                     <Field
//                                                         as={Form.Control}
//                                                         name="discharge_time"
//                                                         type="time"
//                                                         disabled={isEditMode}
//                                                         style={{ height: "45.5px" }}
//                                                     />
//                                                     <ErrorMessage name="discharge_time" component="div" className="text-danger" />
//                                                 </Form.Group>
//                                             </Col>
//                                         </Row>
//                                     </Col>
//                                 </Row>
//                                 <Row className="">
//                                     <Col >
//                                         {(prescriptionData) && <AddPrescriptionTable isIPD={true} ipd_id={location.state} rows={prescriptionData} setRows={setPrescriptionData} role={user?.RoleId} />}
//                                     </Col>
//                                 </Row>
//                                 <div className="d-flex justify-content-end pt-lg-4">
//                                     <CommanButton 
//                                         label={isEditMode ? "Update Discharge" : "Discharge"} 
//                                         variant="#7B3F0080" 
//                                         className="mb-3 ps-3 pe-3 p-2 fw-semibold" 
//                                         style={{ borderRadius: "5px" }} 
//                                         type="submit" 
//                                     />
//                                 </div>
//                             </Form>
//                         )
//                     }}
//                 </Formik>
//                 <ViewDischargeSheet 
//                     prescriptionData={prescriptionData} 
//                     ipd_id={location.state} 
//                     show={showDischargeSheet} 
//                     setShow={setShowDischargeSheet} 
//                     data={dischargeDetails} 
//                 />
//             </div>
//         </>
//     );
// };

// export default DischargePatient;


// import React, { useEffect, useState } from "react";
// import { Col, Form, Modal, Row } from "react-bootstrap";
// import { FaArrowLeft } from "react-icons/fa";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { Formik, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import CommanButton from "../../components/common/form/commonButtton";
// import Note from "../../components/common/form/textarea";
// import { useLocation, useNavigate } from "react-router-dom";
// import AddPrescriptionTable from "../doctor/appointement/PrescriptionAddTable";
// import { convertDateTimeToEpoch } from "../../utils/epochToDate";
// import CommonToast, { showToast } from "../../components/common/Toaster";
// import ViewDischargeSheet from "./ViewDischargeSheet";

// const DischargePatient = () => {
//     const [prescriptionData, setPrescriptionData] = useState();
//     const [dischargeDetails, setDischargeDetails] = useState({
//         diagnosisDetails: "",
//         chiefComplaints: "",
//         discharge_date: "",
//         discharge_time: "",
//         signs: "",
//         temperature: "",
//         pulse: "",
//         blood_pressure: "",
//         respiratory_rate: "",
//         cvs: "",
//         rs: "",
//         pa: "",
//         cns: "",
//         local_examination: "",
//         past_history: "",
//         discharge_advice: "",
//     });
//     const [showDischargeSheet, setShowDischargeSheet] = useState(false);

//     const location = useLocation();
//     const { user } = useSelector(state => state?.auth);
//     const navigate = useNavigate();

//     const validationSchema = Yup.object({
//         diagnosisDetails: Yup.string().required("Diagnosis is required"),
//         chiefComplaints: Yup.string().required("Chief Complaints are required"),
//         discharge_date: Yup.date().required("Discharge date is required"),
//         discharge_time: Yup.string().required("Admit time is required"),
//         temperature: Yup.string().required("Temperature is required"),
//         pulse: Yup.number().required("Pulse is required"),
//         blood_pressure: Yup.string().required("Blood Pressure is required"),
//         respiratory_rate: Yup.number().required("Respiratory Rate is required"),
//         local_examination: Yup.string().required("Local Examination is required"),
//         discharge_advice: Yup.string().required("Discharge Advice is required"),
//     });

//     async function getPrescription() {
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_API_URL}/prescription/getipdprescription?ipd_id=${location.state}`);
//             setPrescriptionData(response?.data?.data || [
//                 {
//                     srNo: 1,
//                     ipd_id: location.state,
//                     medicine_name: "",
//                     medicine_type: "",
//                     frequency: "",
//                     quantity: "",
//                     dosage: "",
//                     days: "",
//                     common_note: "",
//                     created_by: user?.userId
//                 }
//             ]);
//         } catch (error) {
//             showToast("Error while retrieving prescription data", "error");
//         }
//     }

//     async function getDischargeDetails() {
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_API_URL}/patient/get_discahrge_details`, {
//                 params: {
//                     ipd_id: location.state
//                 }
//             });
//             if (response?.data?.status) {
//                 const dischargeDate = new Date(response.data.data.discharge_date);
//                 setDischargeDetails({
//                     discharge_details_id: response.data.data.discharge_details_id,
//                     diagnosisDetails: response.data.data.diagnosis,
//                     chiefComplaints: response.data.data.chief_complaints,
//                     discharge_date: dischargeDate.toISOString().split('T')[0],
//                     discharge_time: response.data.data.discharge_time,
//                     signs: response.data.data.signs,
//                     temperature: response.data.data.temprature,
//                     pulse: response.data.data.pulse,
//                     blood_pressure: response.data.data.blood_pressure,
//                     respiratory_rate: response.data.data.respiratory_rate,
//                     cvs: response.data.data.cvs,
//                     rs: response.data.data.rs,
//                     pa: response.data.data.pa,
//                     cns: response.data.data.cns,
//                     local_examination: response.data.data.local_examination,
//                     past_history: response.data.data.past_history,
//                     discharge_advice: response.data.data.discharge_advice,
//                 });
//             }
//         } catch (error) {
//             showToast("Error while retrieving discharge details", "error");
//         }
//     }

//     useEffect(() => {
//         getDischargeDetails();
//         getPrescription();
//     }, [location.state]);

//     const handleSubmit = async (values) => {
//         try {
//             const payload = {
//                 "ipd_id": location.state,
//                 "chief_complaints": values?.chiefComplaints,
//                 "diagnosis": values?.diagnosisDetails,
//                 "signs": values?.signs,
//                 "temperature": values?.temperature,
//                 "pulse": values?.pulse,
//                 "blood_pressure": values?.blood_pressure,
//                 "respiratory_rate": values?.respiratory_rate,
//                 "cvs": values?.cvs,
//                 "rs": values?.rs,
//                 "pa": values?.pa,
//                 "cns": values?.cns,
//                 "local_examination": values?.local_examination,
//                 "past_history": values?.past_history,
//                 "discharge_advice": values?.discharge_advice,
//                 "discharge_date": convertDateTimeToEpoch(values?.discharge_date, values?.discharge_time)
//             };

//             let response;

//             if (values?.discharge_details_id) {
//                 // Update existing discharge details
//                 response = await axios.put(
//                     `${process.env.REACT_APP_API_URL}/patient/update_discharge_details`,
//                     {
//                         ...payload,
//                         discharge_details_id: values.discharge_details_id
//                     },
//                     {
//                         params: {
//                             userId: user?.userId
//                         }
//                     }
//                 );
//             } else {
//                 // Create new discharge details
//                 response = await axios.post(
//                     `${process.env.REACT_APP_API_URL}/patient/discharge`, 
//                     payload,
//                     {
//                         params: {
//                             userId: user?.userId
//                         }
//                     }
//                 );
//             }

//             if (response?.data?.status) {
//                 showToast(
//                     values?.discharge_details_id 
//                         ? "Discharge details updated successfully" 
//                         : "Discharge details saved successfully", 
//                     "success"
//                 );
//                 getDischargeDetails(); // Refresh the data
//                 setShowDischargeSheet(true);
//             } else {
//                 showToast("Failed to save discharge details", "error");
//             }
//         } catch (error) {
//             showToast(
//                 error?.response?.data?.error 
//                     ? error?.response?.data?.error 
//                     : "Failed to save discharge details", 
//                 "error"
//             );
//         }
//     };

//     // Define which fields should be editable in edit mode
//     const editableFieldsInEditMode = [
//         'cvs', 'rs', 'pa', 'cns', 'local_examination', 
//         'past_history', 'discharge_advice'
//     ];

//     const isFieldEditable = (fieldName) => {
//         const isEditMode = !!dischargeDetails.discharge_details_id;
//         return !isEditMode || editableFieldsInEditMode.includes(fieldName);
//     };

//     return (
//         <>
//             <CommonToast />

//             <div className="mx-lg-4 m-3 pb-3">
//                 <div className="d-flex align-items-end justify-content-between pt-1 flex-wrap">
//                     <div className="fw-semibold pb-lg-3" style={{ color: "#1D949A", fontSize: "18px" }} onClick={() => navigate(-1)}>
//                         <FaArrowLeft />
//                         <span className="pt-1 px-2">IPD Patients / Discharge Details</span>
//                     </div>
//                 </div>
//                 <Formik
//                     initialValues={dischargeDetails}
//                     validationSchema={validationSchema}
//                     onSubmit={handleSubmit}
//                     enableReinitialize
//                 >
//                     {({ handleSubmit, handleChange, values, setFieldValue }) => {
//                         const handleCheckboxChange = (event) => {
//                             const { value, checked } = event.target;
//                             let selectedSigns = values.signs ? values.signs.split(",") : [];

//                             if (checked) {
//                                 selectedSigns.push(value);
//                             } else {
//                                 selectedSigns = selectedSigns.filter(sign => sign !== value);
//                             }

//                             setFieldValue("signs", selectedSigns.join(","));
//                         };

//                         const isEditMode = !!values.discharge_details_id;

//                         return (
//                             <Form onSubmit={handleSubmit} className="pe-5 ps-5 pb-5 pt-3">
//                                 <Row>
//                                     <Col md={6}>
//                                         <Note
//                                             label="Diagnosis"
//                                             placeholder="Enter diagnosis details..."
//                                             name="diagnosisDetails"
//                                             className="fs-6 mt-4"
//                                             isRequired
//                                             value={values.diagnosisDetails}
//                                             onChange={handleChange}
//                                             disabled={!isFieldEditable('diagnosisDetails')}
//                                         />
//                                         <ErrorMessage name="diagnosisDetails" component="div" className="text-danger" />
//                                     </Col>
//                                     <Col md={6}>
//                                         <Note
//                                             label="Chief Complaints"
//                                             placeholder="Enter complaints details..."
//                                             name="chiefComplaints"
//                                             className="fs-6 mt-4"
//                                             isRequired
//                                             value={values.chiefComplaints}
//                                             onChange={handleChange}
//                                             disabled={!isFieldEditable('chiefComplaints')}
//                                         />
//                                         <ErrorMessage name="chiefComplaints" component="div" className="text-danger" />
//                                     </Col>
//                                 </Row>
//                                 <h5 className="mb-4">Physical Examination</h5>
//                                 <Row className="mb-4">
//                                     <Form.Label className="fw-semibold mb-2">Signs</Form.Label>
//                                     <Col md={2}>
//                                         <Form.Check
//                                             type="checkbox"
//                                             label="Pallor"
//                                             className="me-3"
//                                             value={"Pallor"}
//                                             onChange={handleCheckboxChange}
//                                             checked={values.signs?.includes("Pallor")}
//                                             disabled={!isFieldEditable('signs')} />
//                                     </Col>
//                                     <Col md={2}>
//                                         <Form.Check
//                                             type="checkbox"
//                                             label="Cyanosis"
//                                             value={"Cyanosis"}
//                                             onChange={handleCheckboxChange}
//                                             checked={values.signs?.includes("Cyanosis")}
//                                             className="me-3"
//                                             disabled={!isFieldEditable('signs')} />
//                                     </Col>
//                                     <Col md={2}>
//                                         <Form.Check
//                                             type="checkbox"
//                                             label="Clubbing"
//                                             value={"Clubbing"}
//                                             className="me-3"
//                                             onChange={handleCheckboxChange}
//                                             checked={values.signs?.includes("Clubbing")}
//                                             disabled={!isFieldEditable('signs')}
//                                         />
//                                     </Col>
//                                     <Col md={2}>
//                                         <Form.Check
//                                             type="checkbox"
//                                             label="Icterus"
//                                             value={"Icterus"}
//                                             className="me-3"
//                                             onChange={handleCheckboxChange}
//                                             checked={values.signs?.includes("Icterus")}
//                                             disabled={!isFieldEditable('signs')}
//                                         />
//                                     </Col>
//                                     <Col md={2}>
//                                         <Form.Check
//                                             type="checkbox"
//                                             label="Pedal Oedema"
//                                             value={"Pedal Oedema"}
//                                             onChange={handleCheckboxChange}
//                                             checked={values.signs?.includes("Pedal Oedema")}
//                                             disabled={!isFieldEditable('signs')}
//                                         />
//                                     </Col>
//                                 </Row>
//                                 <Row className="mb-4">
//                                     <Col md={3}>
//                                         <Form.Label className="fw-semibold">Temperature  <span className="text-danger fw-bold">*</span></Form.Label>
//                                         <Field 
//                                             disabled={!isFieldEditable('temperature')} 
//                                             name="temperature" 
//                                             type="text" 
//                                             className="form-control" 
//                                             placeholder="Enter temperature" 
//                                         />
//                                         <ErrorMessage name="temperature" component="div" className="text-danger" />
//                                     </Col>
//                                     <Col md={3}>
//                                         <Form.Label className="fw-semibold">Pulse (P)  <span className="text-danger fw-bold">*</span></Form.Label>
//                                         <Field 
//                                             disabled={!isFieldEditable('pulse')} 
//                                             name="pulse" 
//                                             type="number" 
//                                             className="form-control" 
//                                             placeholder="Enter pulse" 
//                                         />
//                                         <ErrorMessage name="pulse" component="div" className="text-danger" />
//                                     </Col>
//                                     <Col md={3}>
//                                         <Form.Label className="fw-semibold">Blood Pressure (BP)  <span className="text-danger fw-bold">*</span></Form.Label>
//                                         <Field 
//                                             disabled={!isFieldEditable('blood_pressure')} 
//                                             name="blood_pressure" 
//                                             type="text" 
//                                             className="form-control" 
//                                             placeholder="Enter BP" 
//                                         />
//                                         <ErrorMessage name="blood_pressure" component="div" className="text-danger" />
//                                     </Col>
//                                     <Col md={3}>
//                                         <Form.Label className="fw-semibold">Respiratory Rate (RR)  <span className="text-danger fw-bold">*</span></Form.Label>
//                                         <Field 
//                                             disabled={!isFieldEditable('respiratory_rate')} 
//                                             name="respiratory_rate" 
//                                             type="number" 
//                                             className="form-control" 
//                                             placeholder="Enter RR" 
//                                         />
//                                         <ErrorMessage name="respiratory_rate" component="div" className="text-danger" />
//                                     </Col>
//                                 </Row>

//                                 <Row className="mb-4">
//                                     <Col md={4} lg={6} className="mb-2">
//                                         <Form.Group controlId="cvs">
//                                             <Form.Label className="fw-semibold">CVS</Form.Label>
//                                             <Form.Control
//                                                 type="text"
//                                                 placeholder="Enter CVS"
//                                                 className="rounded-3"
//                                                 disabled={!isFieldEditable('cvs')}
//                                                 name='cvs'
//                                                 value={values.cvs}
//                                                 onChange={handleChange} />
//                                         </Form.Group>
//                                     </Col>
//                                     <Col md={4} lg={6} className="mb-2">
//                                         <Form.Group controlId="rs">
//                                             <Form.Label className="fw-semibold">RS</Form.Label>
//                                             <Form.Control
//                                                 type="text"
//                                                 placeholder="Enter RS"
//                                                 className="rounded-3"
//                                                 disabled={!isFieldEditable('rs')}
//                                                 name='rs'
//                                                 value={values.rs}
//                                                 onChange={handleChange} />
//                                         </Form.Group>
//                                     </Col>
//                                     <Col md={4} lg={6} className="mb-2">
//                                         <Form.Group controlId="pa">
//                                             <Form.Label className="fw-semibold">PA</Form.Label>
//                                             <Form.Control
//                                                 type="text"
//                                                 placeholder="Enter PA"
//                                                 className="rounded-3"
//                                                 disabled={!isFieldEditable('pa')}
//                                                 name='pa'
//                                                 value={values.pa}
//                                                 onChange={handleChange} />
//                                         </Form.Group>
//                                     </Col>
//                                     <Col md={4} lg={6} className="mb-2">
//                                         <Form.Group controlId="cns">
//                                             <Form.Label className="fw-semibold">CNS</Form.Label>
//                                             <Form.Control
//                                                 type="text"
//                                                 placeholder="Enter CNS"
//                                                 className="rounded-3"
//                                                 disabled={!isFieldEditable('cns')}
//                                                 name='cns'
//                                                 value={values.cns}
//                                                 onChange={handleChange} />
//                                         </Form.Group>
//                                     </Col>
//                                 </Row>
//                                 <Row>
//                                     <Col md={6}>
//                                         <Note 
//                                             label="Local Examination" 
//                                             name="local_examination" 
//                                             disabled={!isFieldEditable('local_examination')} 
//                                             placeholder="Enter details..." 
//                                             isRequired 
//                                             onChange={handleChange} 
//                                             value={values.local_examination} 
//                                         />
//                                         <ErrorMessage name="local_examination" component="div" className="text-danger" />
//                                     </Col>
//                                     <Col md={6}>
//                                         <Note 
//                                             label="Past History" 
//                                             name="past_history" 
//                                             disabled={!isFieldEditable('past_history')} 
//                                             placeholder="Enter history..." 
//                                             onChange={handleChange} 
//                                             value={values.past_history} 
//                                         />
//                                         <ErrorMessage name="past_history" component="div" className="text-danger" />
//                                     </Col>
//                                     <Col md={6}>
//                                         <Note 
//                                             label="Advice On Discharge" 
//                                             name="discharge_advice" 
//                                             disabled={!isFieldEditable('discharge_advice')} 
//                                             placeholder="Enter advice..." 
//                                             isRequired 
//                                             onChange={handleChange} 
//                                             value={values.discharge_advice} 
//                                         />
//                                         <ErrorMessage name="discharge_advice" component="div" className="text-danger" />
//                                     </Col>
//                                     <Col md={6}>
//                                         <Row className="gy-4">
//                                             <Form.Label className="fw-semibold">Select Discharge Date & Time <span className="text-danger fw-bold">*</span></Form.Label>
//                                             <Col md={6}>
//                                                 <Form.Group controlId="discharge_date">
//                                                     <Field
//                                                         as={Form.Control}
//                                                         style={{ height: "45.5px" }}
//                                                         name="discharge_date"
//                                                         type="date"
//                                                         disabled={!isFieldEditable('discharge_date')}
//                                                         min={new Date().toISOString().split("T")[0]}
//                                                     />
//                                                     <ErrorMessage name="discharge_date" component="div" className="text-danger" />
//                                                 </Form.Group>
//                                             </Col>

//                                             <Col md={6}>
//                                                 <Form.Group>
//                                                     <Field
//                                                         as={Form.Control}
//                                                         name="discharge_time"
//                                                         type="time"
//                                                         disabled={!isFieldEditable('discharge_time')}
//                                                         style={{ height: "45.5px" }}
//                                                     />
//                                                     <ErrorMessage name="discharge_time" component="div" className="text-danger" />
//                                                 </Form.Group>
//                                             </Col>
//                                         </Row>
//                                     </Col>
//                                 </Row>
//                                 <Row className="">
//                                     <Col >
//                                         {(prescriptionData) && <AddPrescriptionTable isIPD={true} ipd_id={location.state} rows={prescriptionData} setRows={setPrescriptionData} role={user?.RoleId} />}
//                                     </Col>
//                                 </Row>
//                                 <div className="d-flex justify-content-end pt-lg-4">
//                                     <CommanButton 
//                                         label={isEditMode ? "Update Discharge" : "Discharge"} 
//                                         variant="#7B3F0080" 
//                                         className="mb-3 ps-3 pe-3 p-2 fw-semibold" 
//                                         style={{ borderRadius: "5px" }} 
//                                         type="submit" 
//                                     />
//                                 </div>
//                             </Form>
//                         )
//                     }}
//                 </Formik>
//                 <ViewDischargeSheet 
//                     prescriptionData={prescriptionData} 
//                     ipd_id={location.state} 
//                     show={showDischargeSheet} 
//                     setShow={setShowDischargeSheet} 
//                     data={dischargeDetails} 
//                 />
//             </div>
//         </>
//     );
// };

// export default DischargePatient;


import React, { useEffect, useState } from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { useSelector } from "react-redux";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CommanButton from "../../components/common/form/commonButtton";
import Note from "../../components/common/form/textarea";
import { useLocation, useNavigate } from "react-router-dom";
import AddPrescriptionTable from "../doctor/appointement/PrescriptionAddTable";
import { convertDateTimeToEpoch } from "../../utils/epochToDate";
import CommonToast, { showToast } from "../../components/common/Toaster";
import ViewDischargeSheet from "./ViewDischargeSheet";

const DischargePatient = () => {
    const [prescriptionData, setPrescriptionData] = useState();
    const [dischargeDetails, setDischargeDetails] = useState({
        diagnosisDetails: "",
        chiefComplaints: "",
        discharge_date: "",
        discharge_time: "",
        signs: "",
        temperature: "",
        pulse: "",
        blood_pressure: "",
        respiratory_rate: "",
        cvs: "",
        rs: "",
        pa: "",
        cns: "",
        local_examination: "",
        past_history: "",
        discharge_advice: "",
    });
    const [showDischargeSheet, setShowDischargeSheet] = useState(false);

    const location = useLocation();
    const { user } = useSelector(state => state?.auth);
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        diagnosisDetails: Yup.string().required("Diagnosis is required"),
        chiefComplaints: Yup.string().required("Chief Complaints are required"),
        discharge_date: Yup.date().required("Discharge date is required"),
        discharge_time: Yup.string().required("Admit time is required"),
        temperature: Yup.string().required("Temperature is required"),
        pulse: Yup.number().required("Pulse is required"),
        blood_pressure: Yup.string().required("Blood Pressure is required"),
        respiratory_rate: Yup.number().required("Respiratory Rate is required"),
        local_examination: Yup.string().required("Local Examination is required"),
        discharge_advice: Yup.string().required("Discharge Advice is required"),
    });

    async function getPrescription() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/prescription/getipdprescription?ipd_id=${location.state}`);
            setPrescriptionData(response?.data?.data || [
                {
                    srNo: 1,
                    ipd_id: location.state,
                    medicine_name: "",
                    medicine_type: "",
                    frequency: "",
                    quantity: "",
                    dosage: "",
                    days: "",
                    common_note: "",
                    created_by: user?.userId
                }
            ]);
        } catch (error) {
            // showToast("Error while retrieving prescription data", "error");
        }
    }

    async function getDischargeDetails() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/patient/get_discahrge_details`, {
                params: {
                    ipd_id: location.state
                }
            });


            if (response?.data?.status) {


                // const dischargeDate = new Date(response?.data?.data?.discharge_date);

                console.log("first", response?.data?.data)
                setDischargeDetails({
                    discharge_details_id: response?.data?.data?.discharge_details_id,
                    diagnosisDetails: response?.data?.data?.diagnosis,
                    chiefComplaints: response?.data?.data?.chief_complaints,
                    discharge_date: response?.data?.data?.discharge_date,
                    discharge_time: response?.data?.data?.discharge_time,
                    signs: response?.data?.data?.signs,
                    temperature: response?.data?.data?.temprature,
                    pulse: response?.data?.data?.pulse,
                    blood_pressure: response?.data?.data?.blood_pressure,
                    respiratory_rate: response?.data?.data?.respiratory_rate,
                    cvs: response?.data?.data?.cvs,
                    rs: response?.data?.data?.rs,
                    pa: response?.data?.data?.pa,
                    cns: response?.data?.data?.cns,
                    local_examination: response?.data?.data?.local_examination,
                    past_history: response?.data?.data?.past_history,
                    discharge_advice: response?.data?.data?.discharge_advice,
                });
            }
        } catch (error) {
            showToast("Error while retrieving discharge details", "error");
        }
    }

    useEffect(() => {
        getDischargeDetails();
        getPrescription();
    }, [location.state]);

    const handleSubmit = async (values) => {
        try {
            const payload = {
                "ipd_id": location.state,
                "chief_complaints": values?.chiefComplaints,
                "diagnosis": values?.diagnosisDetails,
                "signs": values?.signs,
                "temperature": values?.temperature,
                "pulse": values?.pulse,
                "blood_pressure": values?.blood_pressure,
                "respiratory_rate": values?.respiratory_rate,
                "cvs": values?.cvs,
                "rs": values?.rs,
                "pa": values?.pa,
                "cns": values?.cns,
                "local_examination": values?.local_examination,
                "past_history": values?.past_history,
                "discharge_advice": values?.discharge_advice,
                "discharge_date": convertDateTimeToEpoch(values?.discharge_date, values?.discharge_time)
            };

            let response;

            if (values?.discharge_details_id) {
                // Update existing discharge details
                response = await axios.put(
                    `${process.env.REACT_APP_API_URL}/patient/updatedischarge`,
                    {
                        ...payload,
                        discharge_details_id: values.discharge_details_id
                    },
                    {
                        params: {
                            userId: user?.userId
                        }
                    }
                );
            } else {
                // Create new discharge details
                response = await axios.post(
                    `${process.env.REACT_APP_API_URL}/patient/discharge`,
                    payload,
                    {
                        params: {
                            userId: user?.userId
                        }
                    }
                );
            }

            if (response?.data?.status) {
                showToast(
                    values?.discharge_details_id
                        ? "Discharge details updated successfully"
                        : "Discharge details saved successfully",
                    "success"
                );
                getDischargeDetails();
                setShowDischargeSheet(true);
            } else {
                showToast("Failed to save discharge details", "error");
            }
        } catch (error) {
            showToast(
                error?.response?.data?.error
                    ? error?.response?.data?.error
                    : "Failed to save discharge details",
                "error"
            );
        }
    };

    return (
        <>
            <CommonToast />

            <div className="mx-lg-4 m-3 pb-3">
                <div className="d-flex align-items-end justify-content-between pt-1 flex-wrap">
                    <div className="fw-semibold pb-lg-3" style={{ color: "#1D949A", fontSize: "18px" }} onClick={() => navigate(-1)}>
                        <FaArrowLeft />
                        <span className="pt-1 px-2">IPD Patients / Discharge Details</span>
                    </div>
                </div>
                <Formik
                    initialValues={dischargeDetails}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {({ handleSubmit, handleChange, values, setFieldValue }) => {
                        const handleCheckboxChange = (event) => {
                            const { value, checked } = event.target;
                            let selectedSigns = values.signs ? values.signs.split(",") : [];

                            if (checked) {
                                selectedSigns.push(value);
                            } else {
                                selectedSigns = selectedSigns.filter(sign => sign !== value);
                            }

                            setFieldValue("signs", selectedSigns.join(","));
                        };

                        const isEditMode = !!values.discharge_details_id;

                        return (
                            <Form onSubmit={handleSubmit} className="pe-5 ps-5 pb-5 pt-3">
                                <Row>
                                    <Col md={6}>
                                        <Note
                                            label="Diagnosis"
                                            placeholder="Enter diagnosis details..."
                                            name="diagnosisDetails"
                                            className="fs-6 mt-4"
                                            isRequired
                                            value={values.diagnosisDetails}
                                            onChange={handleChange}
                                        />
                                        <ErrorMessage name="diagnosisDetails" component="div" className="text-danger" />
                                    </Col>
                                    <Col md={6}>
                                        <Note
                                            label="Chief Complaints"
                                            placeholder="Enter complaints details..."
                                            name="chiefComplaints"
                                            className="fs-6 mt-4"
                                            isRequired
                                            value={values.chiefComplaints}
                                            onChange={handleChange}
                                        />
                                        <ErrorMessage name="chiefComplaints" component="div" className="text-danger" />
                                    </Col>
                                </Row>
                                <h5 className="mb-4">Physical Examination</h5>
                                <Row className="mb-4">
                                    <Form.Label className="fw-semibold mb-2">Signs</Form.Label>
                                    <Col md={2}>
                                        <Form.Check
                                            type="checkbox"
                                            label="Pallor"
                                            className="me-3"
                                            value={"Pallor"}
                                            onChange={handleCheckboxChange}
                                            checked={values.signs?.includes("Pallor")}
                                        />
                                    </Col>
                                    <Col md={2}>
                                        <Form.Check
                                            type="checkbox"
                                            label="Cyanosis"
                                            value={"Cyanosis"}
                                            onChange={handleCheckboxChange}
                                            checked={values.signs?.includes("Cyanosis")}
                                            className="me-3"
                                        />
                                    </Col>
                                    <Col md={2}>
                                        <Form.Check
                                            type="checkbox"
                                            label="Clubbing"
                                            value={"Clubbing"}
                                            className="me-3"
                                            onChange={handleCheckboxChange}
                                            checked={values.signs?.includes("Clubbing")}
                                        />
                                    </Col>
                                    <Col md={2}>
                                        <Form.Check
                                            type="checkbox"
                                            label="Icterus"
                                            value={"Icterus"}
                                            className="me-3"
                                            onChange={handleCheckboxChange}
                                            checked={values.signs?.includes("Icterus")}
                                        />
                                    </Col>
                                    <Col md={2}>
                                        <Form.Check
                                            type="checkbox"
                                            label="Pedal Oedema"
                                            value={"Pedal Oedema"}
                                            onChange={handleCheckboxChange}
                                            checked={values.signs?.includes("Pedal Oedema")}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-4">
                                    <Col md={3}>
                                        <Form.Label className="fw-semibold">Temperature  <span className="text-danger fw-bold">*</span></Form.Label>
                                        <Field
                                            name="temperature"
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter temperature"
                                        />
                                        <ErrorMessage name="temperature" component="div" className="text-danger" />
                                    </Col>
                                    <Col md={3}>
                                        <Form.Label className="fw-semibold">Pulse (P)  <span className="text-danger fw-bold">*</span></Form.Label>
                                        <Field
                                            name="pulse"
                                            type="number"
                                            className="form-control"
                                            placeholder="Enter pulse"
                                        />
                                        <ErrorMessage name="pulse" component="div" className="text-danger" />
                                    </Col>
                                    <Col md={3}>
                                        <Form.Label className="fw-semibold">Blood Pressure (BP)  <span className="text-danger fw-bold">*</span></Form.Label>
                                        <Field
                                            name="blood_pressure"
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter BP"
                                        />
                                        <ErrorMessage name="blood_pressure" component="div" className="text-danger" />
                                    </Col>
                                    <Col md={3}>
                                        <Form.Label className="fw-semibold">Respiratory Rate (RR)  <span className="text-danger fw-bold">*</span></Form.Label>
                                        <Field
                                            name="respiratory_rate"
                                            type="number"
                                            className="form-control"
                                            placeholder="Enter RR"
                                        />
                                        <ErrorMessage name="respiratory_rate" component="div" className="text-danger" />
                                    </Col>
                                </Row>

                                <Row className="mb-4">
                                    <Col md={4} lg={6} className="mb-2">
                                        <Form.Group controlId="cvs">
                                            <Form.Label className="fw-semibold">CVS</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter CVS"
                                                className="rounded-3"
                                                name='cvs'
                                                value={values.cvs}
                                                onChange={handleChange} />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4} lg={6} className="mb-2">
                                        <Form.Group controlId="rs">
                                            <Form.Label className="fw-semibold">RS</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter RS"
                                                className="rounded-3"
                                                name='rs'
                                                value={values.rs}
                                                onChange={handleChange} />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4} lg={6} className="mb-2">
                                        <Form.Group controlId="pa">
                                            <Form.Label className="fw-semibold">PA</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter PA"
                                                className="rounded-3"
                                                name='pa'
                                                value={values.pa}
                                                onChange={handleChange} />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4} lg={6} className="mb-2">
                                        <Form.Group controlId="cns">
                                            <Form.Label className="fw-semibold">CNS</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter CNS"
                                                className="rounded-3"
                                                name='cns'
                                                value={values.cns}
                                                onChange={handleChange} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Note
                                            label="Local Examination"
                                            name="local_examination"
                                            placeholder="Enter details..."
                                            isRequired
                                            onChange={handleChange}
                                            value={values.local_examination}
                                        />
                                        <ErrorMessage name="local_examination" component="div" className="text-danger" />
                                    </Col>
                                    <Col md={6}>
                                        <Note
                                            label="Past History"
                                            name="past_history"
                                            placeholder="Enter history..."
                                            onChange={handleChange}
                                            value={values.past_history}
                                        />
                                        <ErrorMessage name="past_history" component="div" className="text-danger" />
                                    </Col>
                                    <Col md={6}>
                                        <Note
                                            label="Advice On Discharge"
                                            name="discharge_advice"
                                            placeholder="Enter advice..."
                                            isRequired
                                            onChange={handleChange}
                                            value={values.discharge_advice}
                                        />
                                        <ErrorMessage name="discharge_advice" component="div" className="text-danger" />
                                    </Col>
                                    <Col md={6}>
                                        <Row className="gy-4">
                                            <Form.Label className="fw-semibold">Select Discharge Date & Time <span className="text-danger fw-bold">*</span></Form.Label>
                                            <Col md={6}>
                                                <Form.Group controlId="discharge_date">
                                                    <Field
                                                        as={Form.Control}
                                                        style={{ height: "45.5px" }}
                                                        name="discharge_date"
                                                        type="date"
                                                        min={new Date().toISOString().split("T")[0]}
                                                    />
                                                    <ErrorMessage name="discharge_date" component="div" className="text-danger" />
                                                </Form.Group>
                                            </Col>

                                            <Col md={6}>
                                                <Form.Group>
                                                    <Field
                                                        as={Form.Control}
                                                        name="discharge_time"
                                                        type="time"
                                                        style={{ height: "45.5px" }}
                                                    />
                                                    <ErrorMessage name="discharge_time" component="div" className="text-danger" />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className="">
                                    <Col >
                                        {(prescriptionData) && <AddPrescriptionTable isIPD={true} ipd_id={location.state} rows={prescriptionData} setRows={setPrescriptionData} role={user?.RoleId} />}
                                    </Col>
                                </Row>
                                <div className="d-flex justify-content-end pt-lg-4">
                                    <CommanButton
                                        label={isEditMode ? "Update Discharge" : "Discharge"}
                                        variant="#7B3F0080"
                                        className="mb-3 ps-3 pe-3 p-2 fw-semibold"
                                        style={{ borderRadius: "5px" }}
                                        type="submit"
                                    />
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
                <ViewDischargeSheet
                    prescriptionData={prescriptionData}
                    ipd_id={location.state}
                    show={showDischargeSheet}
                    setShow={setShowDischargeSheet}
                    data={dischargeDetails}
                    
                />
            </div>
        </>
    );
};

export default DischargePatient;