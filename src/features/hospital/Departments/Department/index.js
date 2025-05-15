import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import CommonTable from "../../../../components/table/CommonTable";
import NewCommonPagination from "../../../../components/pagination/NewCommonPagination";
import axios from "axios";
import { showToast } from "../../../../components/common/Toaster";
import { useSelector } from "react-redux";
import vijay from "../../../../assets/images/avatars/vijay1.jpg"

function Department() {
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState("staff");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [userCount, setUserCount] = useState([]);
  const params = useParams();
  const { deptId } = params;
  const [currentPage, setCurrentPage] = useState(1);
  const [limitPerPage, setLimitPerPage] = useState(10);
  const token = useSelector((state) => state.auth.currentUserToken);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const fetchCount = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/DepartmentWiseCount?department_id=${deptId}`, config)
      setUserCount(response?.data?.data);
    } catch (err) {
      console.log(err)
    }
  }

  const fetchData = async () => {
    let endpoint = "";

    switch (selectedCard) {
      case "doctor":
        endpoint = `/doctor/getDoctorsDepartmentwise?dep_id=${deptId}&page=${currentPage}&limit=${limitPerPage}`;
        break;
      case "staff":
        endpoint = `/receptionist/getReceptionitsDepartmentwise?dep_id=${deptId}&page=${currentPage}&limit=${limitPerPage}`;
        break;
      case "nurse":
        endpoint = `/lab/getLabassistantDepartmentwise?dep_id=${deptId}&page=${currentPage}&limit=${limitPerPage}`;
        break;
      case "patient":
        endpoint = `/patient/getPatientsByDepartment?dep_id=${deptId}&page=${currentPage}&limit=${limitPerPage}`;
        break;
      case "admitpatient":
        endpoint = `/patient/getAdmittedPatientsByDepartment?dep_id=${deptId}&page=${currentPage}&limit=${limitPerPage}`;
        break;
      default:
        return;
    }

    try {
      setIsLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}${endpoint}`, config);
      setSelectedData(response?.data?.data || null);
    } catch (error) {
      console.error(`Error fetching ${selectedCard} data:`, error);
      setSelectedData(null);
      showToast(error?.response?.data?.message ? error?.response?.data?.message : "Error while deleting room!", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedCard, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCard]);

  useEffect(() => {
    fetchCount();
  }, [])

  const cardData = [
    { label: "Total Staff", route: "staff", list: "staffList", count: "totalReceptionist" },
    { label: "Total Doctors", route: "doctor", list: "doctorList", count: "totalDoctors" },
    // { label: "Total Nurse", route: "nurse", list: "nurseList", count: "totalLabAssistance" },
    // { label: "Total Patients", route: "patient", list: "totalPatientList" },
    // { label: "Admit Patients", route: "admitpatient", list: "admitPatientList" }
  ];

  const columnDefinitions = {
    staff: [
      { name: "Name", accessor: "Name", class: "py-3 px-4 text-left", width: "40%" },
      { name: "Date of Joining", accessor: "dateOfJoining", class: "text-center px-1", width: "20%" },
      { name: "Shift Timing", accessor: "shiftTiming", class: "text-center px-1" },
      { name: "Department", accessor: "Department_name", class: "text-center px-1" },
      // { name: "Actions", accessor: "actions", class: "text-center px-1", width: "13%" }
    ],
    doctor: [
      { name: "Name", accessor: "Name", class: "py-3 px-4 text-left", width: "40%" },
      { name: "Date of Joining", accessor: "dateOfJoining", class: "text-center px-1" },
      // { name: "Attending Patients", accessor: "attendingPatient", class: "text-center px-1" },
      // { name: "Shift Timing", accessor: "shiftTiming", class: "text-center px-1" },
      { name: "Department", accessor: "Department_name", class: "text-center px-1" }
    ],

  };


  const columns = columnDefinitions[selectedCard] || [];




  const renderdoctor = (item) => (
    <tr key={item.id} className="border-bottom text-center">
      <td className="px-2 text-start lh-1">
        <div className="d-flex align-items-center">
          <img
            src={item.Photo ? `${process.env.REACT_APP_API_URL}/${item.Photo}` : vijay}
            alt={item.Name}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
            className="ms-3"
          />
          <div className="d-flex flex-column ms-2" style={{ height: "40px" }}>
            <p className="fw-semibold">{item.Name}</p>
            <p style={{ marginTop: "-10px", color: "#475467", fontSize: "14px" }}>
              Id: {item.User_ID}
            </p>
          </div>
        </div>
      </td>
      <td className="py-3 px-2"> {item.joining_date} </td>
      {/* <td className="py-3 px-2">{item.shift_name} </td> */}
      <td className="py-3 px-2">{item.Department_name || "-"}</td>

    </tr>
  );


  const renderstaff = (item) => (
    <tr key={item.id} className="border-bottom text-center">
      <td className="px-2 text-start lh-1">
        <div className="d-flex align-items-center">
          <img
            src={item.Photo ? `${process.env.REACT_APP_API_URL}/${item.Photo}` : vijay}
            alt={item.Name}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
            className="ms-3"
          />
          <div className="d-flex flex-column ms-2" style={{ height: "40px" }}>
            <p className="fw-semibold">{item.Name}</p>
            <p style={{ marginTop: "-10px", color: "#475467", fontSize: "14px" }}>
              Id: {item.User_ID}
            </p>
          </div>
        </div>
      </td>
      <td className="py-3 px-2">
  {item.joining_date ? new Date(item.joining_date).toLocaleDateString('en-GB') : ""}
</td>
      <td className="py-3 px-2">{item.shift_name} </td>
      <td className="py-3 px-2">{item.Department_name || "-"}</td>

    </tr>
  );





  return (
    <div className="px-3">
      <div className="fw-semibold fs-6 pb-lg-3 mt-4" style={{ color: "#1E959B" }}>
        <FaArrowLeft />
        <span className="pt-1 px-2" onClick={() => navigate("/hospital/departments")}>
          Department / {deptId}
        </span>
      </div>

      <div className="d-flex align-items-center justify-content-center mt-3 gap-4 flex-wrap">
        {cardData.map((item, index) => (
          <div
            key={index}
            className={`d-flex flex-column align-items-center rounded-3 shadow-sm py-3 gap-2`}
            style={{ flex: "1 1 200px", maxWidth: "250px", minWidth: "200px", cursor: "pointer", border: "1.7px solid #1E959B", backgroundColor: selectedCard === item.route ? "#eaeaea" : "" }}
            onClick={() => setSelectedCard(item.route)}
          >
            <span className="fw-semibold" style={{ fontSize: "18px" }}>{item.label}</span>
            <span className="fs-3 fw-semibold" style={{ color: "#1E959B" }}>{userCount[item.count] ? userCount[item.count] : 0}</span>
          </div>
        ))}
      </div>

      {selectedCard == "doctor" ? <div className="mt-4">
        {isLoading ? (
          <div className="w-full text-center fs-5 fw-semibold">Loading...</div>
        ) : selectedData?.data?.length > 0 ? (
          <CommonTable
            minimumWidth={"900px"}
            headers={columns}
            renderRow={renderdoctor}
            bodyData={selectedData?.data}
            title={`${selectedCard} List`}
          />
        ) : (
          <div className="w-full text-center fs-5 fw-semibold">No data found</div>
        )}
      </div> : <div className="mt-4">
        {isLoading ? (
          <div className="w-full text-center fs-5 fw-semibold">Loading...</div>
        ) : selectedData?.data?.length > 0 ? (
          <CommonTable
            minimumWidth={"900px"}
            headers={columns}
            renderRow={renderstaff}
            bodyData={selectedData?.data}
            title={`${selectedCard} List`}
          />
        ) : (
          <div className="w-full text-center fs-5 fw-semibold">No data found</div>
        )}
      </div>}






      {(selectedData && selectedData?.pagination?.TotalRecords > 0 && !isLoading) && <NewCommonPagination currentPage={currentPage} limitPerPage={limitPerPage} totalRecords={selectedData?.pagination?.TotalRecords} setCurrentPage={setCurrentPage} />}
    </div>
  );
}

export default Department