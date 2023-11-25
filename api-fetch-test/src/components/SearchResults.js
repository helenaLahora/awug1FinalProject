// src/components/SearchResults.js
import React, { useState, useEffect } from 'react';
import { generateApiUrl } from '../ApiConfig';

function SearchResults({ searchKeyword, onSelect }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(generateApiUrl(`object?q=${searchKeyword}`));
        const data = await response.json();

        setResults(data.records);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };

    if (searchKeyword) {
      fetchSearchResults();
    }
  }, [searchKeyword]);

  return (
    <div>
      <h2>Search Results</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {results.map((result) => (
            <li key={result.id} onClick={() => onSelect(result.id)}>
              {result.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchResults;