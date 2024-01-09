import React, { useState } from 'react';
import '../../assets/styles/Cards.css';

const Card = ({ title, image, originalTitle }) => {
  const [isHovered, setHovered] = useState(false);
  const [isActive, setActive] = useState(false);

  const imageStyle = {
    backgroundImage: `linear-gradient(0deg, rgba(226, 224, 201, 0.20) 0%, rgba(226, 224, 201, 0.20) 100%), url(${image})`,
    transform: `scale(${isActive ? 0.9 : isHovered ? 1.1 : 1})`, // Adjust scale on hover and click
    transition: 'transform 0.3s ease-in-out', // Add a smooth transition
  };

  return (
    <div className="Card">
      <div
        className="imageContainer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseDown={() => setActive(true)}
        onMouseUp={() => setActive(false)}
      >
        <div className="imageStyle" style={imageStyle}></div>
      </div>
      <div className="titles">
        <h3 className="title">{title}</h3>
        <h4 className="originalTitle">{originalTitle}</h4>
      </div>
    </div>
  );
};

export default Card;