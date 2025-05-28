import { Row, Col } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import document from "../../../assets/images/avatars/document.png";
import vijay from "../../../assets/images/avatars/vijay1.jpg";
import InputBox from "../../../components/common/form/inputbox";
import Note from "../../../components/common/form/textarea";
import { useNavigate } from "react-router-dom";
import Slider from "../../commonfeature/Slider";

function SelectedPatientDetails() {
    const navigate = useNavigate();
    const inputstyle = {
        fontSize: "1rem",
    };

    const documents = [
        {
            id: 1,
            documentImage: document
        },
        {
            id: 2,
            documentImage: document
        },
        {
            id: 3,
            documentImage: document
        },
        {
            id: 4,
            documentImage: document
        },
        {
            id: 5,
            documentImage: document
        },
    ]

    return (
        <div className="p-4">
            <Row className="m-0 mb-2">
                <Col lg={4}>
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

                <Col lg={8}>
                    <Row className="mt-4 m-0">
                        <Col md={6} className="gy-3">
                            <InputBox
                                label={"Healthcare Provider"}
                                placeholder="Doctor name"
                                isRequired={true}
                                name="cafeName"
                            />
                        </Col>
                        <Col md={6} className="gy-3">
                            <InputBox
                                label={"Consultation Type"}
                                placeholder="Clinic Consulting"
                                isRequired={true}
                                name="cafeName"
                            />
                        </Col>

                        <Col md={6} className="gy-3">
                            <InputBox
                                label={"Patient Name "}
                                placeholder="Name"
                                isRequired={true}
                                name="cafeName"
                            />
                        </Col>
                        <Col md={6} className="gy-3">
                            <InputBox
                                label={"Location"}
                                placeholder="City"
                                isRequired={true}
                                name="cafeName"
                            />
                        </Col>

                        <Col md={6} className="gy-3">
                            <InputBox
                                label={"Start Time"}
                                placeholder="Timing"
                                isRequired={true}
                                name="cafeName"
                            />
                        </Col>
                        <Col md={6} className="gy-3">
                            <InputBox
                                label={"Date of Consultation"}
                                placeholder="Date"
                                isRequired={true}
                                name="cafeName"
                            />
                        </Col>
                    </Row>

                    <div className="pt-3 px-2">
                        <Note
                            placeholder="Reason for consultation here..."
                            className="custom-class"
                            label="Reason For Consultation"
                            isRequired={true}
                        />
                    </div>

                    <div className="pt-1 px-2">
                        <Note
                            placeholder="prescription details here...."
                            className="custom-class"
                            label="Precription"
                            isRequired={true}
                        />
                    </div>
                    <div className="pt-1 px-2">
                        <label className="fw-semibold pb-0" style={{ fontSize: "1.1rem" }}>
                            Reports <span className="text-danger fw-bold">*</span>
                        </label>
                        <div>
                            <Slider slides={documents} />
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default SelectedPatientDetails;