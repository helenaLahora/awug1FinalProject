// views/Detail.js
import React from 'react';
import Footer from '../components/common/Footer';
import Header from '../components/common/HeaderPage';
import Navbar from '../components/common/Navbar';
import DetailComponent from '../components/common/Detail';

/**
 * Detail view that displays detailed information about a specific item.
 */
const Detail = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <DetailComponent />
      <Footer />
    </div>
  );
};

export default Detail;