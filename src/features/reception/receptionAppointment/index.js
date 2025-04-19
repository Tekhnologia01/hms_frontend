import React, { useEffect, useState } from "react";
import vijay from "../../../assets/images/avatars/vijay.jpg";
import AppointmentCard from "./AppointmentCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InputBox from "../../../components/common/form/inputbox";
import { useSelector } from "react-redux";

function AppointmentDoctor() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const token = useSelector((state) => state.auth.currentUserToken);
  const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  async function getDoctors() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/doctor/getDoctorsWithTodayAppointment?appo_date=${selectedDate}`,config);
      setDoctors(response?.data?.data);
    } catch (err) {
      console.log("Error fetching departments:", err);
    }
  }

  useEffect(() => {
    getDoctors();
  }, [selectedDate]);

  return (
    <div className="p-lg-4 p-3">
      <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between">
        <div>
          <div className="fw-bold fs-3">
            Doctor Appointments
          </div>
          <div className="pb-4 pt-1">
            <span className="fw-semibold" style={{ fontSize: '1rem' }}>Showing:</span>
            <span style={{ fontSize: '1rem' }}> All Consultations of All Healthcare Providers</span>
          </div>
        </div>
        <div className="mb-4 mb-sm-0">
          <InputBox
            type="date"
            value={selectedDate}
            onChange={(e) => {setSelectedDate(e.target.value)}}
          />
        </div>
      </div>
      {doctors?.map((doctor, index) => (
        <AppointmentCard
          key={doctor.Doctor_Id}
          doctorId={doctor.Doctor_Id}
          image={doctor.Doctor_photo}
          doctorName={doctor.Doctor_Name}
          specialist={doctor.specialization}
          timing={doctor.Doctor_Time}
          joinDate={doctor.joiningDate}
          description={doctor.degree}
          selectedDate={selectedDate}
          onViewAppointments={doctor.onViewAppointments}
          onViewDetails={doctor.onViewDetails}
        />
      ))}
    </div>
  );
}

export default AppointmentDoctor;