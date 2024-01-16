// Card.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/Card.css';

/**
 * Card Component
 * 
 * Main Goal/Task: Represents a card with information and handles navigation on click.
 * 
 * Component Structure:
 * - Uses React hooks for state management.
 * - Utilizes the react-router-dom library for navigation.
 * - Receives props: title, image, originalTitle, id, categoryIndex.
 * - Renders a card with title, image, and originalTitle, and navigates to a detailed view on click.
 * - Styles are defined in the associated CSS file.
 * 
 * @param {string} title - The title of the card.
 * @param {string} image - URL for the image displayed on the card.
 * @param {string} originalTitle - The original title of the content.
 * @param {string} id - Unique identifier for the card.
 * @param {number} categoryIndex - Index of the category to which the card belongs.
 */
const Card = ({ title, image, originalTitle, id, categoryIndex }) => {
  // State variables for handling hover and active states
  const [, setHovered] = useState(false);
  const [, setActive] = useState(false);

  // Navigation hook for programmatic navigation
  const navigate = useNavigate();

  /**
   * Handles card click event.
   * Navigates to a detailed view with categoryIndex and itemId.
   */
  const handleCardClick = () => {
    navigate(`/${id}`, { state: { categoryIndex, itemId: id } });
  };

  return (
    <div
      className="card"
      onClick={handleCardClick}
    >
      <div
        className="imageContainer"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(226, 224, 201, 0.20) 0%, rgba(226, 224, 201, 0.20) 100%), url(${image})`,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseDown={() => setActive(true)}
        onMouseUp={() => setActive(false)}
      ></div>
      <h3 className="title">{title}</h3>
      <h4 className="originalTitle">{originalTitle}</h4>
    </div>
  );
};

export default Card;