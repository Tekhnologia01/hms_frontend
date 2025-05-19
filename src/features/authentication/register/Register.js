import { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import InputBox from "../../../components/common/form/inputbox/index";
import { useNavigate } from "react-router-dom";
import Airavat from "../../../assets/images/Airavat.png";
import CommanButton from "../../../components/common/form/commonButtton";
import Google from "../../../assets/images/google.png";
import Facebook from "../../../assets/images/facebook.png";
import Apple from "../../../assets/images/apple.png";
import Login1 from "../../../assets/images/login.png";
import PasswordInput from "../../../components/common/form/password";

function Register() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    varient: "success",
  });
  const API_BASE_URL = "apiurl";
  // Consolidated state for email and password
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  return (
    <div className="   vh-100 vw-100">
      <Row className="m-0">
        <Col md={6} className="vh-100 ">
          <Container className="vh-100 d-flex align-items-center">
            <Row className="justify-content-center w-100 m-0">
              <Col lg={6}>
                <div className="text-center pb-lg-5 pb-3">
                  <img src={Airavat} style={{ width: "185px" }} alt="logo" />
                </div>

                <div className="fs-2 fw-bold pb-4 text-center">
                  Create an account
                </div>

                <div className="pb-2 ">
                  <label className="fs-6 pb-2 fw-semibold">
                    Name <span className="text-danger fw-bold">*</span>
                  </label>

                  <InputBox
                    placeholder="Enter your e-mail"
                    name="cafeName"
                  />
                </div>

                <div className=" pb-2">
                  <label className="fs-6 pb-2 fw-semibold">
                    Email <span className="text-danger fw-bold">*</span>
                  </label>


                  <InputBox
                    placeholder="Enter your e-mail"
                    name="cafeName"
                  />
                </div>

                <div className="pb-2">
                  <PasswordInput
                    label="Password"
                    name="password"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <div className="pt-4">
                  <CommanButton
                    label="Sign in"
                    variant="#7B3F0080"
                    className="mb-3 ps-4 pe-4 w-100 p-2"
                    style={{ borderRadius: "5px" }}
                  />
                </div>

                <div className="d-flex justify-content-center">
                  <hr
                    style={{
                      width: "45%",
                      border: "1px solid black",
                    }}
                  />{" "}
                  <span className="pt-1 ps-1 pe-1"> OR</span>{" "}
                  <hr
                    style={{
                      width: "45%",
                      border: "1px solid black",
                    }}
                  />
                </div>

                <div className="pt-3 pb-3">
                  <Row className="m-0 justify-content-between m-0">
                    <Col
                      className="d-flex justify-content-center  m-2"
                      style={{
                        border: "1px solid #CFD4DC",
                        borderRadius: "10px",
                      }}
                    >
                      <div className="p-2">
                        <img
                          src={Facebook}
                          alt="Apple"
                          style={{
                            width: "100%",
                            height: "auto",
                            maxHeight: "30px",
                          }}
                        ></img>
                      </div>
                    </Col>
                    <Col
                      className="d-flex justify-content-center  m-2"
                      style={{
                        border: "1px solid #CFD4DC",
                        borderRadius: "10px",
                      }}
                    >
                      <div className="p-2">
                        <img
                          src={Google}
                          alt="Apple"
                          style={{
                            width: "100%",
                            height: "auto",
                            maxHeight: "30px",
                          }}
                        ></img>
                      </div>
                    </Col>
                    <Col
                      className="d-flex justify-content-center border m-2"
                      style={{
                        border: "1px solid #CFD4DC",
                        borderRadius: "10px",
                      }}
                    >
                      <div className="p-2">
                        <img
                          src={Apple}
                          alt="Apple"
                          style={{
                            width: "100%",
                            height: "auto",
                            maxHeight: "30px",
                          }}
                        ></img>
                      </div>
                    </Col>
                  </Row>
                </div>

                <div className="text-center">
                  <span style={{ fontWeight: "500" }}>
                    Already have an account ?{" "}
                  </span>
                  <span style={{ fontWeight: "500", color: " #0D157F" }}>
                    {" "}
                    Create account
                  </span>
                </div>
              </Col>
            </Row>
          </Container>
        </Col>
        <Col md={6} className=" vh-100 d-none d-md-block ">
          <div className="d-flex flex-column justify-content-center gradient-custom-2 h-100">
            <img
              src={Login1}
              alt="Login"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Register;
