// views/Home.js
import React from 'react';
import Footer from '../components/common/Footer';
import Header from '../components/common/HeaderPage';
import Navbar from '../components/common/Navbar';

/**
 * Home view that displays a list of Disney Films.
 */
const Home = () => {
  return (
    <div>
      <Navbar />
      <Header title={"Welcome, happy to see you here :)"}/>
      <Footer />
    </div>
  );
};

export default Home;