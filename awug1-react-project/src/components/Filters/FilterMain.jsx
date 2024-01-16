// FilterMain.jsx
import React, { useState, useEffect } from 'react';
import JsonFile from '../../assets/information.json';
import { useCategory } from '../categories/CategoryContext';
import { useFilter } from './FilterContext';

/**
 * FilterMain component that renders the main filter input.
 * 
 * Component Structure:
 * - Uses the useCategory and useFilter hooks to access categoryIndex, addFilter, and submittedFilters.
 * - Manages state for inputValue and inputProperties, which include id and placeholder.
 * - Uses the useEffect hook to fetch and set the initial input properties based on the categoryIndex.
 * - Renders an input element with the properties id, placeholder, value, and onChange handler.
 * 
 * @returns {JSX.Element} - The FilterMain component.
 */
const FilterMain = () => {
  // Access categoryIndex from the CategoryContext
  const { categoryIndex } = useCategory();
  // Access addFilter and submittedFilters from the FilterContext
  const { addFilter, submittedFilters } = useFilter();
  // State to manage the input value
  const [inputValue, setInputValue] = useState('');
  // State to manage input properties like id and placeholder
  const [inputProperties, setInputProperties] = useState({
    id: '',
    placeholder: '',
  });

  useEffect(() => {
    // Fetch initial input properties based on the categoryIndex
    const fetchData = async () => {
      try {
        // Access the selected input properties from the information.json file
        const selectedProperties = JsonFile.endpoints?.[categoryIndex]?.filters[0]?.inputs[0];

        if (selectedProperties) {
          // Set input properties and reset the input value
          setInputProperties(selectedProperties);
          setInputValue('');
        }
      } catch (error) {
        console.error('Error fetching input properties:', error);
      }
    };
    fetchData();
  }, [categoryIndex]);

  // Handler for input change
  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    // If filters are not submitted, add the text filter
    if (!submittedFilters) {
      addFilter({ text: value });
    }
  };

  return (
    <input
      type="text"
      id={inputProperties.id}
      placeholder={inputProperties.placeholder}
      value={inputValue}
      onChange={handleInputChange}
    />
  );
};

export default FilterMain;