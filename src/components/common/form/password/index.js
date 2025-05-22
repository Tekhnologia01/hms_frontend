import React, { memo, useState } from "react";
import PropTypes from "prop-types";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  style = {},
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // State to track hover

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  // Define the base style and hover effect
  const inputStyle = {
    padding: "10px",
    border: `1px solid ${isHovered ? "#98DBDE" : error ? "#FF0000" : "#CFD4DC"}`,
    transition: "border-color 0.3s ease-in-out", // Smooth transition
    ...style,
  };

  // Inline CSS for placeholder
  const placeholderStyle = `
    input::placeholder {
      font-size: 0.9rem; /* Increase this value for larger font size */
      color: #6c757d; /* Optional: Customize placeholder color */
    }
  `;
  return (
    <div className="">
      {/* Inject the placeholder style dynamically */}
      <style>{placeholderStyle}</style>
      <div className="field_cont">
        {label && (
          <div>
            <label className=" pb-2 fw-semibold"    style={{fontSize:'1rem'}} htmlFor={name}>
              {label}
              {required && <span className="text-danger fw-bold"> *</span>}
            </label>
          </div>
        )}
        <div style={{ position: "relative" }}>
          <input
            type={passwordVisible ? "text" : "password"}
            name={name}
            id={name}
            placeholder={placeholder}
            className={`form-control ${error ? "invalid_input" : ""}`}
            value={value}
            onChange={onChange}
            autoComplete="off"
            style={inputStyle}
            required={required}
            onMouseEnter={() => setIsHovered(true)} // Set hover state
            onMouseLeave={() => setIsHovered(false)} // Reset hover state
          />
          <span
            onClick={togglePasswordVisibility}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
          >
            {passwordVisible ? <FaEye /> : <FaEyeSlash />}
          </span>
          {error && <p className="text-danger mt-1">{error}</p>}
        </div>
      </div>
    </div>
  );
};

PasswordInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  required: PropTypes.bool,
  style: PropTypes.object,
};

export default memo(PasswordInput);
