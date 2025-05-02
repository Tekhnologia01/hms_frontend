
import { Row, Col, Container } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import InputBox from "../../../components/common/form/inputbox";
import CommanButton from "../../../components/common/form/commonButtton";
import Airavat from "../../../assets/images/Airavat.png";
import ForgotLogo from "../../../assets/images/forgotlogo.png";
import Login from '../../../assets/images/loginflip.png';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function EnterEmail() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // simple regex for email validation
    return regex.test(email);
  };

  const handleFormSubmit = async () => {
    if (!email) {
      setError("Email is required.");
      return;
    } else if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    } else {
      setError(""); 
    }

    try {
      console.log("first", email);
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/forgot/sendotp`, {userEmail: email });
      navigate(`/checkemail/${email}`);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError(""); // clear error when typing
  };

  return (
    <div className="vh-100 vw-100">
      <Row className="m-0">
        <Col md={6} className="vh-100 d-none d-md-block">
          <div className="d-flex flex-column justify-content-center gradient-custom-2 h-100">
            <img
              src={Login}
              alt="Login"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </Col>
        <Col md={6} className="vh-100">
          <Container className="vh-100 d-flex align-items-center">
            <Row className="justify-content-center w-100 m-0">
              <Col lg={6}>
                <div className="text-center pb-lg-5 pb-3">
                  <img src={Airavat} style={{ width: "185px" }} alt="logo" />
                </div>

                <div className="text-center pb-2">
                  <img src={ForgotLogo} style={{ width: "50px" }} alt="logo" />
                </div>

                <div className="fs-2 fw-bold pb-2 text-center">
                  Forgot password?
                </div>

                <div className="fs-5 pb-2 text-center">
                  <h6>No worries, we'll send you reset instructions</h6>
                </div>

                <div className="pb-3 pt-2">
          
                  <InputBox
                    label="Email"
                    placeholder="Enter your e-mail"
                    value={email}
                    onChange={handleChange}
                    name="email"
                    isRequired={true}
                  />
                  {/* Show validation error below input */}
                  {error && <p className="text-danger">{error}</p>}
                </div>

                <div className="pt-2">
                  <CommanButton
                    label="Reset password"
                    variant="#7B3F0080"
                    className="mb-3 ps-4 pe-4 w-100 p-2"
                    style={{ borderRadius: "5px" }}
                    onClick={handleFormSubmit}
                  />
                </div>

                <div className="text-center pt-3" onClick={()=>{navigate('/login')}} style={{cursor:"pointer"}}>
                  <span className="pe-2" style={{ color: "#1D949A" }}>
                    <FaArrowLeft />
                  </span>
                  <span style={{ color: "#1D949A", fontWeight: "500" }}>
                    Log in
                  </span>
                </div>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </div>
  );
}

export default EnterEmail;
