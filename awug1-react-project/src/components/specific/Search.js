// components/specific/Search.js
import React, { useState, useEffect, useCallback } from 'react';
import ItemCard from './ItemCard';
import SearchBox from '../common/SearchBox';
import SearchFilter from '../common/SearchFilter';

/**
 * Component for searching items based on user input.
 * Allows users to input search criteria and displays the filtered list.
 */
const Search = () => {
  //-------------------- STATES TO TRACK USER INPUTS AND ITEM'S ORDER --------------------
  // State to store the list of films fetched from the API
  const [films, setFilms] = useState([]);
  // State to track the order of films (ascending or descending)
  const [ascendingOrder, setAscendingOrder] = useState(true);

  // Function to fetch films from the API based on the provided URL and order
  const fetchFilms = useCallback((url) => {
    console.log(url);
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Sort films based on the order (ascending or descending)
        const sortedFilms = data.slice().sort((a, b) => {
          const titleA = a?.title?.toUpperCase() || '';
          const titleB = b?.title?.toUpperCase() || '';

          return ascendingOrder ? titleA.localeCompare(titleB) : titleB.localeCompare(titleA);
        });

        // Set sorted films
        setFilms(sortedFilms);
      })
      .catch((error) => {
        console.error('Error fetching films:', error);
      });
  }, [ascendingOrder]); // Include ascendingOrder in the dependency array

  // useEffect hook to fetch data when the component mounts or when the order changes
  useEffect(() => {
    // Initial fetch with an empty URL
    fetchFilms('https://ghibliapi.vercel.app/films');
  }, [fetchFilms]);

  // Function to handle order change
  const handleOrderChange = () => {
    // Toggle the current order and update the state
    setAscendingOrder((prevOrder) => !prevOrder);
  };

  //-------------------- RENDER --------------------
  return (
    <div>
      {/* Include the SearchBox component for search functionality */}
      <SearchBox onSearch={(searchUrl) => fetchFilms(searchUrl)} />

      {/* Component to allow the user to change the order */}
      <SearchFilter onOrderChange={handleOrderChange} />

      {/* Render the list of films */}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {/* Create item cards for each film in the list */}
        {films.map((film) => (
          <ItemCard key={film.id} film={film} />
        ))}
      </div>
    </div>
  );
};

export default Search;