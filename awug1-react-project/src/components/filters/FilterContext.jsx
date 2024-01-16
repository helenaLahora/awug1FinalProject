// FilterContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const FilterContext = createContext();

/**
 * FilterProvider Component
 * 
 * Main Goal/Task: Provides a context for managing filters and their submission.
 * 
 * Component Structure:
 * - Uses React hooks for state management (filters and submittedFilters).
 * - Provides functions (addFilter, handleFiltersClean, submitFilters) to manipulate filter state.
 * - Executes side effects related to filters or their submission using useEffect.
 * - Provides the context value to the FilterContext.Provider.
 * 
 * @param {Object} children - The child components to be wrapped by the context provider.
 */
export const FilterProvider = ({ children }) => {
  // State variables for filters and the submission status
  const [filters, setFilters] = useState({ text: '' });
  const [submittedFilters, setSubmittedFilters] = useState(false);

  /**
   * Adds a filter to the state and resets the submission status.
   * 
   * @param {Object} filter - The filter object to be added.
   */
  const addFilter = (filter) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...filter }));
    setSubmittedFilters(false); // Reset submittedFilters whenever filters change
  };

  /**
   * Clears all filters and resets the submission status.
   */
  const handleFiltersClean = () => {
    setFilters({ text: '' });
    setSubmittedFilters(false); // Reset submittedFilters when filters are cleaned
  };

  /**
   * Marks the filters as submitted.
   */
  const submitFilters = () => {
    setSubmittedFilters(true);
  };

  /**
   * useEffect for any necessary side effects related to filters or their submission.
   */
  useEffect(() => {
    // Add any necessary side effects related to filters or their submission
  }, [filters, submittedFilters]);

  // Context value containing filters, functions, and submission status
  const contextValue = { filters, addFilter, handleFiltersClean, submitFilters, submittedFilters };

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
};

/**
 * useFilter Hook
 * 
 * Retrieves the current filter context.
 * 
 * @returns {Object} - The filter context.
 */
const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};

/**
 * useSubmittedFilters Hook
 * 
 * Retrieves the submittedFilters state from the filter context.
 * 
 * @returns {boolean} - The submittedFilters state.
 */
const useSubmittedFilters = () => {
  const { submittedFilters } = useFilter();
  return submittedFilters;
};

/**
 * useFiltersClean Hook
 * 
 * Retrieves the handleFiltersClean function from the filter context.
 * 
 * @returns {function} - The handleFiltersClean function.
 */
const useFiltersClean = () => {
  const { handleFiltersClean } = useFilter();
  return handleFiltersClean;
};

export { useFilter, useFiltersClean, useSubmittedFilters };