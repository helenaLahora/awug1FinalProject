// Results.jsx
import React, { useState, useEffect } from 'react';
import { useFilter, useSubmittedFilters } from '../filters/FilterContext';
import JsonFile from '../../assets/information.json';
import { useCategory } from '../categories/CategoryContext';
import Card from '../atomic/Card';
import '../../assets/styles/Results.css';
import NoResults from '../atomic/NoResults';

/**
 * Results Component
 * 
 * Main Goal/Task: Displays the results based on the selected category and applied filters.
 * 
 * Component Structure:
 * - Utilizes React hooks for state management (resultArray).
 * - Fetches data from the specified API endpoint based on the categoryIndex.
 * - Applies filters to the fetched data and updates the resultArray accordingly.
 * - Renders a wrapper div with the class "wrapperResults".
 * - Maps through resultArray to render Card components with item details or NoResults component if no items match the criteria.
 * 
 * @returns {JSX.Element} - The Results component.
 */
const Results = () => {
  // Retrieve categoryIndex, filters, and submittedFilters from context
  const { categoryIndex } = useCategory();
  const { filters } = useFilter();
  const submittedFilters = useSubmittedFilters();

  // Placeholder image based on the categoryIndex
  const placeHolder = require(`../../assets/placeholders/${JsonFile.endpoints?.[categoryIndex].placeholder}`);
  
  // State variable to store the fetched and filtered data
  const [resultArray, setResultArray] = useState([]);

  /**
   * Applies filters to the data based on the specified filter criteria.
   * 
   * @param {Array} data - The data array to be filtered.
   * @param {Object} filters - The filter criteria to be applied.
   * @returns {Array} - The filtered data array.
   */
  const applyFilters = (data, filters) => {
    return data.filter((item) => {
      const itemName = item && (item.name || item.title);
      return itemName && itemName.toLowerCase().includes(filters.text.toLowerCase());
    });
  };

  useEffect(() => {
    /**
     * Fetches data from the specified API endpoint based on the categoryIndex,
     * applies filters, and updates the resultArray.
     */
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
  
    // Fetch data on component mount or when categoryIndex, filters, or submittedFilters change
    fetchData();
  }, [categoryIndex, filters, submittedFilters]);

  return (
    <div className="wrapperResults">
      {/* Map through resultArray to render Card components or NoResults component */}
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