import React, { useEffect, useState } from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import { useSelector } from "react-redux";
import CommanButton from "../../../components/common/form/commonButtton";
import SelectBox from "../../../components/common/form/selectBox/SelectBox";
import { convertDateTimeToEpoch } from "../../../utils/epochToDate";
import { validateAdmitForm } from "../../../validation/PatientValidation";
import { toast } from "react-toastify";

const AdmitPatient = ({ show, handleClose, appointmentData }) => {
    const [departments, setDepartments] = useState([]);
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [beds, setBeds] = useState([]);
    const [roomTypes, setRoomTypes] = useState([]);
    const { user } = useSelector(state => state?.auth);
    const [errors, setErrors] = useState({});
    const token = useSelector((state) => state?.auth?.currentUserToken);
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const getCurrentDateTime = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const dateStr = `${year}-${month}-${day}`;

        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const timeStr = `${hours}:${minutes}`;

        return { dateStr, timeStr };
    };
    const { dateStr: currentDate, timeStr: currentTime } = getCurrentDateTime();

    const initialState = {
        uh_id: "",
        department_id: "",
        doctor_id: "",
        mediclaim: "No",
        mlc_no: "",
        tpa: "",
        mrd_no: "",
        reference_doctor: "",
        bed_id: "",
        room_type: "",
        occupation: "",
        admit_date: currentDate,
        admit_time: currentTime,
        discharge_date: null,
        discharge_time: null,
        relative_name: "",
        relative_age: "",
        relative_mobile: "",
        relative_gender: "",
        relative_address: "",
        relation: "",
        other_relative_name: "",
        other_relative_address: "",
        other_relative_mobile: "",
        other_relative_age: "",
        other_relative_gender: "",
        other_relation: "",
    };


    const [formData, setFormData] = useState(
        initialState
    );

    // Fetch room types
    async function getRoomTypes() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/roombed/getroomtype`, config);
            if (response.status) {
                setRoomTypes(response?.data?.data);
            }
        } catch (err) {
            console.log("Error fetching departments:", err);
        }
    }

    useEffect(() => {
        if (appointmentData) {
            const { dateStr: currentDate, timeStr: currentTime } = getCurrentDateTime();

            setFormData({
                uh_id: appointmentData?.uh_id,
                appointment_id: appointmentData?.Appointment_Id,
                department_id: "",
                doctor_id: "",
                mediclaim: "No",
                mlc_no: "",
                tpa: "",
                mrd_no: "",
                reference_doctor: "",
                bed_id: "",
                room_type: "",
                occupation: "",
                admit_date: currentDate,
                admit_time: currentTime,
                discharge_date: null,
                discharge_time: null,
                relative_name: "",
                relative_age: "",
                relative_mobile: "",
                relative_gender: "",
                relative_address: "",
                relation: "",
                other_relative_name: "",
                other_relative_address: "",
                other_relative_mobile: "",
                other_relative_age: "",
                other_relative_gender: "",
                other_relation: "",
            })
        }
    }, [appointmentData])

    // Fetch departments
    async function getDepartments() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/department/get`, config);
            setDepartments(response?.data?.data);
        } catch (err) {
            console.log("Error fetching departments:", err);
        }
    }

    // Fetch doctors
    async function getBeds(id) {
        try {

            const response = await axios.get(`${process.env.REACT_APP_API_URL}/roombed/get_available_beds?room_type=${+formData.room_type}&admit_date=${convertDateTimeToEpoch(formData.admit_date, formData.admit_time)}`, config);
            if (response.data?.status) {
                setBeds(response?.data?.data);
            }
        } catch (err) {
            toast.error(err?.response?.data?.message ? err.response?.data?.message : "Bed not available")
            setBeds([]);
        }
    }

    // Fetch patients
    async function getPatients() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/patient/getAll`, config);
            setPatients(response?.data?.data?.data);
        } catch (err) {
            console.log("Error fetching patients:", err);
        }
    }

    // Fetch doctors based on department
    async function getDoctors(departmentId) {
        try {
            if (!departmentId) return;
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/doctor/getDoctorsDepartmentwise?dep_id=${departmentId}`, config);
            setDoctors(response?.data?.data?.data);
        } catch (err) {
            console.log("Error fetching doctors:", err);
        }
    }

    useEffect(() => {
        if (formData.admit_date && formData.room_type !== "") {
            getBeds();
        }
    }, [formData.admit_date, formData.admit_time, formData.room_type])
    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({ ...prev, [name]: value }));

        if (name === "department_id") {
            if (!value) {
                setDoctors([]);
                setFormData((prev) => ({ ...prev, doctor_id: "" }));
            } else {
                getDoctors(value);
                setFormData((prev) => ({ ...prev, doctor_id: "" }));
            }
        }

        if (name === "room_type") {
            if (!value) {
                setBeds([]);
                setFormData((prev) => ({ ...prev, bed_id: "" }));
            } else {
                setFormData((prev) => ({ ...prev, bed_id: "" }));
            }
        }
    };

    // Handle visit type change
    const handleVisitTypeChange = (e) => {
        setFormData((prev) => ({ ...prev, mediclaim: e.target.value }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        const validationErrors = validateAdmitForm(formData);
        setErrors(validationErrors); // Store errors in state

        // If there are errors, stop form submission
        if (Object.keys(validationErrors).length > 0) {
            return;
        }
        e.preventDefault();
        try {
            const payload = {
                uh_id: formData.uh_id,
                appointment_id: formData?.appointment_id,
                doctor_id: formData.doctor_id,
                department_id: formData.department_id,
                mediclaim: formData.mediclaim,
                reference_doctor: formData.reference_doctor,
                admit_date: convertDateTimeToEpoch(formData.admit_date, formData.admit_time),
                // admit_time: formData.admit_time,
                discharge_date: convertDateTimeToEpoch(formData.discharge_date, formData.discharge_time),
                // discharge_time: formData.discharge_time,
                bed_id: formData.bed_id,
                relative_name: formData.relative_name,
                relative_age: formData.relative_age,
                relative_gender: formData.relative_gender,
                relative_mobile: formData.relative_mobile,
                relation: formData.relation,
                relative_address: formData.relative_address,
                other_relative_name: formData.other_relative_name,
                other_relative_address: formData.other_relative_address,
                other_relative_mobile: formData.other_relative_mobile,
                other_relative_age: formData.other_relative_age,
                other_relative_gender: formData.other_relative_gender,
                other_relation: formData.other_relation,
                mrd_no: formData.mrd_no,
                tpa: formData.tpa,
                mlc_no: formData.mlc_no,
                occupation: formData.occupation,
            };

            const response = await axios.post(`${process.env.REACT_APP_API_URL}/patient/admit/${user?.userId}`, payload, config);

            setFormData(initialState);
            handleClose();
            toast.success(response?.data?.message || 'Admit patient successfully!');
        } catch (error) {
            toast.error(error?.response?.data?.error || 'Error in Admit patient !');
        }
    };

    useEffect(() => {
        getPatients();
        getDepartments();
        getRoomTypes();
    }, []);

    const handleAdmitTimeChange = (e) => {
        const selectedTime = e.target.value; // Get time in HH:MM format
        if (selectedTime) {
            setFormData({ ...formData, admit_time: selectedTime })
        }
    };

    const closeModal = () => {
        const { dateStr: currentDate, timeStr: currentTime } = getCurrentDateTime();

        setFormData({
            ...initialState,
            admit_date: currentDate,
            admit_time: currentTime
        });
        setErrors({});
        handleClose()
    }

    return (
        <Modal show={show} onHide={closeModal} size="xl" dialogClassName="custom-modal" scrollable>
            <div className="pe-5 ps-5 pt-4 pb-2">
                <FaTimes style={{ position: "absolute", top: "20px", right: "30px", fontSize: "20px", cursor: "pointer", color: "#999", zIndex: 10 }} onClick={closeModal} />
                <div className="fw-bold fs-4">Admit Patient</div>
            </div>

            <hr />

            <Modal.Body className="pe-5 ps-5 pb-5 pt-3">

                <div className="fs-5 fw-semibold pt-2 pb-3">Admission Form</div>

                <Row>

                    <Col lg={4} md={6} >
                        <Form.Group controlId="doctorSelect">
                            <Form.Label className="fw-semibold">Select Patient <span className="text-danger fw-bold">*</span></Form.Label>
                            <SelectBox
                                name="patientId"
                                defaultValue="Select Patient"
                                value={formData.uh_id}
                                options={patients?.map((patient) => ({
                                    label: patient?.Name,
                                    option: patient?.uh_id,
                                }))}
                                isDisabled={appointmentData?.uh_id}
                                onChange={(e) => handleInputChange({ target: { name: "uh_id", value: e.target.value } })}
                            />
                            {errors.uh_id && <p className="text-danger">{errors.uh_id}</p>}
                        </Form.Group>
                    </Col>

                    <Col lg={4} md={6}>
                        <Form.Group controlId="">
                            <Form.Label className="fw-semibold">UH Id </Form.Label>
                            <Form.Control type="text" style={{ height: "45.5px" }} placeholder="Enter Occupation" name="occupation" value={formData.uh_id} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>

                    <Col lg={4} md={6}>
                        <Form.Group controlId="occupation">
                            <Form.Label className="fw-semibold">Occupation </Form.Label>
                            <Form.Control type="text" style={{ height: "45.5px" }} placeholder="Enter Occupation" name="occupation" value={formData.occupation} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>

                    <Col lg={4} md={6} className="mt-4 ">
                        <Form.Group controlId="departmentSelect">
                            <Form.Label className="fw-semibold">Select Department <span className="text-danger fw-bold">*</span></Form.Label>
                            <Form.Select style={{ height: "45.5px" }} name="department_id" value={formData.department_id} onChange={handleInputChange} isRequired={true}>
                                <option value="">Select Department</option>
                                {departments?.map((dept) => (
                                    <option key={dept?.department_id} value={dept?.department_id}>
                                        {dept?.department_name}
                                    </option>
                                ))}
                            </Form.Select>
                            {errors.department_id && <p className="text-danger">{errors.department_id}</p>}
                        </Form.Group>
                    </Col>

                    <Col lg={4} md={6} className="mt-4">
                        <Form.Group controlId="doctorSelect">
                            <Form.Label className="fw-semibold">Select Doctor In Charge <span className="text-danger fw-bold">*</span></Form.Label>
                            <SelectBox
                                name="doctor_id"
                                defaultValue="Select Doctor"
                                value={formData.doctor_id}
                                options={doctors?.map((doc) => ({
                                    label: doc.Name,
                                    option: doc.User_ID,
                                }))}
                                onChange={(e) => handleInputChange({ target: { name: "doctor_id", value: e.target.value } })}
                            />
                            {errors.doctor_id && <p className="text-danger">{errors.doctor_id}</p>}
                        </Form.Group>
                    </Col>

                    <Col lg={4} md={6} className="mt-4">
                        <Form.Group controlId="reference_doctor">
                            <Form.Label className="fw-semibold">Ref. Doctor </Form.Label>
                            <Form.Control type="text" style={{ height: "45.5px" }} placeholder="Enter Ref. Doctor" name="reference_doctor" value={formData.reference_doctor} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>


                    <Col lg={4} md={6} className="mt-4">
                        <Form.Group controlId="mlc_no">
                            <Form.Label className="fw-semibold">Mlc No. </Form.Label>
                            <Form.Control type="text" style={{ height: "45.5px" }} placeholder="Enter MLC No." name="mlc_no" value={formData.mlc_no} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>

                    <Col lg={4} md={6} className="mt-4">
                        <Form.Group controlId="tpa">
                            <Form.Label className="fw-semibold">TPA </Form.Label>
                            <Form.Control type="text" style={{ height: "45.5px" }} placeholder="Enter TPA" name="tpa" value={formData.tpa} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>

                    <Col lg={4} md={6} className="mt-4">
                        <Row>
                            <Form.Label className="fw-semibold">Select Admit Date & Time <span className="text-danger fw-bold">*</span></Form.Label>

                            <Col md={6}>
                                <Form.Group controlId="admit_date">
                                    <Form.Control
                                        style={{ height: "45.5px" }}
                                        name="admit_date"
                                        type="date"
                                        // min={new Date().toISOString().split("T")[0]}
                                        value={formData.admit_date} onChange={handleInputChange} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="">
                                    <Form.Control
                                        name="admit_time"
                                        type="time"
                                        value={formData.admit_time}
                                        onChange={handleAdmitTimeChange}
                                        style={{ height: "45.5px" }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        {errors.admit_date && <p className="text-danger">{errors.admit_date}</p>}
                    </Col>

                    <Col lg={4} md={6} className="mt-4">
                        <Form.Group controlId="mrd_no">
                            <Form.Label className="fw-semibold">MRD No. </Form.Label>
                            <Form.Control type="text" style={{ height: "45.5px" }} placeholder="Enter MRD" name="mrd_no" value={formData.mrd_no} onChange={handleInputChange} />
                            {errors.mrd_no && <p className="text-danger">{errors.mrd_no}</p>}
                        </Form.Group>
                    </Col>

                    <Col lg={4} md={6} className="mt-4">
                        <Form.Label className="fw-semibold">Mediclaim</Form.Label>
                        <div className="d-flex align-items-center" style={{ height: "45.5px" }}>
                            <Form.Check inline type="radio" label="Yes" name="mediclaim" id="No" value="Yes" checked={formData.mediclaim === "Yes"} onChange={handleVisitTypeChange} />
                            <Form.Check inline type="radio" label="No" name="mediclaim" id="Yes" value="No" checked={formData.mediclaim === "No"} onChange={handleVisitTypeChange} />
                        </div>
                    </Col>
                </Row>
                <hr className="pt-2"></hr>
                <div className="pt-1 pb-2 fs-5 fw-semibold">
                    Room Info
                </div>
                <Row>

                    <Col lg={4} md={6} className="mt-3">
                        <Form.Group controlId="room_type">
                            <Form.Label className="fw-semibold">Select Room Type <span className="text-danger fw-bold">*</span></Form.Label>
                            <Form.Select style={{ height: "45.5px" }} name="room_type" value={formData.room_type} onChange={handleInputChange} isRequired={true}>
                                <option value="">Select Room Type</option>
                                {roomTypes?.map((room) => (
                                    <option key={room.room_type_id} value={room.room_type_id}>
                                        {room.room_type}
                                    </option>
                                ))}
                            </Form.Select>
                            {errors.room_type && <p className="text-danger">{errors.room_type}</p>}
                        </Form.Group>
                    </Col>

                    <Col lg={4} md={6} className="mt-3">
                        {beds &&
                            <Form.Group controlId="bed_id">
                                <Form.Label className="fw-semibold">Select Bed <span className="text-danger fw-bold">*</span></Form.Label>
                                <Form.Select
                                    style={{ height: "45.5px" }}
                                    name="bed_id"
                                    value={formData.bed_id}
                                    onChange={handleInputChange}
                                    disabled={formData.room_type === "" || !formData.admit_date}
                                    isRequired={true}>
                                    <option value="">Select Bed</option>
                                    {beds?.map((bed) => (
                                        <option key={bed.bed_id} value={bed.bed_id}>
                                            {bed.bed_name}
                                        </option>
                                    ))}
                                </Form.Select>
                                {errors.bed_id && <p className="text-danger">{errors.bed_id}</p>}
                            </Form.Group>}
                    </Col>

                </Row>

                <div className="fs-5 fw-semibold pt-4 pb-3">Persons Accompanying</div>

                <Row>
                    <Col lg={4} md={6}>
                        <Form.Group controlId="relative_name">
                            <Form.Label className="fw-semibold">Name <span className="text-danger fw-bold">*</span></Form.Label>
                            <Form.Control type="text" style={{ height: "45.5px" }} placeholder="Enter Name" name="relative_name" value={formData.relative_name} onChange={handleInputChange} />
                            {errors.relative_name && <p className="text-danger">{errors.relative_name}</p>}
                        </Form.Group>
                    </Col>

                    <Col lg={4} md={6}>
                        <Form.Group controlId="relative_address">
                            <Form.Label className="fw-semibold">Address <span className="text-danger fw-bold">*</span></Form.Label>
                            <Form.Control type="text" style={{ height: "45.5px" }} placeholder="Enter Address" name="relative_address" value={formData.relative_address} onChange={handleInputChange} />
                            {errors.relative_address && <p className="text-danger">{errors.relative_address}</p>}
                        </Form.Group>
                    </Col>

                    <Col lg={4} md={6}>
                        <Form.Group controlId="relative_mobile">
                            <Form.Label className="fw-semibold">Mobile <span className="text-danger fw-bold">*</span></Form.Label>
                            <Form.Control type="number" style={{ height: "45.5px" }} placeholder="Enter Mobile No." name="relative_mobile" value={formData.relative_mobile} onChange={handleInputChange} />
                            {errors.relative_mobile && <p className="text-danger">{errors.relative_mobile}</p>}
                        </Form.Group>
                    </Col>

                    <Col lg={4} md={6} className="mt-3">
                        <Form.Group controlId="relative_age">
                            <Form.Label className="fw-semibold">Age <span className="text-danger fw-bold">*</span></Form.Label>
                            <Form.Control type="number" style={{ height: "45.5px" }} placeholder="Enter Age" name="relative_age" value={formData.relative_age} onChange={handleInputChange} />
                            {errors.relative_age && <p className="text-danger">{errors.relative_age}</p>}
                        </Form.Group>
                    </Col>

                    <Col lg={4} md={6} className="mt-3">
                        <Form.Group controlId="relative_gender" >
                            <Form.Label className="fw-semibold" style={{ fontSize: "1rem" }}>
                                Sex
                            </Form.Label>

                            <Form.Select
                                style={{ padding: '0.6rem' }}
                                name="relative_gender"
                                value={formData.relative_gender}
                                onChange={handleInputChange}
                                isRequired={true}
                            >
                                <option value="">Select sex</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    <Col lg={4} md={6} className="mt-3">
                        <Form.Group controlId="relation">
                            <Form.Label className="fw-semibold">Relation </Form.Label>
                            <Form.Control type="text" style={{ height: "45.5px" }} placeholder="Enter Relation" name="relation" value={formData.relation} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>
                    <hr className="mt-4" />
                    <Col lg={4} md={6}>
                        <Form.Group controlId="other_relative_name">
                            <Form.Label className="fw-semibold">Name </Form.Label>
                            <Form.Control type="text" style={{ height: "45.5px" }} placeholder="Enter Name" name="other_relative_name" value={formData.other_relative_name} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>

                    <Col lg={4} md={6}>
                        <Form.Group controlId="other_relative_address">
                            <Form.Label className="fw-semibold">Address</Form.Label>
                            <Form.Control type="text" style={{ height: "45.5px" }} placeholder="Enter Address" name="other_relative_address" value={formData.other_relative_address} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>

                    <Col lg={4} md={6}>
                        <Form.Group controlId="other_relative_mobile">
                            <Form.Label className="fw-semibold">Mobile</Form.Label>
                            <Form.Control type="number" style={{ height: "45.5px" }} placeholder="Enter Mobile No." name="other_relative_mobile" value={formData.other_relative_mobile} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>

                    <Col lg={4} md={6} className="mt-3">
                        <Form.Group controlId="other_relative_age">
                            <Form.Label className="fw-semibold">Age </Form.Label>
                            <Form.Control type="number" style={{ height: "45.5px" }} placeholder="Enter Age" name="other_relative_age" value={formData.other_relative_age} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>

                    <Col lg={4} md={6} className="mt-3">
                        <Form.Group controlId="other_relative_gender" >
                            <Form.Label className="fw-semibold" style={{ fontSize: "1rem" }}>
                                Sex
                            </Form.Label>

                            <Form.Select
                                style={{ padding: '0.6rem' }}
                                name="other_relative_gender"
                                value={formData.other_relative_gender}
                                onChange={handleInputChange}
                                isRequired={true}
                            >
                                <option value="">Select sex</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    <Col lg={4} md={6} className="mt-3">
                        <Form.Group controlId="other_relation">
                            <Form.Label className="fw-semibold">Relation </Form.Label>
                            <Form.Control type="text" style={{ height: "45.5px" }} placeholder="Enter Relation" name="other_relation" value={formData.other_relation} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <div className="d-flex justify-content-end pt-lg-4">
                    <CommanButton label="Admit" variant="#7B3F0080" className="mb-3 ps-3 pe-3 p-2 fw-semibold" style={{ borderRadius: "5px" }} onClick={handleSubmit} />
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default AdmitPatient;