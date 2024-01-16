// HomeCategory.jsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Card from '../atomic/Card';
import JsonFile from '../../assets/information.json';
import '../../assets/styles/HomeCategory.css';

/**
 * HomeCategory Component
 * 
 * Main Goal/Task: Represents a category on the home page, displaying a list of cards for items in that category.
 * 
 * Component Structure:
 * - Utilizes React hooks for state management (resultArray).
 * - Fetches data from the specified API endpoint based on the categoryIndex.
 * - Renders a wrapper div with the class "wrapperCategory".
 * - Displays the category title inside an h2 element.
 * - Maps through the resultArray to render Card components with item details.
 * 
 * @param {number} categoryIndex - The index of the category to be displayed.
 */
const HomeCategory = ({ categoryIndex }) => {
  // State variable to store the fetched data
  const [resultArray, setResultArray] = useState([]);

  /**
   * Fetches data from the specified API endpoint based on the categoryIndex.
   */
  const fetchData = useCallback(async () => {
    try {
      const apiUrl = JsonFile.endpoints?.[categoryIndex]?.url;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setResultArray(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [categoryIndex]);

  // Fetch data on component mount or when categoryIndex changes
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Memoized placeholder image based on the categoryIndex
  const placeHolder = useMemo(
    () => require(`../../assets/placeholders/${JsonFile.endpoints?.[categoryIndex]?.placeholder}`),
    [categoryIndex]
  );

  // Memoized category title based on the categoryIndex
  const categoryTitle = useMemo(
    () => `${JsonFile.endpoints?.[categoryIndex]?.title}`,
    [categoryIndex]
  );

  return (
    <div className="wrapperCategory">
      {/* Display the category title inside an h2 element */}
      <h2 className="categoryTitle">{categoryTitle}</h2>
      
      {/* Map through resultArray to render Card components */}
      <div className="cardWrapper">
        {resultArray.length > 0 &&
          resultArray.map((item) => (
            <Card
              key={item.id}
              title={item.title || item.name}
              originalTitle={item.original_title}
              image={item.image || placeHolder}
              id={item.id}
              categoryIndex={categoryIndex}
            />
          ))}
      </div>
    </div>
  );
};

export default HomeCategory;