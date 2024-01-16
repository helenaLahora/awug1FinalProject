// components/common/Footer.jsx
import React from 'react';
import '../../assets/styles/Footer.css';

/**
 * Footer Component
 * 
 * Main Goal/Task: Represents the bottom part of the application, usually containing copyright information or other details.
 * 
 * Component Structure:
 * - Renders a wrapper div with the class "wrapperFooter".
 * - Displays the copyright information inside a paragraph with the class "textFooter".
 */
const Footer = () => {
  return (
    <div className="wrapperFooter">
      {/* Copyright information or other details */}
      <p className="textFooter">&copy; Helena Lahora & Yun Solá :)</p>
    </div>
  );
};

export default Footer;