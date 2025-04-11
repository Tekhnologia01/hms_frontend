import React from "react";
import { Modal, Button } from "react-bootstrap"; 
import { IoInformationCircle } from "react-icons/io5";

function PatientInfoModal({ show, handleClose, patient }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <IoInformationCircle className="me-2" style={{ height: "25px", width: "25px" }} />
          Patient Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {patient ? (
          <div>
            <p><strong>Name:</strong> {patient.Name}</p>
            <p><strong>UH ID:</strong> {patient.uh_id}</p>
            <p><strong>Sex:</strong> {patient.patient_sex ?? "-"}</p>
            <p><strong>Admit Date:</strong> {patient.admitted_date ?? "-"}</p>
            <p><strong>Department:</strong> {patient.department ?? "-"}</p>
            <p>
              <strong>Total Paid Amount:</strong>{" "}
              {patient.deposits && patient.deposits.length > 0
                ? patient.deposits.reduce((sum, deposit) => sum + (deposit.amount || 0), 0)
                : "-"}
            </p>
            {patient.deposits && patient.deposits.length > 0 && (
              <div>
                <strong>Deposit Details:</strong>
                <ul>
                  {patient.deposits.map((deposit, index) => (
                    <li key={index}>
                      Date: {deposit.date ?? "-"}, Amount: {deposit.amount || 0}, Deposit ID: {deposit.deposite_id ?? "-"}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <p>No patient data available.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PatientInfoModal;