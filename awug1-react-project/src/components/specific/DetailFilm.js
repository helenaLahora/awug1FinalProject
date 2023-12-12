// components/specific/FilmDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

/**
 * Displays detailed information about a specific Disney Film.
 * Fetches data for the selected Film and renders the details.
 */
const FilmDetail = () => {
  // Get the Film ID from the route parameters
  const { id } = useParams();
  // State to store the details of the selected Film
  const [Film, setFilm] = useState(null);

  useEffect(() => {
    // Fetch data for the specific Film when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.disneyapi.dev/Film/${id}`);
        const data = await response.json();
        setFilm(data.data); // Use data.data to access the array of Films
      } catch (error) {
        console.error('Error fetching Film details:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      {/* Heading for the Film detail component */}
      <h2>Film Detail</h2>
      {Film ? (
        <div>
          {/* Display Film image */}
          <img src={Film.imageUrl} alt={Film.name} style={{ maxWidth: '100%' }} />
          {/* Display Film name */}
          <p>{Film.name}</p>
          {/* Display more details about the Film */}
          {/* Add more details as needed */}
        </div>
      ) : (
        // Display loading message while fetching data
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FilmDetail;