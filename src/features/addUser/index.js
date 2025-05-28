import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { FaArrowLeft, FaFileUpload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CommanButton from "../../components/common/form/commonButtton";
import InputBox from "../../components/common/form/inputbox";
import MultiSelectWithCheckbox from "../../components/common/form/multiselect";
import axios from "axios";
import { useSelector } from "react-redux";
import { validateAccountantForm, validateDoctorForm, validateLabAssistantForm, validateReceptionistForm } from "../../validation/UserFormValidation";
import PasswordInput from "../../components/common/form/password";
import CommonToast, { showToast } from "../../components/common/Toaster";

function AddUserForm({ user }) {
    const navigate = useNavigate();
    const [departments, setDepartments] = useState([]);
    const [shifts, setShifts] = useState([]);
    const [days, setDays] = useState([]);
    const [errors, setErrors] = useState({});
    const [bloodGroups, setBloodGroups] = useState([]);
    const userId = useSelector(state => state?.auth?.user?.userId);
    const token = useSelector((state) => state.auth.currentUserToken);
    const userPhotoInputRef = useRef(null);
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    let role_id;

    if (user === "Doctor") {
        role_id = 2
    } else if (user === "Receptionist") {
        role_id = 4
    } else if (user === "Lab") {
        role_id = 3
    }

    async function getDepartments() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/department/get`, config);
            setDepartments(response?.data?.data);
        } catch (err) {
            showToast("Error fetching departments", "error");
        }
    }

    async function getShifts() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/department/getshift`, config);

            setShifts(response?.data?.data);
        } catch (err) {
            showToast("Error fetching shifts", "error");
        }
    }

    async function getDays() {
        try {

            const response = await axios.get(`${process.env.REACT_APP_API_URL}/department/getday`, config);
            setDays(response?.data?.data)
        } catch (err) {

        }
    }

    useEffect(() => {
        getDepartments();
        getShifts();
        getDays();
        fetchblood();
    }, [])

    const handleBoxClick = () => {
        document.getElementById("id_proof_image")?.click();
    };

    const initialState = {
        name: "",
        phoneno: "",
        email_id: "",
        sex: "",
        age: "",
        department_id: "",
        address: "",
        city: "",
        id_proof: "",
        computer_skills: "",
        highest_qualification: "",
        degree: "",
        field_of_study: "",
        specialization: "",
        year_of_graduation: "",
        additional_certificate: "",
        post_degree: "",
        post_specialization: "",
        post_year_of_graduation: "",
        licene_number: "",
        institute_name: "",
        language_known: "",
        issue_body: "",
        license_expiry_date: "",
        board_certificate: "",
        day_ids: "",
        shift_id: "",
        joining_date: "",
        consultancy_fee: "",
        username: "",
        password: "",
        confirmPassword: "",
        id_proof_image: "",
        user_photo: "",
        blood_group: "",
        created_by: userId,
    };

    const [showPostGraduation, setShowPostGraduation] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === "file") {
            const file = files[0];

            if (file) {
                let allowedTypes = [];

                if (name === "user_photo") {
                    // Only images for user_photo
                    allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
                } else if (name === "id_proof_image") {
                    // Images and PDFs for id_proof_image
                    allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif", "application/pdf"];
                }

                // Validate file type
                if (!allowedTypes.includes(file.type)) {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        [name]: `Invalid file type. Allowed: ${allowedTypes.join(", ")}`,
                    }));
                    return;
                }

                // Clear error if valid
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: "",
                }));

                setFormData({ ...formData, [name]: file });
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleAddPostGraduation = () => {
        setShowPostGraduation(!showPostGraduation);
        setFormData({ ...formData, isPostGraduation: !showPostGraduation });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        let validationErrors = {};
        if (role_id === 2) {
            validationErrors = validateDoctorForm(formData)
        } else if (role_id === 3) {
            validationErrors = validateLabAssistantForm(formData)
        } else if (role_id === 4) {
            validationErrors = validateReceptionistForm(formData);
        } else if (role_id === 5) {
            validationErrors = validateAccountantForm(formData);
        }

        setErrors(validationErrors); // Store errors in state

        // If there are errors, stop form submission
        if (Object.keys(validationErrors)?.length > 0) {
            return;
        }

        // Validate form data if needed
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const formDataObj = new FormData();

        Object.keys(formData).forEach((key) => {
            if (formData[key] !== "" && formData[key] !== undefined) {
                if (key === "day_ids" && Array.isArray(formData[key])) {
                    // Extract only the `value` field from each object and join with commas
                    const workingDaysFormatted = formData[key]?.map(day => day.value).join(",");
                    formDataObj.append(key, workingDaysFormatted);
                } else {
                    formDataObj.append(key, formData[key]);
                }
            }
        });

        formDataObj?.append("role_id", role_id);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/${user?.toLowerCase()}/add`, formDataObj, {
                headers:
                {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                },
            });
            showToast(response?.data?.message ? response?.data?.message : 'User added successfully', 'success');
            setFormData(initialState);

            if (userPhotoInputRef.current) {
                userPhotoInputRef.current.value = "";
            }
        } catch (error) {
            console.log(error?.response?.data?.error);
            showToast(error?.response?.data ? error?.response?.data?.error : `Failed to add ${user}.`, 'error');
        }
    };

    const boxStyle = {
        fontSize: "1em",
        border: "1px solid #CFD4DC",
        borderRadius: "8px",
        padding: "16px",
        textAlign: "center",
        backgroundColor: "#f9f9f9",
    };

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 40 }, (_, i) => currentYear - i);

    const handleDayChange = (selectedOptions) => {
        setFormData({
            ...formData,
            day_ids: [...selectedOptions],
        });
    };

    const fetchblood = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/lab/getbloodgroup`, config);
            setBloodGroups(response?.data?.data);
        } catch (err) {
            console.log("Error fetching blood group:", err);
        }
    };

    return (
        <div className="pt-4">
            <CommonToast />
            <Row className="m-0">
                <Row md={12} className="m-0">
                    <div
                        className="fw-semibold fs-5 pb-4"
                        style={{ color: "#1D949A", cursor: "pointer", width: "fit-content" }}
                        onClick={() => navigate(-1)}
                    >
                        <FaArrowLeft />
                        <span className="pt-1 px-2">Add User/Add {user} {user === "Lab" && "Assistant"}</span>
                    </div>
                    <div className="fw-bold fs-5">
                        <span className="pt-1 px-2">Add Users</span>
                    </div>
                </Row>

                <Col md={12}>
                    <form onSubmit={handleFormSubmit}>
                        <div className="fw-semibold fs-6 mt-3">
                            <span className="pt-1 px-2">Basic Information</span>
                        </div>
                        <Row className="m-0 pb-3">
                            <Col md={6} className="gy-3">
                                <InputBox
                                    label={`${user} ${user === "Lab" ? "Assistant" : ""} Name`}
                                    placeholder={`${user} ${user === "Lab" ? "Assistant" : ""} Name here...`}
                                    isRequired={true}
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    name="name"
                                />
                                {errors.name && <p className="text-danger">{errors.name}</p>}
                            </Col>
                            <Col md={6} className="gy-3">
                                <InputBox
                                    label={"Phone No."}
                                    placeholder="Phone no here..."
                                    isRequired={true}
                                    type="number"
                                    value={formData.phoneno}
                                    onChange={handleInputChange}
                                    name="phoneno"
                                />
                                {errors.phoneno && <p className="text-danger">{errors.phoneno}</p>}
                            </Col>

                            <Col md={6} className="gy-3">
                                <InputBox
                                    label={"Email I'd"}
                                    placeholder="Email I'd here..."
                                    isRequired={true}
                                    type="email"
                                    value={formData.email_id}
                                    onChange={handleInputChange}
                                    name="email_id"
                                />
                                {errors.email_id && <p className="text-danger">{errors.email_id}</p>}

                            </Col>
                            <Col md={6} className="gy-3">
                                <Form.Group controlId="sexSelect">
                                    <Form.Label className="fw-semibold" style={{ fontSize: "1rem" }}>Sex <span className="text-danger fw-bold">*</span></Form.Label>
                                    <Form.Select
                                        value={formData.sex}
                                        name="sex"
                                        onChange={handleInputChange}
                                        isRequired={true}
                                        style={{ padding: "10px" }}
                                    >
                                        <option value="">Select sex</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </Form.Select>
                                </Form.Group>
                                {errors.sex && <p className="text-danger">{errors.sex}</p>}
                            </Col>

                            <Col md={6} className="gy-3">
                                <Form.Group controlId="idSelect">
                                    <Form.Label className="fw-semibold" style={{ fontSize: "1rem" }}>
                                        Select Blood Group <span style={{ color: "red" }}>*</span>
                                    </Form.Label>
                                    <Form.Select
                                        style={{ padding: '0.6rem' }}
                                        name="blood_group"
                                        isRequired={true}
                                        value={formData.blood_group}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select Blood Group</option>
                                        {
                                            bloodGroups?.length > 0 ? bloodGroups?.map(blood => (
                                                <option key={blood.blood_id} value={blood.blood_id}>{blood.blood_group_name}</option>
                                            )) : null
                                        }
                                    </Form.Select>
                                </Form.Group>
                                {errors.blood_group && <p className="text-danger">{errors.blood_group}</p>}
                            </Col>
                            <Col md={6} className="gy-3">
                                <InputBox
                                    label={"Age"}
                                    placeholder="Age here..."
                                    isRequired={true}
                                    type="number"
                                    value={formData.age}
                                    onChange={handleInputChange}
                                    name="age"
                                />
                                {errors.age && <p className="text-danger">{errors.age}</p>}
                            </Col>

                            <Col md={6} className="gy-3">
                                <InputBox
                                    label={"Address"}
                                    placeholder="Address here..."
                                    isRequired={true}
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    name="address"
                                />
                                {errors.address && <p className="text-danger">{errors.address}</p>}

                            </Col>

                            <Col md={6} className="gy-3">
                                <InputBox
                                    label={"City"}
                                    placeholder="City here..."
                                    isRequired={true}
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    name="city"
                                />
                                {errors.city && <p className="text-danger">{errors.city}</p>}
                            </Col>

                            {role_id === 2 && <Col md={6} className="gy-3">
                                <Form.Group controlId="idSelect">
                                    <Form.Label className="fw-semibold" style={{ fontSize: "1rem" }}>Select Department <span className="text-danger fw-bold">*</span></Form.Label>
                                    <Form.Select
                                        value={formData.department_id}
                                        name="department_id"
                                        onChange={handleInputChange}
                                        isRequired={true}
                                    >
                                        <option value="">Select Department</option>
                                        {
                                            departments?.map((dept) => {
                                                return <option key={dept.department_id} value={dept?.department_id}>{dept?.department_name}</option>
                                            })
                                        }
                                    </Form.Select>
                                </Form.Group>
                                {errors.department_id && <p className="text-danger">{errors.department_id}</p>}

                            </Col>}

                            <Col md={6} className="gy-3">
                                <InputBox
                                    label={"Upload Profile"}
                                    type="file"
                                    placeholder=""
                                    isRequired={true}
                                    onChange={handleInputChange}
                                    name="user_photo"
                                    inputRef={userPhotoInputRef}
                                />
                                {errors.user_photo && <p className="text-danger">{errors.user_photo}</p>}

                            </Col>

                            <Col md={6} className="gy-3">
                                <Form.Group controlId="idSelect">
                                    <Form.Label className="fw-semibold" style={{ fontSize: "1rem" }}>Select I'd Proof <span className="text-danger fw-bold">*</span></Form.Label>
                                    <Form.Select
                                        value={formData.id_proof}
                                        name="id_proof"
                                        onChange={handleInputChange}
                                        isRequired={true}
                                    >
                                        <option value="">Select I'd Proof</option>
                                        <option value={"aadhar"}>Aadhar card</option>
                                        <option value={"pan"}>Pan card</option>
                                        <option value={"licence"}>Driving license</option>
                                        <option value={"other"}>Other</option>
                                    </Form.Select>
                                </Form.Group>
                                {errors.id_proof && <p className="text-danger">{errors.id_proof}</p>}

                            </Col>
                        </Row>

                        <div className="mx-3">
                            <Form.Label className="fw-semibold mb-2" style={{ fontSize: "1rem" }}>
                                I’d Proof Image <span className="text-danger fw-bold">*</span>
                            </Form.Label>

                            {/* Clickable Upload Box */}
                            <div style={boxStyle} onClick={handleBoxClick}>
                                <div className="d-flex mb-1 justify-content-center">
                                    <FaFileUpload size={24} />
                                </div>
                                <div style={{ fontSize: "1rem" }}>
                                    <span className="fw-bold" style={{ fontSize: "1rem", color: "#1D949A" }}>
                                        Click to upload{" "}
                                    </span>
                                    or drag and drop
                                </div>
                                <div style={{ fontSize: "1rem" }}>SVG, PNG, JPG, or GIF (max. 800x400px)</div>

                                {/* Show selected file name */}
                                {formData.id_proof_image && (
                                    <div className="mt-2 text-success fw-semibold">{formData.id_proof_image.name}</div>
                                )}
                            </div>

                            {/* Hidden File Input */}
                            <Form.Control
                                type="file"
                                id="id_proof_image"
                                name="id_proof_image"
                                accept="image/png, image/jpeg, image/gif, image/svg+xml"
                                style={{ display: "none" }}
                                onChange={handleInputChange}
                            />
                            {errors.id_proof_image && <p className="text-danger">{errors.id_proof_image}</p>}

                        </div>



                        <div className="fw-semibold fs-6 mt-3">
                            <span className="pt-1 px-2">Educational Information</span>
                        </div>
                        <Row className="m-0 pb-3">
                            <Col md={6} className="gy-3">
                                {
                                    user === "Receptionist" ? <><InputBox
                                        label={"Highest Qualification"}
                                        placeholder="E.g., MBBS, MD, DO, MS, etc."
                                        isRequired={true}
                                        value={formData.highest_qualification}
                                        onChange={handleInputChange}
                                        name="highest_qualification"
                                    />
                                        {errors.highest_qualification && <p className="text-danger">{errors.highest_qualification}</p>}
                                    </> : <><InputBox
                                        label={"Degree"}
                                        placeholder="E.g., MBBS, MD, DO, MS, etc."
                                        isRequired={true}
                                        value={formData.degree}
                                        onChange={handleInputChange}
                                        name="degree"
                                    />
                                        {errors.degree && <p className="text-danger">{errors.degree}</p>}
                                    </>
                                }
                            </Col>
                            {user !== "Accountant" &&
                                <Col md={6} className="gy-3">
                                    {
                                        user === "Receptionist" ?
                                            <><InputBox
                                                label={"Field of Study"}
                                                placeholder="University/College where the degree was obtained"
                                                isRequired={true}
                                                value={formData.field_of_study}
                                                onChange={handleInputChange}
                                                name="field_of_study"
                                            />
                                                {errors.field_of_study && <p className="text-danger">{errors.field_of_study}</p>}
                                            </> : <><InputBox
                                                label={"Specialization"}
                                                placeholder="University/College where the degree was obtained"
                                                isRequired={true}
                                                value={formData.specialization}
                                                onChange={handleInputChange}
                                                name="specialization"
                                            />
                                                {errors.specialization && <p className="text-danger">{errors.specialization}</p>}
                                            </>
                                    }
                                </Col>}
                            <Col md={6} className="gy-3">
                                <Form.Group controlId="yearSelect">
                                    <Form.Label className="fw-semibold" style={{ fontSize: "1rem" }}>Select Year </Form.Label>

                                    <Form.Select value={formData.year_of_graduation} name="year_of_graduation" onChange={handleInputChange}>
                                        <option value="">Choose Graduation Year</option>
                                        {years?.map((year) => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            {user !== "Accountant" &&
                                <Col md={6} className="gy-3">
                                    {
                                        user === "Doctor" ? <InputBox
                                            label={"Additional Certificates"}
                                            placeholder="Optional - Any additional qualifications or fellowships"
                                            isRequired={false}
                                            value={formData.additional_certificate}
                                            onChange={handleInputChange}
                                            name="additional_certificate"
                                        /> : <><InputBox
                                            label={"Nursing License/Registration Number"}
                                            placeholder="Optional - Any additional qualifications or fellowships"
                                            isRequired={true}
                                            value={formData.licene_number}
                                            onChange={handleInputChange}
                                            name="licene_number"
                                        />
                                            {errors.licene_number && <p className="text-danger">{errors.licene_number}</p>}
                                        </>
                                    }
                                </Col>}
                        </Row>
                        {user === "Doctor" && (
                            <div className="fw-semibold fs-6 pl-2">
                                <span
                                    style={{ cursor: "pointer", color: "#1E959B" }}
                                    className="px-3"
                                    onClick={handleAddPostGraduation}
                                >
                                    {!showPostGraduation
                                        ? "+ Add Post-Graduation Education"
                                        : "- Remove Post-Graduation Education"}
                                </span>
                            </div>
                        )}

                        {showPostGraduation && (
                            <Row className="m-0 pb-3">
                                <Col md={6} className="gy-3">
                                    <InputBox
                                        label={"Post Graduation Degree"}
                                        placeholder="Enter post graduation degree here..."
                                        isRequired={true}
                                        value={formData.post_degree}
                                        onChange={handleInputChange}
                                        name="post_degree"
                                    />
                                    {errors.post_degree && <p className="text-danger">{errors.post_degree}</p>}

                                </Col>
                                <Col md={6} className="gy-3">
                                    <InputBox
                                        label={"Specialization"}
                                        placeholder="Enter post graduation specialization here..."
                                        isRequired={true}
                                        value={formData.post_specialization}
                                        onChange={handleInputChange}
                                        name="post_specialization"
                                    />
                                    {errors.post_specialization && <p className="text-danger">{errors.post_specialization}</p>}
                                </Col>
                                <Col md={6} className="gy-3">
                                    <Form.Group controlId="postYearSelect">
                                        <Form.Label className="fw-semibold" style={{ fontSize: "1rem" }}>Select Post Graduation Year </Form.Label>
                                        <Form.Select value={formData.post_year_of_graduation} name="post_year_of_graduation" onChange={handleInputChange}>
                                            <option value="">Choose Post Graduation Year</option>
                                            {years?.map((year) => (
                                                <option key={year} value={year}>{year}</option>
                                            ))}
                                        </Form.Select>
                                        {errors.name && <p className="text-danger">{errors.name}</p>}
                                    </Form.Group>
                                </Col>
                            </Row>
                        )}
                        {user === "Doctor" && (
                            <div className="fw-semibold fs-6 mt-3">
                                <span className="pt-1 px-2">Licensure and Accreditation</span>
                            </div>
                        )}
                        <Row className="m-0 pb-3">
                            {user === "Doctor" && (
                                <Col md={6} className="gy-3">
                                    <InputBox
                                        label={"Medical License Number"}
                                        placeholder="Issued by the medical board"
                                        isRequired={true}
                                        value={formData.licene_number}
                                        onChange={handleInputChange}
                                        name="licene_number"
                                    />
                                    {errors.licene_number && <p className="text-danger">{errors.licene_number}</p>}
                                </Col>
                            )}
                            {user !== "Accountant" &&
                                <Col md={6} className="gy-3">
                                    {
                                        user === "Receptionist" ? <><InputBox
                                            label={"Languages Known"}
                                            placeholder="E.g., Marathi, Hindi, English"
                                            isRequired={true}
                                            value={formData.language_known}
                                            onChange={handleInputChange}
                                            name="language_known"
                                        />
                                            {errors.language_known && <p className="text-danger">{errors.language_known}</p>}
                                        </> : <><InputBox
                                            label={"Issuing Body"}
                                            placeholder="E.g., State/Regional Medical Board"
                                            isRequired={true}
                                            value={formData.issue_body}
                                            onChange={handleInputChange}
                                            name="issue_body"
                                        />
                                            {errors.issue_body && <p className="text-danger">{errors.issue_body}</p>}
                                        </>
                                    }
                                </Col>}
                            {
                                (user === "Doctor" || user === "Nurse") && <Col md={6} className="gy-3">
                                    <Form.Group controlId="datePicker">
                                        <InputBox
                                            type="date"
                                            label={"Select License Validity"}
                                            value={formData.license_expiry_date}
                                            name="license_expiry_date"
                                            onChange={handleInputChange}
                                            required
                                            isRequired
                                        />
                                        {errors.license_expiry_date && <p className="text-danger">{errors.license_expiry_date}</p>}
                                    </Form.Group>
                                </Col>
                            }
                            <Col md={6} className="gy-3">
                                {user === "Doctor" ? <><InputBox
                                    label={"Board Certifications"}
                                    placeholder="E.g., American Board or Internal Medicine, etc."
                                    // isRequired={true}
                                    value={formData.board_certificate}
                                    onChange={handleInputChange}
                                    name="board_certificate"
                                />
                                    {/* {errors.name && <p className="text-danger">{errors.name}</p>} */}
                                </> : <><InputBox
                                    label={"Institution Name"}
                                    placeholder="E.g., American Board or Internal Medicine, etc."
                                    isRequired={true}
                                    value={formData.institute_name}
                                    onChange={handleInputChange}
                                    name="institute_name"
                                />
                                    {errors.institute_name && <p className="text-danger">{errors.institute_name}</p>}
                                </>}
                            </Col>
                            {
                                user === "Receptionist" && <Col md={6} className="gy-3">
                                    <InputBox
                                        label={"Computer skills"}
                                        placeholder="E.g., Typing, excel, word, etc."
                                        isRequired={true}
                                        value={formData.computer_skills}
                                        onChange={handleInputChange}
                                        name="computer_skills"
                                    />
                                    {errors.name && <p className="text-danger">{errors.name}</p>}
                                </Col>
                            }
                        </Row>

                        <div className="fw-semibold fs-6 mt-3">
                            <span className="pt-1 px-2">Joining Date & Fee</span>
                        </div>
                        <Row className="m-0 pb-3">


                            {user !== "Accountant" && <Col md={6} className="gy-3">
                                <Form.Label className="fw-semibold" style={{ fontSize: "1rem" }}>Select Days <span className="text-danger fw-bold">*</span></Form.Label>

                                <MultiSelectWithCheckbox
                                    selectedDays={formData.day_ids}
                                    options={days?.map(day => ({
                                        value: day.day_id,
                                        label: day.day_name
                                    }))}
                                    onDayChange={handleDayChange}
                                />
                                {errors.day_ids && <p className="text-danger">{errors.day_ids}</p>}
                            </Col>}

                            <Col md={6} className="gy-3">
                                <Form.Group controlId="idSelect">
                                    <Form.Label className="fw-semibold" style={{ fontSize: "1rem" }}>Select Shift <span className="text-danger fw-bold">*</span></Form.Label>
                                    <Form.Select
                                        value={formData.shift_id}
                                        name="shift_id"
                                        onChange={handleInputChange}
                                        isRequired={true}
                                    >
                                        <option value="">Select Shift</option>
                                        {
                                            shifts?.map((shift) => {
                                                return <option key={shift?.shift_id} value={shift?.shift_id}>{shift?.shift_name}</option>
                                            })
                                        }
                                    </Form.Select>
                                </Form.Group>
                                {errors.shift_id && <p className="text-danger">{errors.shift_id}</p>}
                            </Col>
                            <Col md={6} className="gy-3">
                                <Form.Group controlId="datePicker">
                                    <InputBox
                                        type="date"
                                        label={"Select Joining Date"}
                                        value={formData.joining_date}
                                        name="joining_date"
                                        isRequired={true}
                                        onChange={handleInputChange}
                                    />
                                    {errors.joining_date && <p className="text-danger">{errors.joining_date}</p>}
                                </Form.Group>
                            </Col>

                            {
                                (user === "Doctor") && <Col md={6} className="gy-3">
                                    <InputBox
                                        label={"Consultant Fee"}
                                        placeholder="Enter Amount here..."
                                        isRequired={true}
                                        type="number"
                                        value={formData.consultancy_fee}
                                        onChange={handleInputChange}
                                        name="consultancy_fee"
                                    />
                                    {errors.consultancy_fee && <p className="text-danger">{errors.consultancy_fee}</p>}
                                </Col>
                            }

                        </Row>

                        <div className="fw-semibold fs-6 mt-3">
                            <span className="pt-1 px-2">Generate User I'd & Password</span>
                        </div>
                        <Row className="m-0 pb-3">
                            <Col md={6} className="gy-3">
                                <InputBox
                                    label={"User I'd"}
                                    placeholder="Auto-generate based on the input details"
                                    isRequired={true}
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    name="username"
                                />
                                {errors.username && <p className="text-danger">{errors.username}</p>}
                            </Col>
                            <Col md={6} className="gy-3">
                                <PasswordInput
                                    label="Password"
                                    name="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required

                                />
                                {errors.password && <p className="text-danger">{errors.password}</p>}
                            </Col>
                            <Col md={6} className="gy-3">
                                <PasswordInput
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    placeholder="Re-enter password"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    required
                                />
                                {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword}</p>}
                            </Col>
                        </Row>

                        <div className="px-2 justify-content-start mt-4 mb-3 gap-4 d-flex flex-wrap">
                            <CommanButton
                                label={`Add ${user} ${user === "Lab" ? "Assistant" : ""} `}
                                className="mb-3 ps-4 w-20 pe-4 p-2 fw-bold fs-6 "
                                style={{ borderRadius: "8px", width: "200px" }}
                                type="submit"
                            // onClick={handleFormSubmit}
                            />
                            <CommanButton
                                label="Discard"
                                className="mb-3 ps-4 pe-4 p-2 fw-bold fs-6 "
                                style={{
                                    borderRadius: "8px",
                                    width: "200px",
                                    backgroundColor: "transparent",
                                    color: "#344054",
                                    fontWeight: 500,
                                }}
                                onClick={() => navigate(-1)}
                            />
                        </div>
                    </form>
                </Col>
            </Row>
        </div>
    );
}

export default AddUserForm;