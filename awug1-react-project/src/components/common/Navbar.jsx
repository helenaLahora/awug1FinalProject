// components/common/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Navbar component for navigation between different views.
 * Uses react-router-dom's Link component for routing.
 */
const Navbar = () => {
  return (
    <div>
      {/* Navigation links */}
      <nav>
        <Link to="/">Home</Link>
        <Link to="/search">Search</Link>
      </nav>
    </div>
  );
};

export default Navbar;