// Example usage in another component
import React from 'react';
import { useCategory } from '../common/HeaderCategory.jsx';

const AnotherComponent = () => {
  const { categoryIndex } = useCategory();

  // Use categoryIndex as needed
  console.log('Current category index:', categoryIndex);

  return (
    <div><h1>AnotherComponent</h1></div>
  );
};

export default AnotherComponent;