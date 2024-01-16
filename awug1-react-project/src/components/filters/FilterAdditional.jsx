// FilterAdditionalInput.jsx
import React, { useState } from 'react';
import { useFilter } from './FilterContext';

/**
 * FilterAdditionalInput Component
 * 
 * Main Goal/Task: Allows users to input additional filter values of a specified type (e.g., numeric).
 * 
 * Component Structure:
 * - Utilizes React hooks for state management.
 * - Gets the addFilter function from the FilterContext to add the filter to the global state.
 * - Provides an input field for users to enter numeric values and a button to add the filter.
 */
const FilterAdditionalInput = () => {
  // Get the addFilter function from the FilterContext
  const { addFilter } = useFilter();

  // State variable to store the input value
  const [inputValue, setInputValue] = useState('');

  /**
   * Handles the input change event and updates the inputValue state.
   * 
   * @param {Object} event - The input change event.
   */
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  /**
   * Handles the add filter button click event.
   * Adds the entered numeric filter to the global state and resets the input value.
   */
  const handleAddFilter = () => {
    // Assuming you have a way to determine the type of the filter (e.g., 'numeric')
    const filterType = 'numeric';

    // Add the filter to the global state
    addFilter({ type: filterType, value: inputValue });

    // Reset the input value
    setInputValue('');
  };

  return (
    <div>
      {/* Input field for users to enter numeric values */}
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter numeric value"
      />
      
      {/* Button to add the numeric filter */}
      <button onClick={handleAddFilter}>Add Numeric Filter</button>
    </div>
  );
};

export default FilterAdditionalInput;