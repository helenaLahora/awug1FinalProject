// views/Search.js
import React from 'react';
import HeaderCategory from '../components/common/HeaderCategory';
import Footer from '../components/common/Footer';
import Navbar from '../components/common/Navbar';

/**
 * Search view that allows users to search for ghibli items .
 */
const Search = () => {
  return (
    <div>
      <Navbar />
      <HeaderCategory />
      <Footer />
    </div>
  );
};

export default Search;