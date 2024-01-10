// FilterSubmit.jsx
import React from 'react';
import { useFilter } from './FilterContext';

const FilterSubmit = () => {
  const { submitFilters } = useFilter();

  const handleClick = () => {
    submitFilters(); // Call the submitFilters function from the FilterContext
  };

  return (
    <button onClick={handleClick} className="Submit">
      Submit Filters
    </button>
  );
};

export default FilterSubmit;