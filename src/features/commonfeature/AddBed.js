import { Col, Modal, Row } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import InputBox from "../../components/common/form/inputbox";
import CommanButton from "../../components/common/form/commonButtton";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import SelectBox from "../../components/common/form/selectBox/SelectBox";
import axios from "axios";
import { Form, Formik } from "formik";
import * as Yup from "yup";

const AddBed = ({ show, handleClose, handleBedSubmit, bed, openStatus, handleupdate }) => {
    const closeIconStyle = {
        position: "absolute",
        top: "20px",
        right: "30px",
        fontSize: "20px",
        cursor: "pointer",
        color: "#999",
        zIndex: 10,
    };

    const userId = useSelector((state) => state?.auth?.user?.userId);
    const params = useParams();

    const [roomType, setRoomType] = useState([]);
    const [rooms, setRooms] = useState([]);

    const validationSchema = Yup.object().shape({
        roomTypeId: Yup.string().required("Room Type is required"),
        roomId: Yup.string().required("Room is required"),
        bedName: Yup.string().required("Bed Name is required"),
    });

    const token = useSelector((state) => state.auth.currentUserToken);
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    useEffect(() => {
        if (show) {
            fetchRoomTypes();
        }
    }, [show]);

    const fetchRoomTypes = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/roombed/getroomtype`, config);
            const roomTypes = response?.data?.data || [];
            setRoomType(roomTypes);
        } catch (err) {
            console.error("Error fetching room types:", err);
        }
    };

    const fetchRoom = async (roomTypeId) => {
        if (!roomTypeId) {
            setRooms([]); // Clear rooms if no roomTypeId
            return;
        }
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/roombed/getroomtypewise?id=${roomTypeId}`,
                config
            );
            const roomData = response?.data?.data || [];
            setRooms(roomData);
        } catch (err) {
            console.error("Error fetching rooms:", err);
            setRooms([]);
        }
    };

    useEffect(() => {
        if (bed?.room_type_id && show) {
            fetchRoom(bed.room_type_id);
        } else {
            setRooms([]); // Clear rooms when no bed data
        }
    }, [bed, show]);

    return (
        <Modal show={show} onHide={handleClose} size="lg" dialogClassName="custom-modal">
            <div className="pe-5 ps-5 pt-2">
                <FaTimes style={closeIconStyle} onClick={handleClose} />
                <div className="fw-bold fs-5 p-2">{openStatus === 0 ? "Edit Bed" : "Add Bed"}</div>
            </div>
            <hr style={{marginTop:"0px"}} />
            <div className="pe-5 ps-5 pb-5 pt-3">
                <Formik
                    initialValues={{
                        created_by: userId,
                        roomTypeId: openStatus === 1 ? "" : bed?.room_type_id || "",
                        roomId: openStatus === 1 ? "" : bed?.room_id || "",
                        bedId: openStatus === 1 ? "" : bed?.bed_id || "",
                        bedName: openStatus === 1 ? "" : bed?.bed_name || "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        values.appointment_id = +params.appointmentId;
                        if (openStatus === 1) {
                            handleBedSubmit(values);
                        } else {
                            handleupdate(values);
                        }
                        handleClose();
                    }}
                >
                    {({ values, errors, touched, handleChange, setFieldValue }) => (
                        <Form>
                            <Row>
                                <Col lg={6}>
                                    <label className="fw-semibold pb-1 pt-1">
                                        Room Type <span style={{ color: "red" }}>*</span>
                                    </label>
                                    <SelectBox
                                        name="roomTypeId"
                                        defaultValue="Select Room Type"
                                        options={[
                                            { label: "Select Room Type", option: "" },
                                            ...roomType.map((type) => ({
                                                label: type.room_type,
                                                option: type.room_type_id,
                                            })),
                                        ]}
                                        value={values.roomTypeId}
                                        onChange={(e) => {
                                            const roomTypeId = e.target.value;
                                            handleChange(e);
                                            setFieldValue("roomId", ""); // Reset room selection
                                            fetchRoom(roomTypeId);
                                        }}
                                    />
                                    {errors.roomTypeId && touched.roomTypeId && (
                                        <div className="text-danger">{errors.roomTypeId}</div>
                                    )}
                                </Col>
                                <Col lg={6}>
                                    <label className="fw-semibold pb-1 pt-1">
                                        Select Room <span style={{ color: "red" }}>*</span>
                                    </label>
                                    <SelectBox
                                        name="roomId"
                                        defaultValue="Select Room"
                                        value={values.roomId}
                                        options={[
                                            { label: "Select Room", option: "" },
                                            ...rooms.map((room) => ({
                                                label: room.room_name,
                                                option: room.room_id,
                                            })),
                                        ]}
                                        onChange={handleChange}
                                    />
                                    {errors.roomId && touched.roomId && (
                                        <div className="text-danger">{errors.roomId}</div>
                                    )}
                                </Col>
                            </Row>
                            <Row className="pt-3 m-0 ">
                                <Col lg={6} className="px-0">
                                    <InputBox
                                        placeholder="Bed Name"
                                        isRequired={true}
                                        label="Bed Name"
                                        value={values.bedName}
                                        onChange={handleChange}
                                        name="bedName"
                                    />
                                    {errors.bedName && touched.bedName && (
                                        <div className="text-danger">{errors.bedName}</div>
                                    )}
                                </Col>
                            </Row>
                            <div className="d-flex justify-content-end pt-lg-4">
                                <CommanButton
                                    label={bed ? "Update" : "Add"}
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

export default AddBed;