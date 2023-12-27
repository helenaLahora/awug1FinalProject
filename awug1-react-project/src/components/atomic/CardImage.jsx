// ImageCard.js
import React from 'react';

const ImageCard = ({ title, image }) => {
  return (
    <div className="image-card">
      {/* Display the image and title of the element */}
      <img src={image} alt={title} />
      <h3>{title}</h3>
    </div>
  );
};

export default ImageCard;