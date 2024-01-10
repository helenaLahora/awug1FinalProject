// components/common/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/NavBar.css';
import {ReactComponent as SearchIcon}  from "../../assets/icons/Search.svg";
import {ReactComponent as HomeIcon}  from "../../assets/icons/Home.svg";
import {ReactComponent as Ghibli}  from "../../assets/logo/GhibliLogo.svg";

/**
 * Navbar component for navigation between different views.
 * Uses react-router-dom's Link component for routing.
 */
const Navbar = () => {
  return (
    <div className="NavBar">
    <Link to="/">
    <Ghibli className="Logo"/>
    </Link>
      <nav className="Router">
          <Link to="/" className="HomeLink">
            <HomeIcon className="IconLinkHome"/>
            Home
          </Link>
          <Link to="/search" className="SearchLink">
            <SearchIcon className="IconLinkSearch"/>
            Search
          </Link>
      </nav>
    </div>
  );
};

export default Navbar;