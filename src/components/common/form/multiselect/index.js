// src/MultiSelectWithCheckbox.js
import React from 'react';
import Select from 'react-select';

const MultiSelectWithDropdown = ({ selectedDays, onDayChange, options }) => {
  // const options = [
  //   { value: 'monday', label: 'Monday' },
  //   { value: 'tuesday', label: 'Tuesday' },
  //   { value: 'wednesday', label: 'Wednesday' },
  //   { value: 'thursday', label: 'Thursday' },
  //   { value: 'friday', label: 'Friday' },
  //   { value: 'saturday', label: 'Saturday' },
  //   { value: 'sunday', label: 'Sunday' },
  // ];

  return (
    <Select
      isMulti
      options={options}
      value={selectedDays}
      onChange={onDayChange}
      closeMenuOnSelect={false}
    />
  );
};

export default MultiSelectWithDropdown;
