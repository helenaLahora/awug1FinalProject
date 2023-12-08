// components/common/Pagination.js
import React from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const renderPaginationLinks = () => {
    const links = [];
    for (let i = 1; i <= totalPages; i++) {
      links.push(
        <span
          key={i}
          style={{
            cursor: 'pointer',
            marginRight: '5px',
            fontWeight: i === currentPage ? 'bold' : 'normal',
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