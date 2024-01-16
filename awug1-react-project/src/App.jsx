// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../src/views/Home';
import Search from '../src/views/Search';
import DetailView from '../src/views/DetailView';
import './index.css';

// Import CategoryProvider and FilterProvider from the correct paths
import { CategoryProvider } from './components/categories/CategoryContext';
import { FilterProvider } from './components/filters/FilterContext';

/**
 * Main App Component
 * 
 * Component Structure:
 * - Wraps the entire application with CategoryProvider and FilterProvider for context management.
 * - Utilizes React Router for routing between different views: Home, Search, and DetailView.
 * 
 * @returns {JSX.Element} - The main App component.
 */
function App() {
  return (
    <CategoryProvider>
      <FilterProvider>
        <Router>
          <Routes>
            {/* Route for the Home view */}
            <Route path="/" element={<Home />} />
            
            {/* Route for the Search view */}
            <Route path="/search" element={<Search />} />
            
            {/* Route for the DetailView */}
            <Route path="/:id" element={<DetailView />} />
          </Routes>
        </Router>
      </FilterProvider>
    </CategoryProvider>
  );
}

export default App;