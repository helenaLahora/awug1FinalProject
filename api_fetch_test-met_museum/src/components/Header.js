// src/components/Header.js
import React from 'react';

const Header = () => {
  const headerStyle = {
    textAlign: 'center',
    padding: '20px',
    background: '#333',
    color: '#fff',
  };

  const imageStyle = {
    maxWidth: '5%',
    height: 'auto',
  };

  return (
    <div style={headerStyle}>
        <h1>Metropolitan Museum of Art</h1>
      <img
        src="https://static01.nyt.com/images/2016/02/20/arts/20BREUER/20BREUER-superJumbo-v3.jpg"
        alt="Metropolitan Museum of Art"
        style={imageStyle}
      />
    </div>
  );
};

export default Header;