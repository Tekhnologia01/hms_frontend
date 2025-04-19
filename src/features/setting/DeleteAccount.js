
import React, { useState } from "react";
import CommanButton from "../../components/common/form/commonButtton";
import PasswordInput from "../../components/common/form/password";
import { Row, Col } from "react-bootstrap";
import DeleteModal from "./DeleteModal";
import { useSelector } from "react-redux";
import axios from "axios";

function DeleteAccount() {
  const [showModal, setShowModal] = useState(false);
  const userId = useSelector(state => state?.auth?.user?.userId);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const token = useSelector((state) => state.auth.currentUserToken);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const handleShowModal = () => {
    if (validateForm()) {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => setShowModal(false);
  const handleDeleteAccount = async () => {
    try {
      const payload = {
        user_id: userId,
        password: formData.password,
      }
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/deleteaccount`, payload, config);

      handleCloseModal();
    } catch (error) {

    }
  };

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate form before deleting
  const validateForm = () => {
    let newErrors = {};

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div>
      <div className="fs-4 fw-bold pb-1">Delete Account</div>
      <div className="pb-3" style={{ fontSize: "1rem" }}>
        This information will be displayed publicly, so be careful what you share.
      </div>

      <Row className="m-0">
        <Col lg={5}>
          <div className="pb-4">
            <PasswordInput
              label="Enter Password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <p className="text-danger">{errors.password}</p>}
          </div>

          <div className="pb-4">
            <PasswordInput
              label="Confirm Password"
              name="confirmPassword"
              placeholder="Re-enter password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword}</p>}
          </div>

          <div className="p-2 pt-3">
            <CommanButton
              label="Delete Account"
              className="mb-3 ps-4 pe-4 p-2 fw-semibold"
              style={{ borderRadius: "5px", fontSize: "1rem" }}
              onClick={handleDeleteAccount} // Show modal only if form is valid
            />
          </div>
        </Col>
      </Row>

      {/* Delete Account Modal */}
      <DeleteModal show={showModal} handleClose={handleCloseModal} handleDelete={handleDeleteAccount} />
    </div>
  );
}

export default DeleteAccount;
