// src/components/ObjectList.js
import React, { useState, useEffect } from 'react';
import { generateApiUrl } from '../ApiConfig';

function ObjectList() {
  const [objects, setObjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(generateApiUrl('object', { size: 5, page: 1 }));
        const jsonData = await response.json();
        setObjects(jsonData.records);
      } catch (error) {
        console.error('Error fetching object data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Object List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {objects.map((object) => (
            <li key={object.id}>{object.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ObjectList;