import { Col, Modal, Row } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputBox from "../../../components/common/form/inputbox";
import CommanButton from "../../../components/common/form/commonButtton";

const AddChargesModal = ({ show, handleClose, handleBedSubmit, charges, openStatus, handleupdate }) => {
    const closeIconStyle = {
        position: "absolute",
        top: "20px",
        right: "30px",
        fontSize: "20px",
        cursor: "pointer",
        color: "#999",
        zIndex: 10,
    };

    // Get userId from Redux store
    const userId = useSelector(state => state?.auth?.user?.userId);

    // Validation Schema
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        fees: Yup.number()
            .typeError("Fees Amount must be a number")
            .positive("Fees Amount must be a positive number")
            .required("Fees Amount is required"),
    });

    return (
        <Modal show={show} onHide={handleClose} size="lg" dialogClassName="custom-modal">
            <div className="pe-5 ps-5 pt-2">
                <FaTimes style={closeIconStyle} onClick={handleClose} />
                <div className="fw-bold fs-5">{openStatus === 0 ? "Edit Charges" : "Add Charges"}</div>
            </div>

            <hr />

            <div className="pe-5 ps-5 pb-5 pt-3">
                <Formik
                    initialValues={{
                        name: charges?.fees_name || "",
                        fees: charges?.fees_amount || "",
                        created_by: userId,
                    }}
                    enableReinitialize={true}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        if (openStatus === 1) {
                            handleBedSubmit(values);
                        } else {
                            handleupdate(values);
                        }
                        handleClose();
                    }}
                >
                    {({ values, errors, touched, handleChange, handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col lg={6}>
                                    <InputBox
                                        placeholder="Name"
                                        isRequired={true}
                                        label="Name"
                                        value={values.name}
                                        onChange={handleChange}
                                        name="name"
                                    />
                                    {touched.name && errors.name && <div className="text-danger">{errors.name}</div>}
                                </Col>
                                <Col lg={6}>
                                    <InputBox
                                        placeholder="Fees Amount"
                                        isRequired={true}
                                        label="Fees Amount"
                                        value={values.fees}
                                        onChange={handleChange}
                                        name="fees"
                                    />
                                    {touched.fees && errors.fees && <div className="text-danger">{errors.fees}</div>}
                                </Col>
                            </Row>

                            <div className="d-flex justify-content-end pt-4">
                                <CommanButton
                                    label={charges ? "Update" : "Add"}
                                    variant="#7B3F0080"
                                    className="ps-3 pe-3 p-2 fw-semibold"
                                    style={{ borderRadius: "5px" }}
                                    type="submit"
                                />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </Modal>
    );
};

export default AddChargesModal;
