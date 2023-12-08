// components/characters/CharacterDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

/**
 * Displays detailed information about a specific Disney character.
 * Fetches data for the selected character and renders the details.
 */
const CharacterDetail = () => {
  // Get the character ID from the route parameters
  const { id } = useParams();
  // State to store the details of the selected character
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    // Fetch data for the specific character when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.disneyapi.dev/character/${id}`);
        const data = await response.json();
        setCharacter(data.data); // Use data.data to access the array of characters
      } catch (error) {
        console.error('Error fetching character details:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      {/* Heading for the character detail component */}
      <h2>Character Detail</h2>
      {character ? (
        <div>
          {/* Display character image */}
          <img src={character.imageUrl} alt={character.name} style={{ maxWidth: '100%' }} />
          {/* Display character name */}
          <p>{character.name}</p>
          {/* Display more details about the character */}
          {/* Add more details as needed */}
        </div>
      ) : (
        // Display loading message while fetching data
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CharacterDetail;