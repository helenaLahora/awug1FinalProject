// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Search from './views/Search';
import Detail from './views/Detail';
import './index.css';

// Import CategoryProvider from the correct path
import { CategoryProvider } from '../src/components/common/CategoryContext';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Wrap the Search component with CategoryProvider */}
        <Route
          path="/search"
          element={
            <Search>
              <CategoryProvider />
            </Search>
          }
        />
        <Route path="/:id" element={<Detail />} />
      </Routes>
    </Router>
  );
}

export default App;