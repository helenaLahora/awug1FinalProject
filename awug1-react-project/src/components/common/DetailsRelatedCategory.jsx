// DetailsRelatedCategory.jsx
import React from 'react';
import DetailsRelatedCategoryItem from './DetailsRelatedCategoryItem';
import '../../assets/styles/Details.css';

const DetailsRelatedCategory = ({ category }) => {

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
      
  const validItems = category.items.filter((itemUrl) => isValidUrl(itemUrl));

  if (validItems.length === 0) {
    // If there are no valid items, return null to not render anything
    return null;
  }

  // Capitalize the first letter of the category title
  const capitalizedCategoryName = category.name.charAt(0).toUpperCase() + category.name.slice(1);

  return (
    <div className="DetailsFeaturedCategory">
      {validItems.length > 0 && <h3 className="DetailsFeaturedCategoryTitle" >{capitalizedCategoryName}</h3>}
      <div className="DetailsFeaturedCategoryItems">
        {validItems.map((itemUrl, index) => (
          <DetailsRelatedCategoryItem key={index} category={category.name} url={itemUrl} />
        ))}        
      </div>
    </div>
  );
};

export default DetailsRelatedCategory;