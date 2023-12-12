// components/specific/ListFilms.js
import React, { useState, useEffect, useCallback } from 'react';
import ItemCard from './ItemCard';
import SearchFilter from '../common/SearchFilter';

/**
 * Displays a list of films fetched from the Studio Ghibli API.
 * Responsible for fetching data, rendering the list, and handling sorting.
 */
const ListFilms = () => {
  // State to store the list of films fetched from the API
  const [films, setFilms] = useState([]);
  
  // State to track the order of films (ascending or descending)
  const [ascendingOrder, setAscendingOrder] = useState(true);

  // Function to fetch films from the API
  const fetchData = useCallback(() => {
    fetch(`https://ghibliapi.vercel.app/films`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Set films directly from the API response
        setFilms(data);
      })
      .catch((error) => {
        console.error('Error fetching films:', error);
      });
  }, []); // Dependency array ensures useCallback memoization and initial fetch

  // useEffect hook to fetch data when the component mounts or when the order changes
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Function to handle order change
  const handleOrderChange = () => {
    // Toggle the current order and update the state
    setAscendingOrder((prevOrder) => !prevOrder);
  };

  // Function to sort films based on the order
  const sortedFilms = films.slice().sort((a, b) => {
    const titleA = a?.title?.toUpperCase() || '';
    const titleB = b?.title?.toUpperCase() || '';
    
    return ascendingOrder
      ? titleA.localeCompare(titleB)
      : titleB.localeCompare(titleA);
  });

  // Render
  return (
    <div>
      {/* Component to allow the user to change the order */}
      <SearchFilter onOrderChange={handleOrderChange} />

      {/* Render the list of films */}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {/* Create item cards for each film in the list */}
        {sortedFilms.map((film) => (
          <ItemCard key={film.id} film={film} />
        ))}
      </div>
    </div>
  );
};

export default ListFilms;