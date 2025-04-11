import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import Airavat from "../../../assets/images/Airavat.png";
import { useSelector } from "react-redux";
import { showToast } from "../../../components/common/Toaster";
import { useState, useEffect } from "react";
import { epochTimeToDate } from "../../../utils/epochToDate";

function DepositeReceipt() {
  const navigate = useNavigate();
  const params = useParams();
  const [details, setDetails] = useState(null);
  const { user } = useSelector((state) => state?.auth);

  const fetchReceipt = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/accountant/getadmtedpatientreceipt/`,
        {
          params: {admited_id: params.admitedId }
        }
      );
      console.log("first",response.data.data[0][0])

      setDetails(response?.data?.data[0][0]);
    } catch (error) {
      console.error('Error fetching receipt:', error);
      throw error; // Handle or propagate the error
    }
  };

  
useEffect(() => {
    fetchReceipt()

}, []);





  // Calculate total deposits
  const calculateDepositTotal = () => {
    return details?.deposits?.reduce((sum, deposit) => sum + deposit.amount, 0) || 0;
  };

  // Function to handle deposit slip print with formatted layout
  const handlePrintDepositSlip = () => {
    const printContent = `
      <html>
        <head>
          <title>Deposit Receipt</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
              padding: 0;
              font-size: 12pt;
            }
            .receipt-container {
              width: 100%;
              max-width: 800px;
              margin: 0 auto;
              border: 1px solid #ccc;
              padding: 20px;
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
            }
            .header img {
              max-width: 150px;
              height: auto;
            }
            .details-table {
              width: 100%;
              margin-bottom: 20px;
            }
            .details-table td {
              padding: 5px;
            }
            .deposit-table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            .deposit-table th, .deposit-table td {
              border: 1px solid #000;
              padding: 8px;
              text-align: center;
            }
            .deposit-table th {
              background-color: #f2f2f2;
            }
            .total-row td {
              font-weight: bold;
            }
            .footer {
              text-align: right;
              margin-top: 20px;
            }
            @media print {
              body {
                margin: 0;
              }
              .receipt-container {
                border: none;
              }
            }
          </style>
        </head>
        <body>
          <div class="receipt-container">
            <div class="header">
              <img src="${Airavat}" alt="Airavat Logo" />
              <h2>Deposit Receipt</h2>
            </div>
            <table class="details-table">
              <tr>
                <td><strong>Patient Name:</strong> ${details.Name}</td>
                <td><strong>IPD ID:</strong> ${details.ipd_id}</td>
              </tr>
              <tr>
                <td><strong>Department:</strong> ${details.department}</td>
                <td><strong>Receipt No.:</strong> IPD-${details.ipd_id}</td>
              </tr>
              <tr>
                <td><strong>Consulting Dr.:</strong> ${details.doctor_name}</td>
                <td><strong>Admitted Date:</strong> ${new Date(details.admitted_date * 1000).toLocaleDateString()}</td>
              </tr>
            </table>
            <table class="deposit-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Deposit ID</th>
                </tr>
              </thead>
              <tbody>
                ${details.deposits
                  .map(
                    (deposit, index) => `
                      <tr>
                        <td>${index + 1}</td>
                        <td>${new Date(deposit.date * 1000).toLocaleDateString()}</td>
                        <td>${deposit.amount}</td>
                        <td>${deposit.deposite_id}</td>
                      </tr>
                    `
                  )
                  .join("")}
                <tr class="total-row">
                  <td colspan="3">Total Deposited</td>
                  <td>${calculateDepositTotal()}</td>
                </tr>
              </tbody>
            </table>
            <div class="footer">
              <p>Generated on: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        </body>
      </html>
    `;
    const printWindow = window.open("", "_blank");
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  const totalDeposits = calculateDepositTotal();

  return (
    <div className="mx-lg-4 m-3 pb-3">
      <div className="pt-1">
        <div className="fw-semibold pb-lg-3" style={{ color: "#1D949A", fontSize: "18px" }} onClick={() => navigate(-1)}>
          <FaArrowLeft />
          <span className="pt-1 px-2">Billing / IPD Bills / Deposit Receipt</span>
        </div>
      </div>
      {details && (
        <Container className="p-2 p-lg-4">
          <Card style={{ border: "1px solid #EAECF0" }}>
            <Card.Body className="p-0">
              <Row className="mb-2 p-3">
                <Col className="text-center">
                  <img src={Airavat} alt="Airavat" height={"105px"} width={"150px"} />
                </Col>
              </Row>
              <Row className="p-3">
                <Col md={6}>
                  <p><strong>Patient Name: </strong> {details.Name}</p>
                  <p><strong>Department: </strong> {details.department}</p>
                  <p><strong>Consulting Dr.: </strong> {details.doctor_name}</p>
                </Col>
                <Col md={6} className="text-end">
                  <p><strong>IPD ID: </strong> {details.ipd_id}</p>
                  <p><strong>Receipt No.: </strong> IPD-{details.ipd_id}</p>
                  <p><strong>Admitted Date: </strong> {new Date(details.admitted_date * 1000).toLocaleDateString()}</p>
                </Col>
              </Row>
              <hr color="#475467" className="mx-3" />
              <h4 className="m-4">Deposit Receipt</h4>
              <Table bordered style={{ borderColor: "#EAECF0" }}>
                <thead>
                  <tr>
                    <th className="text-center p-3" style={{ background: "#F9FAFB" }}>No</th>
                    <th className="text-center p-3" style={{ background: "#F9FAFB" }}>Date</th>
                    <th className="text-center p-3" style={{ background: "#F9FAFB" }}>Amount</th>
               
                  </tr>
                </thead>
                <tbody>
                  {details.deposits?.map((deposit, index) => (
                    <tr key={`deposit-${index}`}>
                      <td className="text-center">{index + 1}</td>
                      <td>{epochTimeToDate(deposit.date)}</td>
                      <td className="text-center">{deposit.amount}</td>
          
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={2} className="text-end p-md-3 p-2" style={{ fontWeight: 500 }}>Total Deposited</td>
                    <td className="text-center">{totalDeposits}</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          <div className="d-flex justify-content-end mt-4">
            <Button variant="outline-secondary" className="me-3" onClick={handlePrintDepositSlip}>
              Print Deposit Receipt
            </Button>
          </div>
        </Container>
      )}
    </div>
  );
}

export default DepositeReceipt;