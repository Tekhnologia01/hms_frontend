import React from "react";
import { Modal } from "react-bootstrap";
import CommanButton from "../form/commonButtton";

const DeleteConfirmationModal = ({ show, handleClose, handleConfirm, message }) => {
    return (
        <Modal show={show} onHide={handleClose} >
            <div className="fs-4 fw-semibold text-center pt-4">Confirm Deletion</div>
            <Modal.Body>
                <p className="text-center">{message || "Are you sure you want to delete this item?"}</p>
            </Modal.Body>
            <div className="pb-4 text-center pt-1">
                  <CommanButton
                    label="Cancel"
                    className="p-1 px-4 fw-semibold me-2"
                    style={{
                        borderRadius: "7px",
                        fontSize: "14px",
                        height: "40px",
                        color: "black",
                        backgroundColor: "#fffff",
                    }}
                    onClick={handleClose}
                />
                <CommanButton
                    label="Delete"
                    className="p-1 px-4 fw-semibold me-2"
                    style={{ borderRadius: "7px", fontSize: "14px", height: "40px" }}
                    onClick={handleConfirm}
                />
            </div>
        </Modal>
    );
};

export default DeleteConfirmationModal;
