import { Col, Modal, Row } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import InputBox from "../../../components/common/form/inputbox";
import CommanButton from "../../../components/common/form/commonButtton";
import Note from "../../../components/common/form/textarea";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";


const AddPrescription = ({ show, handleClose, handlePrescriptionSubmit }) => {
    const closeIconStyle = {
        position: "absolute",
        top: "20px",
        right: "30px",
        fontSize: "20px",
        cursor: "pointer",
        color: "#999",
        zIndex: 10, // Ensure it appears above content
    };

    const userId = useSelector(state => state?.auth?.user?.userId);


    const params = useParams();

    const [formData, setFormData] = useState({
        appointment_id: "",
        medicine_name: "",
        quantity: "",
        common_note: "",
        dosage: "",
        duration: "",
        food_intake: "",
        created_by: userId,
    });

    useEffect(() => {

        setFormData({
            appointment_id: "",
            medicine_name: "",
            quantity: "",
            common_note: "",
            dosage: "",
            duration: "",
            food_intake: "",
            created_by: userId,
        });
    }, [show]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        formData.appointment_id = +params.appointmentId;

        if (formData?.medicine_name !== "" && formData?.dosage !== "" && formData?.duration !== ""
            && formData?.food_intake !== "" && formData?.common_note !== "") {
            handlePrescriptionSubmit(formData);
            handleClose();
        }
        else{
            alert("Please Fill All Fields");
        }
       
    }


    return (
        <Modal
            show={show}
            onHide={handleClose}
            size="lg"
            dialogClassName="custom-modal"
        >
            <div className="pe-5 ps-5 pt-2 ">
                <FaTimes style={closeIconStyle} onClick={handleClose} />

                <div className="fw-bold  fs-5">Add Prescription</div>
            </div>

            <hr></hr>

            <div className="pe-5 ps-5 pb-5 pt-3">




                <Row className="m-0">
                    <Col lg={6}>
                        <InputBox
                            placeholder="Medicine Name"
                            isRequired={true}
                            label={'Medicine Name'}
                            value={formData?.medicine_name}
                            onChange={handleChange}
                            name="medicine_name"
                        />
                    </Col>

                    <Col lg={6}>
                        <InputBox
                            placeholder="Dosage"
                            isRequired={true}
                            label={'Dosage'}
                            value={formData?.dosage}
                            onChange={handleChange}
                            name="dosage"
                        />
                    </Col>
                </Row>

                <Row className="pt-lg-4 m-0">
                    <Col lg={6}>
                        <InputBox
                            placeholder="Duration"
                            isRequired={true}
                            label={'Duration'}
                            value={formData?.duration}
                            onChange={handleChange}
                            name="duration"
                        />
                    </Col>

                    <Col lg={6}>
                        <InputBox
                            placeholder="Food Intake"
                            isRequired={true}
                            label={"Food Intake"}
                            value={formData?.food_intake}
                            onChange={handleChange}
                            name="food_intake"
                        />
                    </Col>
                </Row>

                <Row className="pt-lg-4 m-0">
                    <Col lg={6}>
                        <InputBox
                            type="number"
                            placeholder="Medicine Quantity"
                            isRequired={true}
                            label="Medicine Quantity"
                            value={formData?.quantity}
                            onChange={handleChange}
                            name="quantity"
                        />
                    </Col>

                    <Col lg={6}>
                        <div className="">
                            <Note
                                value={formData?.common_note}
                                onChange={handleChange}
                                placeholder="prescription details here...."
                                className="custom-class"
                                label="Common Note"
                                name="common_note"
                                isRequired={true}
                            />
                        </div>
                    </Col>
                </Row>


                <div className="d-flex justify-content-end pt-lg-4">
                    <CommanButton
                        label="Add"
                        variant="#7B3F0080"
                        className=" ps-3 pe-3 p-2  fw-semibold   "
                        style={{ borderRadius: "5px" }}
                        onClick={handleSubmit} // Close modal when clicking the button
                    />
                </div>
            </div>
        </Modal>
    )
}

export default AddPrescription;