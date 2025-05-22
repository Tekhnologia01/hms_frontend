import React, { memo, useState } from "react";
import { Form } from "react-bootstrap"; // Using Bootstrap for styling

const InputBox = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  className,
  isRequired = false, // Add a prop for required fields
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const inputStyle = {
    padding: "10px",
    borderRadius: "4px",
    borderColor: isHovered ? "#98DBDE" : "#CFD4DC", // Change border color on hover
    backgroundColor: isHovered ? "#f0f0f0" : "white", // Change background color on hover
    fontSize: "1rem", // Increase text size inside the input
  };

  const placeholderStyle = `
    ::placeholder {
      font-size: 0.9rem; /* Increase placeholder font size */
      color:rgb(80, 70, 70); /* Placeholder text color */
    }
  `;

  return (
    <>
      <style>{placeholderStyle}</style> {/* Add custom placeholder styles */}
      <Form.Group controlId={name} className={className}>
        {label && (
          <Form.Label className="fw-semibold" style={{ fontSize: "1rem" }}>
            {label}{" "}
            {isRequired && <span className="text-danger fw-bold">*</span>}
          </Form.Label>
        )}
        <Form.Control
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          className={className}
          style={inputStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          {...props}
        />
      </Form.Group>
    </>
  );
};

export default memo(InputBox);
