// DetailsItems.jsx
import React, { useEffect, useState } from 'react';
import JsonFile from '../../assets/information.json';
import DetailsProperty from './DetailsProperty';
import DetailsRelatedCategory from './DetailsRelatedCategory';
import '../../assets/styles/Details.css';

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
    backgroundImage: `linear-gradient(rgba(226, 224, 201, 0.75), rgba(226, 224, 201, 0.75)), url(${details.movie_banner})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };
  
  const imgStyle = {
    backgroundImage: details.image ? `url(${details.image})` : `url(${placeHolder})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };
  

  return (
    <div className="DetailsContainer">
      <div className="DetailsHeader" style={headerStyle}>
        {details.title && <h2 className="DetailsTitle">{details.title}</h2>}
        {details.name && <h2 className="DetailsTitle" >{details.name}</h2>}
        {details.original_title && <p className="DetailsTitleOriginal">{details.original_title}</p>}
        {details.original_title_romanised && <p className="DetailsTitleRomanised" style={{ marginTop: '0px', marginBottom: '0px' }}>{details.original_title_romanised}</p>}

      </div>
      <div className="DetailsData">
        <div className="DetailsImg" style={imgStyle}></div>
        <div className="DetailsColumn">
            <div className="DetailsProperties">
              {Object.entries(details).map(([key, value]) =>
                !['id', 'image','name', 'title', 'original_title', 'original_title_romanised', 'movie_banner', 'url', 'description'].includes(
                  key
                ) &&
                !Array.isArray(value) ? (
                  <DetailsProperty key={key} propertyName={key} propertyData={value} />
                ) : null
              )}
            </div>
            <div className="DetailsDescription">
                {details.description && <p>{details.description}</p>}
            </div>
        </div>
      </div>
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