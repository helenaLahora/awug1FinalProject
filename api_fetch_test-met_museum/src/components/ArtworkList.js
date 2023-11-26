// src/components/ArtworkList.js
import React from 'react';

const ArtworkList = ({ artworks, onArtworkClick }) => {
  return (
    <div>
      <h2>Artworks</h2>
      <ul>
        {artworks.map((artwork) => (
          <li key={artwork.objectID} onClick={() => onArtworkClick(artwork)}>
            <img src={artwork.primaryImageSmall} alt={artwork.title} />
            <p>{artwork.title}</p>
            <p>Artist: {artwork.artistDisplayName}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArtworkList;