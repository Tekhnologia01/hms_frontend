import { Row, Col } from "react-bootstrap";
import { FaArrowLeft, FaFileUpload } from "react-icons/fa";
import InputBox from "../../../components/common/form/inputbox";
import { useNavigate } from "react-router-dom";
import CommanButton from "../../../components/common/form/commonButtton";

function AddEmergencyPatient() {

    const navigate = useNavigate();

    const boxStyle = {
        fontSize: "1em",
        border: "1px  solid #CFD4DC",
        borderRadius: "8px",
        padding: "16px",
        textAlign: "center",

        backgroundColor: "#f9f9f9",
    };
    return (
        <div className="pt-4">
            <Row className="m-0 ">
                <Row md={12} className="m-0">
                    <div
                        className="fw-semibold fs-6 pb-4"
                        style={{ color: "#1D949A" }}
                    >
                        <FaArrowLeft />
                        <span className="pt-1 px-2" onClick={() => navigate(-1)}>Department/Emergency/Add Emergency Patient</span>
                    </div>
                    <div className="fw-semibold fs-5">
                        <span className="pt-1 px-2">Add Emergency Patient</span>
                    </div>
                </Row>

                <Col md={12}>
                    <div className="fw-semibold fs-6 mt-3">
                        <span className="pt-1 px-2">Basic Information</span>
                    </div>
                    <Row className="m-0 pb-3">
                        <Col md={6} className="gy-3">
                            <InputBox
                                label={"Patient Name"}
                                placeholder="Name here..."
                                isRequired={true}
                                name="cafeName"
                            />
                        </Col>
                        <Col md={6} className="gy-3">
                            <InputBox
                                label={"Phone No."}
                                placeholder="Phone no here..."
                                isRequired={true}
                                name="cafeName"
                            />
                        </Col>

                        <Col md={6} className="gy-3">
                            <InputBox
                                label={"Email I'd"}
                                placeholder="Email I'd here..."
                                isRequired={true}
                                name="cafeName"
                            />
                        </Col>
                        <Col md={6} className="gy-3">
                            <InputBox
                                label={"Sex"}
                                placeholder="Sex here..."
                                isRequired={true}
                                name="cafeName"
                            />
                        </Col>

                        <Col md={6} className="gy-3">
                            <InputBox
                                label={"Age"}
                                placeholder="Age here..."
                                isRequired={true}
                                name="cafeName"
                            />
                        </Col>

                        <Col md={6} className="gy-3">
                            <InputBox
                                label={"Address"}
                                placeholder="Address here..."
                                isRequired={true}
                                name="cafeName"
                            />
                        </Col>

                        <Col md={6} className="gy-3">
                            <InputBox
                                label={"City"}
                                placeholder="City here..."
                                isRequired={true}
                                name="cafeName"
                            />
                        </Col>
                        <Col md={6} className="gy-3">
                            <InputBox
                                label={"Id Proof"}
                                placeholder="I’d Proof here..."
                                isRequired={true}

                                // value={values.cafeName}
                                // onChange={handleChange}
                                name="cafeName"
                            />
                        </Col>
                    </Row>

                    <div className="p-2">
                        <label className="fw-semibold mb-2" style={{ fontSize: "1rem" }}>
                            I’d Proof Image <span className="text-danger fw-bold">*</span>
                        </label>
                        <div style={boxStyle} className="">
                            <div className="d-flex mb-1 justify-content-center">
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

                    <div className="fw-semibold fs-6 mt-3">
                        <span className="pt-1 px-2">Emergency Information</span>
                    </div>
                    <Row className="m-0 pb-3">
                        <Col md={6} className="gy-3">
                            <InputBox
                                label={"Emergency type"}
                                placeholder="Accident, Cardiac Arrest, Trauma, etc."
                                isRequired={true}

                                // value={values.cafeName}
                                // onChange={handleChange}
                                name="cafeName"
                            />
                        </Col>
                        <Col md={6} className="gy-3">
                            <InputBox
                                label={"Arrival mode"}
                                placeholder="Ambulance, Walk-in"
                                isRequired={true}

                                // value={values.cafeName}
                                // onChange={handleChange}
                                name="cafeName"
                            />
                        </Col>
                    </Row>

                    <div className="fw-semibold fs-6 mt-3">
                        <span className="pt-1 px-2">Ward Allocation</span>
                    </div>
                    <Row className="m-0 pb-3">
                        <Col md={6} className="gy-3">
                            <InputBox
                                label={"Ward"}
                                placeholder="Ward Name"
                                isRequired={true}

                                // value={values.cafeName}
                                // onChange={handleChange}
                                name="cafeName"
                            />
                        </Col>
                        <Col md={6} className="gy-3">
                            <InputBox
                                label={"Monitoring Doctor Name"}
                                placeholder="Monitoring Doctor Name"
                                isRequired={true}

                                // value={values.cafeName}
                                // onChange={handleChange}
                                name="cafeName"
                            />
                        </Col>
                    </Row>

                    <div className="px-2 justify-content-start mt-4 mb-3 gap-4 d-flex flex-wrap">

                        <CommanButton
                            label="Add Patient"
                            className="mb-3 ps-4 w-20 pe-4 p-2 fw-bold fs-6 "
                            style={{ borderRadius: "8px", width: "200px" }}
                        // onClick={handleFormSubmit}
                        />
                        <CommanButton
                            label="Discard"
                            className="mb-3 ps-4 pe-4 p-2 fw-bold fs-6 "
                            style={{ borderRadius: "8px", width: "200px", "background-color": "transparent", color: "#344054", "font-weight": 500}}
                        // onClick={handleFormSubmit}
                        />
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default AddEmergencyPatient;