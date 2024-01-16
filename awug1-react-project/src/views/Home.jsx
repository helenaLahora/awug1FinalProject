// views/Home.js
import React from 'react';
import Footer from '../components/common/Footer';
import Header from '../components/common/HeaderPage';
import Navbar from '../components/common/Navbar';
import HomeCategory from '../components/common/HomeCategory';

/**
 * Home View Component
 * 
 * Main Goal/Task: Displays a list of Disney Films.
 * 
 * Component Structure:
 * - Utilizes common components: Navbar, Header, HomeCategory, and Footer.
 * - Iterates through categoryIndices to render HomeCategory for each index.
 * 
 * @returns {JSX.Element} - The Home view component.
 */
const Home = () => {
  // Define category indices for Disney Films
  const categoryIndices = [0, 1, 2, 3, 4];

  return (
    <div>
      {/* Render Navbar component */}
      <Navbar />
      
      {/* Render Header component with "Welcome" title */}
      <Header title="Welcome" />
      
      {/* Iterate through categoryIndices and render HomeCategory for each index */}
      {categoryIndices.map((index) => (
        <HomeCategory key={index} categoryIndex={index} />
      ))}
      
      {/* Render Footer component */}
      <Footer />
    </div>
  );
};

export default Home;
