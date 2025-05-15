import React, { useState } from "react";
import { Table, Pagination, Row, Col } from "react-bootstrap";
import { FaArrowDown, FaArrowLeft } from "react-icons/fa";
import vijay from "../../../assets/images/avatars/vijay1.jpg";
import { useNavigate } from "react-router-dom";

function PaymentHistory() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const navigate = useNavigate();

  // Example data for the table
  const patients = [
    {
      id: 1,
      name: "John Doe",
      uhId: "UH12345",
      date: "2024-12-01",
      sex: "Male",
      age: 35,
      amount: 500,
    },
    {
      id: 2,
      name: "Jane Smith",
      uhId: "UH67890",
      date: "2024-12-02",
      sex: "Female",
      age: 29,
      amount: 1000,
    },
    // Add more patient data as needed
  ];

  const headingstyle = {
    backgroundColor: "rgb(238, 241, 245)",
    color: "rgb(92, 95, 97)",
    textAlign: "center",
    padding: "10px",
    fontSize: "1rem",
  };

  const headingstyleName = {
    backgroundColor: "rgb(238, 241, 245)",
    color: "rgb(92, 95, 97)",
    textAlign: "center",
    padding: "10px",
    fontSize: "1rem",
    width: "40%",
  };

  const headingstyleAge = {
    backgroundColor: "rgb(238, 241, 245)",
    color: "rgb(92, 95, 97)",
    textAlign: "center",
    padding: "10px",
    fontSize: "1rem",
    width: "75px",
  };

  const nameStyle = {
    fontWeight: "500",
    color: "#101828",
  };

  const bodystyle = {
    textAlign: "center",
    verticalAlign: "middle",
    fontSize: "1rem",
    color: "#475467",
  };
  // Calculate pagination data
  const totalItems = patients.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPatients = patients.slice(startIndex, endIndex);

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className=" py-4">
      {/* <div
        className="fw-semibold fs-6 pb-4"
        style={{ color: "#1D949A" }}
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft />
        <span className="pt-1 px-2">Payment History</span>
      </div> */}
      <div className="fw-semibold fs-5">
        <span className="px-3">Payment History</span>
      </div>

      <div className="staff-list-container px-3 py-4">
        <div className="border" style={{ borderRadius: "5px" }}>
          <div>
            <div className="px-4 py-3 fs-5 fw-semibold">Payment History</div>
          </div>
          {/* Scrollable Container */}
          <div style={{ overflowX: "auto" }}>
            <Table
              responsive="sm"
              className="bordered"
              style={{
                tableLayout: "fixed", // Ensures fixed column width
                minWidth: "900px", // Set your desired minimum width
              }}
            >
              <thead style={{ backgroundColor: "red", color: "white" }}>
                <tr>
                  <th className="text-start" style={headingstyleName}>
                    Patient Name
                  </th>
                  <th style={headingstyle}>UH ID</th>
                  <th style={headingstyle}>
                    Date <FaArrowDown />
                  </th>
                  <th style={headingstyle}>Sex</th>
                  <th style={headingstyleAge}>
                    Age <FaArrowDown />
                  </th>
                  <th style={headingstyle}>
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentPatients.map((patient) => (
                  <tr key={patient.id}>
                    <td style={{ bodystyle, width: "350px" }}>
                      <div className="d-flex align-items-center ps-2">
                        <img
                          src={vijay}
                          alt={patient.name}
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                        />
                        <div
                          className="d-flex flex-column ms-2 pt-1"
                          style={{ height: "40px" }}
                        >
                          <p style={nameStyle}>{patient.name}</p>
                        </div>
                      </div>
                    </td>
                    <td style={bodystyle}>{patient.id}</td>
                    <td style={bodystyle}>{patient.date}</td>
                    <td style={bodystyle}>{patient.sex}</td>
                    <td style={bodystyle}>{patient.age}</td>
                    <td style={bodystyle}>{patient.amount}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          {/* Pagination */}
          <Pagination className="justify-content-center">
            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={currentPage === index + 1}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      </div>
    </div>
  );
}

export default PaymentHistory;
