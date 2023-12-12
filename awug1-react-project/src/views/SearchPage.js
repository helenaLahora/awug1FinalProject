// views/SearchPage.js
import React from 'react';
import Search from '../components/specific/Search';
import Footer from '../components/common/Footer';
import Header from '../components/common/Header';
import Navbar from '../components/common/Navbar';

/**
 * SearchPage view that allows users to search for Disney .
 */
const SearchPage = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <Search />
      <Footer />
    </div>
  );
};

export default SearchPage;