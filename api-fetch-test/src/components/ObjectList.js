// src/components/ObjectList.js
import React, { useState, useEffect } from 'react';
import { generateApiUrl } from '../ApiConfig';

function ObjectList() {
  const [objects, setObjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      try {
        // Construct the API endpoint URL
        const url = generateApiUrl('object');
        console.log(url);
  
        const response = await fetch(url);
        const rawData = await response.json();
  
        // Transform the raw rawData into a simplified list
        const cleanData = rawData.records.map((object) => ({
          id: object.id,
          name: object.name,
          temporalOrder: object.temporalOrder,
          objectCount: object.objectCount,
        }));
  
        // Set the object list in the state
        setObjects(cleanData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

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