import './App.css';
import React, { useEffect, useState } from 'react';

function App() {

const [data,setData] = useState();

useEffect(()=>{
  fetch('https://api.disneyapi.dev/character')
  .then(response => {
    return response.json();
  }).then(data => {
    // const cleanData = data.data.map((character) => ({

    //   _id: character.id,
    //   films:  character.films,
    //   shortFilms:  character.shortFilms,
    //   tvShows: character.tvShows,
    //   videoGames: character.videoGames,
    //   parkAttractions: character.parkAttractions,
    //   allies: character.allies,
    //   enemies: character.enemies,
    //   name:  character.name,
    //   imageUrl: character.imageUrl,
    //   url: character.url,
    // }));
    
    setData(data.data);
  });
},[])


  return (
  <div>
      <h2>Object List</h2>
        <ul>
          {data != undefined ? <li>{data[0].films}</li>: null}
        </ul>
    </div>
  );
}

export default App;
