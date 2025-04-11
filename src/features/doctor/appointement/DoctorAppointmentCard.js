// import React from "react";
// import { Card, Col, Row } from "react-bootstrap";
// import CommanButton from "../../components/common/form/commonButtton";
// import { CiStethoscope } from "react-icons/ci";
// import { BiTimeFive } from "react-icons/bi";
// import { FaRegCalendar } from "react-icons/fa";
// import { TbFileDescription } from "react-icons/tb";
// import vijay from "../../assets/images/avatars/vijay.jpg";

// function DoctorAppointmentCard() {
//   return (
//     <div className="p-5">
//       <Card>
//         <Row className="m-0 p-0">
//           <Col
//             lg={1}
//             className="d-flex align-items-center justify-content-center pt-2"
//           >
//             <div
//               className="text-center bg-info"
//               style={{ height: "100px", width: "100px" }}
//             >
//               {" "}
//               {/* Set height as needed */}
//               <img
//                 src={vijay}
//                 alt="Vijay"
//                 style={{ height: "100%", width: "100%", objectFit: "cover" }}
//               />
//             </div>
//           </Col>

//           <Col lg={9}>
//             <div className="  h-100  justify-content-start pt-4">
//               <div className="row m-0">
//                 <div className="col">
//                   <span className="fw-bold  " style={{ fontSize: "1.4rem" }}>
//                     Dactor Name
//                   </span>
//                 </div>
//               </div>

//               <div className="row m-0 ">
//                 <div className="col-md-3 col-12 gy-2">
//                   <CiStethoscope style={{ height: "25px", width: "25px" }} />
//                   <span
//                     className="ps-2 fw-semibold"
//                     style={{ fontSize: "1.2rem" }}
//                   >
//                     Specialist IN
//                   </span>
//                 </div>

//                 <div className="col-md-3  col-12 gy-2">
//                   <BiTimeFive style={{ height: "25px", width: "25px" }} />
//                   <span
//                     className="ps-2  fw-semibold"
//                     style={{ fontSize: "1.2rem" }}
//                   >
//                     Doctor Timing
//                   </span>
//                 </div>

//                 <div className="col-md-6 col-12 gy-2">
//                   <FaRegCalendar style={{ height: "25px", width: "25px" }} />
//                   <span
//                     className="ps-2 fw-semibold"
//                     style={{ fontSize: "1.2rem" }}
//                   >
//                     Joined date
//                   </span>
//                 </div>
//               </div>

//               <div className="row m-0 ">
//                 <div className="col gy-2">
//                   <TbFileDescription
//                     style={{ height: "20px", width: "20px" }}
//                   />
//                   <span className="ps-2" style={{ fontSize: "1.1rem" }}>
//                     Doctor Description On what areas they worked and experience
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </Col>

//           <Col lg={2}>
//             <div className="d-flex justify-content-center">
//               <CommanButton
//                 label="View Appointments   >"
//                 className="my-3 ps-4 pe-4 p-2 fs-5 fw-semibold"
//                 style={{ borderRadius: "5px", width: "100%" }}
//               />
//             </div>
//             <div className="d-flex justify-content-center pb-4">
//               <CommanButton
//                 label="View Doctor Details"
//                 className="my-1 ps-4 pe-4 fs-5 fw-semibold p-2 bg-white text-black "
//                 style={{ borderRadius: "5px", width: "100%" }}
//               />
//             </div>
//           </Col>
//         </Row>
//       </Card>
//     </div>
//   );
// }

// export default DoctorAppointmentCard;


















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

  // const {day, date} = getDateAndDay(appointmentData?.Appointment_Date)

  const navigate = useNavigate();

  return (
    <Card className="mb-3" style={{ borderRadius: "8px" }}>
      <Row className="m-0 p-2 gx-0 align-items-center">

        <Col
          xl={2} lg={2} md={2} sm={3} xs={12}
          className="d-flex flex-column border-md-end align-items-center justify-content-center py-2"
        >
          {/* <span className="fw-semibold">{day}</span> */}
          <span className="fw-semibold">{appointmentData.Appointment_Date}</span>
        </Col>

        <Col xl={8} lg={8} md={7} sm={9} xs={12} className="py-2">
          <div>

            <Row className="m-0">
              <Col md={4} xs={12} className="gy-1 d-flex align-items-center">
                <BiTimeFive style={{ height: "25px", width: "25px" }} />
                <span className="ps-2 fw-semibold" style={{ fontSize: "0.9rem" }}>
                  {appointmentData?.slot_time}
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
                  <NavLink to={"/"} >View Documents</NavLink>
                </span>
              </Col>
            </Row>

          </div>
        </Col>

        <Col xl={2} lg={2} md={3} sm={12} xs={12} className="py-2">
          <div className="h-100 d-flex justify-content-center align-items-center">
            <CommanButton
             label="Monitor Patient"
              className="px-4 py-2 fs-6 fw-semibold w-100"
              style={{ borderRadius: "5px" }}
              onClick={() => { navigate(`${appointmentData?.Appointment_Id}`) }}
              aria-label="Monitor Patient Button"
            />
          </div>
        </Col>

      </Row>
    </Card>

  );
}

