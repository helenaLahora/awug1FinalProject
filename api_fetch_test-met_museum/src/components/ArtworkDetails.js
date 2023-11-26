// src/components/ArtworkDetails.js
import React from 'react';

const ArtworkDetails = ({ artwork }) => {
  if (!artwork) {
    return null;
  }

  return (
    <div>
      <h2>Artwork Details</h2>
      <p>Title: {artwork.title}</p>
      <p>Artist: {artwork.artistDisplayName}</p>
      <p>Object ID: {artwork.objectID}</p>
      <p>Accession Number: {artwork.accessionNumber}</p>
      <img src={artwork.primaryImage} alt={artwork.title} />
    </div>
  );
};

export default ArtworkDetails;