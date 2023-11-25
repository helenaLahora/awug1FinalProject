// src/components/PersonList.js
import React, { useState, useEffect } from 'react';
import { generateApiUrl } from '../ApiConfig';

function PersonList() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(generateApiUrl('person', { size: 5, page: 1 }));
        const jsonData = await response.json();
        setPeople(jsonData.records);
      } catch (error) {
        console.error('Error fetching person data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Person List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {people.map((person) => (
            <li key={person.id}>{person.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PersonList;