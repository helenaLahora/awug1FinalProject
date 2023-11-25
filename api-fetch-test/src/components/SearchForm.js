// src/components/SearchForm.js
import React from 'react';

function SearchForm({ onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const keyword = e.target.elements.keyword.value;
    onSearch(keyword);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Search:
        <input type="text" name="keyword" />
      </label>
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;