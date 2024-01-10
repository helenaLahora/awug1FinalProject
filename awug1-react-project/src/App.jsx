// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../src/views/Home';
import Search from '../src/views/Search';
import Detail from '../src/views/Detail';
import './index.css';

// Import CategoryProvider and FilterProvider from the correct paths
import { CategoryProvider } from '../src/components/common/CategoryContext';
import { FilterProvider } from '../src/components/common/FilterContext';

function App() {
  return (
    <CategoryProvider>
      <FilterProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/search"
              element={<Search />}
            />
            <Route path="/:id" element={<Detail />} />
          </Routes>
        </Router>
      </FilterProvider>
    </CategoryProvider>
  );
}

export default App;