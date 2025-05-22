import React, { memo } from 'react';
import Select from 'react-select';

const MultiSelectWithDropdown = ({ selectedDays, onDayChange, options }) => {
  const customStyles = {
    control: (provided) => ({
      ...provided,
      padding: '4px',
    }),
  };

  return (
    <Select
      isMulti
      options={options}
      value={selectedDays}
      onChange={onDayChange}
      closeMenuOnSelect={false}
      styles={customStyles}
    />
  );
};

export default memo(MultiSelectWithDropdown);
