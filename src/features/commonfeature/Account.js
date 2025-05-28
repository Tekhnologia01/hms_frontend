import  { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { Row, Col, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import defaultProfile from "../../assets/images/avatars/vijay1.jpg";
import CommanButton from "../../components/common/form/commonButtton";
import InputBox from "../../components/common/form/inputbox";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function Account() {
    const { user } = useSelector(state => state?.auth);
    const [bloodGroups, setBloodGroups] = useState([]);
    const [previewImage, setPreviewImage] = useState(null);
    const [isEditable, setIsEditable] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const token = useSelector((state) => state.auth.currentUserToken);
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    async function getProfile() {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/user/details?user_id=${user?.userId}`,
                config
            );
            formik.setValues(response?.data?.data);
            if (!response?.data?.data?.photo) {
                setPreviewImage(defaultProfile);
            }
        } catch (err) {
            toast.error("Failed to load profile data");
        }
    }

    const fetchblood = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/lab/getbloodgroup`,
                config
            );
            setBloodGroups(response?.data?.data);
        } catch (err) {
            toast.error("Failed to load blood groups");
        }
    };

    useEffect(() => {
        getProfile();
        fetchblood();
    }, []);

    const updateProfile = async (values) => {
        setIsLoading(true);
        const formData = new FormData();
        if (previewImage !== null) {
            formData.append("photo", values?.photo);
        }
        formData.append("user_id", user?.userId);
        formData.append("name", values?.name);
        formData.append("mobile", values?.mobile);
        formData.append("email", values?.email);
        formData.append("address", values?.address);
        formData.append("city", values?.city);
        formData.append("blood_group", values?.blood_group);

        try {
            const response = await axios.put(
                `${process.env.REACT_APP_API_URL}/user/accountUpdate`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            if (response.data?.status) {
                toast.success("Profile updated successfully");
                setIsEditable(false);
                getProfile(); // Refresh profile data
            } else {
                toast.error("Error updating profile");
            }
        } catch (e) {
            toast.error(e.response?.data?.error || "Error updating profile");
        } finally {
            setIsLoading(false);
        }
    };

    const formik = useFormik({
        initialValues: {
            name: "",
            mobile: "",
            email: "",
            blood_group: undefined,
            address: "",
            city: "",
            photo: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required"),
            mobile: Yup.string()
                .matches(/^\d{10}$/, "Invalid phone number")
                .required("Phone number is required"),
            email: Yup.string()
                .email("Invalid email")
                .required("Email is required"),
            blood_group: Yup.string().required("Blood group is required"),
            address: Yup.string().required("Address is required"),
            city: Yup.string().required("City is required"),
        }),
        onSubmit: (values) => {
            updateProfile(values);
        },
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 3 * 1024 * 1024) {
                toast.error("File size should be less than 3MB");
                return;
            }
            formik.setFieldValue("photo", file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleCancel = () => {
        setIsEditable(false);
        getProfile(); // Reset form with original values
        setPreviewImage(null); // Reset preview image
    };

    return (
        <div className="pt-4">
            <div className="d-flex justify-content-between align-items-center mx-4">
                <div className="fw-semibold fs-3">Account</div>
                <FaRegEdit
                    style={{
                        cursor: "pointer",
                        fontSize: "1.5rem",
                        color: isEditable ? "green" : "black",
                    }}
                    onClick={() => setIsEditable(!isEditable)}
                />
            </div>
            <div className="fw-semibold fs-5 mx-4 mt-3">My Profile</div>
            <div className="fs-6 mx-4">
                This information will be displayed publicly so be careful what you share.
            </div>
            <form onSubmit={formik.handleSubmit}>
                <Row className="m-0 mt-4">
                    <Col md={12}>
                        <div className="mx-3 fw-semibold mb-2 fs-6">Profile Picture</div>
                        <div
                            className="d-flex justify-content-between p-3 mx-3 flex-wrap gap-3 align-items-center"
                            style={{
                                border: "1px solid #E4E9EF",
                                borderRadius: "10px",
                            }}
                        >
                            <div className="d-flex align-items-center gap-3">
                                <img
                                    src={
                                        formik.values.photo && previewImage === null
                                            ? `${process.env.REACT_APP_API_URL}/${formik.values.photo}`
                                            : previewImage || defaultProfile
                                    }
                                    alt="Profile"
                                    className="rounded-circle"
                                    style={{
                                        width: "70px",
                                        height: "70px",
                                        objectFit: "cover",
                                    }}
                                />
                                <p
                                    className="text-wrap w-75 fw-semibold"
                                    style={{ lineHeight: "20px" }}
                                >
                                    You can upload jpg, gif or png image files, Max size of 3MB.
                                </p>
                            </div>
                            <input
                                type="file"
                                id="upload-photo"
                                style={{ display: "none" }}
                                onChange={handleFileChange}
                                disabled={!isEditable}
                                accept="image/jpeg, image/png, image/gif"
                            />
                            <div className="d-flex gap-3">
                                <CommanButton
                                    label="Remove"
                                    className="p-1 px-4 fw-semibold"
                                    onClick={() => {
                                        formik.setFieldValue("photo", null);
                                        setPreviewImage(defaultProfile);
                                    }}
                                    style={{
                                        borderRadius: "7px",
                                        height: "40px",
                                        fontSize: "14px",
                                        backgroundColor: "#fff",
                                        color: "black",
                                        border: "1px solid lightgray",
                                    }}
                                    disabled={!isEditable}
                                    type="button"
                                />
                                <CommanButton
                                    label="Upload New Photo"
                                    className="p-1 px-4 fw-semibold"
                                    style={{
                                        borderRadius: "7px",
                                        fontSize: "14px",
                                        height: "40px",
                                    }}
                                    onClick={() => document.getElementById("upload-photo").click()}
                                    disabled={!isEditable}
                                    type="button"
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md={12}>
                        <Row className="m-0 pb-3">
                            <Col md={6} className="gy-3">
                                <InputBox
                                    label="Name"
                                    placeholder="Enter your first name"
                                    isRequired={true}
                                    {...formik.getFieldProps("name")}
                                    disabled={!isEditable}
                                />
                                {formik.touched.name && formik.errors.name && (
                                    <div className="text-danger">{formik.errors.name}</div>
                                )}
                            </Col>
                            <Col md={6} className="gy-3">
                                <InputBox
                                    label="Phone No."
                                    placeholder="Number here..."
                                    isRequired={true}
                                    {...formik.getFieldProps("mobile")}
                                    disabled={!isEditable}
                                />
                                {formik.touched.mobile && formik.errors.mobile && (
                                    <div className="text-danger">{formik.errors.mobile}</div>
                                )}
                            </Col>
                            <Col md={6} className="gy-3">
                                <InputBox
                                    label="Email I'd"
                                    placeholder="Email I'd here..."
                                    isRequired={true}
                                    {...formik.getFieldProps("email")}
                                    disabled={!isEditable}
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <div className="text-danger">{formik.errors.email}</div>
                                )}
                            </Col>
                            <Col md={6} className="gy-3">
                                <Form.Group controlId="idSelect">
                                    <Form.Label className="fw-semibold" style={{ fontSize: "1rem" }}>
                                        Select Blood Group <span style={{ color: "red" }}>*</span>
                                    </Form.Label>
                                    <Form.Select
                                        style={{ padding: "0.6rem" }}
                                        name="blood_group"
                                        isRequired={true}
                                        {...formik.getFieldProps("blood_group")}
                                        disabled={!isEditable}
                                    >
                                        <option value="">Select Blood Group</option>
                                        {bloodGroups?.length > 0
                                            ? bloodGroups?.map((blood) => (
                                                <option
                                                    key={blood.blood_id}
                                                    value={blood.blood_id}
                                                >
                                                    {blood.blood_group_name}
                                                </option>
                                            ))
                                            : null}
                                    </Form.Select>
                                </Form.Group>
                                {(formik.touched.blood_group || formik.submitCount > 0) &&
                                    formik.errors.blood_group && (
                                        <div className="text-danger">
                                            {formik.errors.blood_group}
                                        </div>
                                    )}
                            </Col>
                            <Col md={6} className="gy-3">
                                <InputBox
                                    label="Address"
                                    placeholder="Enter house no / street name / area"
                                    isRequired={true}
                                    {...formik.getFieldProps("address")}
                                    disabled={!isEditable}
                                />
                                {formik.touched.address && formik.errors.address && (
                                    <div className="text-danger">{formik.errors.address}</div>
                                )}
                            </Col>
                            <Col md={6} className="gy-3">
                                <InputBox
                                    label="City"
                                    placeholder="Enter city here..."
                                    isRequired={true}
                                    {...formik.getFieldProps("city")}
                                    disabled={!isEditable}
                                />
                                {formik.touched.city && formik.errors.city && (
                                    <div className="text-danger">{formik.errors.city}</div>
                                )}
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <div className="ps-4 justify-content-start d-flex gap-3">
                    {isEditable && (
                        <CommanButton
                            label="Cancel"
                            className="mb-3 ps-4 pe-4 p-2 fw-semibold fs-6"
                            style={{
                                borderRadius: "7px",
                                backgroundColor: "#f8f9fa",
                                color: "#6c757d",
                            }}
                            onClick={handleCancel}
                            disabled={isLoading}
                            type="button"
                        />
                    )}
                    <CommanButton
                        label={"Save Changes"}
                        className="mb-3 ps-4 pe-4 p-2 fw-semibold fs-6"
                        style={{ borderRadius: "7px" }}
                        type={isEditable ? "submit" : "button"}
                        loading={isLoading}
                        disabled={isLoading || !isEditable}
                    />
                </div>
            </form>
        </div>
    );
}

export default Account;
