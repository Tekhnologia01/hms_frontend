import React, { useEffect, useState } from "react";
import DoctorAppointmentCard from "./DoctorAppointmentCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { Form } from "react-bootstrap";

function DoctorAppointment() {

  const { user } = useSelector(state => state?.auth);
  const [appointmentData, setAppointmentData] = useState([]);
  const [days, setDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const token = useSelector((state) => state.auth.currentUserToken);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const [selectedDay, setSelectedDay] = useState(() => {
    const today = new Date().getDay();
    return today === 0 ? 7 : today;
  });


  const navigate = useNavigate();

  const getDays = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/department/getday`,config);
      setDays(response?.data?.data)
    } catch (err) {
      console.log("Error fetching days => ", err)
    }
  }

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/appointment/doctordaywise?doctor_id=${user?.userId}&appointment_date=${selectedDate}`,config)
      setAppointmentData(response?.data?.data);
    } catch (err) {
      console.log("Error fetching appointments => ", err)
    }
  }

  useEffect(() => {
    getDays();
  }, [])

  useEffect(() => {
    if (selectedDate) {
      fetchAppointments()
    }
  }, [selectedDate])

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    const newDayIndex = new Date(newDate).getDay();
    setSelectedDay(newDayIndex === 0 ? 7 : newDayIndex);
  }

  return (
    <div className="py-4 px-3">
      <div className="d-flex align-items-md-center mb-4 mb-md-0 justify-content-md-between flex-column flex-md-row align-items-start justify-content-start">
        <div>
          <div className="fw-bold fs-3">
            My Appointments
          </div>
          <div className="pb-4 pt-1">
            <span className="fw-semibold" style={{ fontSize: '1rem' }}>Showing:</span>
            <span style={{ fontSize: '1rem' }}> All Consultations of All Healthcare Providers</span>
          </div>
        </div>
        <Form.Group controlId="sexSelect">

          <Form.Group controlId="dateSelect">
            <Form.Control type="date" value={selectedDate} onChange={handleDateChange} />
          </Form.Group>

          {/* <Form.Select
            value={selectedDay}
            name="day"
            onChange={(e) => { setSelectedDay(e.target.value) }}
          // isRequired={true}
          >
            {
              days?.map(day => {
                return <option key={day.day_id} value={day.day_id}>{day.day_name}</option>
              })
            }
          </Form.Select> */}
        </Form.Group>
      </div>
      {
        appointmentData?.length === 0 &&
        <div className="fw-semibold text-center pt-4">
          No appointments available
        </div>
      }
      {appointmentData?.map((appointment, index) => (
        <DoctorAppointmentCard
          appointmentData={appointment}
        />
      ))}
    </div>
  );
}

export default DoctorAppointment;