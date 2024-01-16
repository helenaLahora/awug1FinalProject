// FilterClean.jsx
import React from 'react';
import { useFiltersClean } from './FilterContext';
import '../../assets/styles/FilterClean.css';

/**
 * FilterClean component that provides a button to clean filters.
 * Utilizes the useFiltersClean hook from FilterContext to handle filter cleaning.
 * 
 * Component Structure:
 * - Renders a button with the label "Clean Filters."
 * - On click, it invokes the handleFiltersClean function to clean the filters.
 * 
 * @returns {JSX.Element} - The FilterClean component.
 */
const FilterClean = () => {
  const handleFiltersClean = useFiltersClean();

  return (
    <button onClick={handleFiltersClean} className="CleanFilters">
      Clean Filters
    </button>
  );
};

export default FilterClean;