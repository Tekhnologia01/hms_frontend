import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CommanButton from "../../../components/common/form/commonButtton";
import { Modal, Button, Form } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { useSelector } from "react-redux";

function Departments() {
  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const userId = useSelector((state) => state?.auth?.user?.userId);
  // console.log("USer id = = > ", userId)

  async function getDepartments() {
    try {
      setIsLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/department/get`);
      // console.log("Response => ", response.data.data);
      setDepartments(response?.data?.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getDepartments();
  }, [])

  const generateRandomLightColor = () => {
    const r = Math.floor(Math.random() * 35) + 220;
    const g = Math.floor(Math.random() * 35) + 220;
    const b = Math.floor(Math.random() * 35) + 220;
    return `rgb(${r}, ${g}, ${b})`;
  };

  const [colors, setColors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newDepartment, setNewDepartment] = useState("");

  useEffect(() => {
    setColors(departments.map(() => generateRandomLightColor()));
  }, [departments]);

  const handleAddDepartment = async () => {
    if (newDepartment.trim()) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/department/add/${userId}`,
          { department_name: newDepartment }
        );

        // console.log(response);

        if (response.status) {
          getDepartments();
        }
      } catch (err) {
        console.log(err);
      }

      setNewDepartment("");
      setShowModal(false);
    }
  };

  return (
    <div className="mt-3 px-3">
      <div className="fw-semibold fs-5 d-flex align-items-center justify-content-between">
        <span className="fw-bold fs-4">Departments</span>
        <CommanButton
          onClick={() => setShowModal(true)}
          label="Add Department"
          className="me-3 p-2 px-3 fw-semibold fs-6"
          style={{ borderRadius: "5px" }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          marginTop: "20px",
          justifyContent: "center",
        }}
      >
        {
          isLoading && <div className="w-full text-center fs-5 fw-semibold">Loading...</div>
        }
        {departments.map((dept) => (
          <div
            key={dept.department_id}
            onClick={() => navigate(`${dept.department_id}`)}
            style={{
              backgroundColor: colors[departments.findIndex(d => d.department_id === dept.department_id)],
              cursor: "pointer",
              height: "140px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "600",
              fontSize: "18px",
              boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
              borderRadius: "8px",
              flex: "1 1 calc(25% - 16px)",
              minWidth: "250px",
              maxWidth: "350px",
            }}
          >
            {dept.department_name}
          </div>
        ))}
      </div>

      {/* Add Department Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <div className="m-3 d-flex align-items-center justify-content-between">
          <Modal.Title>Add Department</Modal.Title>
          {/* <RxCross2 className="fs-3 cursor-pointer" onClick={() => setShowModal(false)} /> */}
          <button className="border-0 bg-transparent p-0" onClick={() => setShowModal(false)}>
            <RxCross2 className="fs-3 " />
          </button>
        </div>
        <div className="mx-3">
          <Form>
            <Form.Group controlId="departmentName">
              <Form.Label>Department Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter department name"
                value={newDepartment}
                onChange={(e) => setNewDepartment(e.target.value)}
              />
            </Form.Group>
          </Form>
        </div>
        <div className="m-3 d-flex align-items-center gap-3 justify-content-end ">
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <CommanButton onClick={handleAddDepartment} label={"Add Department"} />
        </div>
      </Modal>
    </div>
  );
}

export default Departments;