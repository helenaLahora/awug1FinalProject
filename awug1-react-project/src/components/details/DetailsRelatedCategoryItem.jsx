// DetailsRelatedCategoryItem.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import JsonFile from '../../assets/information.json';
import '../../assets/styles/Details.css';

/**
 * DetailsRelatedCategoryItem Component
 * 
 * Main Goal/Task: Displays a single item from a related category with its image and title.
 * 
 * Component Structure:
 * - Uses React hooks for state management and effect.
 * - Fetches and displays details data for a related category item.
 * - Navigates to the details page of the clicked item.
 * 
 * @param {string} category - The category of the related item.
 * @param {string} url - The URL of the related item.
 */
const DetailsRelatedCategoryItem = ({ category, url }) => {
  // State variable to store details data for the related item
  const [itemDetails, setItemDetails] = useState(null);

  // React Router's navigate function to redirect to the details page
  const navigate = useNavigate();

  /**
   * useEffect to fetch and update details data when the component mounts or when the URL changes.
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch details data for the related item from the provided URL
        const response = await fetch(url);

        // Check if the response is successful
        if (!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        // Parse the JSON data from the response
        const data = await response.json();

        // Update the state with the retrieved details data
        setItemDetails(data);
      } catch (error) {
        console.error('Error fetching item details data:', error.message);
      }
    };

    // Fetch data when the component mounts or the URL changes
    fetchData();
  }, [category, url]);

  // Extract the ID from the URL
  const id = url.split('/').pop();

  // Convert the category name to lowercase for indexing in the JSON file
  const lowercaseCategory = category.toLowerCase();

  // Determine the category index based on the lowercase category name
  const categoryIndex =
    lowercaseCategory === 'films'
      ? 0
      : lowercaseCategory === 'people'
      ? 1
      : lowercaseCategory === 'locations'
      ? 2
      : lowercaseCategory === 'species'
      ? 3
      : lowercaseCategory === 'vehicles'
      ? 4
      : 0;

  // Get the placeholder path from the JSON file based on the category index
  const placeHolderPath =
    JsonFile.endpoints[categoryIndex] &&
    JsonFile.endpoints[categoryIndex].placeholder;

  // Create a placeholder image path
  const placeHolder =
    placeHolderPath
      ? require(`../../assets/placeholders/${placeHolderPath}`)
      : null;

  /**
   * Handle the click event on the related item, navigate to the details page with the item ID and category index.
   */
  const handleItemcClick = () => {
    navigate(`/${id}`, { state: { categoryIndex, itemId: id } });
  };

  return (
    <div onClick={handleItemcClick}>
      {/* Render the related item details if available */}
      {itemDetails && itemDetails.id && (
        <div className="DetailsFeaturedCategoryItem">
          {/* Render the item image if available, otherwise render a placeholder */}
          {itemDetails.image ? (
            <img
              className="DetailsFeaturedCategoryItemImage"
              src={itemDetails.image}
              alt={itemDetails.title || itemDetails.name}
            />
          ) : placeHolder ? (
            <img
              className="DetailsFeaturedCategoryItemImage"
              src={placeHolder}
              alt="Placeholder"
            />
          ) : null}

          {/* Render the item title */}
          <h4 className="DetailsFeaturedCategoryItemTitle" style={{ marginTop: '0px', marginBottom: '0px' }}>
            {itemDetails.title || itemDetails.name}
          </h4>
        </div>
      )}
    </div>
  );
};

export default DetailsRelatedCategoryItem;