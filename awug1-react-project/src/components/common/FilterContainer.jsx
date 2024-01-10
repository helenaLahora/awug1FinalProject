// views/FilterContainer.js
import React from 'react';
import FilterMain from './FilterMain';
import FilterSubmit from './FilterSubmit';
import FilterClean from './FilterClean';
import '../../assets/styles/FilterContainer.css';

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