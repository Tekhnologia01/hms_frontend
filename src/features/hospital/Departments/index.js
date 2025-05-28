import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CommanButton from "../../../components/common/form/commonButtton";
import { Modal, Button, Form } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineModeEdit } from "react-icons/md";

import axios from "axios";
import { useSelector } from "react-redux";

function Departments() {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userId = useSelector((state) => state?.auth?.user?.userId);
  const token = useSelector((state) => state.auth.currentUserToken);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  async function getDepartments() {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/department/get`,
        config
      );
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
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newDepartment, setNewDepartment] = useState("");
  const [editingDepartment, setEditingDepartment] = useState({
    id: null,
    name: "",
  });

  useEffect(() => {
    setColors(departments?.map(() => generateRandomLightColor()));
  }, [departments]);

  const handleAddDepartment = async () => {
    if (newDepartment.trim()) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/department/add/${userId}`,
          { department_name: newDepartment },
          config
        );

        if (response.status) {
          getDepartments();
        }
      } catch (err) {
        console.log(err);
      }

      setNewDepartment("");
      setShowAddModal(false);
    }
  };

  const handleEditDepartment = async () => {
    if (editingDepartment.name.trim()) {
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_API_URL}/department/update/${editingDepartment.id}`,
          { department_name: editingDepartment.name },
          config
        );

        if (response.status) {
          getDepartments();
        }
      } catch (err) {
        console.log(err);
      }

      setEditingDepartment({ id: null, name: "" });
      setShowEditModal(false);
    }
  };

  const handleDeleteDepartment = async (departmentId) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_API_URL}/department/delete/${departmentId}`,
          config
        );

        if (response.status) {
          getDepartments();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const openEditModal = (department) => {
    setEditingDepartment({
      id: department.department_id,
      name: department.department_name,
    });
    setShowEditModal(true);
  };

  return (
    <div className="mt-3 px-3">
      <div className="fw-semibold fs-5 d-flex align-items-center justify-content-between">
        <span className="fw-bold fs-4">Departments</span>
        <CommanButton
          onClick={() => setShowAddModal(true)}
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
        {isLoading && (
          <div className="w-full text-center fs-5 fw-semibold">Loading...</div>
        )}
        {departments?.map((dept) => (
          <div
            key={dept?.department_id}
            style={{
              backgroundColor:
                colors[
                departments?.findIndex(
                  (d) => d?.department_id === dept?.department_id
                )
                ],
              cursor: "pointer",
              height: "140px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "600",
              fontSize: "18px",
              boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
              borderRadius: "8px",
              flex: "1 1 calc(25% - 16px)",
              minWidth: "250px",
              maxWidth: "350px",
              position: "relative",
            }}
          >
            <div
              onClick={() => navigate(`${dept.department_id}`)}
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              {dept.department_name}
            </div>
            <div
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                display: "flex",
                gap: "8px",
              }}
            >
              <button
                className="border-0 bg-transparent p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  openEditModal(dept);
                }}
                style={{ cursor: "pointer" }}
              >
                <MdOutlineModeEdit onMouseEnter={(e) => e.currentTarget.style.opacity = "1"} onMouseLeave={(e) => e.currentTarget.style.opacity = "0.7"} className="fs-5" style={{ color: 'gray', opacity: '0.7' }} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Department Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <div className="m-3 d-flex align-items-center justify-content-between">
          <Modal.Title>Add Department</Modal.Title>
          <button
            className="border-0 bg-transparent p-0"
            onClick={() => setShowAddModal(false)}
          >
            <RxCross2 className="fs-3" />
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
          <Button onClick={() => setShowAddModal(false)} style={{ backgroundColor: 'white', color: "black" }}>
            Cancel
          </Button>
          <CommanButton onClick={handleAddDepartment} label={"Add Department"} />
        </div>
      </Modal>

      {/* Edit Department Modal */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered
      >
        <div className="m-3 d-flex align-items-center justify-content-between">
          <Modal.Title>Edit Department</Modal.Title>
          <button
            className="border-0 bg-transparent p-0"
            onClick={() => setShowEditModal(false)}
          >
            <RxCross2 className="fs-3" />
          </button>
        </div>
        <div className="mx-3">
          <Form>
            <Form.Group controlId="editDepartmentName">
              <Form.Label>Department Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter department name"
                value={editingDepartment.name}
                onChange={(e) =>
                  setEditingDepartment({
                    ...editingDepartment,
                    name: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </div>
        <div className="m-3 d-flex align-items-center gap-3 justify-content-end ">
          <Button onClick={() => setShowEditModal(false)} style={{ backgroundColor: 'white', color: "black" }}>
            Cancel
          </Button>
          <CommanButton
            onClick={handleEditDepartment}
            label={"Update Department"}
          />
        </div>
      </Modal>
    </div>
  );
}

export default Departments;