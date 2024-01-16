// DetailsRelatedCategory.jsx
import React from 'react';
import DetailsRelatedCategoryItem from './DetailsRelatedCategoryItem';
import '../../assets/styles/Details.css';

/**
 * DetailsRelatedCategory Component
 * 
 * Main Goal/Task: Displays related items from a specific category.
 * 
 * Component Structure:
 * - Filters and displays only valid item URLs based on a predefined list of valid base URLs.
 * - Capitalizes the first letter of the category title.
 * - Renders the related category title and a list of related items using DetailsRelatedCategoryItem.
 * 
 * @param {Object} category - The related category object containing name and items.
 */
const DetailsRelatedCategory = ({ category }) => {

  /**
   * Checks if a given URL is valid based on a predefined list of valid base URLs.
   * 
   * @param {string} url - The URL to check for validity.
   * @returns {boolean} - True if the URL is valid, otherwise false.
   */
  const isValidUrl = (url) => {
    // List of valid base URLs
    const validBaseUrls = [
      'https://ghibliapi.dev/films',
      'https://ghibliapi.dev/people',
      'https://ghibliapi.dev/locations',
      'https://ghibliapi.dev/species',
      'https://ghibliapi.dev/vehicles',
    ];

    // Check if the URL's base part is in the valid base URLs
    const isValidBase = validBaseUrls.some(validBaseUrl => url.startsWith(validBaseUrl));

    // Check if the URL has an ID after the last /
    const parts = url.split('/');
    const hasId = isValidBase && parts.length > 1 && parts[parts.length - 1].trim() !== '';

    return isValidBase && hasId;
  };

  // Filter valid items based on URL validity
  const validItems = category.items.filter((itemUrl) => isValidUrl(itemUrl));

  // If there are no valid items, return null to not render anything
  if (validItems.length === 0) {
    return null;
  }

  // Capitalize the first letter of the category title
  const capitalizedCategoryName = category.name.charAt(0).toUpperCase() + category.name.slice(1);

  return (
    <div className="DetailsFeaturedCategory">
      {/* Render the related category title if there are valid items */}
      {validItems.length > 0 && <h3 className="DetailsFeaturedCategoryTitle">{capitalizedCategoryName}</h3>}
      
      {/* Render the list of related items using DetailsRelatedCategoryItem */}
      <div className="DetailsFeaturedCategoryItems">
        {validItems.map((itemUrl, index) => (
          <DetailsRelatedCategoryItem key={index} category={category.name} url={itemUrl} />
        ))}        
      </div>
      </div>
  );
};

export default DetailsRelatedCategory;