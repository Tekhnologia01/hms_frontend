import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import vijay from "../../../assets/images/avatars/vijay1.jpg";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import CommanButton from "../../../components/common/form/commonButtton";
import BookAppointment from "../../commonfeature/BookAppointment";
import CommonTable from "../../../components/table/CommonTable";
import NewCommonPagination from "../../../components/pagination/NewCommonPagination";
import axios from "axios";
import { useSelector } from "react-redux";
import AdmitPatient from "../../admitPatient/admissionForm";
import './patients.css';
import UpdatePatient from "./UpdatePatient";
import { showToast } from "../../../components/common/Toaster";
import { epochTimeToDate, epochToTime } from "../../../utils/epochToDate";
import { NavLink, useNavigate } from "react-router-dom";
import { MdOutlineBedroomChild } from "react-icons/md";
import ChangeRoom from "../../commonfeature/ChangeRoom";
import { FaPlusSquare } from "react-icons/fa";
import AddCharges from "../../commonfeature/AddCharges";
import { CiMedicalClipboard } from "react-icons/ci";

function PatientAppointmentList() {
  const [showModal, setShowModal] = useState(false);
  const [showChangeRoomModal, setShowChangeRoomModal] = useState(false);
  const [showAddChargesModal, setShowAddChargesModal] = useState(false);
  const [showBookModal, setShowBookModal] = useState(false);
  const [showUpdteModal, setShowUpdateModal] = useState(false);
  const [patientCounts, setPatientCounts] = useState({
    totalCount: 0,
    appointmentCount: 0,
    admittedCount: 0
  });
  const handleShowModal = () => setShowModal(true);
  // const handleCloseModal = () => setShowModal(false);
  const handleUpdateModal = () => setShowUpdateModal(true);
  const handleUpdateCloseModal = () => setShowUpdateModal(false);
  const handleCloseModal = () => {
    getIPDPatients();
    getPatientsCount();
    setShowModal(false);
  };


const navigate=useNavigate()
  const handleAddChargesModal = () => setShowAddChargesModal(true);
  const handleAddChargesCloseModal = () => setShowAddChargesModal(false);
  const handleChangeRoomModal = () => setShowChangeRoomModal(true);
  const handleChangeRoomCloseModal = () => setShowChangeRoomModal(false);
  const handleBookModal = () => setShowBookModal(true);
  const handleBookCloseModal = () => setShowBookModal(false);
  const { user } = useSelector(state => state?.auth)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const limitPerPage = 10;
  const [patients, setPatients] = useState([]);
  const [cardState, setCardState] = useState("ipd");
  const [patient, setPatient] = useState();
  const [admited, setAdmited] = useState();


  async function getPatients() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/patient/getAll?page=${currentPage}&limit=${limitPerPage}`);
      console.log("appooijofdng => ", response?.data?.data);
      setPatients(response?.data?.data);
      setTotalPages(response?.data?.data?.pagination?.TotalPages);
    } catch (err) {
      console.log("Error fetching departments:", err);
    }
  }

  async function getIPDPatients() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/patient/get_admit_patients?page=${currentPage}&limit=${limitPerPage}`);
      console.log("appooijofdng => ", response?.data?.data);
      setPatients(response?.data?.data);
      setTotalPages(response?.data?.data?.pagination?.TotalPages);
    } catch (err) {
      console.log("Error fetching departments:", err);
    }
  }

  async function getOPDPatients() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/patient/get_opd?page=${currentPage}&limit=${limitPerPage}`);
      setPatients(response?.data?.data);
      setTotalPages(response?.data?.data?.pagination?.TotalPages);
    } catch (err) {
      console.log("Error fetching departments:", err);
    }
  }

  async function getDoctorsOPDPatients() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/patient/get_opd?page=${currentPage}&limit=${limitPerPage}`);
      setPatients(response?.data?.data);
      setTotalPages(response?.data?.data?.pagination?.TotalPages);
    } catch (err) {
      console.log("Error fetching departments:", err);
    }
  }

  useEffect(() => {
    if (cardState === "opd") {
      getOPDPatients();
    } else if (cardState === "ipd") {
      getIPDPatients();
    } else {
      getPatients();
    }
  }, [cardState, currentPage]);

  useEffect(() => {
    if (cardState === "opd" && user.role === "Reception") {
      getOPDPatients();
    }
    else if (cardState === "opd" && user.role === "Doctor") {
      getDoctorsOPDPatients();
    }
    else if (cardState === "ipd") {
      getIPDPatients();
    } else {
      getPatients();
    }
    setCurrentPage(1);
  }, [cardState]);

  async function getPatientsCount() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/patient/get_patient_count`, {
        params: {
          role: user.role,
          doctor_id: user?.userId
        }
      });
      setPatientCounts(response?.data?.data);
    } catch (err) {
      console.log("Error fetching departments:", err);
    }
  }

  useEffect(() => {
    getPatientsCount();
  }, [user.role])




  const handleAdmitpatientCloseModal = async () => {
    try {
      await getIPDPatients();
      await getPatientsCount();
      handleCloseModal()
    } catch (error) {

    }
  }
  const handleBookAppointmentClose = async () => {
    try {
      await getOPDPatients();
      await getPatientsCount();
      handleBookCloseModal()
    } catch (error) {

    }
  }

  const columns = [
    { name: "Patient Name", accessor: "patientName", class: "py-3 px-5 text-left", width: "250px" },
    { name: "UH ID", accessor: "uhId", class: "text-center px-1" },
    { name: "Date", accessor: "date", class: "text-center px-1" },
    { name: "Sex", accessor: "sex", class: "py-3 text-center px-1" },
    { name: "Age", accessor: "age", class: "py-3 text-center px-1", width: "30px" },
    { name: "Action", accessor: "action", class: "py-3 text-center px-1", }
  ];

  const opdColumns = [
    // { name: "", accessor: "checkbox", class: "w-auto" },
    { name: "Patient Name", accessor: "patientName", class: "py-3 px-5 text-left", width: "250px" },
    { name: "UH ID", accessor: "uhId", class: "text-center px-1" },
    { name: "Date", accessor: "date", class: "text-center px-1" },
    { name: "Doctor Name", accessor: "doctor", class: "text-center px-1" },
    { name: "Slot", accessor: "doctor", class: "text-center px-1" },
    { name: "Sex", accessor: "sex", class: "py-3 text-center px-1" },
    { name: "Age", accessor: "age", class: "py-3 text-center px-1" },
    // { name: "Action", accessor: "action", class: "py-3 text-center px-1", }
  ];

  const ipdColumns = [
    { name: "Patient Name", accessor: "patientName", class: "py-3 px-5 text-left", width: "250px" },
    { name: "IPD ID", accessor: "uhId", class: "text-center px-1" },
    { name: "Admit Date", accessor: "date", class: "text-center px-1" },
    { name: "Sex", accessor: "sex", class: "py-3 text-center px-1" },
    { name: "Age", accessor: "age", class: "py-3 text-center px-1", width: "30px" },
    { name: "Doctor name", accessor: "doctorName", class: "py-3 text-center px-1", },
    { name: "Department", accessor: "department", class: "py-3 text-center px-1", },
    ...(user.RoleId == 2 ? [{ name: "Action", accessor: "action", class: " text-center", }] : [])

  ];

  const renderRow = (item, index) => (
    <tr key={item.id} className="border-bottom text-center">
      <td className="px-2 text-start lh-1">
        <div className="d-flex align-items-center">
          <div className="ps-2">
            <input
              type="checkbox"
              style={{ transform: "scale(1.5)", cursor: "pointer" }}
            />
          </div>
          <img
            src={item?.Photo ? `${process.env.REACT_APP_API_URL}/${item?.Photo}` : vijay}
            alt={item?.Name}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
            className="ms-3"
          />
          <div className="ms-2">
            <p className="fw-semibold m-auto">{item?.Name}</p>
          </div>
        </div>
      </td>
      <td className="py-3 px-2">{item?.uh_id}</td>
      <td className="py-3 px-2">{item?.created_at?.split("T")[0]}</td>
      <td className="py-3 px-2">{item?.patient_sex}</td>
      <td className="py-3 px-2">{item?.patient_age}</td>
      <td>
        <FiEdit2 style={{ height: "23px", width: "23px" }}
          onClick={() => {
            setPatient(item)
            handleUpdateModal()
          }
          }
        />
        <span className="ps-3"></span>
        <RiDeleteBinLine style={{ height: "25px", width: "25px" }} />
      </td>
    </tr>
  );

  const renderOPDRow = (item, index) => (
    <tr key={item.id} className="border-bottom text-center">
      <td className="px-2 text-start lh-1">
        <div className="d-flex align-items-center">
          <img
            src={item?.patient_image ? `${process.env.REACT_APP_API_URL}/${item?.patient_image}` : vijay}
            alt={item?.patient_name}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
            className="ms-3"
          />
          <div className="ms-2">
            <p className="fw-semibold m-auto">{item?.patient_name}</p>
          </div>
        </div>
      </td>
      <td className="py-3 px-2">{item?.uh_id}</td>
      <td className="py-3 px-2">{epochTimeToDate(item?.appo_date)}</td>
      <td className="py-3 px-2">{item?.user_name}</td>
      <td className="py-3 px-2">{item?.slot_time}</td>

      <td className="py-3 px-2">{item?.patient_sex}</td>
      <td className="py-3 px-2">{item?.patient_age}</td>
      {/* <td>
        <FiEdit2 style={{ height: "23px", width: "23px" }} />
        <span className="ps-3"></span>
        <RiDeleteBinLine style={{ height: "25px", width: "25px" }} />
      </td> */}
    </tr>
  );


  const renderIPDRow = (item, index) => (
    <tr key={item.id} className="border-bottom text-center">
      <td className="px-2 text-start lh-1">

        <div className="d-flex align-items-center">

          <img
            src={item?.Photo ? `${process.env.REACT_APP_API_URL}/${item?.Photo}` : vijay}
            alt={item?.Name}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
            className="ms-3"
          />
          <div className="ms-2">
            <p className="fw-semibold m-auto">{item?.Name}</p>
          </div>
        </div>
        {/* </NavLink> */}
      </td>
      <td className="py-3 px-2">{item?.ipd_id}</td>
      <td className="py-3 px-2">{item?.admitted_date} {item?.admit_time}</td>
      <td className="py-3 px-2">{item?.patient_sex}</td>
      <td className="py-3 px-2">{item?.patient_age}</td>
      <td className="py-3 px-2">{item?.doctor_name}</td>
      <td className="py-3 px-2">{item?.department}</td>
      {
        user.RoleId == 2 &&


        <td>
          <MdOutlineBedroomChild style={{ height: "23px", width: "23px" }}
            onClick={() => {
              setAdmited(item)
              handleChangeRoomModal()
            }} />
          <span className="ps-2"></span>

          <FaPlusSquare style={{ height: "23px", width: "23px" }}
            onClick={() => {
              navigate(`/doctor/patient_list/ipd/${item.admitted_patient_id}`)
              // setAdmited(item)
              // handleAddChargesModal()
            }} />



{user?.userId == item?.doctor_id && <NavLink to={"/doctor/discharge_patient"} state={item?.ipd_id}>
          <CiMedicalClipboard  style={{ height: "30px", width: "30px" }} />
        </NavLink>}
        </td>
      }


   
    </tr>
  );

  const patientUpdate = async (data) => {
    try {
      const patientData = {
        patient_name: data.patient_name,
        patient_phone_no: data.patient_phone_no,
        patient_age: data.patient_age,
        patient_address: data.patient_address,
        patientId: patient.Patient_ID
      };
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/patient/update`, patientData)
      showToast(response?.data?.message);
      getPatients()
    } catch (error) {
      showToast(error?.response?.data?.message, "error");

    }
  }

  return (

    <div className="py-4 px-3 patients_list">
      <div>
        <Row className="align-items-center m-0">
          <Col md={6}>
            <div className="fw-bold fs-3">Patient List</div>
            <div className="pb-3">
              <span className="fw-semibold" style={{ fontSize: "1rem" }}>
                Showing:
              </span>
              <span style={{ fontSize: "1rem" }}>
                {" "}
                All Consultations of All Healthcare Providers
              </span>
            </div>
          </Col>
          <Col md={6}>
            <div
              className="d-flex justify-content-end align-items-center"
              style={{ verticalAlign: "middle" }}
            >
              {
                (user.role === "Reception" && cardState === 'opd') && <CommanButton
                  label="+ Book Appointment"
                  className="mb-3 ps-4 pe-4 p-2 fw-bold fs-6"
                  style={{ borderRadius: "5px" }}
                  onClick={handleBookModal}
                />
              }
              {
                (user.role === "Reception" && cardState === 'ipd') && <CommanButton
                  label="Admit Patient"
                  className="mb-3 ps-4 pe-4 p-2 fw-bold fs-6"
                  style={{ borderRadius: "5px" }}
                  onClick={
                    handleShowModal}
                />
              }
            </div>
          </Col>
        </Row>
      </div>

      {patientCounts &&
        <div className="cards-container d-flex align-items-center justify-content-start mt-3 ms-3 gap-4 flex-wrap">

          <div className="count_card" onClick={() => { setCardState("ipd") }}  >
            <p className="heading">IPD</p>
            <p className="count">{patientCounts.admittedCount}</p>
          </div>
          <div className="count_card" onClick={() => { setCardState("opd") }} >
            <p className="heading">OPD</p>
            <p className="count">{patientCounts.appointmentCount}</p>
          </div>
          {user.role !== "Doctor" && <div className="count_card" onClick={() => { setCardState("all") }} >
            <p className="heading">All</p>
            <p className="count">{patientCounts.totalCount}</p>
          </div>}
        </div>}

      <div className="mt-5">
        {cardState === "ipd" && <div>
          <CommonTable minimumWidth={"1000px"} headers={ipdColumns} bodyData={patients?.data} renderRow={renderIPDRow} title={"Patients List"} />
        </div>}
        {cardState === "opd" && <div>
          <CommonTable minimumWidth={"1000px"} headers={opdColumns} bodyData={patients?.data} renderRow={renderOPDRow} title={"Patients List"} />
        </div>}
        {cardState === "all" && <div>
          <CommonTable minimumWidth={"1000px"} headers={columns} bodyData={patients?.data} renderRow={renderRow} title={"Patients List"} />
        </div>}
        {
          totalPages > 1 &&
          <NewCommonPagination currentPage={currentPage} limitPerPage={limitPerPage} totalRecords={patients?.pagination?.TotalRecords} setCurrentPage={setCurrentPage} />
        }
      </div>

      <BookAppointment
        show={showBookModal}
        // handleClose={handleBookCloseModal}
        handleClose={handleBookAppointmentClose}
      />


      <AdmitPatient
        show={showModal}
        // handleClose={handleCloseModal}
        handleClose={handleAdmitpatientCloseModal}

      />

      <UpdatePatient
        patient={patient}
        patientUpdate={patientUpdate}
        show={showUpdteModal}
        handleClose={handleUpdateCloseModal}
      />

      <ChangeRoom
        admited={admited}
        patientUpdate={patientUpdate}
        show={showChangeRoomModal}
        handleClose={handleChangeRoomCloseModal}
      />


      <AddCharges
        admited={admited}
        patientUpdate={patientUpdate}
        show={showAddChargesModal}
        handleClose={handleAddChargesCloseModal}
      />

    </div>
  );
}

export default PatientAppointmentList;