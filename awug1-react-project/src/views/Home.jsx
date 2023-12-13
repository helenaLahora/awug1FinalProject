// views/Home.js
import React from 'react';
import ListFilms from '../components/specific/ListFilms';
import Footer from '../components/common/Footer';
import Header from '../components/common/Header';
import Navbar from '../components/common/Navbar';

/**
 * Home view that displays a list of Disney Films.
 */
const Home = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <ListFilms />
      <Footer />
    </div>
  );
};

export default Home;