// DetailsItems.jsx
import React, { useEffect, useState } from 'react';
import JsonFile from '../../assets/information.json';
import DetailsProperty from './DetailsProperty';
import DetailsRelatedCategory from './DetailsRelatedCategory';

const DetailsItems = ({ category, itemId }) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = JsonFile.endpoints?.[category].url;
        const detailsUrl = `${apiUrl}/${itemId}`;
        const response = await fetch(detailsUrl);
        const data = await response.json();
        setDetails(data);
      } catch (error) {
        console.error('Error fetching details data:', error);
      }
    };

    fetchData();
  }, [category, itemId]);

  const placeHolder = require(`../../assets/placeholders/${JsonFile.endpoints?.[category].placeholder}`);

  if (!details) {
    return null;
  }

  const headerStyle = {
    background: `url(${details.movie_banner})`,
    backgroundSize: 'cover',
    objectfit: 'contain',
    backgroundPosition: 'center',
    height: '200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    textAlign: 'center',
  };

  const imgStyle = {
    background: details.image ? `url(${details.image})` : `url(${placeHolder}), cover no-repeat`,
    objectFit: 'fill',
    width: '125px',
    height: '215px',
    borderradius: '5px',
    transition: 'transform 0.5s ease-in-out',
    backgroundSize: 'cover no-repeat',
    border: '1px solid #A6A494',
  };

  return (
    <div className="details-container">
      <div className="details-header" style={headerStyle}>
        {details.title && <h2>{details.title}</h2>}
        {details.name && <h2>{details.name}</h2>}
        {details.original_title && <p>{details.original_title}</p>}
        {details.original_title_romanised && <p>{details.original_title_romanised}</p>}        
      </div>
      <div className="details-data">
        <div className="details-img" style={imgStyle}></div>
        <div className="details-description">
            {details.description && <p>{details.description}</p>}
          </div>
        <div className="details-properties">
          {Object.entries(details).map(([key, value]) =>
            !['id', 'image','name', 'title', 'original_title', 'original_title_romanised', 'movie_banner', 'url', 'description'].includes(
              key
            ) &&
            !Array.isArray(value) ? (
              <DetailsProperty key={key} propertyName={key} propertyData={value} />
            ) : null
          )}
        </div>
      </div>
      <div className="details-featured">
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