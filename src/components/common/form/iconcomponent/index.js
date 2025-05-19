import React, { useState } from "react";
import PropTypes from "prop-types";

const IconInput = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  style = {},
  icon: Icon, // Icon prop
}) => {
  const [isHovered, setIsHovered] = useState(false); // State to track hover

  // Define the base style and hover effect
  const inputStyle = {
    padding: "12px",
    paddingLeft: Icon ? "40px" : "12px", // Add space for the icon
    border: `1px solid ${isHovered ? "#98DBDE" : error ? "#FF0000" : "#CFD4DC"}`,
    transition: "border-color 0.3s ease-in-out", // Smooth transition
    ...style,
  };

  return (
    <div className="">
      <div className="p-2 field_cont">
        {label && (
          <div>
            <label className="fs-6 pb-2" htmlFor={name}>
              {label}
            </label>
          </div>
        )}
        <div style={{ position: "relative" }}>
          {Icon && (
            <span
              style={{
                position: "absolute",
                left: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none", // Prevent interactions with the icon
              }}
            >
              <Icon />
            </span>
          )}
          <input
            type="text"
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
          {error && <p className="text-danger mt-1">{error}</p>}
        </div>
      </div>
    </div>
  );
};

IconInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  required: PropTypes.bool,
  style: PropTypes.object,
  icon: PropTypes.elementType, // Expecting a React component for the icon
};

export default IconInput;
