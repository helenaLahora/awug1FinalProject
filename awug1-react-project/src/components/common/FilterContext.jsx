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

  const contextValue = { filters, addFilter, handleFiltersClean };

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