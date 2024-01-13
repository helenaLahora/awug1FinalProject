// DetailsRelatedCategoryItem.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JsonFile from '../../assets/information.json';

const DetailsRelatedCategoryItem = ({ category, url }) => {
  const [itemDetails, setItemDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        const data = await response.json();
        setItemDetails(data);
      } catch (error) {
        console.error('Error fetching item details data:', error.message);
      }
    };

    fetchData();
  }, [category, url]);

  // Extract id from the URL
  const id = url.split('/').pop();

  const lowercaseCategory = category.toLowerCase();

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

  const placeHolderPath =
    JsonFile.endpoints[categoryIndex] &&
    JsonFile.endpoints[categoryIndex].placeholder;

  const placeHolder =
    placeHolderPath
      ? require(`../../assets/placeholders/${placeHolderPath}`)
      : null;

  const handleCardClick = () => {
    navigate(`/${id}`, { state: { categoryIndex, itemId: id } });
  };

  return (
    <div onClick={handleCardClick}>
      {itemDetails && itemDetails.id && (
        <div>
          <h4>{itemDetails.title || itemDetails.name}</h4>
          {itemDetails.image ? (
            <img
              src={itemDetails.image}
              alt={itemDetails.title || itemDetails.name}
              style={{ maxWidth: '100%', height: '100px' }}
            />
          ) : placeHolder ? (
            <img src={placeHolder} alt="Placeholder" style={{ maxWidth: '100%', height: '100px', cursor:'pointer'}} />
          ) : null}
        </div>
      )}
    </div>
  );
};

export default DetailsRelatedCategoryItem;