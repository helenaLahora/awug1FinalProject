// components/common/SearchBox.jsx
import React, { useState } from 'react';

const SearchBox = ({ onSearch }) => {
  const [searchCriteria, setSearchCriteria] = useState('');
  const [selectedTextFields, setSelectedTextFields] = useState({
    title: false,
    original_title: false,
    director: false,
    producer: false,
    people: false,
    species: false,
    locations: false,
    vehicles: false,
  });
  const [releaseDateDropdown, setReleaseDateDropdown] = useState('');
  const [rtScoreSlider, setRtScoreSlider] = useState(0);

  const handleInputChange = (event) => {
    setSearchCriteria(event.target.value);
  };

  const handleToggleChange = (field) => {
    setSelectedTextFields((prevFields) => ({
      ...prevFields,
      [field]: !prevFields[field],
    }));
  };

  const handleReleaseDateChange = (event) => {
    setReleaseDateDropdown(event.target.value);
  };

  const handleRtScoreChange = (event) => {
    setRtScoreSlider(parseInt(event.target.value, 10));
  };

  const handleSearchClick = () => {
    const selectedTextFieldKeys = Object.keys(selectedTextFields);
    const selectedTextFieldsToSearch = selectedTextFieldKeys.filter(
      (field) => selectedTextFields[field]
    );

    const filters = {
      searchCriteria,
      title: selectedTextFieldsToSearch.includes('title'),
      original_title: selectedTextFieldsToSearch.includes('original_title'),
      director: selectedTextFieldsToSearch.includes('director'),
      producer: selectedTextFieldsToSearch.includes('producer'),
      people: selectedTextFieldsToSearch.includes('people'),
      species: selectedTextFieldsToSearch.includes('species'),
      locations: selectedTextFieldsToSearch.includes('locations'),
      vehicles: selectedTextFieldsToSearch.includes('vehicles'),
      releaseDate: releaseDateDropdown,
      rtScore: rtScoreSlider,
    };

    onSearch(filters);
  };

  const handleClearClick = () => {
    setSearchCriteria('');
    setSelectedTextFields({
      title: false,
      original_title: false,
      director: false,
      producer: false,
      people: false,
      species: false,
      locations: false,
      vehicles: false,
    });
    setReleaseDateDropdown('');
    setRtScoreSlider(0);

    // Trigger search with empty filters to reset the results
    onSearch({});
  };

  return (
    <div>
      <div>
        <label htmlFor="searchCriteria">Search Criteria:</label>
        <input
          type="text"
          id="searchCriteria"
          placeholder="Enter search criteria"
          value={searchCriteria}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Toggle Text Fields:</label>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {Object.keys(selectedTextFields).map((field) => (
            <div key={field} style={{ marginRight: '20px', marginBottom: '10px' }}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedTextFields[field]}
                  onChange={() => handleToggleChange(field)}
                />
                {field}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <label>Release Date:</label>
        <select
          value={releaseDateDropdown}
          onChange={handleReleaseDateChange}
          placeholder="Select Year"
        >
          <option value="">Select Year</option>
          {Array.from({ length: new Date().getFullYear() - 1900 + 1 }, (_, index) => (
            <option key={index} value={1900 + index}>
              {1900 + index}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Rotten Tomato Score:</label>
        <input
          type="range"
          min="0"
          max="100"
          value={rtScoreSlider}
          onChange={handleRtScoreChange}
        />
        <span>{rtScoreSlider}%</span>
      </div>

      <button onClick={handleSearchClick}>Search</button>
      <button onClick={handleClearClick}>Clear</button>
    </div>
  );
};

export default SearchBox;