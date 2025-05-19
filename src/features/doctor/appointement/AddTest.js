import React, { useEffect, useState } from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import CommanButton from "../../../components/common/form/commonButtton";
import SearchDropdown from "../../../components/common/form/searchDropdown";
import Note from "../../../components/common/form/textarea";
import InputBox from "../../../components/common/form/inputbox";
import MultiSelectWithDropdown from "../../../components/common/form/multiselect";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AddTest = ({ show, handleClose, handleTestSave }) => {

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

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [tests, setTests] = useState([]);

  const [formData, setFormData] = useState({
    labAppoiId: "",
    labTestIds: [],
    recommendationDate: "",
    testReason: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleTestChange = (selectedOptions) => {

    setFormData({
      ...formData,
      labTestIds: [...selectedOptions],
    });
  };

  async function getTest() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/lab/gettest`, config);
      setTests(response?.data?.data);
    } catch (error) {

    }
  }

  const handleSave = (e) => {
    e.preventDefault();

    if (formData.labTestIds.length > 0 && formData?.recommendationDate !== "" && formData?.testReason !== "") {
      handleTestSave(formData);
      handleClose();
      toast.success("Test added successfully");
    } else {
      toast.error("Please fill all fields");
    }
  }

  useEffect(() => {
    getTest();
    setFormData({
      labTestIds: [],
      recommendationDate: getCurrentDate(),
      testReason: "",
    })
  }, [handleClose])

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      dialogClassName="custom-modal"
    >
      <div className="pe-5 ps-5 pt-2 ">
        <FaTimes style={closeIconStyle} onClick={handleClose} />

        <div className="fw-bold  fs-5">Add Test</div>
      </div>

      <hr></hr>

      <div className="pe-5 ps-5 pb-5 pt-3">

        <Row className="mt-3 m-0">
         
          <Col lg={6}>
            <Form.Label className="fw-semibold">Select Test</Form.Label>
            <MultiSelectWithDropdown

              selectedDays={formData?.labTestIds}
              options={tests?.map(test => ({
                value: test.test_id,
                label: test.test_name
              }))}
              onDayChange={handleTestChange}
              style={{ padding: "8px" }}
            />
          </Col>
          <Col lg={6}>
            <Form.Group controlId="datePicker">
              <InputBox
                className=""
                type="date"
                label={"Recommendation Date"}
                value={formData.recommendationDate}
                name="recommendationDate"
                onChange={handleChange}
              />
            </Form.Group>

          </Col>
        </Row>

        <div className="pt-2">
          <Note
            value={formData.testReason}
            name="testReason"
            onChange={handleChange}
            placeholder="Reason here..."
            className="custom-class"
            label="Test Reason"
          />
        </div>

        <div className="d-flex justify-content-end pt-lg-4">
          <CommanButton
            label="Add Test"
            variant="#7B3F0080"
            className=" ps-3 pe-3 p-2  fw-semibold   "
            style={{ borderRadius: "5px" }}
            onClick={handleSave}
          />
        </div>
      </div>
    </Modal>
  );
};

export default AddTest;
