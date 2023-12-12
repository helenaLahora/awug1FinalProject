// components/common/Pagination.js
import React from 'react';

/**
 * Break up large amounts of content into manageable chunks, making it easier for users to navigate and find characters.
 */
const Pagination = ({ info, onPageChange }) => {
  const { totalPages } = info;

  const renderPaginationLinks = () => {
    const links = [];
    for (let i = 1; i <= totalPages; i++) {
      links.push(
        <span
          key={i}
          style={{
            cursor: 'pointer',
            marginRight: '5px',
          }}
          onClick={() => onPageChange(i)}
        >
          {i}
        </span>
      );
    }
    return links;
  };

  return (
    <div style={{ marginTop: '10px' }}>
      <span style={{ marginRight: '5px' }}>Pages:</span>
      {renderPaginationLinks()}
    </div>
  );
};

export default Pagination;