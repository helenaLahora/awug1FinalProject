import React, { useState, useEffect } from 'react';
import ArrowIcon from '../../assets/icons/Arrow_Default_30.png';
import jsonFile from '../../assets/information.json';

const HeaderCategory = () => {
  // State to manage the current category index
  const [displayedCategory, setCategoryIndex] = useState(0);

  // State to manage the current category information
  const [dataRetrieved, setCurrentCategory] = useState(null);

  useEffect(() => {
    console.log("jsonFile:", jsonFile);
    console.log("displayedCategory:", displayedCategory);

    // Fetch data or perform any necessary initialization
    // You can fetch the data from 'jsonFile' and set it in state
    const fetchData = async () => {
      try {
        const categoryData = jsonFile.endpoints[displayedCategory];
        if (categoryData) {
          setCurrentCategory(categoryData);
          console.log("Category:", displayedCategory);
          console.log("Data from JSON file:", categoryData);
        } else {
          console.error(`Data for category ${displayedCategory} is undefined.`);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };    

    fetchData();
  }, [displayedCategory]);

  // Function to change the displayed category based on direction
  const changeCategory = (direction) => {
    console.log("displayedCategory:", displayedCategory);
    // Implement logic to change category index based on direction
    if (direction === 'previous') {
      setCategoryIndex((prevIndex) => (prevIndex === 0 ? jsonFile.length - 1 : prevIndex - 1));
    } else if (direction === 'next') {
      setCategoryIndex((prevIndex) => (prevIndex === jsonFile.length - 1 ? 0 : prevIndex + 1));
    }
  };

  if (!dataRetrieved) {
    return null; // or a loading state/component if needed
  }

  return (
    // Container with background image
    <div style={{ backgroundImage: `url(${dataRetrieved.banner})`, backgroundSize: 'cover' }}>

      {/* Header content containing arrows and category info */}
      <div className="header-content">

        {/* Left arrow to navigate to the previous category */}
        <div className="arrow" onClick={() => changeCategory('previous')}>
          <ArrowIcon direction="left" />
        </div>

        {/* Category information (icon and title) */}
        <div className="category-info">
          <img src={dataRetrieved.icon} alt={dataRetrieved.title} />
          <h2>{dataRetrieved.title}</h2>
        </div>

        {/* Right arrow to navigate to the next category */}
        <div className="arrow" onClick={() => changeCategory('next')}>
          <ArrowIcon direction="right" />
        </div>
      </div>
    </div>
  );
};

export default HeaderCategory;