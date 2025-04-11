import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import CommanButton from "../../../components/common/form/commonButtton";
import { CiStethoscope } from "react-icons/ci";
import { BiTimeFive } from "react-icons/bi";
import { FaRegCalendar } from "react-icons/fa";
import { TbFileDescription } from "react-icons/tb";
import { NavLink, useNavigate } from "react-router-dom";

function AppointmentCard({ image, doctorName, specialist, timing, joinDate, description, doctorId, selectedDate }) {

  const navigate = useNavigate();

  return (
    <Card className="mb-lg-3 mb-3" style={{borderRadius:'8px'}}>
      <Row className="m-0 p-2">
        <Col lg={1} className="d-flex align-items-center justify-content-center pt-2">
          <div className="text-center bg-info" style={{ height: "100px", width: "100px" }}>
            <img src={`${process.env.REACT_APP_API_URL}/${image}`} alt={doctorName} style={{ height: "100%", width: "100%", objectFit: "cover" }} />
          </div>
        </Col>

        <Col lg={8}>
          <div className="h-100 justify-content-start pt-4">
            <div className="row m-0">
              <div className="col">
                <span className="fw-bold" style={{ fontSize: "1.1rem" }}>
                  {doctorName}
                </span>
              </div>
            </div>

            <div className="row m-0" >
              <div className="col-md-3 col-12 gy-1">
                <CiStethoscope style={{ height: "25px", width: "25px" }} />
                <span className="ps-2 fw-semibold" style={{ fontSize: "0.9rem" }}>
                  {specialist}
                </span>
              </div>

              <div className="col-md-3 col-12 gy-1">
                <BiTimeFive style={{ height: "25px", width: "25px" }} />
                <span className="ps-2 fw-semibold" style={{ fontSize: "0.9rem" }}>
                  {timing}
                </span>
              </div>

              <div className="col-md-6 col-12 gy-1">
                <FaRegCalendar style={{ height: "20px", width: "20px" }} />
                <span className="ps-2 fw-semibold" style={{ fontSize: "0.9rem" }}>
                  {joinDate}
                </span>
              </div>
            </div>

            <div className="row m-0">
              <div className="col gy-2">
                <TbFileDescription style={{ height: "20px", width: "20px" }} />
                <span className="ps-2" style={{ fontSize: "1rem" }}>
                  {description}
                </span>
              </div>
            </div>
          </div>
        </Col>

        <Col lg={3}>
          <div className="d-flex justify-content-center">
            <NavLink to={`${doctorId}`} className={"w-100"} state={selectedDate}>
            <CommanButton
              label="View Appointments >"
              className="my-3 ps-4 pe-4 p-2 fs-6 fw-semibold"
              style={{ borderRadius: "5px", width: "100%" }}
              // onClick={() => navigate(`${doctorId}`)}
            />
            </NavLink>
          </div>
          <div className="d-flex justify-content-center pb-4">
            <CommanButton
              label="View Doctor Details >"
              className="my-1 ps-4 pe-4 fs-6 fw-semibold p-2 bg-white text-black"
              style={{ borderRadius: "5px", width: "100%" }}
              onClick={() => {navigate(`doctor/${doctorId}`)}}
            />
          </div>
        </Col>
      </Row>
    </Card>
  );
}

export default AppointmentCard;