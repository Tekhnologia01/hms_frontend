import { useEffect, useState } from "react";
import vijay from "../../assets/images/avatars/vijay1.jpg";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import CommonTable from "../../components/table/CommonTable";
import NewCommonPagination from "../../components/pagination/NewCommonPagination";
import axios from "axios";
import { formatDate } from "../../utils/formatDate";
import { useSelector } from "react-redux";

function HospitalDoctorList() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const limitPerPage = 10;
  const { role } = useSelector(state => state?.auth?.user);
  const token = useSelector((state) => state.auth.currentUserToken);
  const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/doctor/get?page=${currentPage}&limit=${limitPerPage}`,config);
        setDoctors(response?.data?.data);
      } catch (err) {
        console.log("Error fetching doctors => ", err)
      }
    }
    fetchDoctors();
  }, [currentPage])

  const columns = [
    { name: "Doctor Name", accessor: "Name", class: "py-3 w-50 px-4 text-left" },
    { name: "Date of joining", accessor: "joining_date", class: "text-center px-1" },
    { name: "Education", accessor: "degree", class: "py-3 text-center px-1" },
    { name: "Consultancy fee", accessor: "consultancy_fee", class: "py-3 text-center px-1" },
    ...(role == 1
      ? [{ name: "Actions", accessor: "actions", class: "py-3 text-center px-1" }]
      : []),
  ];
  

  const renderRow = (item, index) => (
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
            <p style={{ marginTop: "-10px", "color": "#475467", fontSize: "14px" }}>Id: {item.User_ID}</p>
          </div>
        </div>
      </td>
      <td className="py-3 px-2">{item?.joining_date}</td>
      <td className="py-3 px-2">{item.degree ?? "-"}</td>
      <td className="py-3 px-2">{item.consultancy_fee ?? "-"}</td>
      {role==1 &&
      <td>
        <FiEdit2 style={{ height: "23px", width: "23px" }} />
        <span className="ps-3"></span>
        <RiDeleteBinLine style={{ height: "25px", width: "25px" }} />
      </td>}
    </tr>
  );


  return (
    <>
      <div className="py-4 px-3">
        {/* <div
          className="fw-semibold fs-6"
          style={{ color: "#1D949A" }}
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
          <span className="pt-1 px-2">Doctor List</span>
        </div> */}
        <div className="fw-bold pb-2 fs-4">
          <span>Doctors List</span>
        </div>

        <div>
          <div>
            <CommonTable minimumWidth={"700px"} headers={columns} bodyData={doctors?.data} renderRow={renderRow} title={"Doctor List"} />
          </div>
          {
            doctors?.data?.length > 0 &&
            <NewCommonPagination currentPage={currentPage} limitPerPage={limitPerPage} totalRecords={doctors?.pagination?.TotalRecords} setCurrentPage={setCurrentPage} />
          }
        </div>
      </div>
    </>
  );
}

export default HospitalDoctorList;
