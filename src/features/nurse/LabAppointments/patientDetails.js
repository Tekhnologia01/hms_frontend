import React from "react";
import { Row, Col } from "react-bootstrap";
import { FaArrowLeft, FaArrowRight, FaFileUpload } from "react-icons/fa";
import vijay from "../../../assets/images/avatars/vijay1.jpg";
import InputBox from "../../../components/common/form/inputbox";
import Note from "../../../components/common/form/textarea";
import CommanButton from "../../../components/common/form/commonButtton";
import { useNavigate } from "react-router-dom";

function LabPatientDetails() {

    const navigate = useNavigate();

    const boxStyle = {
        border: "1px  solid #CFD4DC",
        borderRadius: "8px",
        padding: "16px",
        textAlign: "center",
        fontSize: "14px",
        backgroundColor: "#f9f9f9",
    };

    const inputstyle = {
        fontSize: "1rem",
    };

    return (
        <div className="p-4">
            <Row className="m-0">
                <Col md={4}>
                    <div
                        className="fw-semibold fs-5 pb-lg-5 pb-2"
                        style={{ color: "#1D949A" }}
                        onClick={() => navigate(-1)}
                    >
                        <FaArrowLeft />
                        <span className="pt-1"> Patient List</span>
                    </div>
                    <div className="d-flex justify-content-center">
                        <img
                            src={vijay}
                            alt="Doctor"
                            className="rounded-circle"
                            style={{
                                width: "90px",
                                height: "90px",
                                objectFit: "cover",
                                backgroundColor: "red",
                            }}
                        />
                    </div>

                    <div className="text-center mt-2 fw-bold fs-5">Patient Name</div>
                    <div className="text-center">Age | Sex</div>
                    <hr></hr>
                    <div>
                        <Row className="m-0 d-flex justify-content-between gap-2">
                            <Col md={7} >
                                <div style={inputstyle}>UH I’d</div>
                                <div className=" fw-semibold " style={inputstyle}>
                                    UH i’d Number{" "}
                                </div>
                            </Col>
                            <Col className="">
                                <div className=" d-flex justify-content-start ">
                                    <div style={inputstyle}>Phone No.</div>
                                </div>

                                <div
                                    className=" d-flex justify-content-start fw-semibold "
                                    style={inputstyle}
                                >
                                    Number
                                </div>
                            </Col>
                        </Row>

                        <Row className="m-0 d-flex justify-content-between gap-2">
                            <Col md={7} className="gy-2">
                                <div style={inputstyle}>Date of Register</div>
                                <div className="fw-semibold " style={inputstyle}>
                                    Date/month/year{" "}
                                </div>
                            </Col>
                            <Col className="gy-2">
                                <div className=" d-flex justify-content-start " style={inputstyle}>Diseases</div>
                                <div className=" d-flex justify-content-start fw-semibold" style={inputstyle}>
                                    Cardiology
                                </div>
                            </Col>
                        </Row>
                    </div>

                    <hr></hr>
                </Col>

                <Col md={8}>
                    <Row className="mt-4 m-0">
                        <Col md={6} className="gy-3">
                            <InputBox
                                label={"Healthcare Provider"}
                                placeholder="Doctor name"
                                // value={values.cafeName}
                                // onChange={handleChange}
                                isRequired={true}
                                name="cafeName"
                            />
                        </Col>
                        <Col md={6} className="gy-3">
                            <InputBox
                                label={"Consultation Type"}
                                placeholder="Clinic Consulting"
                                // value={values.cafeName}
                                // onChange={handleChange}
                                isRequired={true}
                                name="cafeName"
                            />
                        </Col>

                        <Col md={6} className="gy-3">
                            <InputBox
                                label={"Patient Name "}
                                placeholder="Name"
                                // value={values.cafeName}
                                // onChange={handleChange}
                                isRequired={true}
                                name="cafeName"
                            />
                        </Col>
                        <Col md={6} className="gy-3">
                            <InputBox
                                label={"Location"}
                                placeholder="City"
                                // value={values.cafeName}
                                // onChange={handleChange}
                                isRequired={true}
                                name="cafeName"
                            />
                        </Col>

                        <Col md={6} className="gy-3">
                            <InputBox
                                label={"Start Time"}
                                placeholder="Timing"
                                // value={values.cafeName}
                                // onChange={handleChange}
                                isRequired={true}
                                name="cafeName"
                            />
                        </Col>
                        <Col md={6} className="gy-3">
                            <InputBox
                                label={"Date of Consultation"}
                                placeholder="Date"
                                // value={values.cafeName}
                                // onChange={handleChange}
                                isRequired={true}
                                name="cafeName"
                            />
                        </Col>
                    </Row>

                    <div className="pt-3 px-2">
                        <Note
                            // value={noteValue}
                            // onChange={(e) => setNoteValue(e.target.value)}
                            placeholder="Reason for consultation here..."
                            className="custom-class"
                            label="Reason For Consultation"
                            isRequired={true}
                        />
                    </div>

                    <div className="pt-1 px-2">
                        <Note
                            // value={noteValue}
                            // onChange={(e) => setNoteValue(e.target.value)}
                            placeholder="prescription details here...."
                            className="custom-class"
                            label="Precription"
                            isRequired={true}
                        />
                    </div>
                    <div className="pt-1 px-2">
                        <label className="fw-semibold pb-2" style={{ fontSize: "1.1rem" }}>
                            Reports <span className="text-danger fw-bold">*</span>
                        </label>
                        <div style={boxStyle} className="">
                            <div className="d-flex justify-content-center pb-1">
                                <FaFileUpload size={24} />
                            </div>
                            <div style={{ fontSize: "1rem" }}>
                                <span
                                    className="fw-bold"
                                    style={{ fontSize: "1rem", color: "#1D949A" }}
                                >
                                    Click to upload{" "}
                                </span>
                                or drag and drop
                            </div>
                            <div style={{ fontSize: "1rem" }}>
                                SVG, PNG, JPG or GIF (max. 800x400px)
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>

            <div className="p-2">
                <hr />

                <div>
                    <Row className="m-0 d-flex justify-content-end">

                        <Col lg={6} className="d-flex justify-content-end ">
                            <CommanButton
                                label="Save"
                                variant="#7B3F0080"
                                className="ps-4 pe-4 p-2 fw-semibold"
                                style={{ borderRadius: "8px" }}
                            // onClick={handleFormSubmit}
                            />
                        </Col>
                    </Row>
                </div>
                <hr />
            </div>
        </div>
    );
}

export default LabPatientDetails;