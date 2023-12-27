// Card.js
import React from 'react';

const Card = ({ title }) => {
  return (
    <div className="card">
      {/* Display the title of the element */}
      <h3>{title}</h3>
    </div>
  );
};

export default Card;