// views/Home.js
import React from 'react';
import Footer from '../components/common/Footer';
import Header from '../components/common/HeaderPage';
import Navbar from '../components/common/Navbar';
import HomeCategory from '../components/common/HomeCategory';

/**
 * Home view that displays a list of Disney Films.
 */
const Home = () => {
  const categoryIndices = [0, 1, 2, 3, 4];

  return (
    <div>
      <Navbar />
      <Header title="Welcome" />
      {categoryIndices.map((index) => (
        <HomeCategory key={index} categoryIndex={index} />
      ))}
      <Footer />
    </div>
  );
};

export default Home;