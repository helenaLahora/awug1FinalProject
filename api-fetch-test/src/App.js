// src/App.js
import React from 'react';
import ObjectList from './components/ObjectList';
import CenturyList from './components/CenturyList';

function App() {

  return (
    <div>
      <h1>Harvard Art Museums API Data</h1>
      <CenturyList/>
      <ObjectList />
    </div>
  );
}

export default App;