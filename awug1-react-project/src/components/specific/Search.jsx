// components/specific/Search.jsx
import React, { useState, useEffect, useCallback } from 'react';
import ItemCard from './ItemCard';
import SearchBox from '../common/SearchBox';
import SearchFilter from '../common/SearchFilter';

const Search = () => {
  // State to store the original order of films
  const [originalFilms, setOriginalFilms] = useState([]);
  // State to store the currently filtered films
  const [filteredFilms, setFilteredFilms] = useState([]);
  // State to track the order of films (ascending or descending)
  const [ascendingOrder, setAscendingOrder] = useState(true);

  // Function to fetch films from the API based on the provided URL and order
  const fetchFilms = useCallback(() => {
    fetch('https://ghibliapi.vercel.app/films')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Sort films based on the order (ascending or descending)
        console.log(data);
        const sortedFilms = data.slice().sort((a, b) => {
          const titleA = a?.title?.toUpperCase() || '';
          const titleB = b?.title?.toUpperCase() || '';
          return ascendingOrder ? titleA.localeCompare(titleB) : titleB.localeCompare(titleA);
        });

        // Set the original order of films and the currently filtered films
        setOriginalFilms(sortedFilms);
        setFilteredFilms(sortedFilms);
      })
      .catch((error) => {
        console.error('Error fetching films:', error);
      });
  }, [ascendingOrder]);

  // useEffect hook to fetch data when the component mounts or when the order changes
  useEffect(() => {
    // Initial fetch with an empty URL
    fetchFilms();
  }, [fetchFilms, ascendingOrder]);

  // Function to handle order change
  const handleOrderChange = () => {
    // Toggle the current order and update the state
    setAscendingOrder((prevOrder) => !prevOrder);

    // Re-sort the films with the updated order
    const sortedFilms = [...filteredFilms].sort((a, b) => {
      const titleA = a?.title?.toUpperCase() || '';
      const titleB = b?.title?.toUpperCase() || '';
      return ascendingOrder ? titleA.localeCompare(titleB) : titleB.localeCompare(titleA);
    });

    // Update the state with the re-sorted films
    setFilteredFilms(sortedFilms);
  };

// Function to handle search based on user input
const handleSearch = (filters) => {
  // Log the applied filters to the console for debugging
  console.log('Applied Filters:', filters);

  // Apply filters to the original order of films
  const updatedFilteredFilms = originalFilms.filter((film) => {
    const title = film?.title?.toLowerCase();
    const searchCriteria = filters.searchCriteria?.toLowerCase();

    // Accumulate Rotten Tomatoes scores
    const accumulatedRtScore = film?.rt_score ? parseInt(film.rt_score, 10) : 0;

    return (
      (!filters.searchCriteria || title.includes(searchCriteria)) &&
      (filters.title || !filters.title || title.includes(searchCriteria)) &&
      (filters.original_title || !filters.original_title || film?.original_title?.toLowerCase().includes(searchCriteria)) &&
      (filters.director || !filters.director || film?.director?.toLowerCase().includes(searchCriteria)) &&
      (filters.producer || !filters.producer || film?.producer?.toLowerCase().includes(searchCriteria)) &&
      (filters.people || !filters.people || film?.people?.some((person) => person.toLowerCase().includes(searchCriteria))) &&
      (filters.species || !filters.species || film?.species?.some((specie) => specie.toLowerCase().includes(searchCriteria))) &&
      (filters.locations || !filters.locations || film?.locations?.some((location) => location.toLowerCase().includes(searchCriteria))) &&
      (filters.vehicles || !filters.vehicles || film?.vehicles?.some((vehicle) => vehicle.toLowerCase().includes(searchCriteria))) &&
      (!filters.releaseDate || film?.release_date?.includes(filters.releaseDate)) &&
      (!filters.rtScore || accumulatedRtScore >= filters.rtScore)
    );
  });

  // Update the state with the filtered films
  setFilteredFilms(updatedFilteredFilms);
};

  // Render the Search component
  return (
    <div>
      {/* Include the SearchBox component for search functionality */}
      <SearchBox onSearch={handleSearch} />

      {/* Component to allow the user to change the order */}
      <SearchFilter onOrderChange={handleOrderChange} />

      {/* Render the list of films */}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {/* Create item cards for each film in the list */}
        {filteredFilms.map((film) => (
          <ItemCard key={film.id} film={film} />
        ))}
      </div>
    </div>
  );
};

export default Search;