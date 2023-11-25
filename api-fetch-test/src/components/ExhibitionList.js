// src/components/ExhibitionList.js
import React, { useState, useEffect } from 'react';
import { generateApiUrl } from '../ApiConfig';

function ExhibitionList() {
  const [exhibitions, setExhibitions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(generateApiUrl('exhibition', { size: 5, page: 1 }));
        const jsonData = await response.json();
        setExhibitions(jsonData.records);
      } catch (error) {
        console.error('Error fetching exhibition data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Exhibition List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {exhibitions.map((exhibition) => (
            <li key={exhibition.id}>{exhibition.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ExhibitionList;