import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import CommonTable from "../../../../components/table/CommonTable";
import NewCommonPagination from "../../../../components/pagination/NewCommonPagination";
import axios from "axios";
import { showToast } from "../../../../components/common/Toaster";

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

  const fetchCount = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/DepartmentWiseCount?department_id=${deptId}`)
      console.log(response?.data?.data);
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
      const response = await axios.get(`${process.env.REACT_APP_API_URL}${endpoint}`);
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
    { label: "Total Nurse", route: "nurse", list: "nurseList", count: "totalLabAssistance" },
    { label: "Total Patients", route: "patient", list: "totalPatientList" },
    { label: "Admit Patients", route: "admitpatient", list: "admitPatientList" }
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
      { name: "Attending Patients", accessor: "attendingPatient", class: "text-center px-1" },
      { name: "Shift Timing", accessor: "shiftTiming", class: "text-center px-1" },
      { name: "Department", accessor: "Department_name", class: "text-center px-1" }
    ],
    nurse: [
      { name: "Name", accessor: "Name", class: "py-3 px-4 text-left", width: "40%" },
      { name: "Date of Joining", accessor: "dateOfJoining", class: "text-center px-1" },
      { name: "Attending Patients", accessor: "attendingPatient", class: "text-center px-1" },
      { name: "Shift Timing", accessor: "shiftTiming", class: "text-center px-1" },
      { name: "Department", accessor: "Department_name", class: "text-center px-1" }
    ],
    patient: [
      { name: "Name", accessor: "Name", class: "py-3 px-4 text-left", width: "30%" },
      { name: "UHID", accessor: "uhId", class: "text-center px-1" },
      { name: "Register Date", accessor: "date", class: "text-center px-1" },
      { name: "Sex", accessor: "sex", class: "text-center px-1" },
      { name: "Age", accessor: "age", class: "text-center px-1" },
      { name: "Disease", accessor: "diseases", class: "text-center px-1" },
      { name: "Consulting Doctor", accessor: "doctorName", class: "text-center px-1" }
    ],
    admitpatient: [
      { name: "Name", accessor: "Name", class: "py-3 px-4 text-left", width: "20%" },
      { name: "UHID", accessor: "uhId", class: "text-center px-1" },
      { name: "Register Date", accessor: "date", class: "text-center px-1" },
      { name: "Sex", accessor: "sex", class: "text-center px-1", width: "70px" },
      { name: "Age", accessor: "age", class: "text-center px-1", width: "30px" },
      { name: "Disease", accessor: "diseases", class: "text-center px-1" },
      { name: "Admit Date", accessor: "admitDate", class: "text-center px-1" },
      { name: "Ward No", accessor: "wardNo", class: "text-center px-1", width: "90px" },
      { name: "Consulting Doctor", accessor: "doctorName", class: "text-center px-1" }
    ]
  };


  const columns = columnDefinitions[selectedCard] || [];


  const renderRow = (item, index) => (
    <tr key={item.id} className="border-bottom text-center">
      {columns.map(col => (
        <td key={col.accessor} className={`py-2 px-2 ${col.accessor === "Name" ? "text-start lh-1" : ""}`}>
          {col.accessor === "Name" ? (
            <div className="d-flex align-items-center">
              <img
                src={`${process.env.REACT_APP_API_URL}/${item.Photo}`}
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
          ) : col.accessor === "shiftTiming" ? (
            // Apply specific formatting for date
            <span>
              {(item.StartTime && item.EndTime) ? `${item?.StartTime?.slice(0, 5)} - ${item?.EndTime?.slice(0, 5)}` : "-"}
            </span>
          ) : col.accessor === "actions" ? (
            <div>
              <FiEdit2 style={{ height: "23px", width: "23px", cursor: "pointer" }} />
              <span className="ps-3"></span>
              <RiDeleteBinLine style={{ height: "25px", width: "25px", cursor: "pointer" }} />
            </div>
          ) : !item[col.accessor] ? (
            <span>-</span>
          ) : (
            item[col.accessor]
          )}
        </td>

      ))}
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

      <div className="mt-4">
        {isLoading ? (
          <div className="w-full text-center fs-5 fw-semibold">Loading...</div>
        ) : selectedData?.data?.length > 0 ? (
          <CommonTable
            minimumWidth={"900px"}
            headers={columns}
            renderRow={renderRow}
            bodyData={selectedData?.data}
            title={`${selectedCard} List`}
          />
        ) : (
          <div className="w-full text-center fs-5 fw-semibold">No data found</div>
        )}
      </div>

      {(selectedData && selectedData?.pagination?.TotalRecords > 0 && !isLoading) && <NewCommonPagination currentPage={currentPage} limitPerPage={limitPerPage} totalRecords={selectedData?.pagination?.TotalRecords} setCurrentPage={setCurrentPage} />}
    </div>
  );
}

export default Department