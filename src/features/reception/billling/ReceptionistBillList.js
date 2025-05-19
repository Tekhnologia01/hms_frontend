
import { useEffect, useState } from "react";
import { IoReceiptOutline } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import CommonTable from "../../../components/common/table/CommonTable";
import NewCommonPagination from "../../../components/common/pagination/NewCommonPagination";
import axios from "axios";
import ViewOPDBill from "./ViewOPDBill";
import { useSelector } from "react-redux";
import { LuReceiptIndianRupee } from "react-icons/lu";

function ReceptionistBillList() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const limitPerPage = 10;
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date().toISOString().split("T")[0]; // Format to YYYY-MM-DD
    return today;
  });
  const [showBill, setShowBill] = useState(false);
  const [billData, setBillData] = useState();

  const token = useSelector((state) => state.auth.currentUserToken);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const fetchDetails = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/appointment/getappointmentdatewise?appointment_date=${selectedDate}&page=${currentPage}&limit=${limitPerPage}`, config);

      setDoctors(response?.data?.data);
    } catch (err) {
      console.log("Error fetching doctors => ", err);
    }
  };

  const handelViewBill = (item, index) => {
    setBillData(item);
    setShowBill(true);
  }

  useEffect(() => {
    fetchDetails();
  }, [currentPage, selectedDate]);

  const columns = [
    { name: "Patient Name", accessor: "Name", class: "py-3  px-4 text-left" },
    { name: "UH ID", accessor: "joining_date", class: "text-center px-3" },
    { name: "Sex", accessor: "consultancy_fee", class: "py-3 text-center px-1" },
    { name: "Age", accessor: "consultancy_fee", class: "py-3 text-center px-1" },
    { name: "Diseases", accessor: "consultancy_fee", class: "py-3 text-center px-1" },
    { name: "Doctor Name", accessor: "consultancy_fee", class: "py-3 text-center px-1" },
    { name: "Bill Status", accessor: "appo_biil_status", class: "py-3 text-center px-1" },
    { name: "Actions", accessor: "actions", class: "py-3 text-center px-1" },
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
      <td className="py-4 px-4" style={{ width: "100px" }}>{item.patient_sex ?? "-"}</td>
      <td className="py-3 px-2" style={{ width: "80px" }}>{item.patient_age ?? "-"}</td>
      <td className="py-3 px-2" style={{ width: "150px" }}>{item.disease ?? "-"}</td>
      <td className="py-3 px-2" style={{ width: "180px" }}>{item.doctor_name ?? "-"}</td>
      <td className="py-3 px-2" style={{ width: "160px" }}>{item.appo_biil_status ?? "-"}</td>
      <td style={{ width: "80px" }}>
        {item.appo_biil_status == "Pending" ? <NavLink to={`/reception/billing/opd/${item.Appo_id}`} className={"text-decoration-none text-black"}>
          <IoReceiptOutline style={{ height: "23px", width: "23px", cursor: "pointer" }} />
        </NavLink> :
          <a
            href={`${process.env.REACT_APP_API_URL}/uploads/${item.bill_report}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary text-decoration-underline"
          >
            <LuReceiptIndianRupee style={{ height: "23px", width: "23px", cursor: "pointer" }} />
          </a>
        }
      </td>
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
          <span className="pt-1 px-2">OPD Billing List</span>
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
            title={"OPD Bills"}
          />
          {doctors?.data?.length > 0 && (
            <NewCommonPagination
              currentPage={currentPage}
              limitPerPage={limitPerPage}
              totalRecords={doctors?.pagination?.TotalRecords}
              setCurrentPage={setCurrentPage}
            />
          )}
          <ViewOPDBill show={showBill} setShow={setShowBill} data={billData} />
        </div>
      </div>
    </>
  );
}

export default ReceptionistBillList;
