// components/common/SearchBox.js
import React, { useState } from 'react';

/**
 * SearchBox component for handling search functionality.
 * Can be used to search characters or other entities.
 * @param {function} onSearch - Callback function to execute the search.
 */
const SearchBox = ({ onSearch }) => {


 //-------------------- STATES TO TRACK USER INPUTS --------------------
  // State to track user input for search criteria
  const [searchCriteria, setSearchCriteria] = useState('');
  // State to track selected inputs for search
  const [selectedTextFields, setSelectedTextFields] = useState({
    title: false,
    original_title: false,
    original_title_romanised: false,
    director: false,
    producer: false,
    people: false,
    species: false,
    locations: false,
    vehicles: false,
  });
  // State to track release date dropdown value
  const [releaseDateDropdown, setReleaseDateDropdown] = useState('');
  // State to track Rotten Tomato Score slider value
  const [rtScoreSlider, setRtScoreSlider] = useState(0);
  // Function to handle user input change in the search criteria input field
  const handleInputChange = (event) => {
    setSearchCriteria(event.target.value);
  };


  //-------------------- FUNCTIONS TO HANDLE USER INPUTS --------------------
  // Function to handle toggling of text fields for search
  const handleToggleChange = (field) => {
    setSelectedTextFields((prevFields) => ({
      ...prevFields,
      [field]: !prevFields[field],
    }));
  };
  // Function to handle release date dropdown change
  const handleReleaseDateChange = (event) => {
    setReleaseDateDropdown(event.target.value);
  };
  // Function to handle Rotten Tomato Score slider change
  const handleRtScoreChange = (event) => {
    setRtScoreSlider(parseInt(event.target.value, 10));
  };


  //-------------------- TRIGGER SEARCH AND CONSTRUCT URL --------------------
  // Function to trigger the search with the constructed URL
  const handleSearchClick = () => {
    // Extract selected text fields
    const selectedTextFieldKeys = Object.keys(selectedTextFields);
    const selectedTextFieldsToSearch = selectedTextFieldKeys.filter(
      (field) => selectedTextFields[field]
    );
    // Create a string with selected text fields for the search criteria
    const textFieldsQueryString = selectedTextFieldsToSearch.join(',');

    // Construct the URL based on selected fields and user inputs
    const url = `https://ghibliapi.vercel.app/films?${textFieldsQueryString}${
      releaseDateDropdown ? `&release_date=${releaseDateDropdown}` : ''
    }${rtScoreSlider ? `&rt_score=${rtScoreSlider}` : ''}?${searchCriteria}`;

    // Execute the search callback with the constructed URL
    onSearch(url);
  };

  return (
    <div>
      {/* -------------------------- FORM -------------------------- */}
      {/* Input field for search criteria */}
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
      {/* Toggle switches for selecting text fields */}
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
      {/* Dropdown for Release Date with all years */}
      <div>
        <label>Release Date:</label>
        <select
          value={releaseDateDropdown}
          onChange={handleReleaseDateChange}
          placeholder="Select Year"
        >
          <option value="">Select Year</option>
          {/* Generating options for all years */}
          {Array.from({ length: new Date().getFullYear() - 1900 + 1 }, (_, index) => (
            <option key={index} value={1900 + index}>
              {1900 + index}
            </option>
          ))}
        </select>
      </div>
      {/* Slider for Rotten Tomato Score */}
      <div>
        <label>Rotten Tomato Score:</label>
        <input
          type="range"
          min="0"
          max="100"
          value={rtScoreSlider}
          onChange={handleRtScoreChange}
          placeholder="Select Score"
        />
        <span>{rtScoreSlider}%</span>
      </div>


      {/* -------------------------- TRIGGER BUTTON -------------------------- */}
      {/* Button to trigger the search */}
      <button onClick={handleSearchClick}>Search</button>
    </div>
  );
};

export default SearchBox