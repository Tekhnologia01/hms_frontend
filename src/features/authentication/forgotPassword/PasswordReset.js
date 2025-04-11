import React, { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import CommanButton from "../../../components/common/form/commonButtton";
import Airavat from "../../../assets/images/Airavat.png";
import ForgotLogo from "../../../assets/images/forgotlogo.png";
import Login from '../../../assets/images/loginflip.png'


function PasswordReset() {

  // Handle input change

  return (
    <div className="   vh-100 vw-100" >
      <Row className="m-0">
        <Col md={6} className=" vh-100  d-none d-md-block">
          <div className="d-flex flex-column justify-content-center gradient-custom-2 h-100">
          <img
              src={Login}
              alt="Login"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}/>
          </div>
        </Col>

        <Col md={6} className="vh-100 ">
          <Container className="vh-100 d-flex align-items-center">
            <Row className="justify-content-center w-100 m-0">
              <Col lg={6}>
                <div className="text-center pb-lg-5 pb-3">
                  <img src={Airavat} style={{ width: "185px" }} alt="logo" />
                </div>

                <div className="text-center  pb-2">
                  <img src={ForgotLogo} style={{ width: "50px" }} alt="logo" />
                </div>
                <div className="fs-2 fw-bold pb-2 text-center">
                  Password reset
                </div>

                <div className=" fs-5 pb-3 text-center ">
                  <h5>Your password has been successfully reset.</h5>
                </div>

                <div className="pt-2">
                  <CommanButton
                    label="Reset password"
                    variant="#7B3F0080"
                    className="mb-3 ps-4 pe-4 w-100 p-2"
                    style={{ borderRadius: "5px" }}
                    // onClick={handleFormSubmit}
                  />
                </div>

                <div className="text-center pt-3">
                  <span className="pe-2" style={{ color: "#1D949A" }}>
                    {" "}
                    <FaArrowLeft />
                  </span>
                  <span style={{ color: "#1D949A", fontWeight: "500" }}>
                    {" "}
                    Log in
                  </span>
                </div>
              </Col>
            </Row>
          </Container>
          {/* </div> */}
        </Col>
      </Row>
    </div>
  );
}

export default PasswordReset;
