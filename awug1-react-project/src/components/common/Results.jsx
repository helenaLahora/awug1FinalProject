import React, { useState, useEffect } from 'react';
import { useFilter } from './FilterContext';
import JsonFile from '../../assets/information.json';
import { useCategory } from '../common/CategoryContext';

const ResultComponent = () => {
  const { categoryIndex } = useCategory();
  const { filters } = useFilter();

  const [resultArray, setResultArray] = useState([]);
  const [filtersAltered, setFiltersAltered] = useState(false);

  // Function to apply filters to the data
  const applyFilters = (data, filters) => {
    console.log('Original data:', data);

    // Implement your filter logic here based on the filters array
    const filteredData = data.filter((item) => {
      const itemName = item && (item.name || item.title);
      return itemName && itemName.toLowerCase().includes(filters.text.toLowerCase());
    });

    console.log('Filtered data:', filteredData);

    return filteredData;
  };

  useEffect(() => {
    // Function to fetch data when component mounts or when categoryIndex changes
    const fetchData = async () => {
      try {
        const apiUrl = JsonFile.endpoints?.[categoryIndex].url;
        const response = await fetch(apiUrl);
        const data = await response.json();

        console.log('Fetched data from API:', data);

        // Reset filters when category changes
        // Note: Manually reset the filters to their initial state
        // You may need to modify this part based on the structure of your filters
        const initialFilters = {
          text: '',
          // Add other filter properties here if needed
        };

        // eslint-disable-next-line no-unused-vars
        const unusedVariable = initialFilters; // Ignore the eslint warning

        // Reset result array to the original data fetched from the API
        setResultArray(data);

        // Apply filters to the data only when filters are altered
        if (filtersAltered) {
          const filteredData = applyFilters(data, filters);
          setResultArray(filteredData);
          setFiltersAltered(false); // Reset the flag after applying filters
        } else {
          setResultArray(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Invoke the fetchData function when the component mounts, when categoryIndex changes, or when filters change
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryIndex, filters, filtersAltered]); // Include filtersAltered in the dependency array

  // useEffect to fetch data when filters change
  useEffect(() => {
    setFiltersAltered(true); // Set the flag when filters change
  }, [filters]);

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