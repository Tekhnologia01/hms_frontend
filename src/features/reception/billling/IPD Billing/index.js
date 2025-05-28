import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import NewCommonPagination from "../../../../components/pagination/NewCommonPagination";
import CommonTable from "../../../../components/table/CommonTable";
import { useSelector } from "react-redux";

function IPDBillList() {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const limitPerPage = 10;
  const token = useSelector((state) => state?.auth?.currentUserToken);
  const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date()?.toISOString()?.split("T")[0]; // Format to YYYY-MM-DD
    return today;
  });


  const fetchDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/appointment/getappointmentdatewise?appointment_date=${selectedDate}&page=${currentPage}&limit=${limitPerPage}`,
       config
      );

      setDoctors(response?.data?.data);
    } catch (err) {
      console.log("Error fetching doctors => ", err);
    }
  };



  useEffect(() => {
    // fetchDetails();
  }, [currentPage, selectedDate]);

  const columns = [
    { name: "Patient Name", accessor: "Name", class: "py-3  px-4 text-left" },
    { name: "IPD ID", accessor: "joining_date", class: "text-center px-3" },
    { name: "Date", accessor: "degree", class: "py-3 text-center px-3" },
    { name: "Sex", accessor: "consultancy_fee", class: "py-3 text-center px-1" },
    { name: "Age", accessor: "consultancy_fee", class: "py-3 text-center px-1" },
    { name: "Diseases", accessor: "consultancy_fee", class: "py-3 text-center px-1" },
    { name: "Doctor Name", accessor: "consultancy_fee", class: "py-3 text-center px-1" },
    { name: "Bill Status", accessor: "appo_biil_status", class: "py-3 text-center px-1" },
  ];

  const renderRow = (item, index) => (
    <tr key={item.id} className="border-bottom text-center">
      <td className="px-2 text-start lh-1" style={{ width: "200px" }}>
        <div className="d-flex align-items-center">
          <img
            src={item.patient_image ? `${process.env.REACT_APP_API_URL}/${item.patient_image}` : ""}
            alt={item.Name}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
            className="ms-3"
          />
          <div className="ms-2 pt-3">
            <p className="fw-semibold">{item.patient_name}</p>
          </div>
        </div>
      </td>
      <td className="py-3 px-4" style={{ width: "120px" }}>{item.uh_id}</td>
      <td className="py-4 px-4" style={{ width: "140px" }}>{item.appo_date ?? "-"}</td>
      <td className="py-4 px-4" style={{ width: "100px" }}>{item.patient_sex ?? "-"}</td>
      <td className="py-3 px-2" style={{ width: "80px" }}>{item.patient_age ?? "-"}</td>
      <td className="py-3 px-2" style={{ width: "150px" }}>{item.disease ?? "-"}</td>
      <td className="py-3 px-2" style={{ width: "180px" }}>{item.doctor_name ?? "-"}</td>
      <td className="py-3 px-2" style={{ width: "160px" }}>{item.appo_biil_status ?? "-"}</td>
     
    </tr>

  );

  return (
    <>
      <div className="py-4 px-3">
        <div
          className="fw-semibold fs-6"
          style={{ color: "#1D949A", cursor: "pointer" }}
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
          <span className="pt-1 px-2">IPD Billing List</span>
        </div>
        <div className="d-flex justify-content-end">

          <div className="mb-3">

            <input
              type="date"
              className="form-control w-auto"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
              }}
            />
          </div>

        </div>

        <div>
          <CommonTable
            minimumWidth={"700px"}
            headers={columns}
            bodyData={doctors[0]}
            renderRow={renderRow}
            title={"IPD Bills"}
          />
          {doctors?.data?.length > 0 && (
            <NewCommonPagination
              currentPage={currentPage}
              limitPerPage={limitPerPage}
              totalRecords={doctors?.pagination?.TotalRecords}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default IPDBillList;
