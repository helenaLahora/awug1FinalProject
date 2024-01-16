// CategoryForm.jsx
import React, { useState, useEffect } from 'react';
import { useCategory } from './CategoryContext';
import '../../assets/styles/CategoryForm.css';
import JsonFile from '../../assets/information.json';
import { ReactComponent as ArrowIcon } from '../../assets/icons/Arrow.svg';
import { useFiltersClean } from '../filters/FilterContext';

/**
 * CategoryForm Component
 * 
 * Main Goal/Task: Displays category information and allows users to navigate between categories.
 * 
 * Component Structure:
 * - Uses React hooks for state management and effect.
 * - Utilizes the CategoryContext for accessing and updating the selected category index.
 * - Retrieves category information from a JSON file.
 * - Cleans filters when the category changes using the useFiltersClean hook.
 * - Displays category information, including title, icon, and banner image.
 * - Allows users to navigate between categories using left and right arrows.
 * 
 * @param {function} onCategoryChange - Callback function for handling category change.
 */
const CategoryForm = ({ onCategoryChange }) => {
  // Access the category context to get and update the category index
  const { categoryIndex, setCategoryIndex } = useCategory();

  // State variable to store retrieved category data
  const [dataRetrieved, setCurrentCategory] = useState(null);

  // Clean filters when the category changes
  useFiltersClean();

  /**
   * useEffect to fetch and update category data when the component mounts or when the category index changes.
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve category data from the JSON file based on the current category index
        const categoryData = JsonFile.endpoints?.[categoryIndex];

        if (categoryData) {
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

  /**
   * Handles category change based on the specified direction (previous or next).
   * Updates the category index and triggers the onCategoryChange callback.
   * 
   * @param {string} direction - The direction of category change (previous or next).
   */
  const changeCategory = (direction) => {
    setCategoryIndex((prevIndex) => {
      const totalCategories = Object.keys(JsonFile.endpoints).length;
      const newIndex =
        direction === 'previous'
          ? prevIndex === 0
            ? totalCategories - 1
            : prevIndex - 1
          : prevIndex === totalCategories - 1
          ? 0
          : prevIndex + 1;
      onCategoryChange(newIndex); // Trigger the callback function with the new category index
      return newIndex;
    });
  };

  // If data has not been retrieved yet, return null
  if (!dataRetrieved) {
    return null;
  }

  // Dynamically import background image and icon based on the retrieved category data
  const backgroundImage = require(`../../assets/categoriesBg/${dataRetrieved.banner}`);

  return (
    <div
      className="Banner"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {/* Left arrow for navigating to the previous category */}
      <div className="Arrow" onClick={() => changeCategory('previous')}>
        <ArrowIcon direction="left" style={{ transform: 'scaleX(-1)' }} />
      </div>

      {/* Category information section */}
      <div className="CategoryInfo">
        <img src={require(`../../assets/icons/${dataRetrieved.icon}`)} alt={dataRetrieved.title} className="Icon" />
        <h2 className="Title">{dataRetrieved.title}</h2>
      </div>

      {/* Right arrow for navigating to the next category */}
      <div className="Arrow" onClick={() => changeCategory('next')}>
        <ArrowIcon direction="right" />
      </div>
    </div>
  );
};

export default CategoryForm;