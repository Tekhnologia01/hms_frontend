import { useEffect, useState } from "react";
import vijay from "../../../assets/images/avatars/vijay1.jpg";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import CommonTable from "../../../components/table/CommonTable";
import NewCommonPagination from "../../../components/pagination/NewCommonPagination";
import axios from "axios";
import { useSelector } from "react-redux";
import { epochTimeToDate } from "../../../utils/epochToDate";

function PatientList() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const limitPerPage = 10;
  const { user } = useSelector(state => state?.auth);
  const token = useSelector((state) => state.auth.currentUserToken);
  const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }


  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/doctor/getAllApointmentDoctorswise?doctor_id=${user?.userId}&page=${currentPage}&limit=${limitPerPage}`,config);
        setPatients(response?.data?.data);
      } catch (err) {
        console.log("Error fetching patients => ", err)
      }
    }
    fetchPatients();
  }, [currentPage])

  const columns = [
    // { name: "", accessor: "checkbox", class: "w-auto" },
    { name: "Patient Name", accessor: "Patient_Name", class: "py-3 px-4 text-left", width: "250px" },
    { name: "UH ID", accessor: "Patient_Id", class: "text-center px-1" },
    { name: "Date", accessor: "Appointment_Date", class: "text-center px-1" },
    { name: "Sex", accessor: "Patient_Sex", class: "text-center px-1", width: "70px" },
    { name: "Age", accessor: "Patient_Age", class: "text-center px-1", width: "50px" },
    { name: "Status", accessor: "Appointment_Status", class: "py-3 text-center px-1" },
  ];

  const renderRow = (item, index) => (
    <tr key={item.Patient_Id} className="border-bottom text-center">
      <td className="px-2 text-start lh-1">
        <div className="d-flex align-items-center">
          <img
            src={item.Patient_Photo ? `${process.env.REACT_APP_API_URL}/${item.Patient_Photo}` : vijay}
            alt={item.Patient_Name}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
            className="ms-3"
          />
          <div className="d-flex flex-column ms-2" style={{ height: "40px" }}>
            <p className="fw-semibold m-auto">{item.Patient_Name}</p>
          </div>
        </div>
      </td>
      <td className="py-3 px-2">UH{item?.Patient_Id}</td>
      <td className="py-3 px-2">{epochTimeToDate(item?.Appointment_Date)}</td>
      <td className="py-3 px-2">{item?.Patient_Sex}</td>
      <td className="py-3 px-2">{item?.Patient_Age}</td>
      <td className="py-3 px-2">{item?.Appointment_Status}</td>
    </tr>
  );


  return (
    <>
      <div className="py-4 px-3">
        <div
          className="fw-semibold fs-6"
          style={{ color: "#1D949A" }}
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
          <span className="pt-1 px-2">Patient List</span>
        </div>
        <div className="fw-bold py-4 fs-4">
          <span>Patients List</span>
        </div>

        {
          (patients?.data?.length === 0 || patients.length === 0) ?
            <div className="fw-semibold text-center pt-4">
              No patients found
            </div> :
            <div>
              <div>
                <CommonTable minimumWidth={"750px"} headers={columns} bodyData={patients?.data} renderRow={renderRow} title={"Patient List"} />
              </div>
              {
                patients?.data?.length > 0 &&
                <NewCommonPagination currentPage={currentPage} limitPerPage={limitPerPage} totalRecords={patients?.pagination?.total_records} setCurrentPage={setCurrentPage} />
              }
            </div>
        }
      </div>
    </>
  );
}

export default PatientList;