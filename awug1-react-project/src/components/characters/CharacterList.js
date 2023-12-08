// components/characters/CharacterList.js
import React, { useState, useEffect } from 'react';
import CharacterCard from './CharacterCard';
import SearchFilter from '../common/SearchFilter';
import Pagination from '../common/Pagination';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [ascendingOrder, setAscendingOrder] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let allCharacters = [];

        // Fetch characters from the current page
        const response = await fetch(
          `https://api.disneyapi.dev/character?page=${currentPage}`
        );
        const data = await response.json();

        // Update total pages based on the API response
        setTotalPages(data.totalPages);

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
      <h2>All Characters</h2>
      <SearchFilter onOrderChange={handleOrderChange} />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {characters.map((character) => (
          <CharacterCard key={character._id} character={character} />
        ))}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default CharacterList;