// components/characters/CharacterList.js
import React, { useState, useEffect } from 'react';
import CharacterCard from './CharacterCard';
import SearchFilter from '../common/SearchFilter';
import Pagination from '../common/Pagination';

/**
 * Displays a list of Disney characters retrieved from the API.
 * Responsible for fetching data and rendering the list.
 */
const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [ascendingOrder, setAscendingOrder] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [info, setInfo] = useState({ totalPages: 1 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        let allCharacters = [];

        // Fetch characters from the current page
        const response = await fetch(
          `https://api.disneyapi.dev/character?page=${currentPage}`
        );
        const data = await response.json();

        // Update total pages and pagination info based on the API response
        setInfo({
          totalPages: data.info.totalPages,
        });

        // Concatenate characters from the current page to the existing list
        allCharacters = data.data;

        // Apply order based on the state
        const orderedCharacters = allCharacters.sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();

          return ascendingOrder
            ? nameA.localeCompare(nameB)
            : nameB.localeCompare(nameA);
        });

        setCharacters(orderedCharacters);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchData();
  }, [ascendingOrder, currentPage]);

  const handleOrderChange = () => {
    setAscendingOrder((prevOrder) => !prevOrder);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {/* Order data by name */}
      <SearchFilter onOrderChange={handleOrderChange} />

      {/* Render filtered results */}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {/* Create character cards */}
        {characters.map((character) => (
          <CharacterCard key={character._id} character={character} />
        ))}
      </div>

      {/* Sending info on current fetched data */}
      <Pagination info={info} onPageChange={handlePageChange} />
    </div>
  );
};

export default CharacterList;