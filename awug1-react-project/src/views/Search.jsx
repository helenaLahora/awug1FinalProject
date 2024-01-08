// Search.jsx
import React from 'react';
import HeaderCategory from '../components/common/CategoryForm';
import Footer from '../components/common/Footer';
import Navbar from '../components/common/Navbar';
import FilterMainInput from '../components/common/FilterMainInput';
import RenderResults from '../components/common/Results';
import { CategoryProvider } from '../components/common/CategoryContext';
import { FilterProvider } from '../components/common/FilterContext';

const Search = () => {
  return (
    <CategoryProvider>
      <FilterProvider>
        <div>
          <Navbar />
          <HeaderCategory />
          <FilterMainInput />
          <RenderResults />
          <Footer />
        </div>
      </FilterProvider>
    </CategoryProvider>
  );
};

export default Search;