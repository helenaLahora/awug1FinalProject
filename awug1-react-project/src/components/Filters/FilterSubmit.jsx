// FilterSubmit.jsx
import React from 'react';
import { useFilter } from '../common/FilterContext';
import '../../assets/styles/FilterSubmit.css';
import { ReactComponent as SearchIcon } from '../../assets/icons/Search.svg';

const FilterSubmit = () => {
  const { submitFilters } = useFilter();

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