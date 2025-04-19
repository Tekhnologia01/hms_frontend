import React, { useEffect, useState } from "react";
import InputBox from "../../../components/common/form/inputbox";
import { TbFileDescription } from "react-icons/tb";
import CommanButton from "../../../components/common/form/commonButtton";
import { Card, Col, Pagination, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NewCommonPagination from "../../../components/pagination/NewCommonPagination";
import AddLabModal from "./AddLabModal";
import axios from "axios";
import { useSelector } from "react-redux";

function LabAppointments() {
    const [labs, setLabs] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = useSelector((state) => state.auth.currentUserToken);
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

    const fetchLabs = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/lab/gettest`,config)
            setLabs(response?.data?.data);
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchLabs();
    }, [])

    // const [currentPage, setCurrentPage] = useState(1);
    // const [limitPerPage, setLimitPerPage] = useState(10);
    // const totalRecords = labs.length;

    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);


    return (
        <>
            <div className="p-lg-4 p-3">
                <div className="d-flex align-items-center justify-content-between flex-wrap">
                    <div>
                        <div className="fw-bold fs-3 ">
                            Lab Appointments
                        </div>
                        <div className="pb-4 pt-1">
                            <span className="fw-semibold" style={{ fontSize: '1rem' }}>Showing:</span>
                            <span style={{ fontSize: '1rem' }}> All Consultations of All Healthcare Providers</span>
                        </div>
                    </div>
                    <div className="d-flex gap-2 justify-content-end">
                        <InputBox
                            style={{ height: "40px" }}
                            placeholder="olivia@untitledui.com"
                            // value={values.cafeName}
                            // onChange={handleChange}
                            name="cafeName"
                        />
                        <CommanButton
                            label="Filter "
                            className="p-1 px-4 fw-semibold"
                            style={{ borderRadius: "7px", height: "40px", fontSize: "14px", backgroundColor: "#fff", color: "black", border: "1px solid lightgray" }}
                        />
                        <CommanButton
                            label="+ Add Lab Test"
                            className="p-1 px-4 fw-semibold"
                            onClick={() => setShowModal(true)}
                            style={{ borderRadius: "7px", fontSize: "14px", height: "40px", }}
                        />
                    </div>
                </div> 

                {
                    loading && <div className="w-100 text-center pt-4 pb-2">Loading...</div>
                }

                {
                    (!loading && labs.length === 0) && <div className="w-100 text-center pt-4 pb-2">No labs available</div>
                }

                {labs.map((lab) => (
                    <Card index={lab.test_id} className="mb-lg-3 mb-3 mt-3 mt-xl-0" style={{ borderRadius: '8px', "box- shadow": "0px 1px 2px 0px #1018280F", "box-shadow": "0px 1px 3px 0px #1018281A" }}>
                        <Row className="m-0 p-2">
                            <Col lg={2} className="d-flex align-items-center justify-content-center py-2">
                                <div className="text-center" style={{ height: "100px", width: "100px", borderRadius: "10px" }}>
                                    <img src={`${process.env.REACT_APP_API_URL}/${lab.test_photo}`} alt={lab.test_name} style={{ height: "100%", width: "100%", objectFit: "cover" }} />
                                </div>
                            </Col>

                            <Col lg={7}>
                                <div className="h-100 d-flex flex-column justify-content-start pt-md-3">
                                    <div className="row m-0">
                                        <div className="col">
                                            <span className="fw-bold" style={{ fontSize: "20px", color: "#101828" }}>
                                                {lab.test_name}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="row m-0">
                                        <div className="col gy-2 mt-1">
                                            <TbFileDescription style={{ height: "20px", width: "20px" }} />
                                            <span className="ps-2" style={{ fontSize: "15px", color: "#667085" }}>
                                                {lab.test_description}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Col>

                            <Col lg={3}>
                                <div className="d-flex justify-content-center align-items-center h-100">
                                    <CommanButton
                                        label="View Appointments >"
                                        className="my-3 ps-4 pe-4 p-2 fs-6 fw-semibold"
                                        onClick={() => {
                                            navigate(`${lab.test_id}`)
                                        }}
                                        style={{ borderRadius: "5px", width: "100%" }}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Card>
                ))
                }
                <div>
                    {/* Pagination */}
                    <NewCommonPagination currentPage
                        setCurrentPage
                        limitPerPage
                        totalRecords />
                </div>

                <AddLabModal show={showModal} handleClose={() => setShowModal(false)} fetchLabs={fetchLabs} />

            </div >
        </>
    );
}

export default LabAppointments;