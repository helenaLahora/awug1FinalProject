// FilterAdditionalInput.jsx
import React, { useState } from 'react';
import { useFilter } from './FilterContext';

const FilterAdditionalInput = () => {
  const { addFilter } = useFilter();
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddFilter = () => {
    // Assuming you have a way to determine the type of the filter (e.g., 'numeric')
    const filterType = 'numeric';

    addFilter({ type: filterType, value: inputValue });
    setInputValue('');
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter numeric value"
      />
      <button onClick={handleAddFilter}>Add Numeric Filter</button>
    </div>
  );
};

export default FilterAdditionalInput;