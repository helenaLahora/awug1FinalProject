// components/characters/CharacterCard.js
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * CharacterCard component representing an individual character card.
 * Displays the character's image, name, and other details.
 * Clicking on the card navigates to the character's detail view.
 */
const CharacterCard = ({ character }) => {
  return (
    <Link to={`/character/${character._id}`}>
      <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', cursor: 'pointer' }}>
        {/* Display character image */}
        <img src={character.imageUrl} alt={character.name} style={{ maxWidth: '100%' }} />
        {/* Display character name */}
        <p>{character.name}</p>
      </div>
    </Link>
  );
};

export default CharacterCard;