import React, { useState, useEffect } from 'react';
import JsonFile from '../../assets/information.json';
import arrowIcon from '../../assets/icons/Arrow_Default_30.png';

// Import the CSS styles
import '../../assets/styles/HeaderCategory.css';

// A memoized functional component for the arrow icon
const ArrowIcon = React.memo(({ direction }) => (
  <img
    src={arrowIcon}
    alt={`Arrow ${direction}`}
    style={{
      transform: direction === 'left' ? 'rotate(180deg)' : 'none',  // Rotate the arrow icon if the direction is 'left'
      cursor: 'pointer',  // Set the cursor to a pointer
    }}
  />
));

// The main HeaderCategory functional component
const HeaderCategory = ({ onCategoryChange }) => {
  // State variables to track the displayed category, retrieved data, and the category index
  const [displayedCategory, setCategoryIndex] = useState(0);
  const [dataRetrieved, setCurrentCategory] = useState(null);

  // useEffect hook to fetch data when the component mounts or when the displayed category changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get category data based on the displayed category index
        const categoryData = JsonFile.endpoints?.[displayedCategory];
        if (categoryData) {
          setCurrentCategory(categoryData);  // Set the retrieved data in the state
          if (typeof onCategoryChange === 'function') {
            onCategoryChange(categoryData.index);  // Notify parent about category change
          }
        } else {
          console.error(`Data for category ${displayedCategory} is undefined.`);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [displayedCategory, onCategoryChange]);  // Dependencies for the useEffect hook

  // Function to change the displayed category based on the direction
  const changeCategory = (direction) => {
    setCategoryIndex((prevIndex) => {
      const totalCategories = Object.keys(JsonFile.endpoints).length;
      return direction === 'previous' ? (prevIndex === 0 ? totalCategories - 1 : prevIndex - 1) : (prevIndex === totalCategories - 1 ? 0 : prevIndex + 1);
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
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {/* Left arrow for previous category */}
      <div className="arrow" onClick={() => changeCategory('previous')}>
        <ArrowIcon direction="left" />
      </div>

      {/* Display category information (icon and title) */}
      <div className="category-info">
        <img
          src={require(`../../assets/icons/${dataRetrieved.icon}`)}
          alt={dataRetrieved.title}
        />
        <h2>{dataRetrieved.title}</h2>
      </div>

      {/* Right arrow for next category */}
      <div className="arrow" onClick={() => changeCategory('next')}>
        <ArrowIcon direction="right" />
      </div>
    </div>
  );
};

export default HeaderCategory;  // Exporting the HeaderCategory component