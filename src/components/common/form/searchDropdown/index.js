import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
// import '../common.css';
import React, { memo, useState } from "react";
import { Dropdown } from 'primereact/dropdown';
// import '../common.css';

 function SearchDropdown({
    placeholder,
    value,
    className,
    isSearchabel,
    name,
    options,
    onChange }) {

    return (
        <Dropdown
            name={name}
            value={value}
            onChange={onChange}
            options={options}
            optionLabel="label"
            optionValue="option"
            placeholder={placeholder}
            filter={isSearchabel}
            className={`w-100 custom_drop ${className}`}
        />
    )
}
export default memo(SearchDropdown)