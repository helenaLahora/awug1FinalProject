// Search.jsx
import React from 'react';
import CategoryForm from '../components/categories/CategoryForm';
import Footer from '../components/common/Footer';
import Navbar from '../components/common/Navbar';
import HeaderPage from '../components/common/HeaderPage';
import FilterContainer from '../components/filters/FilterContainer';
import Results from '../components/common/Results';
import { CategoryProvider } from '../components/categories/CategoryContext';
import { FilterProvider } from '../components/filters/FilterContext';

/**
 * Search View Component
 * 
 * Main Goal/Task: Displays a search interface for discovering the Ghibli Universe.
 * 
 * Component Structure:
 * - Utilizes common components: Navbar, HeaderPage, CategoryForm, FilterContainer, Results, and Footer.
 * - Wraps CategoryProvider and FilterProvider for context management.
 * 
 * @returns {JSX.Element} - The Search view component.
 */
const Search = () => {
  return (
    <CategoryProvider>
      <FilterProvider>
        <div>
          {/* Render Navbar component */}
          <Navbar />
          
          {/* Render Header component with specified title */}
          <HeaderPage title={"Discover the Ghibli Universe"}/>
          
          {/* Render CategoryForm component */}
          <CategoryForm />
          
          {/* Render FilterContainer component */}
          <FilterContainer/>
          
          {/* Render Results component */}
          <Results />
          
          {/* Render Footer component */}
          <Footer />
        </div>
      </FilterProvider>
    </CategoryProvider>
  );
};

export default Search;
