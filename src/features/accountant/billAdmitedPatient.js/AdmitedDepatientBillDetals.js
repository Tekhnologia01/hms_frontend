import { useEffect, useState } from "react";
import vijay from "../../../assets/images/avatars/vijay1.jpg";
import { useNavigate } from "react-router-dom";
import { FaAmazonPay} from "react-icons/fa";
import axios from "axios";
import { useSelector } from "react-redux";
import NewCommonPagination from "../../../components/pagination/NewCommonPagination";
import CommonTable from "../../../components/table/CommonTable";
import {  IoReceiptSharp } from "react-icons/io5";
import PatientInfoModal from "./PatientInfoModal"; // Existing modal
import PaymentModal from "./PaymentModal"; // New payment modal
import { MdPayments } from "react-icons/md";
import CommanButton from "../../../components/common/form/commonButtton";
import { Modal } from "react-bootstrap";
import './discharge.css'

function AdmitedDepatientBillDetals() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showInfoModal, setShowInfoModal] = useState(false); // State for info modal
  const [showPaymentModal, setShowPaymentModal] = useState(false); // State for payment modal
  const [selectedPatient, setSelectedPatient] = useState(null); // State for selected patient
  const [show, setShow] = useState(false)

  const [patientid,setPatientid]=useState(null)
  const limitPerPage = 10;
  const { user } = useSelector((state) => state?.auth);
  const token = useSelector((state) => state.auth.currentUserToken);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const handleStatus = async (id) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/accountant/changestatus?admited_id=${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      fetchDoctors()
    } catch (error) {
    }
  }

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/accountant/getadmtedpatientbill`,
        config
      );
      setDoctors(response?.data?.data);
    } catch (err) {
      console.log("Error fetching doctors => ", err);
    }
  };


  useEffect(() => {
    fetchDoctors();
  }, [currentPage]);




  const columns = [
    { name: "Patient Name", accessor: "Name", class: "py-3 px-4 text-left" },
    { name: "Sex", accessor: "joining_date", class: "text-center px-1" },
    { name: "Admit Date", accessor: "joining_date", class: "text-center px-1" },
    { name: "Department", accessor: "degree", class: "py-3 text-center px-1" },
    { name: "Paid Amount", accessor: "consultancy_fee", class: "py-3 text-center px-1" },
    { name: "R.Amount", accessor: "consultancy_fee", class: "py-3 text-center px-1" },
    { name: "Total Amount", accessor: "consultancy_fee", class: "py-3 text-center px-1" },
    { name: "Receipt", accessor: "consultancy_fee", class: "py-3 text-center px-1" },
    { name: "Actions", accessor: "actions", class: "py-3 text-center px-1" },
  ];

  const handleShowInfoModal = (patient) => {
    setSelectedPatient(patient);
    setShowInfoModal(true);
  };

  const handleCloseInfoModal = () => {
    setShowInfoModal(false);
    setSelectedPatient(null);
  };

  const handleShowPaymentModal = (patient) => {
    setSelectedPatient(patient);
    setShowPaymentModal(true);
  };

  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
    setSelectedPatient(null);
  };

  const handleClose = () => {
    handleClosePaymentModal()
    fetchDoctors()
  }

  const handleConfirmModal = () => {
    setShow(false)
  }


  const renderRow = (item, index) => {
    // Calculate total deposits
    const totalDeposits = item.deposits?.reduce((sum, deposit) => sum + (deposit.amount || 0), 0) || 0;

    // Calculate other charges
    const otherCharges = item.othercharges?.reduce((sum, charge) => sum + (charge.amount || 0), 0) || 0;


    const doctorCharge = item.doctorvisiting?.reduce((sum, visit) => sum + (visit.amount || 0), 0) || 0;

    // Calculate total amount including other charges
    const totalAmount = item.total_amount + otherCharges + doctorCharge;

    // Calculate remaining amount
    const remainingAmount = totalAmount - totalDeposits;

    return (
      <>
        <tr key={item.id || index} className="border-bottom text-center">
          {/* Patient Information */}
          <td className="px-2 text-start">
            <div className="d-flex flex-lg-row flex-column align-items-center align-items-lg-start">
              <img
                src={item.Photo ? `${process.env.REACT_APP_API_URL}/${item.Photo}` : vijay}
                alt={item.uh_id}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                className="ms-lg-3 mb-2 mb-lg-0"
              />
              <div className="d-flex flex-column ms-lg-2 text-center">
                <p className="fw-semibold mb-0">{item.Name}</p>
                <p className="mb-0" style={{ color: "#475467", fontSize: "14px" }}>
                  {item.uh_id}
                </p>
              </div>
            </div>
          </td>

          {/* Patient Sex */}
          <td className="py-3 px-2">{item.patient_sex ?? "-"}</td>

          {/* Admitted Date */}
          <td className="py-3 px-2">
            {item.admitted_date
              ? new Date(item.admitted_date * 1000).toLocaleDateString()
              : "-"}
          </td>

          {/* Department */}
          <td className="py-3 px-2">{item.department ?? "-"}</td>

          {/* Total Deposits */}
          <td className="py-3 px-2">{totalDeposits || "-"}</td>

          {/* Remaining Amount */}
          <td className="py-3 px-2">{remainingAmount >= 0 ? remainingAmount : "-"}</td>

          {/* Total Amount */}
          <td className="py-3 px-2">{totalAmount || "-"}</td>

          {/* Actions */}
          <td>
            <IoReceiptSharp
              style={{ height: "25px", width: "25px", cursor: "pointer" }}
              onClick={() =>
                user.RoleId == 4
                  ? navigate(`/receptionist/bill/ipd/${item.admitted_patient_id}`)
                  : navigate(`/accountant/bill/ipd/${item.admitted_patient_id}`)
              }
            />
          </td>


          {
            item.bill_status == 0 ?
              <td>


                <FaAmazonPay
                  style={{ height: "25px", width: "25px", cursor: "pointer" }}



                  onClick={() =>
                    user.RoleId == 4
                      ? navigate(`/receptionist/bill/ipd/deposite/${item.admitted_patient_id}`)
                      : navigate(`/accountant/bill/ipd/deposite/${item.admitted_patient_id}`)
                  }
                />

                <span className="ps-3"></span>
                <MdPayments
                  style={{ height: "25px", width: "25px", cursor: "pointer" }}
                  onClick={() => handleShowPaymentModal(item)}
                />
              </td> : <td>

   
                <CommanButton
                  label={`Complete`}
                  className="fw-bold fs-6 "
                  style={{ borderRadius: "8px" }}
                  onClick={() => {setPatientid(item.admitted_patient_id);
                    setShow(true)}}
                />
              </td>
          }
        </tr>

     
      </>
    );
  };

  return (
    <>
      <div className="px-3">

        <div className="fw-bold py-4 fs-4">
          <span>Admited Patient List</span>
        </div>

        <div>
          <div>
            <CommonTable
              minimumWidth={"700px"}
              headers={columns}
              bodyData={doctors}
              renderRow={renderRow}
              title={"Patient List"}
            />
          </div>
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

      {/* Info Modal */}
      <PatientInfoModal
        show={showInfoModal}
        handleClose={handleCloseInfoModal}
        patient={selectedPatient}
      />

      {/* Payment Modal */}
      <PaymentModal
        show={showPaymentModal}
        handleClose={handleClose}
        patient={selectedPatient}
      />
   <Modal
          show={show}
          onHide={handleConfirmModal}
          centered
          size="md"
          className="confirmation-modal"
          aria-labelledby="confirmation-modal-title"
        >
          <Modal.Header closeButton className="border-0 pb-2">
            <Modal.Title
              id="confirmation-modal-title"
              className="fw-bold"
              style={{ fontSize: "1.5rem", color: "#1D949A" }}
            >
              Confirmation
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="pt-2 pb-4">
            <p
              className="fw-semibold text-dark"
              style={{ fontSize: "1.1rem", lineHeight: "1.6" }}
            >
              Are you sure you want to complete all the processes for this patient?
            </p>
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0">
            <CommanButton
              label="Cancel"
              className="me-3 ps-4 pe-4 py-2 fw-semibold fs-6 text-dark bg-white"
              type="button"
              onClick={() => handleConfirmModal()}
            />
            <CommanButton
              label="Complete"
              className="ps-4 pe-4 py-2 fw-semibold fs-6"
              type="button"
              variant="primary"
              onClick={() => {handleStatus(patientid);
                handleConfirmModal()
              }}
              style={{ backgroundColor: "#1D949A", borderColor: "#1D949A" }}
            />
          </Modal.Footer>
        </Modal>
    </>
  );

}

export default AdmitedDepatientBillDetals;



