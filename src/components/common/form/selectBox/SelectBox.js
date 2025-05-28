import React, { memo, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { IoIosArrowDown } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import "./selectbox.css"; 

const SelectBox = ({
  label,
  options = [],
  value,
  onChange,
  name,
  defaultValue = "Select an option",
  isDisabled = false,
  isRequired = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Filter options based on search term
  const filteredOptions = options?.filter((option) =>
    (option?.label ?? "").toString().toLowerCase().includes(searchTerm?.toLowerCase() ?? "")
  );
  
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const toggleDropdown = () => {
    if(!isDisabled){
      setIsDropdownOpen(!isDropdownOpen)
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleOptionClick = (selectedLabel, selectedOption) => {
    // On selecting an option, pass both the label (displayed value) and option (ID)
    onChange({ target: { name, value: selectedOption } });
    setIsDropdownOpen(false); // Close dropdown after selection
    setSearchTerm(""); // Clear the search field
  };

  const selectStyle = {
    padding: "10px",
    borderRadius: "4px",
    borderColor: isHovered ? "#ff7f50" : "#7B3F0080",
    backgroundColor: isHovered ? "#f0f0f0" : "white",
    appearance: "none",
    position: "relative",
    zIndex: 1,
    cursor: "pointer",
  };

  return (
    <Form.Group controlId={name} className="select-box-group">
      {label && (
        <Form.Label className="fw-semibold" style={{ fontSize: "1.1rem", color: "#080B6C" }}>
          {label} {isRequired && <span className="text-danger fw-bold">*</span>}
        </Form.Label>
      )}
      <InputGroup className="select-box-input-group p-0 border " style={{borderRadius:'5px'}}>
        <div
          className="select-box"
          style={selectStyle}
          onClick={toggleDropdown}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {value ? options.find(option => option?.option === value)?.label : defaultValue} {/* Display the label */}
          <IoIosArrowDown className="select-icon" />
        </div>
        {isDropdownOpen && (
          <div className="dropdown-container">
            <div className="search-container">
              <CiSearch size={24} className="search-icon" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
                disabled={isDisabled}
              />
            </div>
            <div className="dropdown-options">
              {filteredOptions?.length > 0 ? (
                filteredOptions?.map((option, index) => (
                  <div
                    key={index}
                    className="dropdown-option"
                    onClick={() => handleOptionClick(option.label, option.option)}
                  >
                    {option.label} {/* Display option label */}
                  </div>
                ))
              ) : (
                <div className="no-options">No options available</div>
              )}
            </div>
          </div>
        )}
      </InputGroup>
    </Form.Group>
  );
};

export default memo(SelectBox);
