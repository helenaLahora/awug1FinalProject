// FilterSubmit.jsx
import React from 'react';
import { useFilter } from './FilterContext';

const FilterSubmit = () => {
  const { submitFilters } = useFilter();

  const handleSubmit = () => {
    // Add any logic related to submitting filters
    submitFilters();
  };

  return (
    <button onClick={handleSubmit}>
      Submit Filters
    </button>
  );
};

export default FilterSubmit;