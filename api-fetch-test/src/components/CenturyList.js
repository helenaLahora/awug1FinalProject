// src/components/CenturyList.js
import React, { useState, useEffect } from 'react';
import { generateApiUrl } from '../ApiConfig';

function CenturyList() {
  const [centuries, setCenturies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Construct the API endpoint URL
      const url = generateApiUrl('century');
      console.log(url);

      const response = await fetch(url);
      const rawData = await response.json();

      // Transform the raw rawData into a simplified list
      const cleanData = rawData.records.map((century) => ({
        id: century.id,
        name: century.name,
        temporalOrder: century.temporalOrder,
        objectCount: century.objectCount,
      }));

      // Set the century list in the state
      setCenturies(cleanData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Century List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {centuries.map((century) => (
            <li key={century.id}>{century.name} {century.objectCount}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CenturyList;
