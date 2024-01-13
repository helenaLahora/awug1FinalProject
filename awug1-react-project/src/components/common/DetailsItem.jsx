// DetailsItems.jsx
import React, { useEffect, useState } from 'react';
import JsonFile from '../../assets/information.json';

const DetailsItems = ({ category, itemId }) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = JsonFile.endpoints?.[category].url;
        const detailsUrl = `${apiUrl}/${itemId}`;
        const response = await fetch(detailsUrl);
        const data = await response.json();
        setDetails(data);
      } catch (error) {
        console.error('Error fetching details data:', error);
      }
    };

    fetchData();
  }, [category, itemId]);

  // Render null if details is still being fetched
  if (!details) {
    return null;
  }

  return (
    <div>
      <h2>{details.title}</h2>
      <img src={details.image} alt={details.title} />
      <p>Description: {details.description}</p>
      <p>Director: {details.director}</p>
      <p>Producer: {details.producer}</p>
      <p>Release Date: {details.release_date}</p>
      <p>Running Time: {details.running_time} minutes</p>
      <p>Rotten Tomatoes Score: {details.rt_score}</p>

      {/* Additional details rendering based on the provided JSON structure */}
      <h3>People:</h3>
      <ul>
        {details.people.map((person, index) => (
          <li key={index}>{person}</li>
        ))}
      </ul>

      <h3>Species:</h3>
      <ul>
        {details.species.map((specie, index) => (
          <li key={index}>{specie}</li>
        ))}
      </ul>

      {/* You can similarly render other details like locations and vehicles */}
      <p>URL: {details.url}</p>
    </div>
  );
};

export default DetailsItems;