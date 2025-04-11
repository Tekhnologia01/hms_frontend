import React, { useState, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import InputBox from "../../../components/common/form/inputbox";
import Note from "../../../components/common/form/textarea";
import { FaArrowLeft, FaFileUpload } from "react-icons/fa";
import CommanButton from "../../../components/common/form/commonButtton";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { epochTimeToDate } from "../../../utils/epochToDate";
import { showToast } from "../../../components/common/Toaster";

function ViewLabAppointment({ type }) {
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
  const navigate = useNavigate();
  const { role } = useSelector(state => state?.auth?.user);
  const [showModalbill, setShowModalbill] = useState(false);
  const handleShowModalbill = () => setShowModalbill(true);
  const handleCloseModalbill = () => setShowModalbill(false);
  // const [prescriptionData, setPrescriptionData] = useState([]);
  const [testData, setTestData] = useState([]);
  const [appointmentData, setAppointmentData] = useState([]);
  const params = useParams();



  const initialState = {
    report_photo: "",
    report_test_id: +params.labId,
    report_appo_id: +params.appointmentId,
  }
  const [formData, setFormData] = useState(initialState);

  const handleSave = async () => {
    try {
      if (formData?.report_photo !== "") {

        const response = await axios.post(`${process.env.REACT_APP_API_URL}/report/add`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        if (response?.data?.status) {
          alert(response?.data?.message)
          const payload = {
            labAppoiId: +params?.appointmentId,
            labTestId: +params?.IpdLabId,
            testStatus: "Completed"
          }
          await axios.post(`${process.env.REACT_APP_API_URL}/lab/updatelabtest`, payload);
          navigate(-1);
        }
        else {
          alert("Failed to upload report");
        }

      } else {
        alert("Please Upload Report");
      }

    } catch (error) {

    }
  }




  const handleUpdate = async () => {
    try {
      if (!formData?.report_photo) {
        showToast("Please upload a report photo", "error");
        return;
      }

      const formDataObj = new FormData();
      formDataObj.append("report_photo", formData.report_photo);
      formDataObj.append("report_labtest_id", +params.IpdLabId);

      const response = await axios.put(`${process.env.REACT_APP_API_URL}/report/opdupdate`, formDataObj, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      showToast(response?.data?.message);

      setFormData(initialState);
      navigate(-1);

    } catch (error) {
      showToast(error?.response?.data?.message || "An error occurred", "error");
    }
  };




  async function getAppointementDetail() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/appointment/getAppointmentWiseDoctorpatientDetails?appo_id=${params.appointmentId}`);
      setAppointmentData(response?.data?.data);
    } catch (error) {

    }
  }




  useEffect(() => {
    getAppointementDetail();
  }, []);


  const handleInputChange = (e) => {
    const { name, type } = e.target;

    if (type === "file") {
      // Handle file inputs
      const file = e.target.files[0];
      setFormData({
        ...formData,
        [name]: file, // Store the file object
      });
    }
  };


  const handleBoxClick = () => {
    document.getElementById("report_photo").click();
  };



  return (
    <div className="mx-lg-4 m-3 pb-3">
      <div className="d-flex align-items-end justify-content-between pt-1 flex-wrap">
        <div
          className="fw-semibold pb-lg-3"
          style={{ color: "#1D949A", fontSize: "18px" }}
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
          <span className="pt-1 px-2">Doctor Appointment / Patients Details / {type} </span>
        </div>

      </div>

      <Row className="mt-2 m-0">
        <Col md={5} className="m-0 p-0">
          <div className="d-flex justify-content-center">
            <img
              src={`${process.env.REACT_APP_API_URL}/${appointmentData?.Patient_Photo}`}
              alt="Doctor"
              className="rounded-circle"
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                backgroundColor: "red",
              }}
            />
          </div>

          {/* Doctor Details */}
          <div className="text-center mt-3 fw-bold ">{appointmentData?.Patient_Name}</div>
          <div className="text-center">{appointmentData?.Patient_Age} | {appointmentData?.Patient_Sex}</div>
          <hr></hr>
          <div>
            <Row className="m-0">
              <Col>
                <div style={inputstyle}>UH I’d</div>
                <div className=" fw-semibold " style={inputstyle}>
                  UH{appointmentData?.Patient_Id}
                </div>
              </Col>
              <Col className="">
                <div className=" d-flex justify-content-center ">
                  <div style={inputstyle}>Phone No.</div>
                </div>

                <div
                  className="d-flex justify-content-center fw-semibold "
                  style={inputstyle}
                >
                  {appointmentData?.patient_phone}
                </div>
              </Col>
            </Row>

            <Row className="m-0">
              <Col className="gy-2">
                <div style={inputstyle}>Date of Register</div>
                <div className="fw-semibold " style={inputstyle}>
                  {appointmentData?.RegisterDate?.split("T")[0]}
                </div>
              </Col>
              <Col className="gy-2">
                <div className=" d-flex justify-content-center ">Diseases</div>
                <div className=" d-flex justify-content-center fw-semibold fs-6 ">
                  {appointmentData?.disease}
                </div>
              </Col>
            </Row>
          </div>

          <hr></hr>



        </Col>

        <Col md={7} className="m-0 ">
          <Row className="m-0 p-0">
            <Col md={6} className="gy-3">
              <InputBox
                label={"Healthcare Provider"}
                placeholder="Doctor name"
                value={appointmentData?.Doctor_Name}
                disabled
                isRequired={true}
              />
            </Col>


            <Col md={6} className="gy-3">
              <InputBox
                label={"Patient Name "}
                placeholder="Name"
                value={appointmentData?.Patient_Name}
                disabled
                // onChange={handleChange}
                isRequired={true}
              />
            </Col>
            <Col md={6} className="gy-3">
              <InputBox
                label={"Location"}
                placeholder="City"
                value={appointmentData?.Patient_city}
                disabled
                isRequired={true}
              />
            </Col>


            <Col md={6} className="gy-3">
              <InputBox
                label={"Date of Consultation"}
                placeholder="Date"
                value={epochTimeToDate(appointmentData?.Appointment_Date)}
                disabled
                isRequired={true}
                name="cafeName"
              />
            </Col>
          </Row>

          <div className="mt-3 px-3">
            <Note
              rows={1}
              value={appointmentData?.Consultant_Reason}
              disabled
              placeholder="Reason for consultation here..."
              className=""
              label="Reason For Consultation"
              isRequired={true}
            />
          </div>

          <div className="p-lg-3" onClick={handleBoxClick}>
            <label className="fw-semibold" style={{ fontSize: "1.1rem" }}>
              Reports <span className="text-danger fw-bold">*</span>
            </label>
            <div style={boxStyle} className="mt-2">
              <div className="d-flex justify-content-center">
                <FaFileUpload size={24} />
              </div>
              <div style={{ fontSize: "1.1rem" }}>
                <span
                  className="fw-bold"
                  style={{ fontSize: "1.1rem", color: "#1D949A" }}
                >
                  Click to upload{" "}
                </span>
                or drag and drop
              </div>
              <div style={{ fontSize: "1.1rem" }}>
                PDF (max. 5Mb)
              </div>

              {formData.report_photo && (
                <div className="mt-2 text-success fw-semibold">{formData.report_photo?.name}</div>
              )}
            </div>
            <Form.Control
              type="file"
              id="report_photo"
              name="report_photo"
              accept="image/png, image/jpeg, image/gif, image/svg+xml"
              style={{ display: "none" }}
              onChange={handleInputChange}
            />
          </div>
        </Col>
      </Row>

      <div className="">
        <hr />

        <div className="">
          <Row className="m-0 flex align-items-center justify-content-end">
            <Col lg={6} className="d-flex justify-content-end">
              <div className="d-flex gap-2">

                {

                  type == "update" ?
                    <CommanButton
                      label="Update"
                      variant="#7B3F0080"
                      className="mb-3 ps-4 pe-4  p-2"
                      style={{ borderRadius: "5px" }}
                      onClick={handleUpdate}
                    /> :
                    <CommanButton
                      label="Save"
                      variant="#7B3F0080"
                      className="mb-3 ps-4 pe-4  p-2"
                      style={{ borderRadius: "5px" }}
                      onClick={handleSave}
                    />


                }


              </div>
            </Col>
          </Row>
        </div>

        <hr />
      </div>


    </div >
  );
}

export default ViewLabAppointment;
