// FilterContext.jsx
import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({ text: '' });

  const addFilter = (filter) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...filter }));
  };

  const handleFiltersClean = () => {
    addFilter({ text: '' });
  };

  const submitFilters = () => {
    // Pass the filters array to the Results component
    // Note: You might want to add more logic or send the filters to a parent component that manages the data fetching
    // For simplicity, I'm directly setting filters in a state here.
    setFilters(filters);
  };

  const contextValue = { filters, addFilter, handleFiltersClean, submitFilters };

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
};

const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};

const useFiltersClean = () => {
  const { handleFiltersClean } = useFilter();
  return handleFiltersClean;
};

export { useFilter, useFiltersClean };
