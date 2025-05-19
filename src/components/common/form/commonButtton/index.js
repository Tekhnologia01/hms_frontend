import React, { useState } from "react";
import { Button } from "react-bootstrap"; // Using Bootstrap for styling

const CommanButton = ({ label, onClick, variant = "", className, style, type, disabled }) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const buttonStyle = {
    color: "white",
    color: isHovered ? "white" : " white",

    backgroundColor: isHovered ? " #1D949A" : " #1D949A",

    borderColor: isHovered ? " #1D949A" : " #1D949A", // Example hover border color
    ...style, // Apply any additional custom styles passed in
  };

  return (
    <Button
      variant={variant}
      onClick={onClick}
      className={className}
      style={buttonStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={disabled} // Add disabled prop if needed
      type={type}
    >
      {label}
    </Button>
  );
};

export default CommanButton;
