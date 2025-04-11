import { useEffect, useState } from "react";
import vijay from "../../../assets/images/avatars/vijay1.jpg";
import { IoReceiptSharp } from "react-icons/io5";
import axios from "axios";
import { useSelector } from "react-redux";
import NewCommonPagination from "../../../components/pagination/NewCommonPagination";
import CommonTable from "../../../components/table/CommonTable";
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

  const fetchReport = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/accountant/getcollection`,
        {
          params: {
            date: selectedDate, // Use selected date
            page: currentPage,
            limit: limitPerPage
          }
        }
      );
      setReportData(response?.data?.data[0] || []);
    } catch (err) {
      console.error("Error fetching report => ", err);
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

  const renderRow = (item, index) => (
    <tr key={item.id || index} className="border-bottom text-center">
      <td className="px-2 text-start">
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
          <div className="d-flex flex-column ms-lg-2 text-center">
            <p className="fw-semibold mb-0">{item.patient_name || "N/A"}</p>
            <p className="mb-0" style={{ color: "#475467", fontSize: "14px" }}>
              {item.uh_id || "-"}
            </p>
          </div>
        </div>
      </td>
      <td className="py-3 px-2">{item.date ?? "-"}</td>
      <td className="py-3 px-2">{item.amount ?? "-"}</td>
      {/* <td>
        <IoReceiptSharp
          style={{ height: "25px", width: "25px", cursor: "pointer" }}
          onClick={() => console.log(`View receipt for ${item.id}`)} // Add your receipt handler
        />
      </td> */}
    </tr>
  );

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
                  totalRecords={reportData?.pagination?.TotalRecords || reportData.length}
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