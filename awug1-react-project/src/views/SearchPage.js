// views/SearchPage.js
import React from 'react';
import SearchCharacters from '../components/characters/SearchCharacters';
import Footer from '../components/common/Footer';
import Header from '../components/common/Header';
import Navbar from '../components/common/Navbar';

/**
 * SearchPage view that allows users to search for Disney characters.
 */
const SearchPage = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <SearchCharacters />
      <Footer />
    </div>
  );
};

export default SearchPage;