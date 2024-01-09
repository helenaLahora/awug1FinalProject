// Search.jsx
import React from 'react';
import HeaderForm from '../components/common/CategoryForm';
import Footer from '../components/common/Footer';
import Navbar from '../components/common/Navbar';
import HeaderPage from '../components/common/HeaderPage';
import FilterMainInput from '../components/common/FilterMain';
import RenderResults from '../components/common/Results';
import { CategoryProvider } from '../components/common/CategoryContext';
import { FilterProvider } from '../components/common/FilterContext';

const Search = () => {
  return (
    <CategoryProvider>
      <FilterProvider>
        <div>
          <Navbar />
          <HeaderPage title={"Discover the Ghibli Universe"}/>
          <HeaderForm />
          <FilterMainInput />
          <RenderResults />
          <Footer />
        </div>
      </FilterProvider>
    </CategoryProvider>
  );
};

export default Search;