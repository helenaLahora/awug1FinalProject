// src/App.js
import React, { useState } from 'react';
import ObjectList from './components/ObjectList';
import PersonList from './components/PersonList';
import ExhibitionList from './components/ExhibitionList';
import SearchResults from './components/SearchResults';
import SearchForm from './components/SearchForm';

function App() {
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
  };

  return (
    <div>
      <h1>Harvard Art Museums API Data</h1>

      {/* Search Form */}
      <SearchForm onSearch={handleSearch} />

      {/* Display Lists */}
      <ObjectList />
      <PersonList />
      <ExhibitionList />

      {/* Display Search Results */}
      <SearchResults searchKeyword={searchKeyword} />
    </div>
  );
}

export default App;