// CategoryForm.jsx
import React, { useState, useEffect } from 'react';
import { useCategory } from './CategoryContext';
import '../../assets/styles/CategoryForm.css';
import JsonFile from '../../assets/information.json';
import { ReactComponent as ArrowIcon } from '../../assets/icons/Arrow.svg';
import { useFiltersClean } from './FilterContext';

const CategoryForm = ({ onCategoryChange }) => {
  const { categoryIndex, setCategoryIndex } = useCategory();
  const [dataRetrieved, setCurrentCategory] = useState(null);

  useFiltersClean(); // Clean filters when the category changes

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryData = JsonFile.endpoints?.[categoryIndex];

        if (categoryData) {
          setCurrentCategory(categoryData);
        } else {
          console.error(`Data for category ${categoryIndex} is undefined.`);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [categoryIndex]);

  const changeCategory = (direction) => {
    setCategoryIndex((prevIndex) => {
      const totalCategories = Object.keys(JsonFile.endpoints).length;
      const newIndex =
        direction === 'previous'
          ? prevIndex === 0
            ? totalCategories - 1
            : prevIndex - 1
          : prevIndex === totalCategories - 1
          ? 0
          : prevIndex + 1;

      console.log('New category index:', newIndex);
      return newIndex;
    });
  };

  if (!dataRetrieved) {
    console.log('Data not retrieved yet.');
    return null;
  }

  const backgroundImage = require(`../../assets/categoriesBg/${dataRetrieved.banner}`);

  console.log('Rendering CategoryForm:', dataRetrieved);

  return (
    <div
      className="Banner"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="Arrow" onClick={() => changeCategory('previous')}>
        <ArrowIcon direction="left" style={{ transform: 'scaleX(-1)' }} />
      </div>

      <div className="CategoryInfo">
        <img src={require(`../../assets/icons/${dataRetrieved.icon}`)} alt={dataRetrieved.title} className="Icon" />
        <h2 className="Title">{dataRetrieved.title}</h2>
      </div>

      <div className="Arrow" onClick={() => changeCategory('next')}>
        <ArrowIcon direction="right" />
      </div>
    </div>
  );
};

export default CategoryForm;