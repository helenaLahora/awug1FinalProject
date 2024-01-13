// FilterClean.jsx
import React from 'react';
import { useFiltersClean } from '../common/FilterContext';
import '../../assets/styles/FilterClean.css';

const FilterClean = () => {
  const handleFiltersClean = useFiltersClean();

  return (
    <button onClick={handleFiltersClean} className="CleanFilters">
      Clean Filters
    </button>
  );
};

export default FilterClean;