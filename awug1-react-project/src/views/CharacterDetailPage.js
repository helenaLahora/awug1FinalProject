// views/CharacterDetailPage.js
import React from 'react';
import CharacterDetail from '../components/characters/CharacterDetail';
import Footer from '../components/common/Footer';
import Header from '../components/common/Header';
import Navbar from '../components/common/Navbar';

/**
 * CharacterDetailPage view that displays detailed information about a specific Disney character.
 */
const CharacterDetailPage = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <CharacterDetail />
      <Footer />
    </div>
  );
};

export default CharacterDetailPage;