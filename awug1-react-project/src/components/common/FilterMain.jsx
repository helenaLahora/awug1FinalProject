// FilterMain.jsx
import React, { useState, useEffect } from 'react';
import JsonFile from '../../assets/information.json';
import { useCategory } from './CategoryContext';
import { useFilter } from './FilterContext';
import '../../assets/styles/FilterMain.css';

const FilterMain = () => {
  const { categoryIndex } = useCategory();
  const { addFilter, submittedFilters } = useFilter();
  const [inputValue, setInputValue] = useState('');
  const [inputProperties, setInputProperties] = useState({
    id: '',
    placeholder: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const selectedProperties = JsonFile.endpoints?.[categoryIndex]?.filters[0]?.inputs[0];

        if (selectedProperties) {
          setInputProperties(selectedProperties);
          setInputValue('');
        }
      } catch (error) {
        console.error('Error fetching input properties:', error);
      }
    };
    fetchData();
  }, [categoryIndex]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    if (!submittedFilters) {
      addFilter({ text: value });
    }
  };

  return (
    <div className="wrapperFilterMain">
      <input
        type="text"
        id={inputProperties.id}
        placeholder={inputProperties.placeholder}
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default FilterMain;