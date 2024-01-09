// Results.jsx

import React, { useState, useEffect } from 'react';
import { useFilter } from './FilterContext';
import JsonFile from '../../assets/information.json';
import { useCategory } from '../common/CategoryContext';
import Card from '../atomic/Card';
import '../../assets/styles/Results.css'

const Results = ({ onCategoryChange }) => {
  const { categoryIndex } = useCategory();
  const { filters } = useFilter();
  const [resultArray, setResultArray] = useState([]);
  const placeHolder = require(`../../assets/placeholders/${JsonFile.endpoints?.[categoryIndex].placeholder}`)
  console.log(placeHolder);

  // Function to apply filters to the data
  const applyFilters = (data, filters) => {
    const filteredData = data.filter((item) => {
      const itemName = item && (item.name || item.title);
      return itemName && itemName.toLowerCase().includes(filters.text.toLowerCase());
    });

    return filteredData;
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

  return (
    <div className="wrapper">
        {resultArray.map((item) => (
        <Card key={item.id} title={item.title || item.name} originalTitle={item.original_title} image={item.image || placeHolder} />
        ))}
    </div>
  );
};

export default Results;