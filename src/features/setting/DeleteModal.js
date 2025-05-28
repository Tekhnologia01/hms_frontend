import { Col, Form, Modal, Row } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import CommanButton from "../../components/common/form/commonButtton";
import SearchDropdown from "../../components/common/form/searchDropdown";
import Note from "../../components/common/form/textarea";
import InputBox from "../../components/common/form/inputbox";
// import image1 from "../../assets/images/deletmodal.jpg";

const DeleteModal = ({ show, handleClose }) => {
  const closeIconStyle = {
    position: "absolute",
    top: "20px",
    right: "30px",
    fontSize: "20px",
    cursor: "pointer",
    color: "#999",
    zIndex: 10, // Ensure it appears above content
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      dialogClassName="custom-modal"
    >
      <div className="pe-5 ps-5 pt-4 pb-2">
        <FaTimes style={closeIconStyle} onClick={handleClose} />

        <div className="fw-bold fs-4">Add Appointment</div>
      </div>

      <hr></hr>

      <div className="pe-5 ps-5 pb-5 pt-3">
        {/* Close Button */}
        <InputBox
          label={"Patient Name"}
          placeholder="Patient name show here...."
          isRequired={true}
          className='fs-5'
          // value={values.cafeName}
          // onChange={handleChange}
          name="cafeName"
        />

        <div className=" fs-5 fw-semibold pt-4 pb-3">About the patient</div>

        <Row>
          <Col lg={5}>
            <InputBox
              placeholder="Select patient source "
              isRequired={true}
              // value={values.cafeName}
              // onChange={handleChange}
              name="cafeName"
            />
          </Col>

          <Col lg={7} className="d-flex align-items-center">
            <span
              style={{
                borderLeft: "1px solid #ccc",
                height: "25px",
                margin: "0 0px",
              }}
              className="pe-lg-4"
            ></span>
            <Form.Check
              inline
              type="radio"
              label="First-Time Visit"
              name="visitType"
              id="firstVisit"
              className="fs-5 fw-semibold"
            />
            <Form.Check
              inline
              type="radio"
              label="Re-Visit"
              name="visitType"
              id="reVisit"
              className="fs-5 fw-semibold"
            />
          </Col>
        </Row>

        <div className=" fs-5 fw-semibold pt-4 pb-3">Doctor</div>

        <Row>
          <Col>
            <SearchDropdown
              name={"cafeId"}
              placeholder="Select doctor"
              isSearchabel={true}
              className='p-1 fs-5'
              // options={cafeList}
              // onChange={handleChange}
              // value={formData.cafeId}
            />
          </Col>
          <Col>
            <SearchDropdown
              name={"cafeId"}
              placeholder="Select visit type"
              isSearchabel={true}
              className='p-1 fs-5'
              // options={cafeList}
              // onChange={handleChange}
              // value={formData.cafeId}
            />
          </Col>
          <Col>
          <InputBox
              placeholder="Enter slots number "
              isRequired={true}
              // value={values.cafeName}
              // onChange={handleChange}  
              name="cafeName"
            />
          </Col>
        </Row>

        {/* <div className="pb-4">
          <label
            className="pb-2 pt-4  fw-semibold"
            style={{ fontSize: "1.1rem" }}
          >
            Time
          </label>
          <SearchDropdown
            name={"cafeId"}
            placeholder="Technical difficulites"
            isSearchabel={true}
            // options={cafeList}
            // onChange={handleChange}
            // value={formData.cafeId}
          />
        </div>

 */}

<Row className="pb-4 m-0">
      {/* Date Section */}
      <Col lg={6}>
        <div className="pb-2">
          <label
            className="pb-2 pt-4 fw-semibold"
            style={{ fontSize: "1.1rem" }}
          >
            Date
          </label>
          <SearchDropdown
            name={"date"}
            placeholder="Select Date"
            isSearchable={true}
            // options={dateOptions}
            // onChange={handleDateChange}
            // value={selectedDate}
          />
        </div>
      </Col>

      {/* Time Section */}
      <Col lg={6}>
        <div className="pb-2">
          <label
            className="pb-2 pt-4 fw-semibold"
            style={{ fontSize: "1.1rem" }}
          >
            Time
          </label>
          <SearchDropdown
            name={"time"}
            placeholder="Select Time"
            isSearchable={true}
            // options={timeOptions}
            // onChange={handleTimeChange}
            // value={selectedTime}
          />
        </div>
      </Col>
    </Row>

        <Note
          // value={noteValue}
          // onChange={(e) => setNoteValue(e.target.value)}
          placeholder="Enter patient details.."
          className="custom-class"
          label="Review Notes"
        />

        <div className="d-flex justify-content-end pt-lg-4">
          <CommanButton
            label="Book Appointment -->"
            variant="#7B3F0080"
            className="mb-3 ps-3 pe-3 p-2 fs-5 fw-semibold   "
            style={{ borderRadius: "5px" }}
            onClick={handleClose} // Close modal when clicking the button
          />
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
