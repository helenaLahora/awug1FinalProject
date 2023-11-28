import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://api.disneyapi.dev/character')
      .then(response => response.json())
      .then(apiData => {
        const characters = apiData.data.map(character => ({
          _id: character.id,
          films: character.films,
          shortFilms: character.shortFilms,
          tvShows: character.tvShows,
          videoGames: character.videoGames,
          parkAttractions: character.parkAttractions,
          allies: character.allies,
          enemies: character.enemies,
          name: character.name,
          imageUrl: character.imageUrl,
          url: character.url,
        }));

        setData(characters);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h2>Character List</h2>
      <ul>
        {data.map(character => (
          <li key={character._id}>
            <h3>{character.name}</h3>
            <img src={character.imageUrl} alt={character.name} />
            <p>Films: {character.films.join(', ')}</p>
            <p>Short Films: {character.shortFilms.join(', ')}</p>
            <p>TV Shows: {character.tvShows.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;