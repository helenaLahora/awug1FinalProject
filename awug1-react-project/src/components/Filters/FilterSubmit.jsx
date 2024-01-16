// FilterSubmit.jsx
import React from 'react';
import { useFilter } from './FilterContext';
import '../../assets/styles/FilterSubmit.css';
import { ReactComponent as SearchIcon } from '../../assets/icons/Search.svg';

/**
 * FilterSubmit component that renders the submit button for applying filters.
 * 
 * Component Structure:
 * - Uses the useFilter hook to access the submitFilters function.
 * - Renders a button with an onClick handler that calls the submitFilters function.
 * - Displays a search icon inside the button.
 * 
 * @returns {JSX.Element} - The FilterSubmit component.
 */
const FilterSubmit = () => {
  // Access submitFilters from the FilterContext
  const { submitFilters } = useFilter();

  // Handler for submitting filters
  const handleSubmit = () => {
    // Add any logic related to submitting filters
    submitFilters();
  };

  return (
    <button onClick={handleSubmit} className="Submit">
      <SearchIcon className="IconSubmit" />
    </button>
  );
};

export default FilterSubmit;