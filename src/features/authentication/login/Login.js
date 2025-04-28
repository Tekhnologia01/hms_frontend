import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../redux/slices/authSlice";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputBox from "../../../components/common/form/inputbox";
import CommanButton from "../../../components/common/form/commonButtton/index";
import PasswordInput from "../../../components/common/form/password";
import Airavat from "../../../assets/images/Airavat.png";
import Google from "../../../assets/images/google.png";
import Facebook from "../../../assets/images/facebook.png";
import Apple from "../../../assets/images/apple.png";
import Login1 from "../../../assets/images/login.png";
import CommonToast, { showToast } from "../../../components/common/Toaster";

function Login() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // **Formik validation schema using Yup**
  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Username is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must include an uppercase letter, a lowercase letter, a number, and a special character"
      )
      .required("Password is required"),
  });

  // **Login function**
  const handelForm = async (values, { setSubmitting, setErrors }) => {
    console.log("form submit ", values)
    try {
      const response = await dispatch(loginUser({
        userName: values.username,
        password: values.password
      }));
      if (response?.payload?.token) {
        // showToast("Login Successfull!", "success");
        // setTimeout(() => {
          navigate("/");
        // }, 1000);
      } else {
        showToast(response?.payload, "error")
      }
    } catch (error) {
      showToast("This is an error message!", "error")
      setErrors({ server: error.response?.data.message || "Login failed!" });
    }
    setSubmitting(false);
  };

  return (
    <div className="vh-100 vw-100">
      <CommonToast />
      <Row className="m-0">
        <Col md={6} className="vh-100 ">
          <Container className="vh-100 d-flex align-items-center">
            <Row className="justify-content-center w-100 m-0">
              <Col lg={6}>
                <div className="text-center pb-lg-5 pb-3">
                  <img src={Airavat} style={{ width: "185px" }} alt="logo" />
                </div>

                <div className="fs-3 fw-bold pb-2 text-center">
                  Sign in to your account
                </div>

                <div className="pb-2 text-center">
                  <p>Welcome back! Please enter your details</p>
                </div>

                {/* **Formik form starts here** */}
                <Formik
                  initialValues={{ username: "", password: "" }}
                  validationSchema={validationSchema}
                  onSubmit={handelForm}
                  validateOnChange
                  validateOnBlur
                >
                  {({ values, errors, touched, handleChange, handleSubmit }) => {
                    return (
                      <Form onSubmit={handleSubmit}>
                        <div className="py-lg-0 py-sm-0">
                          <label className="fs-6 pb-2 fw-5 fw-semibold">
                            Username <span className="text-danger fw-bold">*</span>
                          </label>
                          <InputBox
                            placeholder="Enter your username"
                            value={values.username}
                            onChange={handleChange}
                            name="username"
                          />
                          {touched.username && errors.username && (
                            <div className="text-danger">{errors.username}</div>
                          )}
                        </div>

                        <div className="pb-2 pt-2 mt-2">
                          <PasswordInput
                            label="Password"
                            name="password"
                            placeholder="Enter your password"
                            value={values.password}
                            onChange={handleChange}
                            required
                          />
                          {touched.password && errors.password && (
                            <div className="text-danger">{errors.password}</div>
                          )}
                        </div>

                        {/* Display server error */}
                        {errors.server && (
                          <div className="text-danger text-center mt-2">{errors.server}</div>
                        )}

                        <div className="mt-2">
                          <CommanButton
                            label="Login"
                            variant="#7B3F0080"
                            className="mb-3 ps-4 pe-4 w-100 p-2"
                            style={{ borderRadius: "5px" }}
                            type="submit"
                          />
                        </div>
                      </Form>
                    )
                  }}
                </Formik>

                {/* <div className="d-flex justify-content-center">
                  <hr style={{ width: "45%", border: "1px solid black" }} />{" "}
                  <span className="pt-1 ps-1 pe-1"> OR</span>{" "}
                  <hr style={{ width: "45%", border: "1px solid black" }} />
                </div>

                <div className="pt-3 pb-3">
                  <Row className="m-0 justify-content-between ">
                    <Col className="d-flex justify-content-center m-2"
                      style={{ border: "1px solid #CFD4DC", borderRadius: "10px" }}>
                      <div className="p-2">
                        <img src={Facebook} alt="Facebook" style={{ maxHeight: "30px" }} />
                      </div>
                    </Col>
                    <Col className="d-flex justify-content-center m-2"
                      style={{ border: "1px solid #CFD4DC", borderRadius: "10px" }}>
                      <div className="p-2">
                        <img src={Google} alt="Google" style={{ maxHeight: "30px" }} />
                      </div>
                    </Col>
                    <Col className="d-flex justify-content-center m-2"
                      style={{ border: "1px solid #CFD4DC", borderRadius: "10px" }}>
                      <div className="p-2">
                        <img src={Apple} alt="Apple" style={{ maxHeight: "30px" }} />
                      </div>
                    </Col>
                  </Row>
                </div>*/}

                <div className="text-center">
                  {/* <span style={{ fontWeight: "500" }}>I don’t have an account? </span> */}
                  <p>
            <span style={{ fontWeight: "500", color: "#1D949A" ,cursor:
              "pointer"
            }}  onClick={()=>{navigate('/enteremail')}}>forgot password ?</span></p>
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

export default Login;