export default DoctorAppointmentCard;

// import React from "react";
// import { Card, Col, Row } from "react-bootstrap";
// import CommanButton from "../../../components/common/form/commonButtton"; // Check typo: 'commonButtton'
// import { BiTimeFive } from "react-icons/bi";
// import { FaRegUserCircle } from "react-icons/fa";
// import { NavLink, useNavigate } from "react-router-dom";
// import { epochTimeToDate } from "../../../utils/epochToDate";

// function DoctorAppointmentCard({ appointmentData }) {
//   const navigate = useNavigate();

//   // Ensure appointmentData exists to avoid undefined errors
//   if (!appointmentData) {
//     return <div>No appointment data available</div>;
//   }








// console.log("appointmentData", appointmentData)

//   // Map stored procedure fields to component expectations
//   const {

//     appo_status: appoStatus,
//   } = appointmentData;

//   // Determine button label and color based on appointment status
//   const buttonLabel = appoStatus === "Schedule" ? "Monitor Patient" : "Monitored Patient";
//   const buttonColor = buttonLabel === "Monitored Patient" ? "green" : "#007bff"; // Default color (blue) for "Monitor Patient"

//   return (
//     <Card className="mb-3" style={{ borderRadius: "8px" }}>
//       <Row className="m-0 p-2 gx-0 align-items-center">
//         <Col
//           xl={2}
//           lg={2}
//           md={2}
//           sm={3}
//           xs={12}
//           className="d-flex flex-column border-md-end align-items-center justify-content-center py-2"
//         >
//           <span className="fw-semibold">{appointmentData.Appointment_Date}</span>
//         </Col>

//         <Col xl={8} lg={8} md={7} sm={9} xs={12} className="py-2">
//           <div>
//             <Row className="m-0">
//               <Col md={4} xs={12} className="gy-1 d-flex align-items-center">
//                 <BiTimeFive style={{ height: "25px", width: "25px" }} />
//                 <span className="ps-2 fw-semibold" style={{ fontSize: "0.9rem" }}>
//                   {appointmentData.slot_time || "N/A"}
//                 </span>
//               </Col>

//               <Col md={7} xs={12} className="gy-1">
//                 <span className="fw-semibold" style={{ fontSize: "0.9rem" }}>
//                   {appointmentData.Consultant_Reason || "No reason specified"}
//                 </span>
//               </Col>
//             </Row>

//             <Row className="m-0 mt-1">
//               <Col md={4} xs={12} className="gy-1 d-flex align-items-center">
//                 <FaRegUserCircle style={{ height: "22px", width: "22px", marginLeft: "2px" }} />
//                 <span className="ps-2 fw-semibold" style={{ fontSize: "0.9rem" }}>
//                   {appointmentData.Patient_Name || "Unknown Patient"}
//                 </span>
//               </Col>

//               <Col md={7} xs={12} className="gy-1">
//                 <span className="fw-semibold" style={{ fontSize: "0.9rem" }}>
//                   <NavLink to={`/documents/${appointmentData.Appointment_Id}`}>View Documents</NavLink>
//                 </span>
//               </Col>
//             </Row>

//             {/* Optional: Display chargesList if needed */}
//             {appointmentData.chargesList && Array.isArray(appointmentData.chargesList) && appointmentData.chargesList.length > 0 && (
//               <Row className="m-0 mt-1">
//                 <Col xs={12}>
//                   <span className="fw-semibold" style={{ fontSize: "0.9rem" }}>
//                     Charges:
//                   </span>
//                   <ul>
//                     {appointmentData.chargesList.map((charge, index) => (
//                       <li key={index}>
//                         {charge.billingType}: ${charge.total}
//                       </li>
//                     ))}
//                   </ul>
//                 </Col>
//               </Row>
//             )}
//           </div>
//         </Col>

//         <Col xl={2} lg={2} md={3} sm={12} xs={12} className="py-2">
//           <div className="h-100 d-flex justify-content-center align-items-center">
//             <CommanButton
//               label={"Monitor"}
//               className="px-4 py-2 fs-6 fw-semibold w-100"
//               style={{ borderRadius: "5px", backgroundColor: buttonColor, border: "none", color: "white" }}
//               onClick={() => navigate(`/appointment/${appointmentData.Appointment_Id}`)}
//               aria-label="Monitor Patient Button"
//             />
//           </div>
//         </Col>
//       </Row>
//     </Card>
//   );
// }

// export default DoctorAppointmentCard;