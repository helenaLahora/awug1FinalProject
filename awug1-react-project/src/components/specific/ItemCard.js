// components/specific/ItemCard.js
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * ItemCard component representing an individual film card.
 * Displays the film's image, title, and other details.
 * Clicking on the card navigates to the film's detail view.
 */
const ItemCard = ({ film }) => {
  return (
    // Use the Link component to navigate to the film detail page
    <Link to={`/detail/${film.id}`}>
      <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', cursor: 'pointer' }}>
        {/* Display film image */}
        {film.image ? (
          <img src={film.image} alt={film.title} style={{ maxWidth: '50px' }} />
        ) : (
          <p>No Image Available</p>
        )}
        {/* Display film title */}
        <p>{film.title}</p>
      </div>
    </Link>
  );
};

export default ItemCard;