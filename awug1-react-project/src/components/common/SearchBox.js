// components/common/SearchBox.js
import React from 'react';

/**
 * SearchBox component for handling search functionality.
 * Can be used to search characters or other entities.
 */
const SearchBox = ({ onSearch }) => {
  return (
    <div>
      {/* Input field for search criteria */}
      <input type="text" placeholder="Enter search criteria" />
      {/* Button to trigger the search */}
      <button onClick={onSearch}>Search</button>
    </div>
  );
};

export default SearchBox;