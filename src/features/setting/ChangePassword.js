import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import CommanButton from "../../components/common/form/commonButtton";
import PasswordInput from "../../components/common/form/password";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function ChangePassword() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const userId = useSelector(state => state?.auth?.user?.userId);
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const token = useSelector((state) => state.auth.currentUserToken);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const validateForm = () => {
    let newErrors = {};

    if (!formData.currentPassword.trim()) {
      newErrors.currentPassword = "Current password is required";
    }

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;

if (!formData.newPassword.trim()) {
  newErrors.newPassword = "New password is required";
} else if (!passwordPattern.test(formData.newPassword)) {
  newErrors.newPassword =
    "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character";
}


    if (formData.confirmPassword !== formData.newPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async () => {
    try {
      if (validateForm()) {

        const payload = {
          user_id: userId,
          current_password: formData.currentPassword,
          new_password: formData.newPassword
        }
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/changepassword`, payload, config);

        if (response?.data?.status) {
          toast.success(response?.data?.message || "Change password successfully! ")
        }
      }
    } catch (error) {
          toast.error(error?.response?.data?.message|| " Error in Change password ")



    }
  };

  return (
    <div className="">
      <div className="fs-5 fw-bold pb-3">Change Password</div>

      <Row className="m-0">
        <Col lg={5}>
          <div className="pb-4">
            <PasswordInput
              label="Current Password"
              name="currentPassword"
              placeholder="Enter current password"
              value={formData.currentPassword}
              onChange={handleChange}
              required
            />
            {errors.currentPassword && (
              <p className="text-danger">{errors.currentPassword}</p>
            )}
          </div>

          <div className="pb-4">
            <PasswordInput
              label="New Password"
              name="newPassword"
              placeholder="Enter new password"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
            {errors.newPassword && (
              <p className="text-danger">{errors.newPassword}</p>
            )}
          </div>

          <div className="pb-4">
            <PasswordInput
              label="Confirm Password"
              name="confirmPassword"
              placeholder="Re-enter new password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && (
              <p className="text-danger">{errors.confirmPassword}</p>
            )}
          </div>

          <div className="p-2 pt-3">
            <CommanButton
              label="Save Change"
              variant="#7B3F0080"
              className="mb-3 ps-4 pe-4 p-2 fw-semibold"
              style={{ borderRadius: "5px" }}
              onClick={handleFormSubmit}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ChangePassword;
