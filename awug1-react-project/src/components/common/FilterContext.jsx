// FilterContext.js
import React, { createContext, useContext, useState } from 'react';

// Create a context for managing filters
const FilterContext = createContext();

// Create a provider component to manage the state of filters
export const FilterProvider = ({ children }) => {
  // State to store the list of filters
  const [filters, setFilters] = useState([]);

  // Function to add a filter to the list
  const addFilter = (filter) => {
    // Use the setFilters function from useState to update the state with the new filter
    setFilters((prevFilters) => [...prevFilters, filter]);
  };

  // Provide the filters and addFilter function to the components in the context
  return (
    <FilterContext.Provider value={{ filters, addFilter }}>
      {children}
    </FilterContext.Provider>
  );
};

// Custom hook to conveniently access the filter context
export const useFilter = () => {
  // Use the useContext hook to access the FilterContext and retrieve its value
  return useContext(FilterContext);
};