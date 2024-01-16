// DetailsItems.jsx
import React, { useEffect, useState } from 'react';
import JsonFile from '../../assets/information.json';
import DetailsProperty from './DetailsProperty';
import DetailsRelatedCategory from './DetailsRelatedCategory';
import '../../assets/styles/Details.css';

/**
 * DetailsItems Component
 * 
 * Main Goal/Task: Displays detailed information about a specific item in a selected category.
 * 
 * Component Structure:
 * - Uses React hooks for state management and effect.
 * - Retrieves details data from an API based on the selected category and item ID.
 * - Displays detailed information including title, image, properties, description, and related categories.
 * 
 * @param {string} category - The category of the item.
 * @param {string} itemId - The ID of the item.
 */
const DetailsItems = ({ category, itemId }) => {
  // State variable to store details data
  const [details, setDetails] = useState(null);

  /**
   * useEffect to fetch and update details data when the component mounts or when the category and item ID change.
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Construct the details API URL based on the category and item ID
        const apiUrl = JsonFile.endpoints?.[category].url;
        const detailsUrl = `${apiUrl}/${itemId}`;
        
        // Fetch details data from the API
        const response = await fetch(detailsUrl);
        const data = await response.json();
        
        // Update the details state with the retrieved data
        setDetails(data);
      } catch (error) {
        console.error('Error fetching details data:', error);
      }
    };

    fetchData();
  }, [category, itemId]);

  // Placeholder image for cases where the details image is not available
  const placeHolder = require(`../../assets/placeholders/${JsonFile.endpoints?.[category].placeholder}`);

  // Style for the header background image
  const headerStyle = {
    backgroundImage: `linear-gradient(rgba(226, 224, 201, 0.75), rgba(226, 224, 201, 0.75)), url(${details.movie_banner})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  // Style for the item image
  const imgStyle = {
    backgroundImage: details.image ? `url(${details.image})` : `url(${placeHolder})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div className="DetailsContainer">
      {/* Header section with title and background image */}
      <div className="DetailsHeader" style={headerStyle}>
        {details.title && <h2 className="DetailsTitle">{details.title}</h2>}
        {details.name && <h2 className="DetailsTitle">{details.name}</h2>}
        {details.original_title && <p className="DetailsTitleOriginal">{details.original_title}</p>}
        {details.original_title_romanised && <p className="DetailsTitleRomanised" style={{ marginTop: '0px', marginBottom: '0px' }}>{details.original_title_romanised}</p>}
      </div>

      {/* Main details data section */}
      <div className="DetailsData">
        <div className="DetailsImg" style={imgStyle}></div>
        <div className="DetailsColumn">
          {/* Properties section */}
          <div className="DetailsProperties">
            {Object.entries(details).map(([key, value]) =>
              !['id', 'image', 'name', 'title', 'original_title', 'original_title_romanised', 'movie_banner', 'url', 'description'].includes(
                key
              ) &&
              !Array.isArray(value) ? (
                <DetailsProperty key={key} propertyName={key} propertyData={value} />
              ) : null
            )}
          </div>
          
          {/* Description section */}
          <div className="DetailsDescription">
            {details.description && <p>{details.description}</p>}
          </div>
        </div>
      </div>

      {/* Featured related categories section */}
      <div className="DetailsFeatured">
        {Object.entries(details).map(([key, value]) =>
          Array.isArray(value) ? (
            <DetailsRelatedCategory key={key} category={{ name: key, items: value }} />
          ) : null
        )}
      </div>
    </div>
  );
};

export default DetailsItems;