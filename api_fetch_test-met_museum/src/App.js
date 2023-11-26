// src/App.js
import React, { useState, useEffect } from 'react';
import ArtworkList from './components/ArtworkList';
import SearchForm from './components/SearchForm';
import ArtworkDetails from './components/ArtworkDetails';

const App = () => {
  const [artworks, setArtworks] = useState([]);
  const [totalArtworks, setTotalArtworks] = useState(0);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchArtworks = async (searchTerm = 'art') => {
    try {
      const response = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${searchTerm}`
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      // Log the entire response to the console
      console.log('API Response:', response);

      // Log the JSON data to the console
      console.log('Fetched Artworks Data:', data);

      // Set the artworks in state
      setArtworks(data.objectIDs || []); // Set to an empty array if objectIDs is null
      setTotalArtworks(data.total || 0);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching artworks:', error);
      setLoading(false);
    }
  };

  const fetchArtworkDetails = async (objectID) => {
    try {
      const response = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setSelectedArtwork(data);
    } catch (error) {
      console.error('Error fetching artwork details:', error);
    }
  };

  const handleArtworkClick = (artwork) => {
    fetchArtworkDetails(artwork);
  };

  useEffect(() => {
    // Fetch the initial artworks with the default search term
    fetchArtworks();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div>
      <h1>Metropolitan Museum of Art Collection</h1>
      <p>Total Artworks: {totalArtworks}</p>
      <SearchForm onSearch={fetchArtworks} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ArtworkList artworks={artworks} onArtworkClick={handleArtworkClick} />
      )}
      <ArtworkDetails artwork={selectedArtwork} />
    </div>
  );
};

export default App;