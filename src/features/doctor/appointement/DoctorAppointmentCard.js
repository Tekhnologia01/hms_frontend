



import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import CommanButton from "../../../components/common/form/commonButtton";
import { BiTimeFive } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getDateAndDay } from "../../../utils/getDateAndDay";
import { epochTimeToDate } from "../../../utils/epochToDate";

function DoctorAppointmentCard({
  appointmentData
}) {

  const navigate = useNavigate();

  return (
    <Card className="mb-3" style={{ borderRadius: "8px" }}>
      <Row className="m-0 p-2 gx-0 align-items-center">

        <Col
          xl={2} lg={2} md={2} sm={3} xs={12}
          className="d-flex flex-column border-md-end align-items-center justify-content-center py-2"
        >
          <span className="fw-semibold">{appointmentData.Appointment_Date}</span>
        </Col>

        <Col xl={8} lg={8} md={7} sm={9} xs={12} className="py-2">
          <div>

            <Row className="m-0">
              <Col md={4} xs={12} className="gy-1 d-flex align-items-center">
                <BiTimeFive style={{ height: "25px", width: "25px" }} />
                <span className="ps-2 fw-semibold" style={{ fontSize: "0.9rem" }}>
                  {appointmentData?.appo_time}
                </span>
              </Col>

              <Col md={7} xs={12} className="gy-1">
                <span className="fw-semibold" style={{ fontSize: "0.9rem" }}>
                  {appointmentData?.Consultant_Reason}
                </span>
              </Col>
            </Row>

            <Row className="m-0 mt-1">
              <Col md={4} xs={12} className="gy-1 d-flex align-items-center">
                <FaRegUserCircle style={{ height: "22px", width: "22px", marginLeft: "2px" }} />
                <span className="ps-2 fw-semibold" style={{ fontSize: "0.9rem" }}>
                  {appointmentData?.Patient_Name}
                </span>
              </Col>


              <Col md={7} xs={12} className="gy-1">
                <span className="fw-semibold" style={{ fontSize: "0.9rem" }}>
                  <NavLink to={`${process.env.REACT_APP_API_URL}/${appointmentData.document}`} target="_blank" rel="noopener noreferrer">
                    View Documents
                  </NavLink>
                </span>
              </Col>
            </Row>

          </div>
        </Col>

        <Col xl={2} lg={2} md={3} sm={12} xs={12} className="py-2">
          <div className="h-100 d-flex justify-content-center align-items-center">

            <CommanButton
              label={appointmentData.Appointment_Status === "Completed" ? "Monitored Patient" : "Monitor Patient"}
              className="px-4 py-2 fs-6 fw-semibold w-100 text-white"
              style={{
                borderRadius: "5px",
                backgroundColor: appointmentData.Appointment_Status === "Completed" ? "#6c757d" : "#198754", // gray or green
              }}
              onClick={() => {
                appointmentData.Appointment_Status === "Completed"
                  ? navigate("/doctor/appointments")
                  : navigate(`${appointmentData?.Appointment_Id}`);
              }}
              aria-label="Monitor Patient Button"
            />

          </div>
        </Col>

      </Row>
    </Card>

  );
}

export default DoctorAppointmentCard;

