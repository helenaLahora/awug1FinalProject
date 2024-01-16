// DetailView.jsx
import React from 'react';
import Footer from '../components/common/Footer';
import Navbar from '../components/common/Navbar';
import DetailsItem from '../components/details/DetailsItem';
import { useLocation } from 'react-router-dom';

/**
 * DetailView Component
 * 
 * Main Goal/Task: Displays detailed information about a specific item.
 * 
 * Component Structure:
 * - Utilizes React hooks for location to access state information.
 * - Renders Navbar, DetailsItems, and Footer components.
 * - Passes categoryIndex and itemId to DetailsItems component based on the state.
 * 
 * @returns {JSX.Element} - The DetailView component.
 */
const DetailView = () => {
  // Get location and state from react-router-dom
  const location = useLocation();
  const { state } = location;

  // Destructure categoryIndex and itemId from state (if available)
  const { categoryIndex, itemId } = state || {};

  return (
    <div>
      {/* Render Navbar component */}
      <Navbar />
      
      {/* Render DetailsItem component with categoryIndex and itemId */}
      <DetailsItem category={categoryIndex} itemId={itemId} />
      
      {/* Render Footer component */}
      <Footer />
    </div>
  );
};

export default DetailView;
