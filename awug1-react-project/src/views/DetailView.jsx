// DetailView.jsx
import React from 'react';
import Footer from '../components/common/Footer';
import Navbar from '../components/common/Navbar';
import DetailsItems from '../components/common/DetailsItem';
import { useLocation } from 'react-router-dom';

/**
 * Detail view that displays detailed information about a specific item.
 */
const DetailView = () => {
  const location = useLocation();
  const { state } = location;

  // Access categoryIndex and itemId from state
  const { categoryIndex, itemId } = state || {};

  return (
    <div>
      <Navbar />
      <DetailsItems category={categoryIndex} itemId={itemId} />
      <Footer />
    </div>
  );
};

export default DetailView;