import React, { useState, useEffect } from 'react';
import { useFilter } from './FilterContext';
import JsonFile from '../../assets/information.json';
import { useCategory } from '../common/CategoryContext';

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
    addFilter({ type: 'text', value: inputValue });
    setInputValue('');
  };

  return (
    <div>
      <input
        type="text"
        id={inputProperties.id}
        placeholder={inputProperties.placeholder}
        value={inputValue}
        onChange={handleInputChange}
      />
      <button onClick={handleAddFilter}>Search</button>
    </div>
  );
};

export default FilterMainInput;