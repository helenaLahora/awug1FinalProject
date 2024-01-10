// CategoryForm.jsx

import React, { useState, useEffect } from 'react';
import { useCategory } from './CategoryContext';
import '../../assets/styles/CategoryForm.css';
import JsonFile from '../../assets/information.json';
import { useFilter } from './FilterContext';
import { ReactComponent as ArrowIcon } from "../../assets/icons/Arrow.svg";
import { useFiltersClean } from './FilterContext';

// Custom Hook for executing effects when category changes
const useCategoryChangeEffect = (onCategoryChange) => {
  useEffect(() => {
    // Execute onCategoryChange function when the category changes
    if (typeof onCategoryChange === 'function') {
      onCategoryChange();
    }
  }, [onCategoryChange]);
};

const CategoryForm = ({ onCategoryChange }) => {
  // Get category index and function to set category index from context
  const { categoryIndex, setCategoryIndex } = useCategory();
  // Get addFilter function from filter context
  const { addFilter } = useFilter();
  // State to store data retrieved for the current category
  const [dataRetrieved, setCurrentCategory] = useState(null);

  // Custom Hook to execute effects when category changes
  useCategoryChangeEffect(onCategoryChange);

  // Fetch data for the current category when the component mounts or category changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve data for the current category index
        const categoryData = JsonFile.endpoints?.[categoryIndex];

        if (categoryData) {
          // Update state with the retrieved category data
          setCurrentCategory(categoryData);
        } else {
          console.error(`Data for category ${categoryIndex} is undefined.`);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [categoryIndex]);

  // Function to change the category index based on the specified direction
  const changeCategory = (direction) => {
    setCategoryIndex((prevIndex) => {
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

  // Use the useFiltersClean directly when the category changes for automatic cleanup
  useFiltersClean();

  // If data for the current category is not yet retrieved, return null
  if (!dataRetrieved) {
    return null;
  }

  // Dynamically load the background image for the banner based on the category data
  const backgroundImage = require(`../../assets/categoriesBg/${dataRetrieved.banner}`);

  // Render the category form
  return (
    <div
      className="Banner"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {/* Previous category arrow button */}
      <div className="Arrow" onClick={() => changeCategory('previous')}>
        <ArrowIcon direction="left" style={{ transform: 'scaleX(-1)' }}/>
      </div>

      {/* Category information */}
      <div className="CategoryInfo">
        <img src={require(`../../assets/icons/${dataRetrieved.icon}`)} alt={dataRetrieved.title} className="Icon" />
        <h2 className="Title">{dataRetrieved.title}</h2>
      </div>

      {/* Next category arrow button */}
      <div className="Arrow" onClick={() => changeCategory('next')}>
        <ArrowIcon direction="right" />
      </div>
    </div>
  );
};

export default CategoryForm;