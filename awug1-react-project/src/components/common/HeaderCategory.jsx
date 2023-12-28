// HeaderCategory.jsx
import React, { useState, useEffect } from 'react';
import { useCategory } from '../common/CategoryContext'; // Importing the custom hook for category context
import arrowIcon from '../../assets/icons/Arrow_Default_30.png';
import '../../assets/styles/HeaderCategory.css'; // Importing the CSS styles
import JsonFile from '../../assets/information.json';

// A memoized functional component for the arrow icon
const ArrowIcon = React.memo(({ direction }) => (
  <img
    src={arrowIcon}
    alt={`Arrow ${direction}`}
    style={{
      // Rotate the arrow icon if the direction is 'left', set the cursor to a pointer
      transform: direction === 'left' ? 'rotate(180deg)' : 'none',
      cursor: 'pointer',
    }}
  />
));

// The main HeaderCategory functional component
const HeaderCategory = ({ onCategoryChange }) => {
  // Using the custom hook to access the category index and a function to set it
  const { categoryIndex, setCategoryIndex } = useCategory();
  // State to store the retrieved category data
  const [dataRetrieved, setCurrentCategory] = useState(null);

  // useEffect hook to fetch data when the component mounts or when the displayed category changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve category data based on the current category index
        const categoryData = JsonFile.endpoints?.[categoryIndex];

        if (categoryData) {
          // Update state with the retrieved category data
          setCurrentCategory(categoryData);
          // Notify parent component about the category change, if a callback function is provided
          if (typeof onCategoryChange === 'function') {
            onCategoryChange(categoryData.index);
          }
        } else {
          // Log an error if the data for the current category index is undefined
          console.error(`Data for category ${categoryIndex} is undefined.`);
        }
      } catch (error) {
        // Log an error if there's an issue fetching data
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function
    fetchData();

    // The useEffect dependency array, including categoryIndex and onCategoryChange
  }, [categoryIndex, onCategoryChange]);

  // Function to change the displayed category based on the specified direction
  const changeCategory = (direction) => {
    setCategoryIndex((prevIndex) => {
      // Calculate the new category index based on the direction
      const totalCategories = Object.keys(JsonFile.endpoints).length;
      return direction === 'previous'
        ? prevIndex === 0
          ? totalCategories - 1
          : prevIndex - 1
        : prevIndex === totalCategories - 1
        ? 0
        : prevIndex + 1;
    });
  };

  // If data is not yet retrieved, return null (or loading state/component if needed)
  if (!dataRetrieved) {
    return null;
  }

  // Get the background image for the category based on the retrieved data
  const backgroundImage = require(`../../assets/categoriesBg/${dataRetrieved.banner}`);

  // Render the header category component with background, arrows, and category information
  return (
    <div
      className="header-content"
      style={{
        // Set the background image dynamically based on the retrieved data
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {/* Left arrow for navigating to the previous category */}
      <div className="arrow" onClick={() => changeCategory('previous')}>
        <ArrowIcon direction="left" />
      </div>

      {/* Display category information (icon and title) */}
      <div className="category-info">
        {/* Retrieve and display the category icon */}
        <img
          src={require(`../../assets/icons/${dataRetrieved.icon}`)}
          alt={dataRetrieved.title}
        />
        {/* Display the category title */}
        <h2>{dataRetrieved.title}</h2>
      </div>

      {/* Right arrow for navigating to the next category */}
      <div className="arrow" onClick={() => changeCategory('next')}>
        <ArrowIcon direction="right" />
      </div>
    </div>
  );
};

// Export the HeaderCategory component
export default HeaderCategory;