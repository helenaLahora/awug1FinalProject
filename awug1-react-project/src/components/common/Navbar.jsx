// components/common/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/NavBar.css';
import { ReactComponent as SearchIcon } from '../../assets/icons/Search.svg'; 
import { ReactComponent as HomeIcon } from '../../assets/icons/Home.svg'; 
import { ReactComponent as Ghibli } from '../../assets/logo/GhibliLogo.svg';

/**
 * Navbar Component
 * 
 * Main Goal/Task: Provides navigation between different views using react-router-dom's Link component.
 * 
 * Component Structure:
 * - Renders a wrapper div with the class "NavBar".
 * - Displays the Ghibli logo as a Link to the home view.
 * - Uses react-router-dom's Link component for routing to the home and search views.
 * 
 * @returns {JSX.Element} - The Navbar component.
 */
const Navbar = () => {
  return (
    <div className="NavBar">
      {/* Link to the home view with Ghibli logo */}
      <Link to="/">
        <Ghibli className="Logo" />
      </Link>
      {/* Navigation links using react-router-dom's Link component */}
      <nav className="Router">
        <Link to="/" className="HomeLink">
          <HomeIcon className="IconLinkHome" />
          Home
        </Link>
        <Link to="/search" className="SearchLink">
          <SearchIcon className="IconLinkSearch" />
          Search
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;