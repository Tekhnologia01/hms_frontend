import React, { useEffect, useState, useCallback } from "react";
import { Col, Form, Row, Button, Spinner, Modal } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { useSelector } from "react-redux";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CommanButton from "../../components/common/form/commonButtton";
import Note from "../../components/common/form/textarea";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AddPrescriptionTable from "../doctor/appointement/PrescriptionAddTable";
import { convertDateTimeToEpoch, convertEpochToDateTime, epochToTime } from "../../utils/epochToDate";
import ViewDischargeSheet from "./ViewDischargeSheet";
import { toast } from "react-toastify";
import { FaSave } from 'react-icons/fa';

const DischargePatient = () => {
    const [prescriptionData, setPrescriptionData] = useState();
    const token = useSelector((state) => state.auth.currentUserToken);
    const [courseDetails, setCourseDetails] = useState('');
    const [saveStatus, setSaveStatus] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [initialCourseDetails, setInitialCourseDetails] = useState(''); // <-- add this

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const [patientdetails, setPatientDetails] = useState({})
    const { id } = useParams()

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
        discharge_date_time: "",
        follow_up_date_time: "",
        icd_code: "",
    });
    const [showDischargeSheet, setShowDischargeSheet] = useState(false);

    const location = useLocation();
    const { user } = useSelector(state => state?.auth);
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        diagnosisDetails: Yup.string().required("Diagnosis is required"),
        chiefComplaints: Yup.string().required("Chief Complaints are required"),

        discharge_date: Yup.date()
            .required("Discharge date is required"),

        discharge_time: Yup.string()
            .required("Discharge time is required")
            .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:MM)"),

        follow_up_date: Yup.date()
            .required("Follow Up date is required")
            .min(Yup.ref('discharge_date'), "Follow-up must be after discharge"),

        follow_up_time: Yup.string()
            .required("Follow Up time is required")
            .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:MM)"),

        temperature: Yup.number()
            .required("Temperature is required"),

        icd_code: Yup.string().required("Icd code required"),

        pulse: Yup.number()
            .required("Pulse is required")
            .min(30, "Pulse cannot be below 30 bpm")
            .max(200, "Pulse cannot exceed 200 bpm")
            .integer("Must be a whole number"),

        blood_pressure: Yup.string()
            .required("Blood Pressure is required"),

        respiratory_rate: Yup.number()
            .required("Respiratory Rate is required")
            .min(8, "RR cannot be below 8 breaths/min")
            .max(60, "RR cannot exceed 60 breaths/min")
            .integer("Must be a whole number"),

        local_examination: Yup.string().required("Local Examination is required"),
        discharge_advice: Yup.string().required("Discharge Advice is required"),
    });

    async function getPatientinfo() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/patient/get_patientinfo_admited_idwise?admited_id=${id}`, config);
            setPatientDetails(response?.data.data[0])
        } catch (error) {

        }
    }

    const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        const [month, day, year] = dateString.split('/');
        console.log( `${year}-${day.padStart(2, '0')}-${month.padStart(2, '0')}`)
        return `${year}-${day.padStart(2, '0')}-${month.padStart(2, '0')}`;
    };

    const fetchCourseData = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/treatment/getcourse?admited_id=${id}`, config);
            setCourseDetails(response?.data?.data?.course_details || '');
            setInitialCourseDetails(response?.data?.data?.course_details);
        } catch (error) {
            setSaveStatus({ variant: 'danger', message: error.message || 'Failed to load course' });
        } finally {
            setIsLoading(false);
        }
    }, [id]);

    const saveCourseData = async () => {
        if (!courseDetails?.trim()) {
            setSaveStatus({ variant: 'danger', message: 'Please enter course details' });
            return;
        }

        try {
            setIsSaving(true);
            setSaveStatus(null);

            let response;
            if (!initialCourseDetails || initialCourseDetails?.length === 0) {
                response = await axios.post(
                    `${process.env.REACT_APP_API_URL}/treatment/addcourse`,
                    { course_details: courseDetails, admited_id: id },
                    config
                );
                setInitialCourseDetails(courseDetails);
                fetchCourseData()
            } else {
                response = await axios.put(
                    `${process.env.REACT_APP_API_URL}/treatment/updatecourse?admited_id=${id}`,
                    { course_details: courseDetails, admited_id: id },
                    config
                );
                setInitialCourseDetails(courseDetails);
                fetchCourseData();
            }

            setSaveStatus({
                variant: 'success',
                message: 'Course updated successfully!'
            });
        } catch (error) {
            setSaveStatus({ variant: 'danger', message: error.message || 'Failed to save course' });
        } finally {
            setIsSaving(false);
        }
    };

    async function getPrescription() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/prescription/getipdprescription?ipd_id=${location.state}`, config);
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

        }
    }

    async function getDischargeDetails() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/patient/get_discahrge_details?ipd_id=${location.state}`, config);

            if (response?.data?.status) {
                const dateTime = convertEpochToDateTime(response?.data?.data?.discharge_date_time);
                const followUpDateTime = convertEpochToDateTime(response?.data?.data?.follow_up_date_time);

                setDischargeDetails({
                    discharge_details_id: response?.data?.data?.discharge_details_id,
                    diagnosisDetails: response?.data?.data?.diagnosis,
                    chiefComplaints: response?.data?.data?.chief_complaints,
                    discharge_date: formatDateForInput(dateTime?.date) || '',
                    discharge_time: epochToTime(response?.data?.data?.discharge_date_time) || '',
                    follow_up_date: formatDateForInput(followUpDateTime?.date) || '',
                    follow_up_time: epochToTime(response?.data?.data?.follow_up_date_time) || '',
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
                    discharge_date_time: response?.data?.data?.discharge_date_time,
                    follow_up_date_time: response?.data?.data?.follow_up_date_time,
                    icd_code: response?.data?.data?.icd_code,
                });
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        getDischargeDetails();
        getPrescription();
        getPatientinfo();
        fetchCourseData();
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
                "discharge_date": convertDateTimeToEpoch(values?.discharge_date, values?.discharge_time),
                "follow_up_date": convertDateTimeToEpoch(values?.follow_up_date, values?.follow_up_time),
                "icd_code": values?.icd_code,
            };

            let response;

            if (values?.discharge_details_id) {
                response = await axios.put(
                    `${process.env.REACT_APP_API_URL}/patient/updatedischarge?userId=${user?.userId}`,
                    {
                        ...payload,
                        discharge_details_id: values.discharge_details_id
                    },
                    config
                );
            } else {
                response = await axios.post(
                    `${process.env.REACT_APP_API_URL}/patient/discharge?userId=${user?.userId}`,
                    payload,
                    config
                );
            }

            if (response?.data?.status) {
                toast.success(
                    values?.discharge_details_id
                        ? "Discharge details updated successfully"
                        : "Discharge details saved successfully"
                );
                getDischargeDetails();
                setShowDischargeSheet(true);
            } else {

                toast.error("Failed to save discharge details")
            }
        } catch (error) {

            toast.error(
                error?.response?.data?.error
                    ? error?.response?.data?.error
                    : "Failed to save discharge details"
            );
        }
    };

    return (
        <>
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

                                    <Col md={4} lg={6} className="mb-2">
                                        <Form.Group controlId="icd_code">
                                            <Form.Label className="fw-semibold">ICD Code <span className="text-danger fw-bold">*</span> </Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter ICD Code"
                                                className="rounded-3"
                                                name='icd_code'
                                                value={values.icd_code}
                                                isRequired
                                                onChange={handleChange} />
                                            <ErrorMessage name="icd_code" component="div" className="text-danger" />

                                        </Form.Group>
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
                                    <Col md={6}>
                                        <Row className="gy-4">
                                            <Form.Label className="fw-semibold">Select Follow Up Date & Time <span className="text-danger fw-bold">*</span></Form.Label>
                                            <Col md={6}>
                                                <Form.Group controlId="follow_up_date">
                                                    <Field
                                                        as={Form.Control}
                                                        style={{ height: "45.5px" }}
                                                        name="follow_up_date"
                                                        type="date"
                                                        min={new Date().toISOString().split("T")[0]}
                                                    />
                                                    <ErrorMessage name="follow_up_date" component="div" className="text-danger" />
                                                </Form.Group>
                                            </Col>

                                            <Col md={6}>
                                                <Form.Group>
                                                    <Field
                                                        as={Form.Control}
                                                        name="follow_up_time"
                                                        type="time"
                                                        style={{ height: "45.5px" }}
                                                    />
                                                    <ErrorMessage name="follow_up_time" component="div" className="text-danger" />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>

                                <Row className="mb-4 mt-4">
                                    <Col>
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h2 className="fw-bold fs-5 col-md-6 mt-2 px-0">
                                                Course Details
                                            </h2>
                                            <Button
                                                onClick={saveCourseData}
                                                disabled={isSaving}
                                                className="d-flex align-items-center"
                                                style={{
                                                    backgroundColor: "#1D949A",

                                                }}
                                            >
                                                {isSaving ? (
                                                    <>
                                                        <Spinner as="span" animation="border" size="sm" className="me-2" />
                                                        Saving...
                                                    </>
                                                ) : (
                                                    <>
                                                        <FaSave className="me-2" />
                                                        Save Course
                                                    </>
                                                )}
                                            </Button>
                                        </div >

                                        <Form.Group controlId="courseDetails">
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                placeholder="Describe the course objectives, requirements, and other relevant details..."
                                                value={courseDetails}
                                                onChange={(e) => setCourseDetails(e.target.value)}
                                                className="border-2 shadow-sm"
                                            />
                                        </Form.Group>
                                    </Col >
                                </Row >

                                <Row className="">
                                    <Col >
                                        {<AddPrescriptionTable isIPD={true} ipd_id={location.state} rows={prescriptionData} setRows={setPrescriptionData} role={user?.RoleId} appointmentData={patientdetails} />}
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