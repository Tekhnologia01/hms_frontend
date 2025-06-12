import { useEffect, useState } from "react";
import vijay from "../../../assets/images/avatars/vijay1.jpg";
import axios from "axios";
import { useSelector } from "react-redux";
import NewCommonPagination from "../../../components/common/pagination/NewCommonPagination";
import CommonTable from "../../../components/common/table/CommonTable";
import { epochTimeToDate } from "../../../utils/epochToDate";

function Report() {
  const [reportData, setReportData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState(() => {
    // Set default to today's date in YYYY-MM-DD format
    return new Date().toISOString().split('T')[0];
  });
  const [isLoading, setIsLoading] = useState(false);
  const limitPerPage = 10;
  const { role } = useSelector((state) => state?.auth?.user);

  const token = useSelector((state) => state.auth.currentUserToken);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const[imageErrors, setImageErrors] = useState({});

  const handleImageError = (patientId) => {
    setImageErrors(prev => ({ ...prev, [patientId]: true }));
  };

  const fetchReport = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/accountant/getcollection?date=${selectedDate}&page=${currentPage}&limit=${limitPerPage}`,
        config
      );
      setReportData(response?.data?.data[0] || []);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data when date or page changes
  useEffect(() => {
    fetchReport();
  }, [selectedDate, currentPage]);

  const columns = [
    { name: "Patient Name", accessor: "Name", class: "py-3 px-4 text-left" },
    { name: "Date", accessor: "date", class: "text-center px-1" },
    { name: "Amount", accessor: "amount", class: "text-center px-1" },
    // { name: "Actions", accessor: "actions", class: "py-3 text-center px-1" },
  ];

  const renderRow = (item, index) => {

    const initials = item?.patient_name?.split(" ")?.map(word => word[0]?.toUpperCase()).join("").slice(0, 2) || "";
    const imageUrl = item?.patient_image ? `${process.env.REACT_APP_API_URL}/${item.patient_image}` : null;
    const showFallback = !imageUrl || imageErrors[item.User_ID];


    return (
      <tr key={item.id || index} className="border-bottom text-center">
        {/* <td className="px-2 text-start">
          <div className="d-flex flex-lg-row flex-column align-items-center align-items-lg-start">
            <img
              src={item.patient_image ? `${process.env.REACT_APP_API_URL}/${item.patient_image}` : vijay}
              alt={item.uh_id || "Patient"}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
              className="ms-lg-3 mb-2 mb-lg-0"
              onError={(e) => { e.target.src = vijay; }} // Fallback for broken images
            />
            <div className="d-flex flex-column ms-lg-2 ">
              <p className="fw-semibold mb-0">{item.patient_name || "N/A"}</p>
              <p className="mb-0" style={{ color: "#475467", fontSize: "14px" }}>
                {item.uh_id || "-"}
              </p>
            </div>
          </div>
        </td> */}

        <td className="px-2 text-start lh-1">
          <div className="d-flex align-items-center">
            <div style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "1px solid #ccc",
              marginLeft: "0.75rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: showFallback ? "#f0f0f0" : "transparent",
              overflow: "hidden"
            }}>
              {showFallback ? (
                <span style={{ fontWeight: "bold", fontSize: "14px" }}>{initials}</span>
              ) : (
                <img
                  src={imageUrl}
                  alt={initials}
                  onError={() => handleImageError(item.User_ID)}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              )}
            </div>
            <div className="ms-2">
              <p className="fw-semibold" style={{ marginBottom: "2px" }}>{item.patient_name}</p>
              <p className="mb-0" style={{ color: "#475467", fontSize: "14px" }}>
                {item.uh_id || "-"}
              </p>
            </div>
          </div>
        </td>


        <td className="py-3 px-2">{epochTimeToDate(item.date) ?? "-"}</td>
        <td className="py-3 px-2">{item.amount ?? "-"}</td>

      </tr>
    )
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setCurrentPage(1); // Reset to first page when date changes
  };

  return (
    <div className="px-3">
      <div className="py-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="fw-bold fs-5">
            <span>Day Report</span>
          </div>
          <div>
            <input
              type="date"
              id="dateSelector"
              value={selectedDate}
              onChange={handleDateChange}
              className="form-control d-inline-block"
              style={{ maxWidth: "200px" }}
              disabled={isLoading}
            />
          </div>
        </div>

        <div>
          {isLoading ? (
            <div className="text-center py-4">Loading...</div>
          ) : (
            <>
              <CommonTable
                minimumWidth="700px"
                headers={columns}
                bodyData={reportData}
                renderRow={renderRow}
                title={`Report for ${selectedDate}`}
                showstatus={'1'}
              />

              {reportData?.length > 0 && (
                <NewCommonPagination
                  currentPage={currentPage}
                  limitPerPage={limitPerPage}
                  totalRecords={reportData?.pagination?.TotalRecords || reportData?.length}
                  setCurrentPage={setCurrentPage}

                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Report;