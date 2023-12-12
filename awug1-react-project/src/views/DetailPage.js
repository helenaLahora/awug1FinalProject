// views/DetailPage.js
import React from 'react';
import Footer from '../components/common/Footer';
import Header from '../components/common/Header';
import Navbar from '../components/common/Navbar';
import Detail from '../components/specific/DetailFilm';

/**
 * DetailPage view that displays detailed information about a specific item.
 */
const DetailPage = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <Detail />
      <Footer />
    </div>
  );
};

export default DetailPage;