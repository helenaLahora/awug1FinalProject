// components/common/SearchFilter.jsx
import React, { useState } from 'react';

/**
 * SearchFilter component for ordering the list alphabetically.
 * Contains two buttons: one for A to Z and one for Z to A.
 */
const SearchFilter = ({ onOrderChange }) => {
  const [ascendingOrder, setAscendingOrder] = useState(true);

  // Function to handle button click and toggle order
  const handleOrderToggle = () => {
    setAscendingOrder((prevOrder) => !prevOrder);
    // Notify the parent component about the change in order
    onOrderChange(!ascendingOrder);
  };

  return (
    <div>
      {/* Buttons for ordering */}
      <button onClick={handleOrderToggle}>Order</button>
    </div>
  );
};

export default SearchFilter;