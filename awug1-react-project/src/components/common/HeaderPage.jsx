// components/common/Header.jsx
import React from 'react';
import '../../assets/styles/HeaderPage.css'
/**
 * Header component that serves as the top part of the application.
 * Typically contains the title or logo.
 */
const Header = ({ title }) => {
  return (
    <div className="wrapper">
      <h1>{title}</h1>
    </div>
  );
};

export default Header;