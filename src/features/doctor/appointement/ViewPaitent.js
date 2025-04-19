import React, { useState, useEffect } from "react";
import { Row, Col, Form, Table } from "react-bootstrap";
import Note from "../../../components/common/form/textarea";
import { FaArrowLeft, FaFileUpload } from "react-icons/fa";
import CommanButton from "../../../components/common/form/commonButtton";
import AddTest from "./AddTest";
import Bill from "./Billl";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import AddPrescriptionTable from "./PrescriptionAddTable";
import ExaminationForm from "./ExaminationForm";
import AdmitPatient from "../../admitPatient/admissionForm";
import BillPDF from "./OPDBill";
import { pdf } from "@react-pdf/renderer";
import { showToast } from "../../../components/common/Toaster";

function ViewPatient() {
  const inputstyle = {
    fontSize: "1rem",
  };
  const navigate = useNavigate();
  const user = useSelector(state => state?.auth?.user);
  const { role } = useSelector(state => state?.auth?.user);
  const [showModalbill, setShowModalbill] = useState(false);
  const handleShowModalbill = () => setShowModalbill(true);
  const handleCloseModalbill = () => setShowModalbill(false);
  const [showModal, setShowModal] = useState(false);
  const [showAdmitModal, setShowAdmitModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [showModalPrescription, setShowModalPrescription] = useState(false);
  const handleShowModalPrescription = () => setShowModalPrescription(true);
  const handleCloseModalPrescription = () => setShowModalPrescription(false);

  const handleShowModalAdmit = () => setShowAdmitModal(true);
  const handleCloseModalAdmit = () => {setShowAdmitModal(false)};
  const [isUpdate, setIsUpdate] = useState(false);
  const [testData, setTestData] = useState([]);
  const [appointmentData, setAppointmentData] = useState([]);
  const [prescriptionData, setPrescriptionData] = useState();
  const params = useParams();

  const token = useSelector((state) => state.auth.currentUserToken);
  const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

  const initialState = {
    report_photo: "",
    report_test_id: +params.labId,
    report_appo_id: +params.appointmentId,
  }
  const [formData, setFormData] = useState(initialState);
  const [examinationData, setExaminationData] = useState({});

  useEffect(() => {
    setPrescriptionData(
      [
        {
          srNo: 1,
          appointment_id: params.appointmentId,
          medicine_name: "",
          medicine_type: "",
          frequency: "",
          quantity: "",
          dosage: "",
          days: "",
          common_note: "",
          created_by: user?.userId
        },
      ]
    )
  }, [params]);

  const handleTestSubmit = async (newData) => {
    try {
      newData.labAppoiId = +appointmentData?.Appointment_Id;
      newData.labTestIds = newData.labTestIds.map((test) => {
        return test.value;
      });

      await axios.post(`${process.env.REACT_APP_API_URL}/lab/addlabtest`, newData, config);

      getPrescriptionTest();
      alert("Test Added Successfully")
    } catch (error) {

    }
  }

  const handleDeleteTest = async (item, value) => {
    let filteredData = testData.find((test) => {
      return test.TestId === item;
    });
    if (value === 'Test') {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/lab/delete_patient_test?test_id=${filteredData?.lab_id}`, config);
        getPrescriptionTest();
        alert("Test Deleted Successfully");
      } catch (error) {
        console.error(error);
        return;
      }
    }

  }

  const completeAppointment = async () => {
    try {
      if (prescriptionData.length > 0) {
        if (!examinationData?.chief_complaints) {
          showToast("Please fill all fields", "error");
        } else {

          if (examinationData?.opd_examination_id) {
            const payload = {
              opd_examination_id: examinationData?.opd_examination_id,
              appointment_id: appointmentData?.Appointment_Id,
              chief_complaints: examinationData?.chief_complaints,
              personal_history: examinationData?.personal_history,
              past_medical_history: examinationData?.past_medical_history,
              present_medication: examinationData?.present_medication,
              general_condition: examinationData?.general_condition,
              pulse: examinationData?.pulse,
              blood_pressure: examinationData?.blood_pressure,
              respiratory_rate: examinationData?.respiratory_rate,
              spo2: examinationData?.spo2,
              signs: examinationData?.signs,
              respiratory_system: examinationData?.respiratory_system,
              cardiovascular_system: examinationData?.cardiovascular_system,
              central_nervous_system: examinationData?.central_nervous_system,
              per_abdomen: examinationData?.per_abdomen
            };
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/appointment/examination_update?userId=${user?.userId}`, payload,config);
            if (response?.data?.status) {
              showToast("Changes Saved Successfully", "success");
              handleShowModalbill()
            }
          } else {
            const payload = {
              uh_id: appointmentData?.uh_id,
              appointment_id: appointmentData?.Appointment_Id,
              chief_complaints: examinationData?.chief_complaints,
              personal_history: examinationData?.personal_history,
              past_medical_history: examinationData?.past_medical_history,
              present_medication: examinationData?.present_medication,
              general_condition: examinationData?.general_condition,
              pulse: examinationData?.pulse,
              blood_pressure: examinationData?.blood_pressure,
              respiratory_rate: examinationData?.respiratory_rate,
              spo2: examinationData?.spo2,
              signs: examinationData?.signs,
              respiratory_system: examinationData?.respiratory_system,
              cardiovascular_system: examinationData?.cardiovascular_system,
              central_nervous_system: examinationData?.central_nervous_system,
              per_abdomen: examinationData?.per_abdomen
            };
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/appointment/monitor?userId=${user?.userId}`, payload,config);
            if (response?.data?.status) {
              showToast("Changes Saved Successfully", "success");
              handleShowModalbill()
            }
          }

        }
      }
    } catch (error) {
      showToast(error?.response?.message ? error.response?.message : "Error while saving data", "error");
      console.log(error);
    }
  }

  async function getAppointementDetail() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/appointment/getAppointmentWiseDoctorpatientDetails?appo_id=${params.appointmentId}`,config);
      setAppointmentData(response?.data?.data);

    } catch (error) {
      showToast(error?.response?.message ? error.response?.message : "Error while getting data", "error");
    }
  }


  async function getPrescriptionTest() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/appointment/getprescriptiontest?appo_id=${params?.appointmentId}`,config);
      if (response?.data?.data?.prescription?.length !== 0) { setPrescriptionData(response?.data?.data?.prescription); }
      setTestData(response?.data?.data?.Test);
    } catch (error) {
      showToast(error?.response?.message ? error.response?.message : "Error while getting data", "error");
      console.log(error);
    }
  }

  const getPaymentDetails = async () => {
    handleShowModalbill()
  }

  async function getExaminationDetails() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/appointment/get_examination_details?appointment_id=${params?.appointmentId}`,config);
      if (response?.data?.status && response?.data?.data?.length > 0) {
        console.log(response?.data?.data[0])
        const newData = {
          opd_examination_id: response?.data?.data[0]?.opd_examination_id,
          chief_complaints: response?.data?.data[0]?.chief_complaints,
          personal_history: response?.data?.data[0]?.personal_history,
          past_medical_history: response?.data?.data[0]?.past_medical_history,
          present_medication: response?.data?.data[0]?.present_medication,
          general_condition: response?.data?.data[0]?.general_condition,
          pulse: response?.data?.data[0]?.pulse,
          blood_pressure: response?.data?.data[0]?.blood_pressure,
          respiratory_rate: response?.data?.data[0]?.respiratory_rate,
          spo2: response?.data?.data[0]?.spo2,
          signs: response?.data?.data[0]?.signs,
          respiratory_system: response?.data?.data[0]?.respiratory_system,
          cardiovascular_system: response?.data?.data[0]?.cardiovascular_system,
          central_nervous_system: response?.data?.data[0]?.central_nervous_system,
          per_abdomen: response?.data?.data[0]?.per_abdomen
        }
        console.log(newData);
        setExaminationData(newData);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAppointementDetail();
    getPrescriptionTest();
    getExaminationDetails();
  }, []);

  const handleBill = async (formData) => {
    const totalBill = formData.chargesList.reduce((sum, item) => sum + item.total, 0) + appointmentData.consultancy_fee;
    // Generate PDF Blob
    const billData = {
      appointment_id: params.appointmentId,
      patient_name: appointmentData.patient_name,
      consultancy_fee: appointmentData.consultancy_fee,
      total_amount: totalBill,
      chargesList: formData.chargesList,
    };

    try {
      const pdfBlob = await pdf(<BillPDF billData={billData} />).toBlob();
      const pdfFile = new File([pdfBlob], `bill_${params.appointmentId}.pdf`, {
        type: "application/pdf",
      });

      // Prepare FormData for upload
      const formDataToUpload = new FormData();
      formDataToUpload.append("pdf", pdfFile);
      formDataToUpload.append("appointment_id", params.appointmentId);
      formDataToUpload.append("total_amount", totalBill);
      formDataToUpload.append("user_id", user?.userId);
      // window.open(URL.createObjectURL(pdfBlob), "_blank");

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/bill/createbill`, { appointment_id: params.appointmentId, total_amount: totalBill, chargesList: formData?.chargesList, user_id: user?.userId },config);
      if (response.data?.status) {
        alert("Bill Created Successfully");
        handleCloseModalbill();

        setFormData(initialState);
        // navigate('/doctor/patient_list')
      }
    } catch (err) {
      console.log(err);
    }
  }


  const saveChanges = (e) => {
    const { name, value } = e.target;
    setExaminationData({
      ...examinationData,
      [name]: value, // Store the file object
    });
  }

  const handleCheckboxChange = (event) => {
    const { checked, value } = event.target;

    setExaminationData((prevState) => {
      const selectedConditions = prevState.past_medical_history ? prevState.past_medical_history.split(", ") : [];

      if (checked) {
        selectedConditions.push(value); // Add checked value
      } else {
        selectedConditions.splice(selectedConditions.indexOf(value), 1); // Remove unchecked value
      }

      return { ...prevState, past_medical_history: selectedConditions.join(", ") };
    });
  };

  const handleOtherChange = (event) => {
    const { value } = event.target;

    setExaminationData((prevState) => {
      let selectedConditions = prevState.past_medical_history ? prevState.past_medical_history.split(", ") : [];

      // Remove previous "Other" input from the list
      selectedConditions = selectedConditions.filter(item => !item.startsWith("Other:"));

      if (value.trim()) {
        selectedConditions.push(`Other: ${value}`); // Add new "Other" value
      }

      return { ...prevState, past_medical_history: selectedConditions.join(", ") };
    });
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
          <span className="pt-1 px-2">Doctor Appointment / Patients Details / Patient Name </span>
        </div>
        <div className="d-flex mt-4 m-lg-0 gap-2 justify-content-end">
          <CommanButton
            label="Admit Patient"
            className="p-1 px-4 fw-semibold"
            style={{ borderRadius: "7px", fontSize: "14px", height: "40px", }}
            onClick={handleShowModalAdmit}
            disabled={!appointmentData?.uh_id}
          />
        </div>
      </div>

      {/* Patient Details */}
      <Row className="mt-4 m-0">
        <Col md={3} className="m-0 p-0">
          {appointmentData?.Patient_Photo &&
            <div className="d-flex justify-content-center">
              <img
                src={`${process.env.REACT_APP_API_URL}/${appointmentData?.Patient_Photo}`}
                alt="Doctor"
                className="rounded-circle"
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  backgroundColor: "red",
                }}
              />
            </div>}

          {/* Doctor Details */}
          <div className="text-center mt-3 fw-bold ">{appointmentData?.Patient_Name}</div>
        </Col>
        <Col md={9} className="m-0 ">
          <Row className="m-0 p-0">
            <div>
              <Row className="m-0">
                <Col className="">
                  <div className=" d-flex justify-content-center ">
                    <div style={inputstyle}>UH I’d</div>
                  </div>
                  <div
                    className="d-flex justify-content-center fw-semibold "
                    style={inputstyle}
                  >
                    {appointmentData?.uh_id}
                  </div>
                </Col>
                <Col className="">
                  <div className=" d-flex justify-content-center ">
                    <div style={inputstyle}>Age</div>
                  </div>
                  <div
                    className="d-flex justify-content-center fw-semibold "
                    style={inputstyle}
                  >
                    {appointmentData?.Patient_Age}
                  </div>
                </Col>
                <Col className="">
                  <div className=" d-flex justify-content-center ">
                    <div style={inputstyle}>Sex</div>
                  </div>
                  <div
                    className="d-flex justify-content-center fw-semibold "
                    style={inputstyle}
                  >
                    {appointmentData?.Patient_Sex}
                  </div>
                </Col>
              </Row>
              <Row className="m-0 mt-3">
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
                <Col className="">
                  <div className=" d-flex justify-content-center ">
                    <div style={inputstyle}>Date</div>
                  </div>
                  <div
                    className="d-flex justify-content-center fw-semibold "
                    style={inputstyle}
                  >
                    {appointmentData?.RegisterDate?.split("T")[0]}
                  </div>
                </Col>
                <Col className="">
                  <div className=" d-flex justify-content-center ">
                    <div style={inputstyle}>Diseases</div>
                  </div>
                  <div
                    className="d-flex justify-content-center fw-semibold "
                    style={inputstyle}
                  >
                    {appointmentData?.disease}
                  </div>
                </Col>
              </Row>
            </div>
          </Row>
        </Col>
      </Row>

      <hr></hr>

      <Row>
        <Col lg={6}>
          <div className=" px-3">
            <Note
              value={examinationData?.chief_complaints}
              disabled={user?.RoleId !== 2}
              placeholder="Chief Complaints here..."
              className=".bg-transparent"
              label="Chief Complaints"
              name="chief_complaints"
              isRequired={true}
              onChange={saveChanges}
            />
          </div>
        </Col>

        <Col lg={6}>
          <div className="ps-3">
            <div className="fw-semibold pb-2 " style={{ "fontSize": '1rem' }}>
              Past Medical History
            </div>

            <div className="">
              <Row className="m-0">
                <Col md={4}>
                  <Form.Check
                    type="checkbox"
                    label="DM"
                    value={"Diabetes Mellitus"}
                    name="dm"
                    checked={formData?.past_medical_history?.includes("Diabetes Mellitus")}
                    onChange={handleCheckboxChange}
                    disabled={user?.RoleId !== 2}
                  />
                </Col>
                <Col md={4}>
                  <Form.Check
                    type="checkbox"
                    label="CVA"
                    value={"Cerebrovascular Accident"}
                    name="cva"
                    checked={formData?.past_medical_history?.includes("Cerebrovascular Accident")}
                    onChange={handleCheckboxChange}
                    disabled={user?.RoleId !== 2}
                  />

                </Col>
                <Col md={4}>
                  <Form.Check
                    type="checkbox"
                    label="BA"
                    value={"Bronchial Asthma"}
                    name="ba"
                    checked={formData?.past_medical_history?.includes("Bronchial Asthma")}
                    onChange={handleCheckboxChange}
                    disabled={user?.RoleId !== 2}
                  />

                </Col>
                <Col md={4}>
                  <Form.Check
                    type="checkbox"
                    label="IHD"
                    value={"Ischemic Heart Disease"}
                    name="ihd"
                    checked={formData?.past_medical_history?.includes("Ischemic Heart Disease")}
                    onChange={handleCheckboxChange}
                    disabled={user?.RoleId !== 2}
                  />

                </Col>
                <Col md={4}>
                  <Form.Check
                    type="checkbox"
                    label="COPD"
                    value={"Chronic Obstructive Pulmonary Disease"}
                    name="copd"
                    checked={formData?.past_medical_history?.includes("Chronic Obstructive Pulmonary Disease")}
                    onChange={handleCheckboxChange}
                    disabled={user?.RoleId !== 2}
                  />
                </Col>
              </Row>
              <div className="pt-2 d-flex gap-3">

                <Form.Label className="pt-1"> Any Other :</Form.Label>
                <Form.Group controlId="other">

                  <Form.Control
                    type="text"
                    name="other"
                    // value={formData.other}
                    onChange={handleOtherChange}
                    placeholder="Enter other past illnesses"
                    disabled={user?.RoleId !== 2}
                  />
                </Form.Group>

              </div>
            </div>

          </div>
        </Col>
      </Row>

      <Row>
        <Col lg={6}>

          <div className="mt-3 px-3">
            <Note
              value={examinationData?.present_medication}
              disabled={user?.RoleId !== 2}
              placeholder="Present Medication"
              className=""
              label="Present Medication"
              onChange={saveChanges}
              name="present_medication"
            />
          </div>

        </Col>

        <Col lg={6}>
          <div className="mt-3 px-3">
            <Note
              value={examinationData?.personal_history}
              disabled={user?.RoleId !== 2}
              placeholder="Personal H/O"
              label="Personal H/O"
              onChange={saveChanges}
              name="personal_history"
            />
          </div>

        </Col>

      </Row>

      <ExaminationForm formData={examinationData} setFormData={setExaminationData} />
      <Row className="px-3">
        <Col className="px-3">
          {(prescriptionData) && <AddPrescriptionTable rows={prescriptionData} setRows={setPrescriptionData} appointmentId={appointmentData?.Appointment_Id} role={user?.RoleId} appointmentData = {appointmentData} />}
        </Col>
      </Row>

      {testData?.length > 0 && <Row className="px-3">
        <div>
          <div className="mt-2">
            <div className="p-2 ">
              <div className="fw-bold  fs-5">Recomended Tests</div>
            </div>

            <Row className="m-0">
              {testData?.length > 0 &&
                testData?.map((test) => {
                  return <span className="p-2 rounded m-2 text-center w-auto" key={test?.lab_id} style={{ border: '2px solid #1d949a' }}>
                    {test?.TestName}
                    {
                      role === 'Doctor' &&
                      <span onClick={() => handleDeleteTest(test?.TestId, 'Test')} style={{ cursor: "pointer" }}><RxCross2 className="" /></span>
                    }
                  </span>
                })
              }
            </Row>
          </div>
        </div>
      </Row>}


      <Row className="px-3 mt-3">
        <Col className="px-3">
          {
            user?.RoleId === 2 &&
            <span
              className="fw-semibold fs-6 pl-2 cursor-pointer"
              style={{ color: "#1d949a", cursor: 'pointer' }}
              onClick={handleShowModal}
            >+ Add Test</span>
          }
        </Col>
      </Row>

      <div className="">
        <hr />

        <div className="">
          <Row className="m-0">
            {/* <Col lg={6}>
              <input
                type="checkbox"
                id="notifyPatientCheckbox"
                style={{ marginRight: "10px" }}
              />
              <label htmlFor="notifyPatientCheckbox" className="mb-0">
                Notify Patient about Availability of Consultation Note
              </label>
            </Col> */}

            <Col lg={12} className="d-flex justify-content-end">
              <div className="d-flex gap-2">
                {/* {
                  (role === "Doctor" || role === "Lab") &&
                  <>
                    <CommanButton
                      label="Save"
                      variant="#7B3F0080"
                      className="mb-3 ps-4 pe-4  p-2"
                      style={{ borderRadius: "5px" }}
                      onClick={completeAppointment}
                    />
                  </>
                } */}
                {user?.RoleId === 2 && <CommanButton
                  label="End Appointment"
                  variant="#7B3F0080"
                  className="mb-3 ps-4 pe-4  p-2 "
                  style={{
                    borderRadius: "5px",
                    backgroundColor: "white",
                    color: "black",
                    borderColor: "#CFD4DC",
                  }}
                  onClick={completeAppointment}

                />}
                {(user?.RoleId === 4 && appointmentData?.Appointment_Status === "Completed" && appointmentData?.payment_status === "Pending") && <CommanButton
                  label="Payment Pending"
                  variant="#7B3F0080"
                  className="mb-3 ps-4 pe-4  p-2 "
                  style={{
                    borderRadius: "5px",
                    backgroundColor: "white",
                    color: "black",
                    borderColor: "#CFD4DC",
                  }}
                  onClick={getPaymentDetails}
                />}
              </div>
            </Col>
          </Row>
        </div>
      </div>

      <AddTest
        show={showModal}
        handleClose={handleCloseModal}
        handleTestSave={handleTestSubmit}
      />

      <AdmitPatient
        show={showAdmitModal}
        handleClose={handleCloseModalAdmit}
        appointmentData={appointmentData}
      />

      <Bill
        show={showModalbill}
        patientName={appointmentData?.Patient_Name}
        consultationFee={appointmentData?.consultancy_fee}
        handleClose={handleCloseModalbill}
        callbackFun={handleBill}
      />
    </div >
  );
}

export default ViewPatient;
