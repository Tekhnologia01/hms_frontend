
import { useState } from "react";
import CommanButton from "../../components/common/form/commonButtton";
import PasswordInput from "../../components/common/form/password";
import { Row, Col } from "react-bootstrap";
import DeleteModal from "./DeleteModal";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DeleteAccount() {
  const [showModal, setShowModal] = useState(false);
  const userId = useSelector(state => state?.auth?.user?.userId);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState({ text: "", type: "" }); 
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const token = useSelector((state) => state?.auth?.currentUserToken);
  const navigate = useNavigate(); 

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
    setIsLoading(true);
    try {
      const payload = {
        user_id: userId,
        password: formData?.password,
      }
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/deleteaccount`, 
        payload, 
        config
      );

      setMessage({
        text: "Account deleted successfully!",
        type: "success"
      });
      
      handleCloseModal();
      
   
      setTimeout(() => {
        navigate("/login"); 
      }, 2000);
      
    } catch (error) {
      // Show error message
      setMessage({
        text: error.response?.data?.message || "Failed to delete account. Please try again.",
        type: "danger"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (message.text) {
      setMessage({ text: "", type: "" });
    }
  };

  const validateForm = () => {
    let newErrors = {};
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
    if (!formData?.password?.trim()) {
      newErrors.password = "New password is required";
    } else if (!passwordPattern.test(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character";
    }
    
    if (!formData?.confirmPassword?.trim()) {
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

      {/* Message display */}
      {message.text && (
        <div className={`alert alert-${message.type}`} role="alert">
          {message.text}
        </div>
      )}

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
              onClick={handleShowModal}
              disabled={isLoading} // Disable button when loading
            />
            {isLoading && <span className="ms-2">Processing...</span>}
          </div>
        </Col>
      </Row>

      {/* Delete Account Modal */}
      <DeleteModal 
        show={showModal} 
        handleClose={handleCloseModal} 
        handleDelete={handleDeleteAccount}
        isLoading={isLoading}
      />
    </div>
  );
}

export default DeleteAccount;