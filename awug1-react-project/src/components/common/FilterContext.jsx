// FilterContext.jsx
import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({ text: '' }); // Ensure 'text' is initialized with a default value

  const addFilter = (filter) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...filter }));
  };

  return (
    <FilterContext.Provider value={{ filters, addFilter }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};