import React, { useState } from "react";
import './notes.css'

const Note = ({
  value,
  name,
  onChange,
  placeholder,
  className,
  label,
  isRequired = false,
  rows = 5,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const textareaStyle = {
    padding: "12px",
    height: "80px",
    borderRadius: "7px",
    border: "1px solid",
    borderColor: isHovered ? "#98DBDE" : "#CFD4DC",
    backgroundColor: isHovered ? "#f0f0f0" : "#fafafa",
    color: "#333",
    fontSize: "14px",
    transition: "all 0.3s ease",
    margin: "10px 0",
    lineHeight: "1.6",
    width: "100%",
    resize: "vertical",
  };

  return (
    <div className={`note-container ${className}`}>
      {label && (
        <label className="fw-semibold" style={{fontSize:'1rem'}}> 
          {label} {isRequired && <span className="text-danger">*</span>}
        </label>
      )}
      <textarea
        rows={rows}
        className={`note-textarea`}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      />
    </div>
  );
};

export default Note;
