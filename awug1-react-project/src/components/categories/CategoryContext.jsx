// CategoryContext.js
import React, { createContext, useContext, useState } from 'react';

// Create a context for managing category information
const CategoryContext = createContext();

/**
 * CategoryProvider Component
 * 
 * Main Goal/Task: Provides a context for managing the selected category index.
 * 
 * Component Structure:
 * - Uses React hooks for state management.
 * - Creates a context with an initial category index value of 0.
 * - Wraps its children with the created context provider.
 * 
 * @param {Object} children - The child components that will have access to the category context.
 */
export const CategoryProvider = ({ children }) => {
  // State variable to store the selected category index
  const [categoryIndex, setCategoryIndex] = useState(0);

  // Value object containing the categoryIndex and setCategoryIndex function
  const value = {
    categoryIndex,
    setCategoryIndex,
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};

/**
 * useCategory Hook
 * 
 * Main Goal/Task: Provides a hook for accessing the category context.
 * 
 * @returns {Object} The category context object with categoryIndex and setCategoryIndex.
 * 
 * Throws an error if used outside the CategoryProvider.
 */
export const useCategory = () => {
  // Access the category context
  const context = useContext(CategoryContext);
  
  // Throw an error if used outside the CategoryProvider
  if (!context) {
    throw new Error('useCategory must be used within a CategoryProvider');
  }

  return context;
};