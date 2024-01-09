// FilterMainInput.jsx
import React, { useState, useEffect } from 'react';
import { useFilter } from './FilterContext';
import JsonFile from '../../assets/information.json';
import { useCategory } from './CategoryContext';
import '../../assets/styles/FilterMain.css';
import FilterClean from '../common/FilterClean';

const FilterMainInput = () => {
  const { addFilter } = useFilter();
  const { categoryIndex } = useCategory();
  const [inputValue, setInputValue] = useState('');
  const [inputProperties, setInputProperties] = useState({
    id: '',
    placeholder: '',
    value: '',
    onChange: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const selectedProperties = JsonFile.endpoints?.[categoryIndex].filters[0].inputs[0];

        setInputProperties(selectedProperties);
      } catch (error) {
        console.error('Error fetching input properties:', error);
      }
    };
    fetchData();
  }, [categoryIndex]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddFilter = () => {
    // Set the 'text' property in the addFilter function
    addFilter({ type: 'text', text: inputValue });
    setInputValue('');
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
      <button onClick={handleAddFilter} className="Submit"></button>
      <FilterClean></FilterClean>
    </div>
  );
};

export default FilterMainInput;