import React, { useState } from 'react';
import '../../assets/styles/Card.css';

const Card = ({ title, image, originalTitle }) => {
  const [, setHovered] = useState(false);
  const [, setActive] = useState(false);

  return (
    <div className="card">
      <div
        className="imageContainer"
        style={{ backgroundImage: `linear-gradient(0deg, rgba(226, 224, 201, 0.20) 0%, rgba(226, 224, 201, 0.20) 100%), url(${image})` }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseDown={() => setActive(true)}
        onMouseUp={() => setActive(false)}
      >
      </div>
      <h3 className="title">{title}</h3>
      <h4 className="originalTitle">{originalTitle}</h4>
    </div>
  );
};

export default Card;