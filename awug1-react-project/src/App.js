// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import SearchPage from './views/SearchPage';
import CharacterDetailPage from './views/CharacterDetailPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/detail/location/:id" element={<CharacterDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;