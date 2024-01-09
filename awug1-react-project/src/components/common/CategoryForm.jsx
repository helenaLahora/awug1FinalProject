// CategoryForm.jsx

import React, { useState, useEffect } from 'react';
import { useCategory } from './CategoryContext';
import arrowIcon from '../../assets/icons/Arrow.svg';
import '../../assets/styles/CategoryForm.css';
import JsonFile from '../../assets/information.json';
import { useFilter } from './FilterContext';

const ArrowIcon = React.memo(({ direction }) => (
  <img
    src={arrowIcon}
    alt={`Arrow ${direction}`}
    style={{
      transform: direction === 'left' ? 'rotate(180deg)' : 'none',
    }}
  />
));

const CategoryForm = ({ onCategoryChange }) => {
  const { categoryIndex, setCategoryIndex } = useCategory();
  const { addFilter } = useFilter();
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
    addFilter({text: ''});
  };

  if (!dataRetrieved) {
    return null;
  }

  const backgroundImage = require(`../../assets/categoriesBg/${dataRetrieved.banner}`);

  return (
    <div
      className="Banner"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="arrow" onClick={() => changeCategory('previous')}>
        <ArrowIcon direction="left" />
      </div>

      <div className="CategoryInfo">
        <img src={require(`../../assets/icons/${dataRetrieved.icon}`)} alt={dataRetrieved.title} className="Icon"/>
        <h2 className="Title">{dataRetrieved.title}</h2>
      </div>

      <div className="Arrow" onClick={() => changeCategory('next')}>
        <ArrowIcon direction="right" />
      </div>
    </div>
  );
};

export default CategoryForm;