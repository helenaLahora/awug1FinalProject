// components/common/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/NavBar.css';

/**
 * Navbar component for navigation between different views.
 * Uses react-router-dom's Link component for routing.
 */
const Navbar = () => {
  return (
    <div className="NavBar">
    <Link to="/" className="Icon"></Link>
      <nav className="Router">
        <Link to="/" className="HomeLink">Home</Link>
        <Link to="/search" className="SearchLink" >Search</Link>
      </nav>
    </div>
  );
};

export default Navbar;