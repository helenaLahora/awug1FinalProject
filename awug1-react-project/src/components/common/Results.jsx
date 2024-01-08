// Results.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { useFilter } from './FilterContext';
import JsonFile from '../../assets/information.json';
import { useCategory } from '../common/CategoryContext';

const ResultComponent = ({ onCategoryChange }) => {
  const { categoryIndex } = useCategory();
  const { filters, addFilter } = useFilter();

  const [resultArray, setResultArray] = useState([]);

  const resetFilters = useCallback(() => {
    addFilter({ text: '' });
  }, [addFilter]);

  // Function to apply filters to the data
  const applyFilters = (data, filters) => {

    // Implement your filter logic here based on the filters array
    const filteredData = data.filter((item) => {
      const itemName = item && (item.name || item.title);
      return itemName && itemName.toLowerCase().includes(filters.text.toLowerCase());
    });

    return filteredData;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        resetFilters(); // Reset filters when category changes

        const apiUrl = JsonFile.endpoints?.[categoryIndex].url;
        const response = await fetch(apiUrl);
        const data = await response.json();

        console.log('Fetched data from API:', data);

        const filteredData = applyFilters(data, filters);
        setResultArray(filteredData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [categoryIndex, filters, resetFilters]);

  return (
    <div>
      {/* Render the results here based on the filtered array */}
      <ul>
        {resultArray.map((item) => (
          <li key={item.id}>{categoryIndex === 0 ? item.title : item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ResultComponent;