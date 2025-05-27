import { Col, Modal, Row } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import InputBox from "../../components/common/form/inputbox";
import CommanButton from "../../components/common/form/commonButtton";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import SelectBox from "../../components/common/form/selectBox/SelectBox";
import axios from "axios";

const AddRoom = ({ show, handleClose, handleRoomSubmit, room, openStatus, handleupdateroom }) => {
    const [roomType, setRoomType] = useState([]);
    const token = useSelector((state) => state.auth.currentUserToken);
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

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
        room_type_id: "",
        room_name: "",
        max_bed: "",
        created_by: userId,
    });

    useEffect(() => {
        if (openStatus == 1) {
            setFormData({
                room_type_id: "",
                room_name: "",
                max_bed: "",
                created_by: userId,
            });
        } else {
            setFormData({
                room_type_id: room?.room_type_id || "",
                room_name: room?.room_name || "",
                max_bed: room?.max_bed || "",
                created_by: userId,
            });
        }
    }, [show, openStatus, room]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    useEffect(() => {
        const fetchRoomTypes = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/roombed/getroomtype`, config);
                setRoomType(response?.data?.data || []);
            } catch (err) {
                console.log(err);
            }
        };
        fetchRoomTypes();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData?.room_type_id && formData?.room_name && formData?.max_bed) {

            if (openStatus == 1) {
                handleRoomSubmit(formData);
                handleClose();

                setFormData(
                    {
                        room_type_id: "",
                        room_name: "",
                        max_bed: "",
                        created_by: userId,
                    }
                )

            }
            else {
                handleupdateroom(formData);
                handleClose();

                setFormData(
                    {
                        room_type_id: "",
                        room_name: "",
                        max_bed: "",
                        created_by: userId,
                    }
                )

            }

        } else {
            alert("Please fill all fields");
        }
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg" dialogClassName="custom-modal">
            <div className="pe-5 ps-5 pt-2">
                <FaTimes
                    style={closeIconStyle}
                    onClick={() => {
                        handleClose();
                    }}
                />
                <div className="fw-bold fs-5 p-2">{openStatus == 1 ? "Add Room" : " Edit Room "}</div>
            </div>

            <hr style={{marginTop:0}}/>

            <div className="pe-5 ps-5 pb-5 pt-3">
                <Row className="m-0">
                    <Col lg={6}>
                        <label className="fw-semibold pb-1 pt-1">Room Type<span style={{ color: "red" }}> *</span></label>
                        <SelectBox
                            name="room_type_id"
                            defaultValue="Select Room Type"
                            value={formData.room_type_id}
                            options={roomType.map((type) => ({
                                label: type.room_type,
                                option: type.room_type_id,
                            }))}
                            onChange={handleChange}
                        />
                    </Col>

                    <Col lg={6}>
                        <InputBox
                            placeholder="Room Name"
                            isRequired={true}
                            label="Room Name"
                            value={formData.room_name}
                            onChange={handleChange}
                            name="room_name"
                        />
                    </Col>
                </Row>

                <Row className="m-0  pt-2">
                    <Col lg={6}>
                        <InputBox
                            placeholder="Max Bed"
                            isRequired={true}
                            label="Max Bed"
                            value={formData.max_bed}
                            onChange={handleChange}
                            name="max_bed"
                        />
                    </Col>
                </Row>

                <div className="d-flex justify-content-end pt-lg-4">
                    <CommanButton
                        label="Add"
                        variant="#7B3F0080"
                        className="ps-3 pe-3 p-2 fw-semibold"
                        style={{ borderRadius: "5px" }}
                        onClick={handleSubmit}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default AddRoom;
