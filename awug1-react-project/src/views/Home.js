// views/Home.js
import React from 'react';
import CharacterList from '../components/characters/CharacterList';
import Footer from '../components/common/Footer';
import Header from '../components/common/Header';
import Navbar from '../components/common/Navbar';

/**
 * Home view that displays a list of Disney characters.
 */
const Home = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <CharacterList />
      <Footer />
    </div>
  );
};

export default Home;