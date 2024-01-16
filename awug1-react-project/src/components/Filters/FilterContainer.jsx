// views/FilterContainer.js
import React from 'react';
import FilterMain from './FilterMain';
import FilterSubmit from './FilterSubmit';
import FilterClean from './FilterClean';
import '../../assets/styles/FilterContainer.css';

/**
 * FilterContainer component that encapsulates the main filter components.
 * 
 * Component Structure:
 * - Renders a wrapper div with the className "wrapperFilters."
 * - Includes the FilterMain, FilterSubmit, and FilterClean components.
 * 
 * @returns {JSX.Element} - The FilterContainer component.
 */
const FilterContainer = () => {
  return (
    <div className="wrapperFilters">
        <FilterMain/>
        <FilterSubmit/>
        <FilterClean/>
    </div>
  );
};

export default FilterContainer;