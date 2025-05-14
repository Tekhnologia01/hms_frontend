import  { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import CommanButton from "../../../components/common/form/commonButtton";
import PasswordInput from "../../../components/common/form/password";
import Airavat from "../../../assets/images/Airavat.png";
import ForgotLogo from "../../../assets/images/forgotlogo.png";
import Login from '../../../assets/images/loginflip.png';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { showToast } from "../../../components/common/Toaster";

function SetnewPassword() {
  const navigate = useNavigate();
const {email}=useParams()
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Password validation function
  const validatePasswords = () => {
    const newErrors = {};

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?{}[\]~])[A-Za-z\d!@#$%^&*()_\-+=<>?{}[\]~]{8,}$/;

    if (!passwordRegex.test(formData.newPassword)) {
      newErrors.newPassword =
        "Password must be strong";
    }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // return true if no errors
  };

  const handleFormSubmit = async () => {
    if (validatePasswords()) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/forgot/changepassword`,
          {
            userEmail: email,
            newPassword: formData.newPassword,
          }
        );
  
        if (response.data.status) {
          showToast("Password changed successfully!")    
              navigate("/passwordreset");

        } else {
          console.error("Failed to change password:", response.data.message);
        }
      } catch (error) {
        // Handle error during API call
        console.error("Error changing password:", error.message);
      }
    }
  };
  
    // navigate("/passwordreset");
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

                <div className="fs-2 fw-bold pb-3 text-center">
                  Set new password
                </div>

                <div className="fs-5 pb-2 text-center ps-3 pe-3">
                  <h6>Your new password must be different from previous ones.</h6>
                </div>

                <div className="pt-2">
                  <PasswordInput
                    label="Enter New Password*"
                    name="newPassword"
                    placeholder="Enter your password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    error={errors.newPassword}
                    required
                  />
                </div>
                <div className="ps-2 pt-2">Must be at least 8 characters</div>

                <div className="pb-4 pt-2">
                  <PasswordInput
                    label="Confirm Password*"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                    required
                  />
                </div>

                <div className="p-2">
                  <CommanButton
                    label="Reset password"
                    variant="#7B3F0080"
                    className="mb-3 ps-4 pe-4 w-100 p-2"
                    style={{ borderRadius: "5px" }}
                    onClick={handleFormSubmit}
                  />
                </div>

                <div className="text-center pt-3">
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

export default SetnewPassword;
