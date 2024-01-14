// DetailsProperty.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import JsonFile from '../../assets/information.json';
import '../../assets/styles/Details.css';

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

  const handleItemcClick = () => {
    navigate(`/${id}`, { state: { categoryIndex, itemId: id } });
  };

  return (
    <div onClick={handleItemcClick}>
      {itemDetails && itemDetails.id && (
        <div className="DetailsFeaturedCategoryItem">
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
            alt="Placeholder"/>
          ) : null}

          <h4 className="DetailsFeaturedCategoryItemTitle" style={{ marginTop: '0px', marginBottom: '0px' }} >{itemDetails.title || itemDetails.name}</h4>
        </div>
      )}
    </div>
  );
};

export default DetailsRelatedCategoryItem;