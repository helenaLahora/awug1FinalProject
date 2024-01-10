// Results.jsx
import React, { useState, useEffect } from 'react';
import { useFilter } from './FilterContext';
import JsonFile from '../../assets/information.json';
import { useCategory } from '../common/CategoryContext';
import Card from '../atomic/Card';
import '../../assets/styles/Results.css';
import NoResults from '../atomic/NoResults';

const Results = () => {
  const { categoryIndex } = useCategory();
  const { filters } = useFilter();
  const placeHolder = require(`../../assets/placeholders/${JsonFile.endpoints?.[categoryIndex].placeholder}`);
  const [resultArray, setResultArray] = useState([]);

  // Define the applyFilters function
  const applyFilters = (data, filters) => {
    return data.filter((item) => {
      const itemName = item && (item.name || item.title);
      return itemName && itemName.toLowerCase().includes(filters.text.toLowerCase());
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = JsonFile.endpoints?.[categoryIndex].url;
        const response = await fetch(apiUrl);
        const data = await response.json();
        const filteredData = applyFilters(data, filters);
        setResultArray(filteredData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [categoryIndex, filters]);

  useEffect(() => {
    // Update resultArray when filters change
    const updateFilteredData = () => {
      const filteredData = applyFilters(resultArray, filters);
      setResultArray(filteredData);
    };

    updateFilteredData();
  }, [filters]);

  return (
    <div className="wrapperResults">
      {resultArray.length > 0 ? (
        resultArray.map((item) => (
          <Card key={item.id} title={item.title || item.name} originalTitle={item.original_title} image={item.image || placeHolder} />
        ))
      ) : (
        <NoResults />
      )}
    </div>
  );
};

export default Results;