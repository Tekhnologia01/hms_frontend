// import React from "react";
// import { Card, Col, Row } from "react-bootstrap";
// import vijay from '../../assets/images/avatars/vijay.jpg'

// function DoctorDetails() {
//   return (
//     <div className="p-5">
//       <Row>
//         <Col md={3}>

//     {/* className="ps-lg-5 pe-lg-5" */}
//           <div className="border ">
//           <div className="d-flex justify-content-center pt-5">
//             <img
//               src={vijay}
//               alt="Doctor"
//               className="rounded-circle "
//               style={{
//                 width: "100px",
//                 height: "100px",
//                 objectFit: "cover",
//                 backgroundColor: "",
//               }}
//             />
//           </div>
//             <div className="text-center fw-bold fs-5 pt-3">Doctor Name</div>

//             <div className="text-center pt-3 pb-5 fs-6">Doctor Info In short</div>
//           </div>

//           <div></div>
//         </Col>
//         <Col>

//         <div>

//             <div className="fw-bold fs-5">
//             
//             </div>
//             <div className="text-muted " style={{fontSize:'1.02rem'}}>
//             Doctor Info
//             </div>

//             <div className="fw-bold fs-5">
//             Education
//             </div>

//             <hr>
//             </hr>
//             <div className="fw-bold fs-5">
//             Degree
//             </div>

//             <hr>
//             </hr>

//             <div className="fw-bold fs-5">
//             Services
//             </div>

//             <div className="fw-bold fs-4">
//             Specializations
//             </div>

//         </div>
//     </Col>
//       </Row>
//     </div>
//   );
// }

// export default DoctorDetails;

import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import vijay from "../../assets/images/avatars/vijay.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";

function DoctorDetails() {

  const params = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState([]);

  async function getProfile() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/details?user_id=${params?.doctorId}`);
      console.log("appooijofdng => ", response?.data?.data);
      setDoctor(response?.data?.data);
    } catch (err) {
      console.log("Error fetching departments:", err);
    }
  }

  useEffect(() => {
    getProfile();
  }, [params]);

  return (
    <div className="mx-lg-3 m-3">
      <div
        className="fw-semibold pt-1 pb-2"
        style={{ color: "#1D949A", fontSize: "18px" }}
        onClick={() => navigate("/reception/doctors_appointments")}
      >
        <FaArrowLeft />
        <span className="pt-1 px-2">Doctor Appointment/View Doctor Details/{doctor?.name}</span>
      </div>
      {/* Reduced padding */}
      <Row className="g-4 m-0">
        <Col md={4}>
          <div>
            <div className="pb-5">
              <div className="border rounded p-3 ">
                <div className="d-flex justify-content-center pt-3">
                  <img
                    src={`${process.env.REACT_APP_API_URL}/${doctor?.photo}`}
                    alt="Doctor"
                    className="rounded-circle"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="text-center fw-bold fs-5 pt-3">{doctor?.name}</div>
                <div className="text-center pt-2 fs-6 text-muted">
                  {doctor?.mobile}
                </div>
                <div className="text-center pt-2 pb-4 fs-6 text-muted">
                  {doctor?.email}
                </div>
              </div>
            </div>

            {/* <div className="border rounded ">
              <div className="pt-2 fs-5 fw-semibold text-center">Contact</div>
              <hr></hr>
              <div className="text-center fw-bold fs-5 pt-3">Doctor Name</div>
              <div className="text-center pt-2 pb-4 fs-6 text-muted">
                Doctor Info in Short
              </div>
            </div> */}
          </div>
        </Col>
        <Col md={8}>
          <div>
            <div className="fw-semibold fs-4 mb-2">Biography</div>

            <div className="fw-semibold fs-6 mt-3">Education</div>
            <div className="text-muted ms-1" style={{ fontSize: "1rem" }}>
              {doctor?.degree}
            </div>

            <hr />

            <div className="fw-semibold fs-6 mt-2">Post Degree</div>
            <div className="text-muted ms-1" style={{ fontSize: "1rem" }}>
              {doctor?.post_degree}
            </div>
            <hr />

            <div className="fw-semibold fs-6 mt-2">Department</div>
            <div className="text-muted ms-1" style={{ fontSize: "1rem" }}>
              {doctor?.department_name}
            </div>
            <hr />

            {/* <div className="fw-semibold fs-5 mt-2">Services</div>
            <div className="d-flex gap-2 mt-2 flex-wrap">
              {
                doctorDetails.services.map((service) => {
                  return <p className="text-center rounded-5 px-3 py-1" style={{ border: "1px solid #EAECF0" }}>
                    {service}
                  </p>
                })
              }
            </div> */}

            <div className="fw-semibold fs-6 mt-2">Specializations</div>
            <div className="d-flex gap-2 mt-2 flex-wrap">
              <p className="text-center rounded-5 px-3 py-1" style={{ border: "1px solid #EAECF0" }}>
                {doctor?.specialization}
              </p>
              <p className="text-center rounded-5 px-3 py-1" style={{ border: "1px solid #EAECF0" }}>
                {doctor?.post_specialization}
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default DoctorDetails;