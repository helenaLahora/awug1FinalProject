// CategoryForm.jsx

import React, { useState, useEffect } from 'react';
import { useCategory } from './CategoryContext';
import arrowIcon from '../../assets/icons/Arrow_Default_30.png';
import '../../assets/styles/CategoryForm.css';
import JsonFile from '../../assets/information.json';

const ArrowIcon = React.memo(({ direction }) => (
  <img
    src={arrowIcon}
    alt={`Arrow ${direction}`}
    style={{
      transform: direction === 'left' ? 'rotate(180deg)' : 'none',
      cursor: 'pointer',
    }}
  />
));

const CategoryForm = ({ onCategoryChange }) => {
  const { categoryIndex, setCategoryIndex } = useCategory();
  const [dataRetrieved, setCurrentCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryData = JsonFile.endpoints?.[categoryIndex];

        if (categoryData) {
          setCurrentCategory(categoryData);

          if (typeof onCategoryChange === 'function') {
            onCategoryChange(categoryData.index);
          }
        } else {
          console.error(`Data for category ${categoryIndex} is undefined.`);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [categoryIndex, onCategoryChange]);

  const changeCategory = (direction) => {
    setCategoryIndex((prevIndex) => {
      const totalCategories = Object.keys(JsonFile.endpoints).length;
      return direction === 'previous'
        ? prevIndex === 0
          ? totalCategories - 1
          : prevIndex - 1
        : prevIndex === totalCategories - 1
        ? 0
        : prevIndex + 1;
    });
  };

  if (!dataRetrieved) {
    return null;
  }

  const backgroundImage = require(`../../assets/categoriesBg/${dataRetrieved.banner}`);

  return (
    <div
      className="header-content"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="arrow" onClick={() => changeCategory('previous')}>
        <ArrowIcon direction="left" />
      </div>

      <div className="category-info">
        <img src={require(`../../assets/icons/${dataRetrieved.icon}`)} alt={dataRetrieved.title} />
        <h2>{dataRetrieved.title}</h2>
      </div>

      <div className="arrow" onClick={() => changeCategory('next')}>
        <ArrowIcon direction="right" />
      </div>
    </div>
  );
};

export default CategoryForm;