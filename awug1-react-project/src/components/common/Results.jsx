// Results.jsx
import React, { useState, useEffect } from 'react';
import { useFilter, useSubmittedFilters } from './FilterContext';
import JsonFile from '../../assets/information.json';
import { useCategory } from '../common/CategoryContext';
import Card from '../atomic/Card';
import '../../assets/styles/Results.css';
import NoResults from '../atomic/NoResults';

const Results = () => {
  const { categoryIndex } = useCategory();
  const { filters } = useFilter();
  const submittedFilters = useSubmittedFilters();
  const placeHolder = require(`../../assets/placeholders/${JsonFile.endpoints?.[categoryIndex].placeholder}`);
  const [resultArray, setResultArray] = useState([]);

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
        const appliedFilters = submittedFilters ? filters : { text: '' };
        const filteredData = applyFilters(data, appliedFilters);
        setResultArray(filteredData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [categoryIndex, filters, submittedFilters, resultArray]);

  return (
    <div className="wrapperResults">
      {resultArray.length > 0 ? (
          resultArray.map((item) => (
              <Card
                key={item.id}
                title={item.title || item.name}
                originalTitle={item.original_title}
                image={item.image || placeHolder}
                id={item.id}
                categoryIndex={categoryIndex}
              />
          ))
      ) : (
        <NoResults />
      )}
    </div>
  );
};

export default Results;