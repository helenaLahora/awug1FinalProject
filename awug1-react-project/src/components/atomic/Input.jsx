// Input.jsx
import React, { useState } from 'react';

/**
 * Input Component
 * 
 * Main Goal/Task: Provides input fields for user interaction and triggers data fetching on search.
 * 
 * Component Structure:
 * - Uses React hooks for state management.
 * - Receives props: endpointIndex, inputs, fetchData.
 * - Renders input fields based on the provided configuration in the 'inputs' prop.
 * - Allows users to input search criteria and triggers data fetching on search button click.
 * 
 * @param {number} endpointIndex - Index of the endpoint for which data is to be fetched.
 * @param {Array} inputs - Array of input configurations (id, type, label, placeholder).
 * @param {function} fetchData - Function to fetch data based on the provided search criteria.
 */
const Input = ({ endpointIndex, inputs, fetchData }) => {
  // State variable to store user input
  const [searchValue, setSearchValue] = useState('');

  /**
   * Handles input change event.
   * Updates the searchValue state with the entered value.
   * 
   * @param {object} event - The input change event.
   */
  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  /**
   * Handles search button click event.
   * Triggers data fetching logic based on the entered search criteria.
   */
  const handleSearch = () => {
    // Perform the data fetching logic here using the specified URL and search criteria
    fetchData(searchValue);
  };

  return (
    <div>
      {inputs.map((input) => (
        <input
          key={input.id}
          type={input.type}
          id={input.id}
          label={input.label}
          placeholder={input.placeholder}
          value={searchValue}
          onChange={handleInputChange}
        />
      ))}
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Input;