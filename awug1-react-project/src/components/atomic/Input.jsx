// Input.jsx
import React, { useState } from 'react';

const Input = ({ endpointIndex, inputs, fetchData }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    // Perform the data fetching logic here using the specified URL and search criteria
    fetchData(searchValue);
  };

  return (
    <div>
      {inputs.map((input) => (
        <input
          key={input.id}
          type={input.type}
          id={input.id}
          label={input.label}
          placeholder={input.placeholder}
          value={searchValue}
          onChange={handleInputChange}
        />
      ))}
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};
export default Input;