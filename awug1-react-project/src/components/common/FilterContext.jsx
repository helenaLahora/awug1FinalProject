// FilterContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({ text: '' });
  const [submittedFilters, setSubmittedFilters] = useState(false);

  const addFilter = (filter) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...filter }));
    setSubmittedFilters(false); // Reset submittedFilters whenever filters change
  };

  const handleFiltersClean = () => {
    setFilters({ text: '' });
    setSubmittedFilters(false); // Reset submittedFilters when filters are cleaned
  };

  const submitFilters = () => {
    setSubmittedFilters(true);
  };

  useEffect(() => {
    // Add any necessary side effects related to filters or their submission
  }, [filters, submittedFilters]);

  const contextValue = { filters, addFilter, handleFiltersClean, submitFilters, submittedFilters };

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

const useSubmittedFilters = () => {
  const { submittedFilters } = useFilter();
  return submittedFilters;
};

const useFiltersClean = () => {
  const { handleFiltersClean } = useFilter();
  return handleFiltersClean;
};

export { useFilter, useFiltersClean, useSubmittedFilters };