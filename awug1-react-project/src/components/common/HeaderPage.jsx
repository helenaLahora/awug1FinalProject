// components/common/Header.jsx
import React from 'react';
import '../../assets/styles/HeaderPage.css';

/**
 * Header Component
 * 
 * Main Goal/Task: Represents the top part of the application, typically containing the title or logo.
 * 
 * Component Structure:
 * - Renders a wrapper div with the class "wrapper".
 * - Displays the provided title inside an h1 element.
 * 
 * @param {string} title - The title or text to be displayed in the header.
 */
const Header = ({ title }) => {
  return (
    <div className="wrapper">
      {/* Display the title inside an h1 element */}
      <h1>{title}</h1>
    </div>
  );
};

export default Header;